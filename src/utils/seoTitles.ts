/**
 * @file src/utils/seoTitles.ts
 * @description Central dictionary and resolvers for SEO image titles and link titles
 * across Academy of Internal Audit (AIA).
 */

export const IMAGE_TITLES: Record<string, string> = {
  // CFE Curriculum Image Titles
  '753_OC.webp': 'Om Chhag – ACFE Certification Achievement',
  '752_OC.webp': 'Sudharshan SG – ACFE Certification Achievement',
  '751_OC.webp': 'Vibha Singh – ACFE Certification Achievement',
  '750_OC.webp': 'Apoorv Joshi – ACFE Certification Achievement',
  '749_OC.webp': 'Gurtej Singh – ACFE Certification Achievement',
  '747_OC.webp': 'Qurat-ul-Ain – ACFE Certification Achievement',
  '746_OC.webp': 'Anushka Dhamne – ACFE Certification Achievement',
  '743_OC.webp': 'Prathik Prakash Pai – ACFE Certification Achievement',
  '742_OC.webp': 'Nitin Sharma – ACFE Certification Achievement',
  '740_OC.webp': 'Nishitha Murali – Certification Achievement',
  '725_Y.webp': 'Subramanian C R – Student Lecture',
  '727_Y.webp': 'Sabarinath V – Student Success Story',
  '693_Y.webp': 'Dhanush ND – Student Video Testimonial',
  '698_Y.webp': 'Neeraj Kumar – Student Video Testimonial',
  '285_Y.webp': 'Prashant Ramgiri – Student Video Testimonial',
  '327_Y.webp': 'Pavan Kumar Vagvala – Student Video Testimonial',
  '378_Y.webp': 'Rajendra Kumar – Student Video Testimonial',
  '697_Y.webp': 'Chinonso Michael Abaraonye – Student Video Testimonial',
  '355_Y.webp': 'Shweta Gangwar – Student Video Testimonial',
  '696_Y.webp': 'Lalitha Satheesh – Student Video Testimonial',

  // CIA Curriculum Image Titles
  '731_OC.webp': 'Riddhi Patel – CIA Certification Achievement',
  '729_OC.webp': 'Gurpreet Singh – CIA Certification Achievement',
  '699_OC.webp': 'Shambhav Gupta – IIA Certification Achievement',
  '629_OC.webp': 'Deepali Musale – CIA Certification Achievement',
  '72_OC.webp': 'Rohit Chawla – IIA Certification Achievement',
  '67_OC.webp': 'Christabel Joy – IIA Certification Achievement',
  '66_OC.webp': 'Nikita Karkera – IIA Certification Achievement',
  '28_OC.webp': 'Gaurav Kumar – IIA Certification Achievement',
  '162_OC.webp': 'Amit – IIA Certification Achievement',
  '109_Y.webp': 'Joyal Sijo – Student Success Story',
  '148_Y.webp': 'Abbhijiith – Academy of Internal Audit Student Video',

  // Shared between CIA and CIA Challenge
  '732_OC.webp': 'Ishant Kumar – CIA Certification Achievement',
  '732_Y.webp': 'Ishant Kumar – CIA Course Lecture',
  '198_Y.webp': 'Farid – Academy of Internal Audit Student Video',
  '193_Y.webp': 'Rakesh – Academy of Internal Audit Student Video',
  '190_Y.webp': 'Sujeeth – Academy of Internal Audit Student Video',
  '43_Y.webp': 'Mohd Wasif – Student Interview',
  '46_Y.webp': 'Sunil Kumar – Student Interview',
  '45_Y.webp': 'Aradhana Upadhyay – Student Interview',
  '69_Y.webp': 'Prathik Prakash – Student Video',

  // CIA Challenge Image Titles
  '712_OC.webp': 'Nishant Chaturvedi – IIA Certification Achievement',
  '711_OC.webp': 'Sahil Babbar – IIA Certification Achievement',
  '198_OC.webp': 'Farid – IIA Certification Achievement',
  '197_OC.webp': 'Naveen – IIA Certification Achievement',
  '196_OC.webp': 'Pooja – IIA Certification Achievement',
  '194_OC.webp': 'Sharon – IIA Certification Achievement',
  '193_OC.webp': 'Rakesh – IIA Certification Achievement',
  '192_OC.webp': 'Kushal – IIA Certification Achievement',
  '191_OC.webp': 'Rahul – IIA Certification Achievement',
  '190_OC.webp': 'Sujeeth – IIA Certification Achievement',
};

export const ROUTE_LINK_TITLES: Record<string, string> = {
  '/': 'Academy of Internal Audit – Home',
  '/about-aia/': 'About Academy of Internal Audit',
  '/about-aia': 'About Academy of Internal Audit',
  '/aia-times/': 'AIA Times – Latest Updates',
  '/aia-times': 'AIA Times – Latest Updates',
  '/alumni-network/': 'AIA Alumni Network',
  '/alumni-network': 'AIA Alumni Network',
  '/blogs/': 'Internal Audit Training Blogs',
  '/blogs': 'Internal Audit Training Blogs',
  '/cams': 'CAMS Certification Training',
  '/cams/': 'CAMS Certification Training',
  '/cams-free-resources/': 'CAMS Free Study Resources',
  '/cams-free-resources': 'CAMS Free Study Resources',
  '/cfe-curriculum': 'CFE Certification Curriculum',
  '/cfe-curriculum/': 'CFE Certification Curriculum',
  '/cfe-free-resources/': 'CFE Free Study Resources',
  '/cfe-free-resources': 'CFE Free Study Resources',
  '/cia-challenge-curriculum': 'CIA Challenge Exam Curriculum',
  '/cia-challenge-curriculum/': 'CIA Challenge Exam Curriculum',
  '/cia-curriculum': 'CIA Certification Curriculum',
  '/cia-curriculum/': 'CIA Certification Curriculum',
  '/cia-free-resources/': 'CIA Free Study Resources',
  '/cia-free-resources': 'CIA Free Study Resources',
  '/cisa': 'CISA Certification Training',
  '/cisa/': 'CISA Certification Training',
  '/cisa-free-resources/': 'CISA Free Study Resources',
  '/cisa-free-resources': 'CISA Free Study Resources',
  '/contact/': 'Contact Academy of Internal Audit',
  '/contact': 'Contact Academy of Internal Audit',
  '/corporate-training/': 'Corporate Training Programs – AIA',
  '/corporate-training': 'Corporate Training Programs – AIA',
  '/enroll-now/': 'Enroll Now – AIA Certification Courses',
  '/enroll-now': 'Enroll Now – AIA Certification Courses',
  'https://pages.razorpay.com/stores/Enroll-Now': 'Enroll Now – AIA Certification Courses',
  '/policies/': 'AIA Policies',
  '/policies': 'AIA Policies',
  '/terms-and-conditions/': 'Terms and Conditions – AIA',
  '/terms-and-conditions': 'Terms and Conditions – AIA',
  '#': 'Zoom In',
  '': 'About Academy of Internal Audit',
};

export const EXTERNAL_PLATFORM_TITLES: Record<string, string> = {
  'share.google': 'Academy of Internal Audit – Google Business Profile',
  'ambitionbox.com': 'Academy of Internal Audit Reviews on AmbitionBox',
  'g2.com': 'Academy of Internal Audit Reviews on G2',
  'trustpilot.com': 'Academy of Internal Audit Reviews on Trustpilot',
  'justdial.com': 'Academy of Internal Audit – Justdial Business Listing',
  'iao.org': 'Academy of Internal Audit – IAO Profile',
  'gsaaa.org': 'Academy of Internal Audit – GSAAA Accreditation Profile',
  'twitter.com': 'Academy of Internal Audit – Twitter Profile',
  'facebook.com': 'Academy of Internal Audit – Facebook Page',
  'instagram.com': 'Academy of Internal Audit – Instagram Profile',
  'linkedin.com/company/academy-of-internal-audit': 'Academy of Internal Audit – LinkedIn Company Page',
  'ceoinsightsindia.com': 'Puneet Garg – CEO Insights Leadership Profile',
};

export const PR_ARTICLE_TITLES: Record<string, string> = {
  'cxotoday.com/media-coverage': "Read AIA's Internal Audit Industry Insights",
  'cxotoday.com/story': 'Internal Audit and Compliance Insights',
  'dhunt.in': 'AIA News and Updates on Dailyhunt',
  'happenrecently.com': "AIA's Growing Global Professional Community",
};

export const STUDENT_LINKEDIN_TITLES: Record<string, string> = {
  'nitin-sharma': 'Nitin Sharma – LinkedIn Profile',
  'nishitha-murali': 'Nishitha Murali – LinkedIn Profile',
  'ca-rohit-chawla': 'CA Rohit Chawla – LinkedIn Profile',
  'deepali-patil-musale': 'Deepali Patil Musale – LinkedIn Profile',
  'gaurav-kumar': 'Gaurav Kumar – LinkedIn Profile',
  'gurpreet-singh': 'Gurpreet Singh – LinkedIn Profile',
  'nikita-karkera': 'Nikita Karkera – LinkedIn Profile',
  'riddhi-patel': 'Riddhi Patel – LinkedIn Profile',
  'ca-naveen-b': 'CA Naveen B – LinkedIn Profile',
  'ca-sharon-james': 'CA Sharon James – LinkedIn Profile',
  'ishant-kumar': 'Ishant Kumar – LinkedIn Profile',
  'kushal-k-kulkarni': 'Kushal K. Kulkarni – LinkedIn Profile',
  'mohd-farid': 'Mohd Farid – LinkedIn Profile',
  'nishant-chaturvedi': 'Nishant Chaturvedi – LinkedIn Profile',
  'pooja-jain': 'Pooja Jain – LinkedIn Profile',
  'rahul-dixit': 'Rahul Dixit – LinkedIn Profile',
  'rakesh-kumar-singh': 'Rakesh Kumar Singh – LinkedIn Profile',
  'sahil-babbar': 'Sahil Babbar – LinkedIn Profile',
  'sujeeth-kamath': 'Sujeeth Kamath – LinkedIn Profile',
};

export const YOUTUBE_VIDEO_TITLES: Record<string, string> = {
  // CIA Challenge specific
  '0ABs0wjh2bI': 'Academy of Internal Audit – Featured YouTube Video',
  '2SB1gah-eX0': 'Academy of Internal Audit – Featured YouTube Video',
  '4X9ooT9plZU': 'Academy of Internal Audit – Featured YouTube Video',
  'DqQoWdbmUVM': 'Academy of Internal Audit – YouTube Video',
  'ILUDqmhc3sA': 'Academy of Internal Audit – YouTube Video',
  'IUieXJsNPAA': 'Academy of Internal Audit – YouTube Video',
  'O3yC_wxxMMQ': 'Academy of Internal Audit – YouTube Video',
  'RHFtOPtIyC8': 'Academy of Internal Audit – Featured YouTube Video',
  'RxOgimWJO2I': 'Academy of Internal Audit – YouTube Video',
  'TIn7q2n2TIo': 'Academy of Internal Audit – Featured YouTube Video',
  'XKYS5Qol8mY': 'Academy of Internal Audit – YouTube Video',
  'YxyYAJv9ue4': 'Academy of Internal Audit – YouTube Video',
  'Z9_6Hb8xPZI': 'Academy of Internal Audit – Featured YouTube Video',
  'ZwqazxS8DYc': 'Academy of Internal Audit – Featured YouTube Video',
  'eIuEsbTC9QU': 'Academy of Internal Audit – YouTube Video',
  'hYqdX6wbebk': 'Academy of Internal Audit – YouTube Video',
  'j4x0q0UwPnI': 'Academy of Internal Audit – Featured YouTube Video',

  // CIA Curriculum specific mapped IDs
  'bE5BVJnJyXU': 'Academy of Internal Audit – Student Success Story',
  'flJj1X5A9d0': 'Academy of Internal Audit – CIA Training Video',
  'zNpz_A73rFE': 'Academy of Internal Audit – CIA Training Video',
  'zI7MIWeG3nA': 'Academy of Internal Audit – CIA Course Video',
  'lG0iCx2lfLY': 'Academy of Internal Audit – Student Experience',
  'jqlwtgCe_2Q': 'Academy of Internal Audit – Student Testimonial',
  'uR6dJ7rViC8': 'Academy of Internal Audit – Student Success Story',
  'Y0GosjTz2SI': 'Academy of Internal Audit – CIA Training Video',
  'aYQzi9iP1bg': 'Academy of Internal Audit – CIA Course Video',
};

/**
 * Resolves the image title based on filename or alt text.
 */
export function getImageTitle(imageSrc?: string | null, fallback?: string): string {
  if (!imageSrc) return fallback || 'Academy of Internal Audit';
  const filename = imageSrc.split('?')[0].split('/').pop() || '';
  if (IMAGE_TITLES[filename]) {
    return IMAGE_TITLES[filename];
  }
  return fallback || 'Academy of Internal Audit';
}

/**
 * Resolves the title attribute for an anchor / link.
 */
export function getLinkTitle(href?: string | null, context?: { page?: string; studentName?: string; defaultTitle?: string }): string {
  if (!href || href === '') {
    return ROUTE_LINK_TITLES[''] || 'About Academy of Internal Audit';
  }

  const trimmed = href.trim();

  // 1. Check exact route match
  if (ROUTE_LINK_TITLES[trimmed]) {
    return ROUTE_LINK_TITLES[trimmed];
  }

  // 2. Check WhatsApp
  if (trimmed.includes('wa.me') || trimmed.includes('whatsapp.com')) {
    return 'Contact Academy of Internal Audit on WhatsApp';
  }

  // 3. Check YouTube Channel & Playlist
  if (trimmed.includes('youtube.com/playlist') || trimmed.includes('list=')) {
    return 'Academy of Internal Audit – YouTube Video Playlist';
  }
  if (trimmed.includes('youtube.com/@academyofia')) {
    return 'Academy of Internal Audit – YouTube Channel';
  }

  // 4. Check YouTube Videos
  if (trimmed.includes('youtu.be') || trimmed.includes('youtube.com/watch') || trimmed.includes('youtube.com/shorts')) {
    for (const [id, title] of Object.entries(YOUTUBE_VIDEO_TITLES)) {
      if (trimmed.includes(id)) {
        // If on CIA Curriculum, the prompt lists specific titles
        if (context?.page === 'cia-curriculum') {
          if (id === 'j4x0q0UwPnI') return 'Academy of Internal Audit – CIA Course Video';
          if (id === 'bE5BVJnJyXU') return 'Academy of Internal Audit – Student Success Story';
          if (id === 'ZwqazxS8DYc') return 'Academy of Internal Audit – Student Testimonial';
          if (id === 'RHFtOPtIyC8') return 'Academy of Internal Audit – Student Experience';
          if (id === '0ABs0wjh2bI') return 'Academy of Internal Audit – Student Testimonial';
          if (id === 'flJj1X5A9d0') return 'Academy of Internal Audit – CIA Training Video';
          if (id === 'TIn7q2n2TIo') return 'Academy of Internal Audit – Student Success Story';
          if (id === '4X9ooT9plZU') return 'Academy of Internal Audit – Student Testimonial';
          if (id === '2SB1gah-eX0') return 'Academy of Internal Audit – CIA Course Video';
          if (id === 'Z9_6Hb8xPZI') return 'Academy of Internal Audit – Student Experience';
        }
        return title;
      }
    }
    if (context?.page === 'cfe-curriculum') {
      return 'Academy of Internal Audit – YouTube Video';
    }
    if (context?.page === 'cia-challenge-curriculum') {
      return 'Academy of Internal Audit – YouTube Video';
    }
    return 'Academy of Internal Audit – YouTube Video';
  }

  // 5. Check LinkedIn
  if (trimmed.includes('linkedin.com')) {
    if (trimmed.includes('/company/')) {
      return 'Academy of Internal Audit – LinkedIn Company Page';
    }
    for (const [slug, title] of Object.entries(STUDENT_LINKEDIN_TITLES)) {
      if (trimmed.toLowerCase().includes(slug)) {
        return title;
      }
    }
    if (context?.studentName) {
      return `${context.studentName} – LinkedIn Profile`;
    }
    return 'Academy of Internal Audit – LinkedIn Profile';
  }

  // 6. Check PR Articles
  for (const [pattern, title] of Object.entries(PR_ARTICLE_TITLES)) {
    if (trimmed.includes(pattern)) {
      return title;
    }
  }

  // 7. Check External Platforms
  for (const [pattern, title] of Object.entries(EXTERNAL_PLATFORM_TITLES)) {
    if (trimmed.includes(pattern)) {
      return title;
    }
  }

  return context?.defaultTitle || trimmed;
}

