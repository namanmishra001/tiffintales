export interface MenuItem {
  name: string;
  description: string;
  price?: string;
  image?: string;
  tags?: string[];
}

export interface DayMenu {
  day: string;
  title: string;
  items: string[];
}

export interface Plan {
  name: string;
  price: string;
  perMeal: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}