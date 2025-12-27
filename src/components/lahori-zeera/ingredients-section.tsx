
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import SectionWrapper from './section-wrapper';

const ingredients = [
  {
    name: "Cumin (Zeera)",
    description: "Sourced from the best farms. Hand-roasted to unlock that earthy aroma.",
    image: PlaceHolderImages.find(img => img.id === 'cumin-seeds')
  },
  {
    name: "Black Salt (Kala Namak)",
    description: "For that classic chatpata kick and digestive relief.",
    image: PlaceHolderImages.find(img => img.id === 'black-salt')
  },
  {
    name: "Lemon Juice",
    description: "Real citrus concentrate for a sharp, fresh finish.",
    image: PlaceHolderImages.find(img => img.id === 'lemon')
  },
  {
    name: "Natural Spices",
    description: "A secret blend of pepper and ginger to aid digestion.",
    image: PlaceHolderImages.find(img => img.id === 'spices')
  }
];

export default function IngredientsSection() {
  return (
    <SectionWrapper id="ingredients">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">What’s Inside the Bottle?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ingredients.map((ingredient) => (
                <Card key={ingredient.name} className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    {ingredient.image && (
                        <div className="aspect-video">
                            <Image
                                src={ingredient.image.imageUrl}
                                alt={ingredient.name}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                                data-ai-hint={ingredient.image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="font-body font-bold text-xl text-foreground">{ingredient.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{ingredient.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    </SectionWrapper>
  );
}
