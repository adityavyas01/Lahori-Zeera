'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavContent = () => (
        <>
            {navLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-body text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary"
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
                <a href="#" className="font-headline text-2xl font-bold text-foreground">
                    Lahori Zeera
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
