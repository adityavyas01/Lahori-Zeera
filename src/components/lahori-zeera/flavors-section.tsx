
import { variants } from "@/lib/variants";
import SectionWrapper from "./section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

const flavorData = [
    {
        flavor: "Zeera",
        vibe: "Dumdaar, mazedaar, and sabka yaar. The gold standard of desi soda.",
        mix: "Water, Sugar, Lemon Juice, Black Salt, Roasted Cumin Seeds."
    },
    {
        flavor: "Nimboo",
        vibe: "A refreshing citrus blast that reminds you of childhood summers.",
        mix: "Lemon Juice Concentrate, Cane Sugar, Fizz, Spices."
    },
    {
        flavor: "Shikanji",
        vibe: "The fuel of India. A balanced tangy-sweet masterpiece.",
        mix: "Ginger Extract, Lemon, Black Salt, Carbonated Water."
    }
]

export default function FlavorsSection() {
    return (
        <SectionWrapper id="flavors" className="bg-secondary/20">
            <div className="text-center mb-12">
                <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">Our Flavors</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto text-balance">The perfect mix of chatpata flavors, all-natural ingredients, and just the right amount of fizz.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {variants.map((variant, index) => {
                    const data = flavorData.find(f => f.flavor === variant.name);
                    return (
                        <Card key={variant.id} className={cn("border-2 text-center", variant.themeClass)} style={{borderColor: variant.themeColor}}>
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl sm:text-4xl font-bold" style={{color: variant.themeColor}}>{variant.name}</CardTitle>
                                <p className="font-bold uppercase tracking-widest text-sm" style={{color: variant.themeColor}}>{variant.subtitle}</p>
                            </CardHeader>
                            <CardContent className="space-y-4 px-4 sm:px-6">
                                <p className="text-muted-foreground italic">"{data?.vibe}"</p>
                                <div>
                                    <h4 className="font-bold text-foreground">The Mix:</h4>
                                    <p className="text-muted-foreground text-sm">{data?.mix}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </SectionWrapper>
    )
}
