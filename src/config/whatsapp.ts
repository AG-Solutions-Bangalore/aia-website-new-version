/**
 * @file src/config/whatsapp.ts
 * @description Centralized WhatsApp contact configuration for the AIA website.
 *
 * All WhatsApp destination phone numbers live here in a single source of truth,
 * so the four WhatsApp links reported in the SEO crawl are maintained in one
 * place instead of being hard-coded across navbar, floating contact, and footer
 * components.
 *
 * NOTE: Verify each number with the website owner before changing any value.
 * The `getWhatsAppUrl` helper strips all non-digit formatting characters into
 * the `https://wa.me/<digits>` format WhatsApp expects.
 */

export interface WhatsAppContact {
  label: string;
  phone: string; // stored with leading '+'
}

export const whatsappContacts: Record<string, WhatsAppContact> = {
  primary: { label: "Primary (India)", phone: "+919311320114" },
  indonesia: { label: "Indonesia", phone: "+628117991185" },
  vietnam: { label: "Vietnam", phone: "+84911677672" },
  support: { label: "Support (India)", phone: "+918796321764" },
};

export function getWhatsAppUrl(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}
