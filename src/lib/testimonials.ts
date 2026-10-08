export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  business: string;
  location: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Power cuts used to halt our counter completely. Now bills and kitchen slips print without stopping even when broadband goes down.",
    initials: "AS",
    name: "Arjun",
    role: "Owner",
    business: "Madurai Kitchen",
    location: "Madurai",
  },
  {
    quote: "I was using a tablet for billing and it got lost. I logged into another phone and all my data was backed up — it continued from the existing order ID like nothing happened.",
    initials: "TK",
    name: "Tharun Kumar",
    role: "Founder",
    business: "Avartana",
    location: "Chennai",
  },
  {
    quote: "We cut billing time down to under 10 seconds per table. Even during heavy dinner rushes, tickets print instantly without lag.",
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Owner",
    business: "Spice Garden",
    location: "Bengaluru",
  },
  {
    quote: "Taking a photo of our physical menu imported our full dish list and prices in minutes. Saved us an entire day of manual typing.",
    initials: "PM",
    name: "Priya Menon",
    role: "Owner",
    business: "Kerala Kitchen",
    location: "Chennai",
  },
];