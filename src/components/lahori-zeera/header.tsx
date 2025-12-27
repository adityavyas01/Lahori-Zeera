'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { variants } from '@/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';


const navLinks = [
    { href: "#about", label: "About" },
    { href: "#flavors", label: "Flavors" },
    { href: "#ingredients", label: "Ingredients" },
    { href: "#reviews", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [animatedWordIndex, setAnimatedWordIndex] = useState(0);

    useEffect(() => {
        const wordInterval = setInterval(() => {
            setAnimatedWordIndex(prevIndex => (prevIndex + 1) % variants.length);
        }, 2000);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            clearInterval(wordInterval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const NavContent = () => (
        <>
            {navLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-in-out hover:text-primary"
                >
                    {link.label}
                </a>
            ))}
        </>
    );

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                scrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent"
            )}
        >
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <a href="#" className="font-headline text-2xl font-bold text-foreground flex items-center gap-2">
                    <span>Lahori</span>
                    <div className="relative h-8 w-28 overflow-hidden">
                        <AnimatePresence>
                            <motion.span
                                key={animatedWordIndex}
                                initial={{ y: '-100%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                exit={{ y: '100%', opacity: 0 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className="absolute inset-0 flex items-center justify-start"
                                style={{ color: variants[animatedWordIndex].themeColor }}
                            >
                                {variants[animatedWordIndex].name}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <NavContent />
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6 text-foreground" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[250px] bg-background">
                            <SheetTitle className="sr-only">Main Menu</SheetTitle>
                            <nav className="flex flex-col items-start gap-6 p-6 pt-20">
                                <NavContent />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
