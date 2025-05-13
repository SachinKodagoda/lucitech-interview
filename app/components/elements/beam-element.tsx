import { motion, type AnimationProps } from "motion/react";

type BeamType = {
  top: number;
  left: number;
  transition?: AnimationProps["transition"];
};

export default function BeamElement({ top, left, transition = {} }: BeamType) {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className="absolute h-[64px] w-[2px] bg-linear-to-b from-blue-500/0 to-black"
    />
  );
}
