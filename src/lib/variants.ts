export type Variant = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  themeClass: string;
  baseImageUrl: string;
  bottleImage: string;
  bottleImageHint: string;
  heroImage: string;
  heroImageHint: string;
};

export const variants: Variant[] = [
  {
    id: 1,
    name: "ZEERA",
    subtitle: "THE ORIGINAL DESI PUNCH",
    description: "The flagship blend of roasted cumin and black salt. A bold, digestive fizz that defines the modern desi soda experience.",
    themeColor: "#76AB3B",
    themeClass: "theme-zeera",
    baseImageUrl: "https://cpqpdylzdipzwmtwvknx.supabase.co/storage/v1/object/public/Zeera/frame_000_delay-0.04s.webp",
    bottleImage: "https://cpqpdylzdipzwmtwvknx.supabase.co/storage/v1/object/public/Base%20Images/Lahori_Zeera_160ml.png",
    bottleImageHint: "product shot",
    heroImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkcmluayUyMHNwbGFzaGVzfGVufDB8fHx8MTc2NzAxNzE4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    heroImageHint: "drink splash",
  },
  {
    id: 2,
    name: "NIMBOO",
    subtitle: "THE CITRUS KICK",
    description: "A zesty, refreshing lemon blast paired with a hint of secret spices for those who crave a sharp, tangy finish.",
    themeColor: "#F4D03F",
    themeClass: "theme-nimboo",
    baseImageUrl: "https://cpqpdylzdipzwmtwvknx.supabase.co/storage/v1/object/public/Nimboo/frame_000_delay-0.04s.webp",
    bottleImage: "https://cpqpdylzdipzwmtwvknx.supabase.co/storage/v1/object/public/Base%20Images/Lahori_Nimboo_160ml.png",
    bottleImageHint: "product shot",
    heroImage: "https://images.unsplash.com/photo-1607353274243-fcfd3a178cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxsZW1vbiUyMHNwbGFzaHxlbnwwfHx8fDE3NjcwMTcxODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    heroImageHint: "lemon splash",
  },
  {
    id: 3,
    name: "SHIKANJI",
    subtitle: "THE REFRESHING ZEST",
    description: "Inspired by traditional Indian lemonade. A perfect balance of sweet, salt, and spice that cools you down instantly.",
    themeColor: "#2ECC71",
    themeClass: "theme-shikanji",
    baseImageUrl: "https://cpqpdylzdipzwmtwvknx.supabase.co/storage/v1/object/public/Shikanji/frame_000_delay-0.04s.webp",
    bottleImage: "https://cpqpdylzdipzwmtwvknx.supabase.co/storage/v1/object/public/Base%20Images/Lahori_Shikanji_160ml.png",
    bottleImageHint: "product shot",
    heroImage: "https://images.unsplash.com/photo-1595981266689-10654a9b6915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtaW50JTIwc3BsYXNofGVufDB8fHx8MTc2NzAxNzE5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    heroImageHint: "mint splash",
  },
];
