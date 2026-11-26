export type CaseStudyCategory =
  | 'Health'
  | 'Logistics and mobility'
  | 'Hospitality'
  | 'Media and social'
  | 'Education';

export interface CaseStudy {
  slug: string;
  title: string;
  cardTitle: string;
  filterCategory: CaseStudyCategory;
  client: string;
  clientType: string;
  industry: string;
  offering: string;
  approachSummary: string;
  resultLine: string;
  challenge: string;
  approach: string;
  resultBody: string;
  verifiedResult?: {
    figure: string;
    label: string;
    source: string;
  };
  pullQuote?: {
    quote: string;
    author: string;
    approved: boolean;
  };
  cmsResultPlaceholder: string;
  stack: string[];
  imageAlt: string;
  imageSubject: string;
  imageSrc: string;
}

export const CASE_STUDY_CATEGORIES: Array<'All' | CaseStudyCategory> = [
  'All',
  'Health',
  'Logistics and mobility',
  'Hospitality',
  'Media and social',
  'Education',
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'personalized-meditation-platform',
    title: 'Personalized meditation platform',
    cardTitle: 'Personalized meditation platform',
    filterCategory: 'Health',
    client: 'Meditation Crush',
    clientType: 'Consumer wellness startup',
    industry: 'Health & wellness',
    offering: 'iOS & Android mobile app with admin content console',
    approachSummary: 'Guided audio sessions, breath pacer, and mood check-in tracking',
    resultLine: '[Result, verify with client]',
    challenge:
      'Meditation Crush needed mobile apps on iOS and Android where beginners and returning members could pick guided audio sessions by mood. Their content team also needed a web console to publish new audio tracks without waiting for app store releases.',
    approach:
      'We built native-feel iOS and Android apps featuring a visual breath pacer, daily mood check-ins, and filtered session libraries. A web admin console lets editors upload, tag, and schedule new meditation tracks directly.',
    resultBody:
      'The platform launched across iOS and Android with direct content publishing from the web console. Verified retention and session-completion metrics are pending final sign-off with the client.',
    cmsResultPlaceholder: 'Pending verified retention or session-completion figure from client.',
    stack: ['React Native', 'Node.js', 'MySQL', 'AWS S3', 'iOS', 'Android'],
    imageAlt: 'Calm person meditating in a sunlit minimalist room beside a smartphone breath-pacer app',
    imageSubject: 'Meditation app interface',
    imageSrc: '/images/case-studies/personalized-meditation-platform.jpg',
  },
  {
    slug: 'property-management-platform',
    title: 'Property management platform',
    cardTitle: 'Property management platform',
    filterCategory: 'Logistics and mobility',
    client: 'Confidential residential operator',
    clientType: 'Multi-site residential operator',
    industry: 'Real estate & proptech',
    offering: 'Multi-property tenant, lease, and maintenance portal',
    approachSummary: 'Role-based workflows for landlords, managers, and tenants',
    resultLine: '[Result, verify with client]',
    challenge:
      'Property managers tracked rent schedules, lease renewals, and repair tickets across spreadsheets and email threads. Missed follow-ups delayed maintenance turnaround and made monthly accounting reconciliation slow.',
    approach:
      'We built a centralized web portal with unit-level lease records, automated rent reminders, and photo-attached maintenance tickets. Property managers assign contractors from one queue and export monthly statements directly.',
    resultBody:
      'Lease tracking, maintenance triage, and monthly statements were consolidated into one role-based workspace. Verified ticket-turnaround metrics are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified ticket-turnaround figure from client.',
    stack: ['PHP', 'MySQL', 'React', 'REST API', 'AWS'],
    imageAlt: 'Modern residential apartment courtyard at golden hour with property manager holding a tablet',
    imageSubject: 'Property lease dashboard',
    imageSrc: '/images/case-studies/property-management-platform.jpg',
  },
  {
    slug: 'logistics-marketplace',
    title: 'Logistics marketplace',
    cardTitle: 'Logistics marketplace',
    filterCategory: 'Logistics and mobility',
    client: 'Regional freight & carrier network',
    clientType: 'Regional freight brokerage',
    industry: 'Supply chain & logistics',
    offering: 'Carrier bidding and shipment dispatch web platform',
    approachSummary: 'Real-time load matching, quote comparison, and status tracking',
    resultLine: '[Result, verify with client]',
    challenge:
      'Shippers had to call multiple brokers to compare freight rates and confirm truck availability. Dispatchers lacked a shared view of active loads, pickup windows, and proof-of-delivery documents.',
    approach:
      'We developed a two-sided freight marketplace where shippers post lane requirements and vetted carriers submit itemized quotes. Automated status milestones and document uploads keep dispatchers and shippers aligned from pickup to delivery.',
    resultBody:
      'Shippers and carriers now exchange quotes and proof-of-delivery milestones in one dispatch board. Verified dispatch-speed metrics are pending client sign-off.',
    cmsResultPlaceholder: 'Pending verified dispatch-speed metric from client.',
    stack: ['Node.js', 'Angular', 'PostgreSQL', 'Google Maps API'],
    imageAlt: 'Freight logistics hub at dusk with docked semi-trucks and dispatcher reviewing routes on laptop',
    imageSubject: 'Freight dispatch marketplace',
    imageSrc: '/images/case-studies/logistics-marketplace.jpg',
  },
  {
    slug: 'digital-engagement-platform',
    title: 'Digital Engagement Platform',
    cardTitle: 'Digital engagement platform',
    filterCategory: 'Media and social',
    client: 'Enterprise retail & loyalty group',
    clientType: 'Enterprise retail group',
    industry: 'Marketing technology',
    offering: 'Omnichannel campaign and customer engagement suite',
    approachSummary: 'Segmented messaging workflows and campaign analytics',
    resultLine: '[Result, verify with client]',
    challenge:
      'Marketing teams managed email, SMS, and in-app promotions in disconnected tools, leading to duplicate messages and inconsistent reporting. They needed one workspace to schedule targeted campaigns and track redemptions.',
    approach:
      'We built a unified campaign builder with audience segmentation, scheduled multi-channel delivery, and coupon redemption tracking. Teams review open, click, and conversion metrics in one dashboard.',
    resultBody:
      'Campaign scheduling and redemption analytics now run from a single console across email, SMS, and mobile channels. Verified conversion figures are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified campaign-conversion metric from client.',
    stack: ['React', 'Node.js', 'MongoDB', 'Redis'],
    imageAlt: 'Marketing strategist at dual-monitor workstation reviewing campaign analytics and segmentation charts',
    imageSubject: 'Campaign engagement console',
    imageSrc: '/images/case-studies/digital-engagement-platform.jpg',
  },
  {
    slug: 'restaurant-credit-management',
    title: 'Restaurant credit management',
    cardTitle: 'Restaurant credit management',
    filterCategory: 'Hospitality',
    client: 'Hospitality dining network',
    clientType: 'Multi-venue hospitality group',
    industry: 'Food & hospitality',
    offering: 'Corporate dining credit and POS reconciliation portal',
    approachSummary: 'Prepaid account ledgers, staff allowances, and POS sync',
    resultLine: '[Result, verify with client]',
    challenge:
      'Corporate clients wanted to issue monthly dining allowances to employees across participating restaurants without paper vouchers. Accounting teams needed automated end-of-month settlement reports.',
    approach:
      'We created a credit management platform with configurable company allowances, QR-based POS redemption, and automated merchant settlement summaries.',
    resultBody:
      'Participating venues process corporate dining credits at the POS with automated monthly merchant reconciliation. Verified settlement-time metrics are pending client sign-off.',
    cmsResultPlaceholder: 'Pending verified settlement-time figure from client.',
    stack: ['PHP', 'MySQL', 'React Native', 'Stripe API'],
    imageAlt: 'Modern bistro counter where a patron taps a smartphone at a sleek POS terminal',
    imageSubject: 'Dining credit ledger',
    imageSrc: '/images/case-studies/restaurant-credit-management.jpg',
  },
  {
    slug: 'automotive-social-network',
    title: 'Automotive social network',
    cardTitle: 'Automotive social network',
    filterCategory: 'Media and social',
    client: 'Enthusiast & garage community',
    clientType: 'Automotive media community',
    industry: 'Automotive & community',
    offering: 'Web and mobile community for vehicle builds and events',
    approachSummary: 'Garage profiles, build logs, and local meetup directories',
    resultLine: '[Result, verify with client]',
    challenge:
      'Car enthusiasts lacked a dedicated place to document multi-stage vehicle builds, parts lists, and local track meetups without posts getting buried in general social feeds.',
    approach:
      'We built structured vehicle garage profiles, chronological build-log threads, and location-filtered event calendars on web and mobile.',
    resultBody:
      'Members publish structured build logs and discover regional events across web and mobile apps. Verified active-member figures are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified active-member figure from client.',
    stack: ['React Native', 'Node.js', 'MySQL', 'AWS'],
    imageAlt: 'Custom sports car in a well-lit private garage workshop with enthusiast photographing engine bay',
    imageSubject: 'Vehicle build community',
    imageSrc: '/images/case-studies/automotive-social-network.jpg',
  },
  {
    slug: 'personalized-digital-physiotherapy-platform',
    title: 'Personalized digital physiotherapy platform',
    cardTitle: 'Physiotherapy platform',
    filterCategory: 'Health',
    client: 'Outpatient rehab provider',
    clientType: 'Outpatient clinical network',
    industry: 'Healthcare & digital therapeutics',
    offering: 'Guided home exercise and clinician progress portal',
    approachSummary: 'Video-guided rehab plans and clinician adherence tracking',
    resultLine: '[Result, verify with client]',
    challenge:
      'Physical therapists could not verify whether patients completed home exercises accurately between clinic visits. Printed exercise sheets led to low adherence and slow recovery.',
    approach:
      'We delivered a patient mobile app with step-by-step exercise videos, daily pain check-ins, and a clinician portal to adjust rep targets based on logged progress.',
    resultBody:
      'Clinicians review daily patient exercise logs and update home rehab plans remotely between visits. Verified patient-adherence figures are pending client sign-off.',
    cmsResultPlaceholder: 'Pending verified patient-adherence metric from client.',
    stack: ['iOS', 'Android', 'Node.js', 'PostgreSQL'],
    imageAlt: 'Digital physiotherapy portal showing guided rehab exercises',
    imageSubject: 'Digital rehab exercise app',
    imageSrc: '/images/case-studies/personalized-digital-physiotherapy-platform.svg',
  },
  {
    slug: 'schedule-platform-for-kids',
    title: 'Schedule platform for kids',
    cardTitle: 'Schedule platform for kids',
    filterCategory: 'Education',
    client: 'After-school activity network',
    clientType: 'Youth education & enrichment network',
    industry: 'Education & family services',
    offering: 'Parent booking and class timetable web platform',
    approachSummary: 'Age-filtered activity discovery, calendar sync, and attendance',
    resultLine: '[Result, verify with client]',
    challenge:
      'Parents struggled to compare after-school classes across multiple local venues and manage overlapping pickup times. Activity providers needed an easier way to handle waitlists and attendance.',
    approach:
      'We built a family-friendly booking calendar with age-group filters, waitlist notifications, and instructor check-in rosters.',
    resultBody:
      'Families book age-matched classes in one timetable while instructors manage waitlists and attendance digitally. Verified booking-completion figures are pending client review.',
    cmsResultPlaceholder: 'Pending verified booking-completion metric from client.',
    stack: ['PHP', 'MySQL', 'Angular', 'Stripe'],
    imageAlt: 'Weekly family schedule and kids activity booking calendar',
    imageSubject: 'Kids activity calendar',
    imageSrc: '/images/case-studies/schedule-platform-for-kids.svg',
  },
  {
    slug: 'social-video-platform',
    title: 'Social video platform',
    cardTitle: 'Social video platform',
    filterCategory: 'Media and social',
    client: 'Creator media startup',
    clientType: 'Digital media startup',
    industry: 'Media & entertainment',
    offering: 'Short-form video upload, transcoding, and feed application',
    approachSummary: 'Adaptive bitrate streaming and creator moderation tools',
    resultLine: '[Result, verify with client]',
    challenge:
      'Creators needed fast mobile uploads and reliable playback across varying cellular connections, while moderators required a queue to review flagged clips quickly.',
    approach:
      'We implemented chunked video uploads, automated cloud transcoding into adaptive streams, and a real-time moderation dashboard.',
    resultBody:
      'Creators publish adaptive-bitrate short videos with automated transcoding and fast moderation triage. Verified playback-latency metrics are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified playback-latency metric from client.',
    stack: ['React Native', 'Node.js', 'FFmpeg', 'AWS CloudFront'],
    imageAlt: 'Content creator filming short-form video in home studio with softbox light and monitor',
    imageSubject: 'Creator video feed',
    imageSrc: '/images/case-studies/social-video-platform.jpg',
  },
  {
    slug: 'insurance-portal-for-companies',
    title: 'Insurance portal for companies',
    cardTitle: 'Insurance portal for companies',
    filterCategory: 'Health',
    client: 'Commercial benefits brokerage',
    clientType: 'Commercial benefits brokerage',
    industry: 'Insurtech & financial services',
    offering: 'Corporate policy enrollment and claims tracking portal',
    approachSummary: 'Employee roster sync, plan comparison, and claim status views',
    resultLine: '[Result, verify with client]',
    challenge:
      'HR teams spent hours emailing PDFs to enroll new hires and check claim statuses across carriers. Employees lacked a clear breakdown of coverage tiers.',
    approach:
      'We built a multi-tenant benefits portal where HR uploads employee rosters, compares carrier plans side by side, and tracks active claims in one place.',
    resultBody:
      'HR teams manage roster enrollments and active claim statuses across carriers from one portal. Verified enrollment-time figures are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified enrollment-time figure from client.',
    stack: ['.NET', 'SQL Server', 'React', 'Azure'],
    imageAlt: 'Corporate HR specialist reviewing employee benefits coverage plans on laptop with colleague',
    imageSubject: 'Corporate benefits portal',
    imageSrc: '/images/case-studies/insurance-portal-for-companies.jpg',
  },
  {
    slug: 'indigent-defense-management-platform',
    title: 'Indigent defense management platform',
    cardTitle: 'Indigent defense management platform',
    filterCategory: 'Education',
    client: 'Public defense legal agency',
    clientType: 'Public sector legal agency',
    industry: 'Legal & public sector',
    offering: 'Case assignment, conflict check, and court docket system',
    approachSummary: 'Automated conflict screening and attorney workload balancing',
    resultLine: '[Result, verify with client]',
    challenge:
      'Public defense coordinators assigned cases manually, risking representation conflicts and uneven caseloads across attorneys.',
    approach:
      'We built a case management system with automated party conflict checks, court date reminders, and balanced attorney assignment queues.',
    resultBody:
      'Coordinators run automated conflict screening before case assignment and balance caseloads across attorneys. Verified assignment-accuracy metrics are pending client review.',
    cmsResultPlaceholder: 'Pending verified assignment-accuracy metric from client.',
    stack: ['PHP', 'PostgreSQL', 'React', 'AWS GovCloud'],
    imageAlt: 'Public defense attorney at mahogany desk in law library reviewing court docket on laptop',
    imageSubject: 'Legal defense docket system',
    imageSrc: '/images/case-studies/indigent-defense-management-platform.jpg',
  },
  {
    slug: 'head-injury-monitoring-apps',
    title: 'Head injury monitoring apps',
    cardTitle: 'Head injury monitoring apps',
    filterCategory: 'Health',
    client: 'Youth sports safety initiative',
    clientType: 'Youth athletics organization',
    industry: 'Sports & healthcare',
    offering: 'Sideline concussion screening and recovery log apps',
    approachSummary: 'Structured sideline checklists and return-to-play clearance',
    resultLine: '[Result, verify with client]',
    challenge:
      'Coaches and athletic trainers needed a reliable offline-capable tool on the sidelines to log suspected head impacts and notify parents and physicians.',
    approach:
      'We developed iOS and Android apps with offline symptom checklists, timestamped incident logs, and physician sign-off workflows for return-to-play clearance.',
    resultBody:
      'Athletic trainers log sideline screening checklists offline and route recovery clearances to physicians. Verified incident-logging metrics are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified incident-logging metric from client.',
    stack: ['iOS', 'Android', 'Node.js', 'MySQL'],
    imageAlt: 'Sideline concussion screening checklist on mobile tablet',
    imageSubject: 'Sideline injury screening app',
    imageSrc: '/images/case-studies/head-injury-monitoring-apps.svg',
  },
  {
    slug: 'multi-channel-multi-vendor-ecommerce-marketplace',
    title: 'Multi-channel, multi-vendor e-commerce marketplace',
    cardTitle: 'Multi-vendor e-commerce marketplace',
    filterCategory: 'Hospitality',
    client: 'Specialty retail collective',
    clientType: 'Multi-merchant retail group',
    industry: 'E-commerce & retail',
    offering: 'Vendor storefront, inventory sync, and split-payout platform',
    approachSummary: 'Unified catalog indexing and automated vendor payouts',
    resultLine: '[Result, verify with client]',
    challenge:
      'Independent merchants needed to sell on one shared marketplace while keeping inventory synchronized with their existing warehouse stock.',
    approach:
      'We built a multi-vendor marketplace with per-seller inventory feeds, unified cart checkout, and automated split payouts.',
    resultBody:
      'Merchants sync warehouse inventory feeds automatically while buyers check out across vendors in one cart. Verified GMV and order-volume figures are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified GMV or order-volume metric from client.',
    stack: ['PHP', 'MySQL', 'React', 'Elasticsearch', 'Stripe Connect'],
    imageAlt: 'Boutique fulfillment studio with seller packing parcels beside barcode scanner and laptop',
    imageSubject: 'Multi-vendor marketplace',
    imageSrc: '/images/case-studies/multi-channel-multi-vendor-ecommerce-marketplace.jpg',
  },
  {
    slug: 'online-food-ordering-and-delivery-app',
    title: 'Online food ordering and delivery app',
    cardTitle: 'Online food ordering and delivery app',
    filterCategory: 'Hospitality',
    client: 'Multi-restaurant delivery operator',
    clientType: 'Regional restaurant group',
    industry: 'Food & on-demand delivery',
    offering: 'Customer ordering app, kitchen tablet, and driver dispatch',
    approachSummary: 'Live menu availability, zone pricing, and courier routing',
    resultLine: '[Result, verify with client]',
    challenge:
      'Local restaurants wanted a branded ordering and courier dispatch system without losing margins to third-party aggregator fees.',
    approach:
      'We built customer iOS and Android ordering apps paired with kitchen order tablets and live driver route tracking.',
    resultBody:
      'Restaurants receive orders directly on kitchen tablets and dispatch couriers with live route tracking. Verified delivery-time figures are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified delivery-time metric from client.',
    stack: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
    imageAlt: 'Restaurant pass counter with sealed takeout bags, kitchen order tablet, and delivery courier',
    imageSubject: 'Food ordering and delivery app',
    imageSrc: '/images/case-studies/online-food-ordering-and-delivery-app.jpg',
  },
  {
    slug: 'cash-back-and-deal-portal',
    title: 'Cash back and deal portal',
    cardTitle: 'Cash back and deal portal',
    filterCategory: 'Hospitality',
    client: 'Consumer rewards publisher',
    clientType: 'Consumer fintech publisher',
    industry: 'Affiliate & fintech',
    offering: 'Merchant offer directory and automated cashback ledger',
    approachSummary: 'Affiliate network webhook ingestion and payout thresholds',
    resultLine: '[Result, verify with client]',
    challenge:
      'Shoppers abandoned rewards sites when cashback tracking took weeks to appear or payout rules were unclear.',
    approach:
      'We integrated affiliate network postbacks to credit pending rewards automatically and added transparent payout tracking for members.',
    resultBody:
      'Affiliate postbacks update member cashback balances automatically with transparent payout thresholds. Verified payout-accuracy figures are pending client review.',
    cmsResultPlaceholder: 'Pending verified payout-accuracy metric from client.',
    stack: ['PHP', 'MySQL', 'React', 'Redis'],
    imageAlt: 'Shopper in a bright cafe holding coffee cup and smartphone with retail shopping bags',
    imageSubject: 'Cashback deal portal',
    imageSrc: '/images/case-studies/cash-back-and-deal-portal.jpg',
  },
  {
    slug: 'online-printing-website',
    title: 'Online printing website',
    cardTitle: 'Online printing website',
    filterCategory: 'Logistics and mobility',
    client: 'Commercial print & signage house',
    clientType: 'Commercial print manufacturer',
    industry: 'Print & manufacturing',
    offering: 'Custom print configurator and pre-press proof portal',
    approachSummary: 'Instant price matrix, bleed validation, and job tracking',
    resultLine: '[Result, verify with client]',
    challenge:
      'Customers frequently uploaded low-resolution artwork or wrong trim dimensions, forcing pre-press staff to email back and forth before printing.',
    approach:
      'We built an interactive print configurator with automated DPI and bleed checks plus instant PDF proof approval.',
    resultBody:
      'Buyers validate DPI, trim, and bleed online and approve instant PDF proofs before press scheduling. Verified pre-press rework figures are pending client confirmation.',
    cmsResultPlaceholder: 'Pending verified pre-press rework figure from client.',
    stack: ['PHP', 'MySQL', 'React', 'ImageMagick'],
    imageAlt: 'Commercial print shop floor with technician inspecting printed brochure over calibration swatches',
    imageSubject: 'Print configurator portal',
    imageSrc: '/images/case-studies/online-printing-website.jpg',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((item) => item.slug === slug);
}
