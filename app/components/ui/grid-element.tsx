import { motion } from "motion/react";
export const GridElement = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
      }}
      className="absolute inset-0"
    >
      <div
        style={{
          backgroundImage: `url("/grid.svg")`,
        }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950/0 to-[#04081A]" />
    </motion.div>
  );
};
