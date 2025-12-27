
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { variants } from '@/lib/variants';
import SectionWrapper from './section-wrapper';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function FlavorsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const rectangleVariants = {
    hidden: {
      scaleY: 0,
      originY: 1,
    },
    visible: {
      scaleY: 1,
      originY: 1,
      transition: {
        duration: 0.8,
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
        delay: 0.5,
      },
    },
  };

  return (
    <SectionWrapper id="flavors" className="overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
          Blockbuster Cast
        </h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto text-balance">
          Every flavour is a star, ek bhee nahi miss karna yaar, be it Zeera,
          Shikanji or Nimboo, peeyo inhe baar baar !
        </p>
      </div>

      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[70vh] md:min-h-[80vh]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {variants.map((variant) => (
          <div key={variant.id} className="relative flex justify-center pt-24 md:pt-32">
            <motion.div
              className="absolute bottom-0 left-0 w-full h-full rounded-t-3xl"
              style={{ backgroundColor: variant.themeColor + '40' }}
              variants={rectangleVariants}
            ></motion.div>

            <motion.div
              className="relative z-10 flex flex-col items-center text-center w-full"
              variants={contentVariants}
            >
              <div className="relative w-48 h-96 md:w-56 lg:w-64 md:h-[450px] lg:h-[500px] mb-6">
                <Image
                  src={variant.bottleImage}
                  alt={`Lahori ${variant.name} bottle`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  data-ai-hint={variant.bottleImageHint}
                />
              </div>

              <div className="space-y-4 mt-auto">
                <h3 className="font-headline text-3xl font-bold" style={{ color: variant.themeColor }}>
                  Lahori {variant.name}
                </h3>
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-full border-2 bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 px-8"
                  )}
                  style={{ borderColor: variant.themeColor, color: variant.themeColor }}
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
