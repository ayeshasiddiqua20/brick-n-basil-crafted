import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Star,
  Clock,
  MapPin,
  CarFront,
  Sun,
  Phone,
  Instagram,
  Leaf,
  WheatOff,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
  Flame,
  UtensilsCrossed,
  CakeSlice,
  Pizza,
  Check,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRevealAll } from "@/hooks/use-reveal";
import { getPlace, PLACE_ID, type PlaceData } from "@/lib/place.functions";

import heroPizza from "@/assets/hero-pizza.jpg";
import galleryRooftop from "@/assets/gallery-rooftop.jpg";
import galleryOven from "@/assets/gallery-oven.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryMushrooms from "@/assets/gallery-mushrooms.jpg";
import galleryCheesecake from "@/assets/gallery-cheesecake.jpg";
import galleryPasta from "@/assets/gallery-pasta.jpg";

const MAPS_PLACE_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=14.4566533,75.8955465&destination_place_id=${PLACE_ID}`;
const INSTAGRAM_URL = "https://www.instagram.com/brick_n_basil/";
const FALLBACK_ADDRESS =
  "Door no 5647, RKB building, A-228, S S Layout B Block, Davangere, Karnataka 577004, India";
const FALLBACK_HOURS = [
  "Monday: 1:00 – 10:00 PM",
  "Tuesday: Closed",
  "Wednesday: 1:00 – 10:00 PM",
  "Thursday: 1:00 – 10:00 PM",
  "Friday: 1:00 – 10:00 PM",
  "Saturday: 1:00 – 10:00 PM",
  "Sunday: 1:00 – 10:00 PM",
];

export const Route = createFileRoute("/")({
  component: Index,
  loader: async (): Promise<{ place: PlaceData | null }> => {
    try {
      return { place: await getPlace() };
    } catch (err) {
      console.error("Could not load Google Maps place data", err);
      return { place: null };
    }
  },
  head: () => ({
    meta: [
      { title: "Brick & Basil — Artisanal Wood-Fired Pizzeria in Davangere" },
      {
        name: "description",
        content:
          "Authentic Neapolitan wood-fired pizzas, fresh basil pasta and creamy cheesecakes in S S Layout B Block, Davangere. 4.7★ from 180+ Google reviews. Open 1–10 PM, Tuesday closed.",
      },
      { property: "og:title", content: "Brick & Basil — Artisanal Wood-Fired Pizzeria in Davangere" },
      {
        property: "og:description",
        content:
          "Authentic Neapolitan wood-fired pizzas, fresh basil pasta and creamy cheesecakes in S S Layout B Block, Davangere. 4.7★ from 180+ Google reviews.",
      },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const menuCategories = [
  {
    icon: Pizza,
    title: "Wood-Fired Pizzas",
    description:
      "Authentic Neapolitan-style bases with slow-fermented dough, premium cheese and balanced toppings — the dish guests come back for.",
    items: ["Margherita Artigianale", "Burrata Salad Pizza", "Peri Peri Paneer", "Quattro Formaggi"],
    badges: ["Vegetarian", "Vegan Options"],
    highlight: true,
  },
  {
    icon: Flame,
    title: "Starters",
    description:
      "Small plates built around fire and crunch — the garlic bread and oyster mushrooms are the most-reviewed on Google.",
    items: [
      "Peri Peri Crispy Oyster Mushrooms",
      "Artisanal Garlic Bread",
      "Burrata & Charred Tomato",
      "House Salad",
    ],
    badges: ["Vegetarian", "Vegan Options"],
  },
  {
    icon: UtensilsCrossed,
    title: "Fresh Basil Pasta",
    description:
      "Hand-cut pasta tossed in sauces made fresh daily — bright basil pesto, slow tomato and creamy Alfredo.",
    items: ["Basil Pesto Tagliatelle", "Arrabbiata Rigatoni", "Mushroom Alfredo", "Pomodoro Fresco"],
    badges: ["Vegetarian", "Vegan Options"],
  },
  {
    icon: CakeSlice,
    title: "Cheesecakes & Café",
    description:
      "Baked low and slow by our young artisanal baker, plus café classics like our much-loved iced latte.",
    items: ["Classic Burnt Basque", "Berry Compote Cheesecake", "Biscoff Crunch", "Iced Latte"],
    badges: ["Vegetarian"],
  },
];

const fallbackGallery = [
  { url: galleryRooftop, alt: "Rooftop sunset dining at Brick & Basil" },
  { url: galleryOven, alt: "Chef working the wood-fired brick oven" },
  { url: galleryInterior, alt: "Modern rustic interiors with exposed brick" },
  { url: galleryMushrooms, alt: "Peri peri crispy oyster mushrooms" },
  { url: galleryCheesecake, alt: "Berry compote cheesecake slice" },
  { url: galleryPasta, alt: "Fresh basil pesto pasta" },
];

const fallbackReviews = [
  {
    text:
      "Authentic Neapolitan Pizza here! Great find in Davangere. I have been to Italy and had so many varieties of pizza there — this is super authentic and highly recommend it!",
    rating: 5,
    author: "Gautam",
    when: "a month ago",
  },
  {
    text:
      "One of the best pizzas in Davangere! The salad, pizza, garlic bread, oyster mushrooms, iced latte — everything was spot on. This place is definitely going to be our go-to from now on!",
    rating: 5,
    author: "Deepa Kalgatta",
    when: "8 months ago",
  },
  {
    text:
      "Amazing food and atmosphere!! The pizza crust was thin, garlic bread was hot, cheesy and so wholesome, worth every rupee.",
    rating: 5,
    author: "Hamsa Kanuru",
    when: "3 months ago",
  },
];

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Index() {
  const { place } = Route.useLoaderData();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  useRevealAll();

  const rating = place?.rating ?? 4.7;
  const reviewCount = place?.reviewCount ?? 180;
  const address = place?.address ?? FALLBACK_ADDRESS;
  const hours = place?.weekdayHours.length ? place.weekdayHours : FALLBACK_HOURS;
  const phone = place?.phone;
  const mapsUri = place?.mapsUri ?? MAPS_PLACE_URL;
  const amenities = place?.amenities.length
    ? place.amenities
    : ["Outdoor / rooftop seating", "Free street parking", "Dine-in", "Vegetarian friendly"];

  const photos =
    place && place.photos.length >= 4
      ? place.photos.map((p) => ({
          url: p.url,
          alt: `Brick and basil, Davangere — photo by ${p.attribution ?? "a Google guest"}`,
          attribution: p.attribution,
        }))
      : fallbackGallery.map((g) => ({ url: g.url, alt: g.alt, attribution: undefined }));

  const heroImage = photos[0]?.url ?? heroPizza;

  const reviews = place && place.reviews.length ? place.reviews : fallbackReviews;
  const current = reviews[slide % reviews.length]!;

  const todayName = DAY_ORDER[(new Date().getDay() + 6) % 7];
  const browserKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as
    | string
    | undefined;

  const submitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingOpen(false);
    toast.success("Table request received!", {
      description: "We'll confirm your reservation by call or WhatsApp shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="font-heading text-2xl font-bold tracking-tight">
            Brick <span className="text-primary">&amp;</span>{" "}
            <span className="text-accent-foreground">Basil</span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#menu" className="transition-colors hover:text-primary">Menu</a>
            <a href="#gallery" className="transition-colors hover:text-primary">Gallery</a>
            <a href="#reviews" className="transition-colors hover:text-primary">Reviews</a>
            <a href="#visit" className="transition-colors hover:text-primary">Visit</a>
          </nav>
          <Button size="sm" onClick={() => setBookingOpen(true)} className="bg-primary text-primary-foreground hover:bg-terracotta-deep">
            Reserve a Table
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="reveal">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={mapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-primary/50"
              >
                <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">· {reviewCount}+ Google Reviews</span>
              </a>
              {place?.openNow !== undefined && (
                <Badge
                  variant="secondary"
                  className={place.openNow ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}
                >
                  {place.openNow ? "Open now" : "Closed right now"}
                </Badge>
              )}
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Artisanal Wood-Fired{" "}
              <span className="text-primary">Pizzeria</span> in Davangere
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Authentic Neapolitan pizzas, fresh basil pasta and slow-baked cheesecakes —
              in S S Layout B Block.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => setBookingOpen(true)}
                className="bg-primary text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5 hover:bg-terracotta-deep"
              >
                Reserve a Table
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/40 text-primary transition-transform hover:-translate-y-0.5 hover:bg-secondary"
              >
                <a href="#menu">View Menu</a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-basil" aria-hidden /> Rooftop seating</li>
              <li className="flex items-center gap-2"><CarFront className="h-4 w-4 text-basil" aria-hidden /> Free street parking</li>
              <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-basil" aria-hidden /> Vegetarian friendly</li>
            </ul>
          </div>
          <div className="reveal relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/60" aria-hidden />
            <img
              src={heroImage}
              alt="Brick and basil, Davangere — wood-fired pizza and rustic interiors"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-t border-border/60 bg-secondary/50 py-16 md:py-24" aria-labelledby="menu-heading">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-basil">Featured Menu</p>
            <h2 id="menu-heading" className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Crafted with fire &amp; patience
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {menuCategories.map((cat) => (
              <article
                key={cat.title}
                className={`reveal card-lift rounded-2xl border bg-card p-6 shadow-sm ${
                  cat.highlight ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <cat.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-2xl font-semibold">{cat.title}</h3>
                  </div>
                  {cat.highlight && (
                    <Badge className="bg-primary text-primary-foreground">Most Loved</Badge>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.badges.map((b) => (
                    <Badge key={b} variant="secondary" className="gap-1.5 bg-accent text-accent-foreground">
                      {b === "Vegan Options" ? <WheatOff className="h-3 w-3" aria-hidden /> : <Leaf className="h-3 w-3" aria-hidden />}
                      {b}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 md:py-24" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-basil">Ambiance</p>
              <h2 id="gallery-heading" className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                Straight from our guests
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                {place && place.photos.length >= 4
                  ? "Live photos from our Google Maps listing — shared by the restaurant and real guests."
                  : "A look at the oven, the rooftop and the plates that keep people coming back."}
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Instagram className="h-4 w-4" aria-hidden /> @brick_n_basil
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {photos.map((img, i) => (
              <figure
                key={img.url}
                className={`reveal group relative overflow-hidden rounded-xl bg-secondary ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {img.attribution && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent p-3 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                    Photo: {img.attribution}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="border-t border-border/60 bg-accent/40 py-16 md:py-24" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-4xl px-4">
          <div className="reveal text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-basil">Reviews</p>
            <h2 id="reviews-heading" className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              What Davangere says
            </h2>
            <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? "fill-gold text-gold" : "fill-gold/40 text-gold/40"}`} aria-hidden />
              ))}
              <span className="ml-1 font-medium text-foreground">{rating.toFixed(1)}</span> · {reviewCount} verified Google reviews
            </div>
          </div>
          <div className="reveal relative mt-10">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12" aria-live="polite">
              <Quote className="h-8 w-8 text-primary/50" aria-hidden />
              <div className="mt-3 flex items-center gap-1" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 font-heading text-xl font-medium leading-snug md:text-2xl">
                “{current.text.length > 420 ? `${current.text.slice(0, 420).trim()}…` : current.text}”
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 text-sm">
                <span className="font-semibold">{current.author}</span>
                <span className="text-muted-foreground">· {current.when} on Google</span>
              </footer>
            </article>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous review"
                onClick={() => setSlide((s) => (s - 1 + reviews.length) % reviews.length)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to review ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-2.5 rounded-full transition-all ${i === slide % reviews.length ? "w-6 bg-primary" : "w-2.5 bg-border"}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next review"
                onClick={() => setSlide((s) => (s + 1) % reviews.length)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-6 text-center text-sm">
              <a
                href={mapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
              >
                Read all reviews on Google <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Visit / Location */}
      <section id="visit" className="border-t border-border/60 py-16 md:py-24" aria-labelledby="visit-heading">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 md:grid-cols-2">
          <div className="reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-basil">Visit Us</p>
            <h2 id="visit-heading" className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              S S Layout, B Block
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">{address}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-basil text-primary-foreground hover:bg-basil-deep">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-1 h-4 w-4" aria-hidden /> Get Directions
                </a>
              </Button>
              {phone && (
                <Button asChild variant="outline" size="lg" className="border-basil/40 text-basil-deep hover:bg-accent">
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>
                    <Phone className="mr-1 h-4 w-4" aria-hidden /> {phone}
                  </a>
                </Button>
              )}
            </div>

            {browserKey && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm">
                <iframe
                  title="Map showing Brick and basil in S S Layout B Block, Davangere"
                  src={`https://www.google.com/maps/embed/v1/place?key=${browserKey}&q=place_id:${PLACE_ID}&zoom=16`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            )}
          </div>

          <div className="reveal space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-basil-deep">
                <Clock className="h-4 w-4" aria-hidden /> Opening Hours
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {hours.map((line) => {
                  const isToday = line.startsWith(todayName ?? "");
                  return (
                    <li
                      key={line}
                      className={`flex justify-between gap-4 ${isToday ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      <span>{line.split(":")[0]}</span>
                      <span>{line.slice(line.indexOf(":") + 1).trim()}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-basil-deep">
                <Sun className="h-4 w-4" aria-hidden /> Amenities
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-basil" aria-hidden /> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-basil-deep">
                <Instagram className="h-4 w-4" aria-hidden /> Follow along
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                New bakes, specials and rooftop evenings go up first on Instagram.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                @brick_n_basil <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-secondary/60 py-8 pb-24 md:pb-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-muted-foreground">
          <p className="font-heading text-lg font-bold text-foreground">
            Brick <span className="text-primary">&amp;</span> Basil
          </p>
          <p>{address}</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary"
          >
            <Instagram className="h-4 w-4" aria-hidden /> @brick_n_basil
          </a>
        </div>
      </footer>

      {/* Sticky quick utility bar (mobile-first) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md md:hidden">
        <div className="grid grid-cols-3 divide-x divide-border">
          <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-foreground hover:text-primary">
            <MapPin className="h-5 w-5 text-primary" aria-hidden /> Directions
          </a>
          <a
            href={phone ? `tel:${phone.replace(/\s/g, "")}` : mapsUri}
            className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-foreground hover:text-primary"
          >
            <Phone className="h-5 w-5 text-primary" aria-hidden /> Call
          </a>
          <button onClick={() => setBookingOpen(true)} className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-foreground hover:text-primary">
            <Clock className="h-5 w-5 text-primary" aria-hidden /> Reserve
          </button>
        </div>
      </div>

      {/* Booking modal */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Reserve a Table</DialogTitle>
            <DialogDescription>
              Tell us when and for how many — we'll confirm by call or WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitBooking} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bk-name">Name</Label>
              <Input id="bk-name" name="name" required autoComplete="name" placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bk-phone">Phone</Label>
              <Input id="bk-phone" name="phone" type="tel" required autoComplete="tel" placeholder="98XXX XXXXX" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="bk-date">Date</Label>
                <Input id="bk-date" name="date" type="date" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bk-guests">Guests</Label>
                <Input id="bk-guests" name="guests" type="number" min={1} max={20} defaultValue={2} required />
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              Open 1:00 PM – 10:00 PM. Closed on Tuesdays.
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-terracotta-deep" size="lg">
              Request Reservation
            </Button>
          </form>
          <button
            aria-label="Close dialog"
            className="sr-only"
            onClick={() => setBookingOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
