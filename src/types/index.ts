// MGWBL TypeScript Definitions

export interface SectionProps {
  id?: string;
  className?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export interface LeadershipMember {
  name: string;
  title: string;
  image?: string;
}

export interface BrewingStage {
  id: string;
  name: string;
  description: string;
  icon?: string;
  scrollStart: number;
  scrollEnd: number;
}

export interface CameraWaypoint {
  position: [number, number, number];
  lookAt: [number, number, number];
  label: string;
}

export interface SoundConfig {
  ambient: string;
  effects: Record<string, string>;
  volume: number;
  muted: boolean;
}
