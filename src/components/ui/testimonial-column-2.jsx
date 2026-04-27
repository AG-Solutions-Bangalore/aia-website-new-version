 

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsColumn2 = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(
                (
                  {
                    name,
                    image,
                    alt,
                    student_designation,
                    comapany_image,
                    company_alt,
                  },
                  i,
                ) => (
                  <div
                    className="rounded-md border bg-background  max-w-xs w-full overflow-hidden"
                    key={i}
                  >
                    <div className="h-48 w-full">
                      <img
                        src={image}
                        alt={alt}
                        decoding="async"
                        className="h-full w-full object-top object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold tracking-tight">
                            {name}
                          </span>
                          <span className="text-xs opacity-60">
                            {student_designation}
                          </span>
                        </div>

                        <img
                          src={comapany_image}
                          alt={company_alt}
                          decoding="async"
                          className="h-8 w-8 object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default TestimonialsColumn2;
