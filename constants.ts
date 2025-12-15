import { DayMenu, Plan, MenuItem, Testimonial } from './types';
import { Leaf, Award, Home, Truck, Heart } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Plans', href: '#plans' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Contact', href: '#contact' },
];

export const WEEKLY_MENU: DayMenu[] = [
  {
    day: 'Monday',
    title: 'Comfort Kickstart',
    items: ['Aloo Gobhi Masala', 'Dal Makhni', 'Methi Paratha or Rotis (4)', 'Rice Bowl', 'Boondi Raita', 'Fresh Garden Salad']
  },
  {
    day: 'Tuesday',
    title: 'Classic Punjabi Thali',
    items: ['RawalPindi Chole Masala', 'Bhindi Fry', 'Puri or Jeera Rice', 'Cucumber Raita', 'Salad & Pickle', 'Dessert Treat']
  },
  {
    day: 'Wednesday',
    title: 'Midweek Treat',
    items: ['Matar Paneer', 'Aloo Jeera', 'Beetroot Paratha or Rotis (4)', 'Rice Bowl', 'Mint Raita', 'Tangy Salad']
  },
  {
    day: 'Thursday',
    title: 'Desi Comfort Bowl',
    items: ['Kadhi Pakora', 'Mix Veg', 'Rotis (4)', 'Jeera Rice', 'Onion Raita', 'Salad']
  },
  {
    day: 'Friday',
    title: 'Special Feast Day',
    items: ['Matar Mushroom', 'Aloo/Paneer/Mix Veg Paratha (2)', 'Matar Pulaw', 'Raita', 'Dry-Fruits Kheer']
  }
];

export const PLANS: Plan[] = [
  {
    name: 'Basic Tiffin',
    price: '$160',
    perMeal: '$8 / day',
    features: [
      '20 Meals (Mon-Fri)',
      '1 Vegetarian Dish (Dal/Sabzi)',
      '4 Roti or 1 Rice Portion',
      'Small Salad/Raita',
      'Dessert (Once a week)',
      'Add Extra Curry: +$2',
      'Add Extra Roti: +$1'
    ]
  },
  {
    name: 'Deluxe Tiffin',
    price: '$260',
    perMeal: '$13 / day',
    features: [
      '20 Meals (Mon-Fri)',
      '2 Vegetarian Dishes (Special)',
      '4 Paratha/Roti or Rice Bowl',
      'Large Salad & Raita',
      'Daily Special Items',
      'Complimentary Shake (Promo)',
      'More Variety & Portions'
    ],
    isPopular: true
  }
];

export const HEALTHY_BOWLS: MenuItem[] = [
  {
    name: 'Tofu Tikka Salad',
    description: 'Grilled tofu cubes served on a bed of mixed greens with mint yogurt dressing.',
    price: '$10',
    tags: ['High Protein', 'Gluten Free'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800'
  },
  {
    name: 'Vegetable Power Salad',
    description: 'Cucumber, carrots, beetroot, and bell peppers with zesty lemon-pepper dressing.',
    price: '$10',
    tags: ['Vegan', 'Low Calorie'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800'
  },
  {
    name: 'Quinoa Protein Bowl',
    description: 'Nutritious mix of quinoa, chickpeas, cucumber, and tomato with olive oil dressing.',
    price: '$8',
    tags: ['Superfood'],
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800'
  },
  {
    name: 'Chickpea (Chana) Salad',
    description: 'Tangy, high-protein blend featuring fresh herbs.',
    price: '$10',
    tags: ['High Protein'],
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=800'
  }
];

export const WEEKEND_SPECIALS: string[] = [
  'Veg Manchurian Rice',
  'Veg Noodles',
  'White Sauce Pasta',
  'Gol Gappe (Pani Puri)',
  'Dahi Bade',
  'Papdi Chaat',
  'Vada Pav'
];

export const FEATURES = [
  {
    title: '100% Vegetarian',
    description: 'Pure vegetarian kitchen ensuring spiritual and physical well-being.',
    icon: Leaf
  },
  {
    title: 'Home-Style Taste',
    description: 'Less oil, authentic spices, and the warmth of a mother’s cooking.',
    icon: Home
  },
  {
    title: 'Free Delivery',
    description: 'No hidden charges. We deliver free to Fleetwood, Surrey & nearby areas.',
    icon: Truck
  },
  {
    title: 'Fresh Daily',
    description: 'Meals are prepared fresh every morning. No frozen preservatives.',
    icon: Award
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya S.",
    location: "Surrey",
    text: "The Aloo Gobhi reminds me so much of home. The delivery is always on time!",
    rating: 5
  },
  {
    name: "Rahul M.",
    location: "Fleetwood",
    text: "Best option for students. The Basic Tiffin is affordable and fills you up completely.",
    rating: 5
  },
  {
    name: "Anita K.",
    location: "Vancouver",
    text: "I love their healthy salad bowls. Finally, a tiffin service that isn't just oily curry.",
    rating: 4
  }
];