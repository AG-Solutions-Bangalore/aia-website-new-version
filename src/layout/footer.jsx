import { PaymentAccreditation } from "@/components/Footer/footer-accredationbadges";
import FooterReviews from "@/components/Footer/footer-review";
import { ContactGrid } from "@/components/Footer/global-contact";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#1a2332] to-[#0f172a] text-white">
      <div>
        <FooterReviews footer={false} />
      </div>
      <div className="max-w-340 mx-auto px-4  py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-4">
          <div className="space-y-6">
            <h4 className="text-[#fa8017] font-bold text-xl mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#fa8017] -mb-2"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About AIA", href: "/about-aia" },
                { name: "Blog", href: "/blogs" },
                { name: "Our Passout", href: "/our-passouts" },
                { name: "CFE Free Resources", href: "/cfe-free-resources" },
                { name: "Corporate Training", href: "/corporate-training" },
                { name: "Contact Us", href: "/contact" },
                { name: "Policies", href: "/policies" },
                { name: "Terms and Conditions", href: "/terms-and-conditions" },
              ].map((link, idx) => (
                <li key={idx} className="group">
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-[#fa8017] transition-all duration-300 text-sm"
                  >
                    <span className="text-[#fa8017] group-hover:translate-x-1 transition-transform duration-300">
                      ›
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#fa8017] font-bold text-xl mb-6 relative inline-block">
              Courses
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#fa8017] -mb-2"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "CFE Curriculum", href: "/cfe-curriculum" },
                // {
                //   name: "Become CFE in Just 30 Days",
                //   href: "/become-cfe-in-just-30-days",
                // },
                { name: "CIA Curriculum", href: "/cia-curriculum" },
                // {
                //   name: "Become CIA in Just 90 Days",
                //   href: "/become-cia-in-just-90-days",
                // },
                {
                  name: "CIA Challenge Curriculum",
                  href: "/cia-challenge-curriculum",
                },
                // {
                //   name: "CIA Challenge Prep Course",
                //   href: "/cia-challenge-prep-course",
                // },
                { name: "CAMS", href: "/cams" },
              ].map((course, idx) => (
                <li key={idx} className="group">
                  <a
                    href={course.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-[#fa8017] transition-all duration-300 text-sm"
                  >
                    <span className="text-[#fa8017] group-hover:translate-x-1 transition-transform duration-300">
                      ›
                    </span>
                    <span>{course.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 col-span-2 md:col-span-1">
            <ContactGrid />
          </div>

          <div className="space-y-6 col-span-2 md:col-span-1">
            <h4 className="text-[#fa8017] font-bold text-xl mb-6 relative inline-block">
              Registered Office
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#fa8017] -mb-2"></span>
            </h4>
            <div className="space-y-2">
              <p className="font-bold text-white text-lg">
                ACADEMY OF INTERNAL AUDIT
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                C826-828, Vipul Plaza, Sector-81,
                <br />
                Faridabad, Delhi - NCR 121002, India
              </p>
              <a
                href="tel:+01294174177"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#fa8017] transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Tel: 0129-417-4177</span>
              </a>
              <div className="flex gap-4 items-start bg-gray-800/50 p-4 rounded-lg">
                <svg
                  className="w-6 h-6 text-[#fa8017] shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div className="text-sm space-y-2">
                  <a
                    href="mailto:support@aia.in.net"
                    className="block text-gray-300 hover:text-[#fa8017] transition-colors duration-300"
                  >
                    support@aia.in.net
                  </a>
                  <a
                    href="mailto:contact@aia.in.net"
                    className="block text-gray-300 hover:text-[#fa8017] transition-colors duration-300"
                  >
                    contact@aia.in.net
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full h-22 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700 hover:border-[#fa8017] transition-all duration-300">
              <iframe
                src="https://maps.google.com/maps?q=Academy%20of%20Internal%20Audit,%20SRS%20City,%20Sector%2087,%20Faridabad,%20Haryana%20121002&z=10&output=embed"
                className="w-full h-full"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="AIA Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-4"></div>

        <PaymentAccreditation />
      </div>

      <div className="bg-black/30 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Academy of Internal Audit. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
