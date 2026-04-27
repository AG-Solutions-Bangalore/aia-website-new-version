import React from "react";

const CorporatePartner = () => {
  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto">
        <section className="space-y-10  bg-[#0F3652] p-8">
          <h2 className="text-3xl max-w-340 mx-auto md:text-4xl font-bold text-white">
            Navigate Seamlessly for an <br />
            <span className="text-[#F3831C]">
              Immersive Learning Experience
            </span>
          </h2>

          <div className="grid max-w-340 mx-auto md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="rounded-lg p-1">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
                  alt="Quick access dashboard"
                  className="w-full h-auto rounded"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Dashboards
              </h3>
              <p className="text-white text-lg">
                Get comprehensive insights and analytics at a glance with our
                powerful dashboard solutions designed for data-driven decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="p-8 max-w-340 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F3652] mb-3">
                Quick Access
              </h3>
              <p className="text-[#0F3652] text-lg">
                Get comprehensive insights and analytics at a glance with our
                powerful dashboard solutions designed for data-driven decisions.
              </p>
            </div>

            <div>
              <div className="rounded-lg p-1">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop"
                  alt="Quick access interface"
                  className="w-full h-auto rounded"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0F3652] p-8 ">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-340 mx-auto">
            <div className="order-2 md:order-1">
              <div className="rounded-lg p-1">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop"
                  alt="Assessment interface"
                  className="w-full h-auto rounded"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Assessments
              </h3>
              <p className="text-white text-lg">
                Track progress and measure learning outcomes with comprehensive
                assessment tools and detailed performance analytics.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CorporatePartner;
