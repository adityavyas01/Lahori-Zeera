
import { variants } from "@/lib/variants";
import SectionWrapper from "./section-wrapper";
import { Button } from "../ui/button";
import Image from "next/image";

export default function FlavorsSection() {
    // A mid-point frame from the animation sequence
    const getBottleImageUrl = (baseUrl: string) => {
        return baseUrl.replace('frame_000', `frame_090`);
    }

    return (
        <SectionWrapper id="flavors" className="bg-secondary/20">
            <div className="text-center mb-12">
                <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">Blockbuster Cast</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto text-balance">
                    Every flavour is a star, ek bhee nahi miss karna yaar, be it Zeera, Shikanji or Nimboo, peeyo inhe baar baar !
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {variants.map((variant) => (
                    <div key={variant.id} className="text-center group">
                        <div className="relative mb-6">
                            <div className="relative aspect-[4/5] w-full max-w-xs mx-auto">
                                <div 
                                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square rounded-full transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundColor: variant.themeColor, opacity: 0.8 }}
                                />
                                <Image 
                                    src={getBottleImageUrl(variant.baseImageUrl)} 
                                    alt={`Lahori ${variant.name} bottle`}
                                    fill
                                    className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute top-4 right-4 sm:top-2 sm:right-10 md:top-4 md:right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg -rotate-12">
                                Save 5%
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-muted-foreground">
                                    <span className="line-through">MRP 240.00</span> From Rs. 228.00
                                </p>
                                <h3 className="font-headline text-3xl font-bold text-foreground">Lahori {variant.name}</h3>
                            </div>
                            <Button variant="outline" className="rounded-full border-2 bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 px-8">
                                Shop Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
