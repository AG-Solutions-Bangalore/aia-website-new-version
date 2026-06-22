import { IMAGE_PATH } from "@/api/base-url";

const CisaIndiaMap = () => {
  return (
    <section className="py-12 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Center-aligned Unified Map Image */}
        <img
          src={`${IMAGE_PATH}/india_map.webp`}
          alt="India by AIA map and locations"
          className="w-full h-auto object-contain drop-shadow-md"
          onError={(e) => {
            e.target.src = `${IMAGE_PATH}/map.webp`; // fallback
          }}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default CisaIndiaMap;
