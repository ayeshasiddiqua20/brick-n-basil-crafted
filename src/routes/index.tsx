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

import heroPizza from "@/assets/hero-pizza.jpg";
import galleryRooftop from "@/assets/gallery-rooftop.jpg";
import galleryOven from "@/assets/gallery-oven.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryMushrooms from "@/assets/gallery-mushrooms.jpg";
import galleryCheesecake from "@/assets/gallery-cheesecake.jpg";
import galleryPasta from "@/assets/gallery-pasta.jpg";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Brick+%26+Basil+S+S+Layout+B+Block+Davangere";
const PHONE_URL = "tel:+918882001122";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Brick & Basil — Artisanal Wood-Fired Pizzeria in Davangere" },
      {
        name: "description",
        content:
          "Wood-fired pizzas, fresh basil pasta and creamy cheesecakes with rooftop sunset dining in S S Layout B Block, Davangere. Rated 4.7★ by 180+ Google reviews.",
      },
      { property: "og:title", content: "Brick & Basil — Artisanal Wood-Fired Pizzeria in Davangere" },
      {
        property: "og:description",
        content:
          "Wood-fired pizzas, fresh basil pasta and creamy cheesecakes with rooftop sunset dining in S S Layout B Block, Davangere.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const menuCategories = [
  {
    icon: Pizza,
    title: "Wood-Fired Pizzas",
    description:
      "48-hour slow-fermented dough, premium fior di latte, blistered in our brick oven at 450°C.",
    items: ["Margherita Artigianale", "Peri Peri Paneer", "Quattro Formaggi", "Verdure Arrosto"],
    badges: ["Vegetarian", "Vegan Options"],
  },
  {
    icon: Flame,
    title: "Starters",
    description:
      "Small plates built around fire and crunch — including our most-talked-about dishes.",
    items: ["Peri Peri Crispy Oyster Mushrooms", "Artisanal Garlic Bread", "Burrata & Charred Tomato", "Smoked Chilli Hummus"],
    badges: ["Vegetarian", "Vegan Options"],
    highlight: true,
  },
  {
    icon: UtensilsCrossed,
    title: "Fresh Basil Pasta",
    description:
      "Hand-cut pasta tossed in sauces made fresh daily — bright basil, slow tomato, creamy Alfredo.",
    items: ["Basil Pesto Tagliatelle", "Arrabbiata Rigatoni", "Mushroom Alfredo", "Pomodoro Fresco"],
    badges: ["Vegetarian", "Vegan Options"],
  },
  {
    icon: CakeSlice,
    title: "Creamy Cheesecakes",
    description:
      "Baked low and slow by our young artisanal baker. Rich, silky, and unmissable.",
    items: ["Classic Burnt Basque", "Berry Compote Cheesecake", "Biscoff Crunch", "Dark Chocolate Truffle"],
    badges: ["Vegetarian"],
  },
];

const gallery = [
  { src: galleryRooftop, alt: "Rooftop sunset dining at Brick & Basil", caption: "Rooftop sunsets" },
  { src: galleryOven, alt: "Chef working the wood-fired brick oven", caption: "The oven craft" },
  { src: galleryInterior, alt: "Modern rustic interiors with exposed brick", caption: "The space" },
  { src: galleryMushrooms, alt: "Peri peri crispy oyster mushrooms", caption: "Peri peri mushrooms" },
  { src: galleryCheesecake, alt: "Berry compote cheesecake slice", caption: "Basque cheesecake" },
  { src: galleryPasta, alt: "Fresh basil pesto pasta", caption: "Basil pesto" },
];

const testimonials = [
  {
    quote:
      "First of its kind in Davangere. The ambience is so well thought out for sunset and late evenings… felt a Bangalore vibe here!",
    author: "Verified Google Review",
  },
  {
    quote:
      "The chef is a young artisanal baker. Premium cheese, no bloating, and the cheesecake is to die for!",
    author: "Verified Google Review",
  },
  {
    quote: "Do not miss the peri peri crispy oyster mushrooms and artisanal pizzas!",
    author: "Verified Google Review",
  },
];

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  useRevealAll();

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
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm">
              <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
              <span className="font-semibold">4.7</span>
              <span className="text-muted-foreground">· 180+ Google Reviews</span>
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Artisanal Wood-Fired{" "}
              <span className="text-primary">Pizzeria</span> in Davangere
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Slow-fermented dough, fresh basil from the garden, and a rooftop
              made for sunsets — in S S Layout B Block.
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
              <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-basil" aria-hidden /> Vegan options</li>
            </ul>
          </div>
          <div className="reveal relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/60" aria-hidden />
            <img
              src={heroPizza}
              alt="Wood-fired margherita pizza with fresh basil, in front of a glowing brick oven"
              width={1600}
              height={1200}
              className="w-full rounded-2xl object-cover shadow-xl"
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
                    <Badge className="bg-primary text-primary-foreground">Must Try</Badge>
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
                Moments from the rooftop
              </h2>
            </div>
            <a
              href="https://instagram.com/brick_n_basil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Instagram className="h-4 w-4" aria-hidden /> @brick_n_basil
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((img, i) => (
              <figure key={img.caption} className={`reveal group relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4 text-sm font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {img.caption}
                </figcaption>
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
                <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-gold text-gold" : "fill-gold/40 text-gold/40"}`} aria-hidden />
              ))}
              <span className="ml-1 font-medium text-foreground">4.7</span> · 180+ verified Google reviews
            </div>
          </div>
          <div className="reveal relative mt-10">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12" aria-live="polite">
              <Quote className="h-8 w-8 text-primary/50" aria-hidden />
              <blockquote className="mt-4 font-heading text-2xl font-medium leading-snug md:text-3xl">
                “{testimonials[slide]!.quote}”
              </blockquote>
              <footer className="mt-6 text-sm font-semibold text-muted-foreground">
                — {testimonials[slide]!.author}
              </footer>
            </article>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous review"
                onClick={() => setSlide((s) => (s - 1 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to review ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-2.5 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-2.5 bg-border"}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next review"
                onClick={() => setSlide((s) => (s + 1) % testimonials.length)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
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
            <p className="mt-4 max-w-md text-muted-foreground">
              Find us in the heart of S S Layout — warm lights, wood smoke, and a
              rooftop that comes alive at golden hour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-basil text-primary-foreground hover:bg-basil-deep">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-1 h-4 w-4" aria-hidden /> Get Directions
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-basil/40 text-basil-deep hover:bg-accent">
                <a href={PHONE_URL}>
                  <Phone className="mr-1 h-4 w-4" aria-hidden /> Call to Reserve
                </a>
              </Button>
            </div>
          </div>
          <dl className="reveal grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <dt className="flex items-center gap-2 text-sm font-semibold text-basil-deep">
                <Clock className="h-4 w-4" aria-hidden /> Opening Hours
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                1:00 PM – 10:00 PM<br />Tuesday Closed
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <dt className="flex items-center gap-2 text-sm font-semibold text-basil-deep">
                <Sun className="h-4 w-4" aria-hidden /> Seating
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">Rooftop seating with sunset views</dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <dt className="flex items-center gap-2 text-sm font-semibold text-basil-deep">
                <CarFront className="h-4 w-4" aria-hidden /> Parking
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">Free street parking available</dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <dt className="flex items-center gap-2 text-sm font-semibold text-basil-deep">
                <MapPin className="h-4 w-4" aria-hidden /> Address
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">S S Layout, B Block, Davangere, Karnataka</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-secondary/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-muted-foreground">
          <p className="font-heading text-lg font-bold text-foreground">
            Brick <span className="text-primary">&amp;</span> Basil
          </p>
          <p>Artisanal wood-fired pizzeria · Davangere</p>
          <a
            href="https://instagram.com/brick_n_basil"
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
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-foreground hover:text-primary">
            <MapPin className="h-5 w-5 text-primary" aria-hidden /> Directions
          </a>
          <a href={PHONE_URL} className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-foreground hover:text-primary">
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
