
import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const contactMethods = [
  {
    icon: MapPin,
    label: "Visit Us",
    title: "Office Address",
    lines: [
      "C826-828, Vipul Plaza,",
      "Sector-81, Faridabad,",
      "Delhi - NCR 121002, India",
    ],
  },
  {
    icon: Mail,
    label: "Write to Us",
    title: "Email Us",
    links: [
      { text: "support@aia.in.net", href: "mailto:support@aia.in.net" },
      { text: "contact@aia.in.net", href: "mailto:contact@aia.in.net" },
    ],
  },
  {
    icon: Phone,
    label: "Call Us",
    title: "India",
    links: [
      { text: "+91 93113 20114", href: "tel:+919311320114" },
      { text: "+91 97175 97197", href: "tel:+919717597197" },
      { text: "0129 417 4177", href: "tel:01294174177" },
      { text: "1800-1200-2555", href: "tel:+180012002555", badge: "Toll Free" },
    ],
  },
  {
    icon: Phone,
    label: "International",
    title: "Vietnam & Indonesia",
    links: [
      { text: "+84-911677672", href: "tel:+84911677672" },
      { text: "+62-8117991185", href: "tel:+628117991185" },
    ],
  },
];

export default function ContactReachOut() {
  return (
    <section style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .reach-section {
          background: linear-gradient(175deg, #0a2540 0%, #062060 52%, #f5f7fa 52%);
          padding: 80px 0 100px;
        }

        .reach-header {
          text-align: center;
          margin-bottom: 52px;
        }

        .reach-eyebrow {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          color: #f97316;
          background: rgba(249,115,22,0.1);
          border-radius: 20px;
          padding: 5px 16px;
          margin-bottom: 16px;
          letter-spacing: 0.01em;
        }

        .reach-heading {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
        }

        .reach-heading span {
          color: #f97316;
        }

        .reach-subtext {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          font-weight: 400;
          margin: 0;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .reach-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 36px 26px 32px;
          border: 1.5px solid #eeeeee;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          position: relative;
          overflow: hidden;
        }

        .reach-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          border-radius: 18px 18px 0 0;
          opacity: 0;
          transition: opacity 0.22s ease;
        }

        .reach-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 36px rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.3);
        }

        .reach-card:hover::after {
          opacity: 1;
        }

        .card-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #fff5ed;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f97316;
          margin-bottom: 22px;
        }

        .card-label {
          font-size: 12px;
          font-weight: 500;
          color: #f97316;
          margin: 0 0 5px;
          letter-spacing: 0.01em;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0a2540;
          margin: 0 0 18px;
          letter-spacing: -0.01em;
        }

        .card-divider {
          width: 28px;
          height: 2px;
          background: #f97316;
          border-radius: 2px;
          margin-bottom: 18px;
          opacity: 0.4;
        }

        .contact-line {
          font-size: 14px;
          color: #555f6e;
          line-height: 1.75;
          margin: 0;
          font-weight: 400;
        }

        .contact-link {
          display: block;
          font-size: 14px;
          color: #3d4a5c;
          text-decoration: none;
          line-height: 1.85;
          font-weight: 500;
          transition: color 0.15s ease;
        }

        .contact-link:hover {
          color: #f97316;
        }

        .toll-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          color: #f97316;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 4px;
          padding: 1px 7px;
          margin-left: 8px;
          vertical-align: middle;
          letter-spacing: 0.02em;
        }

        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .reach-section {
            background: linear-gradient(175deg, #0a2540 0%, #062060 38%, #f5f7fa 38%);
          }
          .cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="reach-section">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div className="reach-header">
            <span className="reach-eyebrow">Get in touch</span>
            <h2 className="reach-heading">
              Reach out anytime — <span>we're here for you</span>
            </h2>
            <p className="reach-subtext">
              Multiple ways to connect with our team across the globe.
            </p>
          </div>

          {/* Cards */}
          <div className="cards-grid">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="reach-card">
                  <div className="card-icon-wrap">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <p className="card-label">{method.label}</p>
                  <h3 className="card-title">{method.title}</h3>
                  <div className="card-divider" />

                  <div>
                    {method.lines?.map((line, i) => (
                      <p key={i} className="contact-line">
                        {line}
                      </p>
                    ))}
                    {method.links?.map((link, i) => (
                      <a key={i} href={link.href} className="contact-link">
                        {link.text}
                        {link.badge && (
                          <span className="toll-badge">{link.badge}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
