'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import SectionWrapper from "./section-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    name: "Abhishek",
    quote: "Super Yummy. Best desi drink in the market.",
  },
  {
    name: "Shradha",
    quote: "Heavy Khana khane ke baad ek chota pack enough hai sb pachane ke liye.",
    translation: "Just one pack after a heavy meal is enough to digest everything."
  },
  {
    name: "Dr. Sunny",
    quote: "Best beverage drink so far. Better than any other drink and definitely helps in digestion. Worth every penny.",
  },
  {
    name: "Prasun",
    quote: "I’ve become addicted to the taste. I drink it at least once every day!",
  },
];

export default function TestimonialsSection() {
  return (
    <SectionWrapper id="reviews" className="bg-secondary/20">
       <div className="text-center mb-12">
            <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">From Our Fans</h2>
        </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Avatar className="w-16 h-16 mb-4">
                        <AvatarImage 
                          src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${testimonial.name}`} 
                          alt={`${testimonial.name}'s testimonial avatar`}
                          loading="lazy"
                        />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    {testimonial.translation && <p className="text-xs text-muted-foreground/70 italic mb-4">({testimonial.translation})</p>}
                    <span className="font-bold text-foreground">{testimonial.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
}
