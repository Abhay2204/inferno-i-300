import { Variants } from 'framer-motion';

export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 100, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1], // High-spring cubic-bezier
    },
  },
};

export const containerStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideUpVariants: Variants = {
  initial: { y: "100%" },
  animate: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};
