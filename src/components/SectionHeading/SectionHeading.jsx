const SectionHeading = ({
  title,
  highlight,
  highlight1,
  description,
  description1,
  beforeheading,

  align = "start",

  wrapperClass = "",
  titleClass = "",
  highlightClass = "",
  descriptionClass = "",
  beforeHeadingClass = "",
  underlineColor = "#0F3652",

  highlightclassName,

  preheadingclassName,
  preheading,
}) => {
  const isCenter = align == "center";

  return (
    <div
      className={`py-2 ${isCenter ? "text-center" : "text-left"} ${wrapperClass}`}
    >
      {beforeheading && (
        <div
          className={`mt-4 text-gray-600 leading-relaxed mx-auto ${
            isCenter ? "text-center" : "text-left"
          } ${beforeHeadingClass}`}
        >
          <p>{beforeheading}</p>
        </div>
      )}

      <div className={`inline-block mb-3 ${isCenter ? "mx-auto" : ""}`}>
        <h2
          className={`text-xl md:text-4xl font-bold text-[#0F3652] ${titleClass}`}
        >
          <span
            className={` ${
              preheadingclassName ? preheadingclassName : "text-[#F3831C]"
            } ${preheadingclassName}`}
          >
            {preheading}
          </span>{" "}
          {title} <span className="text-[#F3831C]">{highlight1}</span>
        </h2>

        {highlight && (
          <h2
            className={`font-bold text-[#F3831C] mt-2 ${
              highlightclassName ? highlightclassName : "text-xl md:text-4xl"
            } ${highlightClass}`}
          >
            {highlight}
          </h2>
        )}
      </div>

      {/* Desktop Description */}
      <div className="hidden lg:block">
        {description && (
          <div
            className={`mt-4 text-[16px] text-gray-600 leading-relaxed mx-auto ${
              isCenter ? "text-center" : "text-left"
            } ${descriptionClass}`}
          >
            <p>{description}</p>
          </div>
        )}

        {description1 && (
          <div
            className={`text-gray-600 text-[16px] leading-relaxed mx-auto ${
              isCenter ? "text-center" : "text-left"
            } ${descriptionClass}`}
          >
            <p>{description1}</p>
          </div>
        )}
      </div>

      {/* <div className="md:hidden">
        <div
          className={`text-gray-600 text-[16px] leading-relaxed mx-auto ${
            isCenter ? "text-center" : "text-left"
          } ${descriptionClass}`}
        >
          <p className="text-justify">
            {description}
            {description1}
          </p>
        </div>
      </div> */}
      <div className="lg:hidden">
        <div
          className={`text-gray-600 text-[16px] leading-relaxed mx-auto ${
            isCenter ? "text-center" : "text-left"
          } ${descriptionClass}`}
        >
          <p className={isCenter ? "text-center" : "text-justify"}>
            {description}
            {description1}
          </p>
        </div>
      </div>
      <div
        className={`mt-3 flex ${isCenter ? "justify-center" : "justify-start"}`}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ width: "120px", height: "18px", overflow: "hidden" }}
        >
          {/* Static Line */}
          <span
            className="absolute block"
            style={{
              width: "60%",
              height: "2.5px",
              background: underlineColor,
            }}
          />

          {/* Moving Line (FIXED) */}
          <span
            className="absolute block"
            style={{
              width: "25%",
              height: "6px",
              background: "#F3831C",
              top: "50%",
              transform: "translateY(-50%)",
              animation: "slideBackForth 3.2s ease-in-out infinite",
            }}
          />
        </div>

        <style>{`
  @keyframes slideBackForth {
    0% { transform: translate(-40px, -50%); }
    50% { transform: translate(40px, -50%); }
    100% { transform: translate(-40px, -50%); }
  }
`}</style>
      </div>
    </div>
  );
};
export default SectionHeading;
// -------------------------------EXAMPLE---------------------------------------
{
  /* <SectionHeading
  align="center"
  beforeheading="Our Global Learning Community"

  title="Trusted by Learners"
  highlight1="Across"
  highlight="the Globe"

  description="Real experiences shared by professionals on how AIA helped them achieve their certification goals."
  description1="Thousands of professionals from audit, finance, compliance, and risk trust our structured learning approach."

  wrapperClass="mb-10"

  titleClass="text-3xl md:text-5xl font-bold"
  highlightClass="text-2xl md:text-4xl font-semibold"

  descriptionClass="max-w-3xl mx-auto text-gray-600"

  beforeHeadingClass="text-sm tracking-widest text-[#F3831C] font-semibold"

  underlineColor="#0F3652"
/> */
}
