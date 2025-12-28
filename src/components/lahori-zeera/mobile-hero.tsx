'use client';
import { type Variant, variants } from "@/lib/variants";
import TextOverlay from "./text-overlay";
import FlavorSelector from "./flavor-selector";
import { AnimatePresence, motion } from "framer-motion";

type MobileHeroProps = {
    variant: Variant;
    onSelectVariant: (index: number) => void;
    isSwitching: boolean;
};

export default function MobileHero({ variant, onSelectVariant, isSwitching }: MobileHeroProps) {

    return (
        <div className="relative w-full h-screen flex flex-col overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={variant.id}
                    className="absolute inset-0 w-full h-full"
                    style={{ backgroundColor: variant.themeColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
            </AnimatePresence>


            <TextOverlay variant={variant} isSwitching={false} className="flex-1" />

            <div className="relative z-10 p-8 pt-0">
                <FlavorSelector 
                    onSelect={onSelectVariant} 
                    currentIndex={variants.findIndex(v => v.id === variant.id)} 
                    direction="horizontal" 
                />
            </div>

            {isSwitching && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500">
                    <p className="text-2xl font-headline tracking-widest text-white animate-pulse">Mixing...</p>
                </div>
            )}
        </div>
    )
}
