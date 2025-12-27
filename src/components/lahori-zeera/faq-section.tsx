
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import SectionWrapper from "./section-wrapper";
  
const faqs = [
    {
      question: "What makes Lahori Zeera different from other sodas?",
      answer: "We use natural ingredients and real spices instead of just artificial flavors. Our drinks are designed to be functional, aiding digestion while being refreshing.",
    },
    {
      question: "Does it contain any caffeine?",
      answer: "No, Lahori Zeera is a caffeine-free, non-alcoholic carbonated beverage.",
    },
    {
      question: "How should I store the bottles?",
      answer: "Tastes best when served chilled. Once opened, keep refrigerated and consume within 24 hours.",
    },
];

export default function FaqSection() {
    return (
        <SectionWrapper id="faq">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">The Essentials</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-base sm:text-lg font-bold text-left hover:no-underline text-foreground">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </SectionWrapper>
    )
}
