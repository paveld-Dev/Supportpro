export interface LocationMarker {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
  size?: number;
}

export interface GlobeAvatarPin {
  id: string;
  name: string;
  role: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  avatar: string;
  fallbackAvatar: string;
  borderColor: string;
  glowColor: string;
  isHQ?: boolean;
}

/**
 * Global team avatar pins distributed across the globe, matching SupportPRO's
 * 24/7 global follow-the-sun support infrastructure and the reference globe designs.
 */
export const GLOBE_AVATAR_PINS: GlobeAvatarPin[] = [
  // 1. London / EMEA Node (Top-right, Royal Blue border - matches reference image)
  {
    id: 'pin-london',
    name: 'David Chen',
    role: 'Infrastructure Architect',
    city: 'London',
    country: 'UK Hub',
    lat: 51.5074,
    lng: -0.1278,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/eric.jpg',
    borderColor: '#3B82F6', // Royal Electric Blue
    glowColor: 'rgba(59, 130, 246, 0.85)',
  },
  // 2. Chicago Global Headquarters (Center-left, Amber/Orange border - matches reference image)
  {
    id: 'pin-chicago',
    name: 'Sarah Miller',
    role: 'Director of Global Operations',
    city: 'Chicago, IL',
    country: 'USA (HQ)',
    lat: 41.8781,
    lng: -87.6298,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/tywit.jpg',
    borderColor: '#F59E0B', // Golden Amber / Brand Orange
    glowColor: 'rgba(245, 158, 11, 0.85)',
    isHQ: true,
  },
  // 3. West Coast / Pacific Node (Top-left, Purple border - matches reference image)
  {
    id: 'pin-west-coast',
    name: 'Lucas Vance',
    role: 'Cloud Security Lead',
    city: 'San Francisco',
    country: 'US West',
    lat: 45.0000,
    lng: -125.0000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/managed.jpg',
    borderColor: '#A855F7', // Electric Violet / Purple
    glowColor: 'rgba(168, 85, 247, 0.8)',
  },
  // 4. São Paulo / Latin America Node (Bottom-center, Emerald Green border - matches reference image)
  {
    id: 'pin-saopaulo',
    name: 'Camila Mendes',
    role: 'NOC Incident Response Lead',
    city: 'São Paulo',
    country: 'LATAM Hub',
    lat: -23.5505,
    lng: -46.6333,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/saas.jpg',
    borderColor: '#10B981', // Emerald Mint Green
    glowColor: 'rgba(16, 185, 129, 0.85)',
  },
  // 5. West/Central Africa Node (Mid-right, Purple border - matches reference image)
  {
    id: 'pin-africa',
    name: 'Amara Okafor',
    role: 'Senior Compliance Engineer',
    city: 'Lagos',
    country: 'West Africa',
    lat: 6.5244,
    lng: 15.0000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/msp.jpg',
    borderColor: '#A855F7', // Bright Purple
    glowColor: 'rgba(168, 85, 247, 0.8)',
  },
  // 6. Cape Town / South Africa Node (Bottom-right, Crimson Rose border - matches reference image)
  {
    id: 'pin-south-africa',
    name: 'Alexander Cole',
    role: '24/7 DevOps Systems Lead',
    city: 'Cape Town',
    country: 'South Africa',
    lat: -33.9249,
    lng: 18.4241,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/eric.jpg',
    borderColor: '#F43F5E', // Crimson Rose
    glowColor: 'rgba(244, 63, 94, 0.8)',
  },
  // 7. South India Offshore Delivery Centre (Rotates into view)
  {
    id: 'pin-south-india',
    name: 'Priya Sharma',
    role: 'Lead CloudOps Specialist',
    city: 'South India Hub',
    country: 'India',
    lat: 18.5204,
    lng: 78.8567,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/tywit.jpg',
    borderColor: '#FF8101', // SupportPRO Brand Orange
    glowColor: 'rgba(255, 129, 1, 0.85)',
  },
  // 8. East Asia / Tokyo Node (Rotates into view)
  {
    id: 'pin-east-asia',
    name: 'Kenji Takahashi',
    role: 'Senior SRE & Cloud Architect',
    city: 'Tokyo',
    country: 'Japan Hub',
    lat: 35.6762,
    lng: 139.6503,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/toby.jpg',
    borderColor: '#3B82F6', // Royal Electric Blue
    glowColor: 'rgba(59, 130, 246, 0.85)',
  },
  // 9. Sydney / Australia Node (Rotates into view)
  {
    id: 'pin-sydney',
    name: 'Marcus Vance',
    role: '24/7 Enterprise Support Lead',
    city: 'Sydney',
    country: 'Australia',
    lat: -33.8688,
    lng: 151.2093,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
    fallbackAvatar: '/avatars/managed.jpg',
    borderColor: '#F43F5E', // Coral Crimson
    glowColor: 'rgba(244, 63, 94, 0.8)',
  },
];

export const SUPPORTPRO_LOCATIONS: LocationMarker[] = [
  {
    id: 'chicago-hq',
    name: 'Global Headquarters',
    city: 'Chicago, IL',
    country: 'USA',
    lat: 41.8781,
    lng: -87.6298,
    isHQ: true,
    size: 0.08,
  },
];
