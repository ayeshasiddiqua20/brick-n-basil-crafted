import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
export const PLACE_ID = "ChIJbaJTYKYvujsROIXp2_tKL4E";

const FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "shortFormattedAddress",
  "location",
  "rating",
  "userRatingCount",
  "priceLevel",
  "regularOpeningHours",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "googleMapsUri",
  "primaryTypeDisplayName",
  "reviews",
  "photos",
  "takeout",
  "dineIn",
  "delivery",
  "reservable",
  "servesVegetarianFood",
  "servesDessert",
  "goodForGroups",
  "outdoorSeating",
  "parkingOptions",
  "accessibilityOptions",
  "paymentOptions",
].join(",");

export type PlaceReview = {
  text: string;
  rating: number;
  author: string;
  authorPhoto?: string;
  authorUri?: string;
  when: string;
};

export type PlacePhoto = {
  url: string;
  attribution?: string;
  attributionUri?: string;
  width: number;
  height: number;
};

export type PlaceData = {
  name: string;
  address: string;
  shortAddress?: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  mapsUri: string;
  openNow?: boolean;
  weekdayHours: string[];
  reviews: PlaceReview[];
  photos: PlacePhoto[];
  amenities: string[];
  fetchedAt: number;
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
let cache: PlaceData | null = null;

function gatewayHeaders(extra: Record<string, string> = {}) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (!lovableKey || !mapsKey) {
    throw new Error("Google Maps connector credentials are missing");
  }
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": mapsKey,
    ...extra,
  };
}

async function resolvePhoto(photoName: string): Promise<string | null> {
  const res = await fetch(
    `${GATEWAY_URL}/places/v1/${photoName}/media?maxWidthPx=1600&skipHttpRedirect=true`,
    { headers: gatewayHeaders() },
  );
  if (!res.ok) {
    console.error(`Place photo fetch failed [${res.status}]: ${await res.text()}`);
    return null;
  }
  const body = (await res.json()) as { photoUri?: string };
  return body.photoUri ?? null;
}

export const getPlace = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlaceData> => {
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache;

    const res = await fetch(`${GATEWAY_URL}/places/v1/places/${PLACE_ID}`, {
      headers: gatewayHeaders({ "X-Goog-FieldMask": FIELD_MASK }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Place details failed [${res.status}]: ${body}`);
      throw new Error(`Google Maps request failed [${res.status}]: ${body}`);
    }

    type RawPhoto = {
      name: string;
      widthPx?: number;
      heightPx?: number;
      authorAttributions?: { displayName?: string; uri?: string }[];
    };
    const raw = (await res.json()) as {
      displayName?: { text?: string };
      formattedAddress?: string;
      shortFormattedAddress?: string;
      location?: { latitude: number; longitude: number };
      rating?: number;
      userRatingCount?: number;
      nationalPhoneNumber?: string;
      googleMapsUri?: string;
      regularOpeningHours?: { openNow?: boolean; weekdayDescriptions?: string[] };
      reviews?: {
        text?: { text?: string };
        rating?: number;
        relativePublishTimeDescription?: string;
        authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
      }[];
      photos?: RawPhoto[];
      takeout?: boolean;
      dineIn?: boolean;
      delivery?: boolean;
      servesVegetarianFood?: boolean;
      servesDessert?: boolean;
      goodForGroups?: boolean;
      outdoorSeating?: boolean;
      parkingOptions?: { freeParkingLot?: boolean; freeStreetParking?: boolean };
    };

    const rawPhotos = (raw.photos ?? []).slice(0, 8);
    const resolved = await Promise.all(
      rawPhotos.map(async (p) => {
        const url = await resolvePhoto(p.name);
        if (!url) return null;
        return {
          url,
          attribution: p.authorAttributions?.[0]?.displayName,
          attributionUri: p.authorAttributions?.[0]?.uri,
          width: p.widthPx ?? 1200,
          height: p.heightPx ?? 1200,
        } satisfies PlacePhoto;
      }),
    );

    const amenities: string[] = [];
    if (raw.outdoorSeating) amenities.push("Outdoor / rooftop seating");
    if (raw.parkingOptions?.freeStreetParking) amenities.push("Free street parking");
    if (raw.parkingOptions?.freeParkingLot) amenities.push("Free parking lot");
    if (raw.dineIn) amenities.push("Dine-in");
    if (raw.takeout) amenities.push("Takeaway");
    if (raw.servesVegetarianFood) amenities.push("Vegetarian friendly");
    if (raw.servesDessert) amenities.push("Desserts");
    if (raw.goodForGroups) amenities.push("Good for groups");

    const data: PlaceData = {
      name: raw.displayName?.text ?? "Brick and basil",
      address: raw.formattedAddress ?? "",
      shortAddress: raw.shortFormattedAddress,
      lat: raw.location?.latitude ?? 14.4566533,
      lng: raw.location?.longitude ?? 75.8955465,
      rating: raw.rating,
      reviewCount: raw.userRatingCount,
      phone: raw.nationalPhoneNumber,
      mapsUri: raw.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`,
      openNow: raw.regularOpeningHours?.openNow,
      weekdayHours: raw.regularOpeningHours?.weekdayDescriptions ?? [],
      reviews: (raw.reviews ?? [])
        .filter((r) => r.text?.text)
        .map((r) => ({
          text: r.text!.text!,
          rating: r.rating ?? 5,
          author: r.authorAttribution?.displayName ?? "Google reviewer",
          authorPhoto: r.authorAttribution?.photoUri,
          authorUri: r.authorAttribution?.uri,
          when: r.relativePublishTimeDescription ?? "",
        })),
      photos: resolved.filter((p): p is PlacePhoto => p !== null),
      amenities,
      fetchedAt: Date.now(),
    };

    cache = data;
    return data;
  },
);
