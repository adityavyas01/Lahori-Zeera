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
  },
];
