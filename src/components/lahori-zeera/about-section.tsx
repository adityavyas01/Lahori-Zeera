
import { FlameKindling, Gem, Sparkles } from "lucide-react";
import SectionWrapper from "./section-wrapper";

const brandPillars = [
  {
    icon: <FlameKindling className="h-8 w-8 text-primary" />,
    title: "Authenticity",
    description: "Born in a family kitchen in Chandigarh.",
  },
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: "Tradition",
    description: "Real spices like roasted cumin, black salt, and ginger.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Modernity",
    description: "Hygienic, high-speed production for a new India.",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <p className="font-headline text-lg text-primary tracking-widest uppercase">The Blockbuster Cast</p>
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">Desi Hi Changa.</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Finally, a drink that is a star in its league, a game changer, and a mood enhancer. Inspired by the traditional goli sodas of Punjab, Lahori Zeera is the perfect mix of chatpata flavors, all-natural ingredients, and just the right amount of fizz.
          </p>
        </div>
        <div className="space-y-8">
          {brandPillars.map((pillar) => (
            <div key={pillar.title} className="flex items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0 rounded-full bg-primary/10 p-3 sm:p-4">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold font-body text-foreground">{pillar.title}</h3>
                <p className="text-muted-foreground mt-1">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
