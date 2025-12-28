'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { variants } from '@/lib/variants';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import SectionWrapper from './section-wrapper';

export default function FlavorsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const rectangleVariants = {
    hidden: {
      scaleY: 0,
      originY: 'bottom',
    },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.6,
      },
    },
  };

  return (
    <SectionWrapper id="flavors" className="p-0 h-screen flex flex-col">
      <div className="text-center pt-16 pb-8 md:pt-24 md:pb-12">
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            Blockbuster Cast
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto text-balance">
            Every flavour is a star, ek bhee nahi miss karna yaar, be it Zeera,
            Shikanji or Nimboo, peeyo inhe baar baar !
            </p>
      </div>
      
      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-3 w-full flex-grow"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {variants.map((variant) => (
          <div key={variant.id} className="relative flex flex-col overflow-hidden group">
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: variant.themeColor }}
              variants={rectangleVariants}
            />

            <motion.div
              className="relative z-10 flex flex-col items-center justify-between w-full h-full p-8 text-center"
              variants={contentVariants}
            >
              <div className="w-full flex-grow flex items-center justify-center">
                  <div className="relative w-1/2 md:w-2/3 max-w-[280px]">
                    <Image
                      src={variant.bottleImage}
                      alt={`Lahori ${variant.name} bottle`}
                      width={400}
                      height={800}
                      className="object-contain drop-shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                      data-ai-hint={variant.bottleImageHint}
                    />
                  </div>
              </div>


              <div className="space-y-4 mt-8">
                <h3 className="font-headline text-4xl font-bold text-white">
                  Lahori {variant.name}
                </h3>
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-full border-2 bg-transparent text-white hover:bg-white transition-all duration-300 px-8 py-6 text-lg",
                    "hover:text-black"
                  )}
                  style={{ borderColor: "white" }}
                >
                  Shop Now
                </Button>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
