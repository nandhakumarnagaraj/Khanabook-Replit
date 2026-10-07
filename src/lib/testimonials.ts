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
    quote: "Power cuts used to kill our billing. Now we're 100% offline-capable. KhanaBook has been a game-changer for our roadside dhaba.",
    initials: "AS",
    name: "Arjun",
    role: "Owner",
    business: "Madurai Kitchen",
    location: "Madurai",
  },
  {
    quote: "I was using a device for billing and it got lost. I logged into another device and all my data was backed up — it continued from the existing order ID like nothing happened.",
    initials: "TK",
    name: "Tharun Kumar",
    role: "Founder",
    business: "Avartana",
    location: "Chennai",
  },
  {
    quote: "We cut our billing time from 1 minute to under 10 seconds. Rush hour is no longer a nightmare — KhanaBook handles it effortlessly.",
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Owner",
    business: "Spice Garden",
    location: "Bengaluru",
  },
  {
    quote: "The AI menu import saved us a full day of data entry. We uploaded our menu and it was done in minutes. Absolutely brilliant.",
    initials: "PM",
    name: "Priya Menon",
    role: "Owner",
    business: "Kerala Kitchen",
    location: "Chennai",
  },
];