 

import { motion } from "framer-motion";

export const BlurredStagger = ({ text }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.015 },
    },
  };

  const letter = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="show"
      className="text-base leading-relaxed whitespace-normal"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  );
};
