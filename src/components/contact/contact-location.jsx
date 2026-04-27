 
import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";

const ContactLocation = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden pb-10">
      <SectionHeading
        title="Find Us"
        description="Our Office Location"
        align="center"
      />
      <div className="relative z-10 max-w-340  mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl "
        >
          <div className="h-100 relative  overflow-hidden border border-gray-200">
            {!mapLoaded && (
              <div className="absolute inset-0 bg-linear-to-r from-[#0F3652]/10 to-gray-100 animate-pulse" />
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d428221.04602404166!2d77.348773!3d28.388809000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd5a9988bdcf%3A0x1dd0f04210cae34e!2sAcademy%20of%20Internal%20Audit!5e0!3m2!1sen!2sus!4v1766150573238!5m2!1sen!2sus&maptype=roadmap"
              className={`w-full h-full transition-opacity duration-500 ${
                mapLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Academy of Internal Audit Location"
              onLoad={() => setMapLoaded(true)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactLocation;
