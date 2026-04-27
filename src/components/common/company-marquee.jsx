import SectionHeading from "../SectionHeading/SectionHeading";

const CompanyMarquee = ({ companies }) => {
  if (!companies?.length) return null;

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .marquee {
            animation: marquee 80s linear infinite;
          }
        `}
      </style>

      <div className="w-full bg-gradient-to-b from-[#0f365200]/5 via-[#0F3652]/30 to-[#0F3652]/60 py-10 md:py-20 overflow-hidden">
        <div className="p-2 md:pl-4 md:ml-12">
          <div className="px-4  md:hidden">
            <SectionHeading
              title="AIA Alumni Driving Impact in"
              highlight="World’s Top Organizations"
              description="AIA alumni contribute to high-impact roles across renowned organizations, reflecting the real-world value of our certification-led training"
              highlightclassName="text-2xl"
              align="center"
            />
          </div>
          <div className="px-4 hidden md:block">
            <SectionHeading
              title="AIA Alumni Driving Impact in"
              highlight="World’s Top Organizations"
              description="AIA alumni contribute to high-impact roles across renowned organizations, reflecting the real-world value of our certification-led training"
              highlightclassName="md:text-6xl"
            />
          </div>
        </div>
        <div className="relative flex overflow-hidden py-8">
          {[1, 2].map((loop) => (
            <div
              key={loop}
              className="flex marquee whitespace-nowrap items-center"
              aria-hidden={loop === 2}
            >
              {companies.map((c, i) => (
                <div key={`${loop}-${i}`} className="mx-12 flex items-center">
                  <img
                    src={c.src}
                    alt={c.alt}
                    className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    style={{ maxWidth: "240px" }}
                     loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompanyMarquee;
