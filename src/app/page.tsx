'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import SoundProvider from '@/providers/SoundProvider';

// Dynamic imports for code splitting
const LoadingExperience = dynamic(
  () => import('@/components/loading/LoadingExperience'),
  { ssr: false }
);

const BreweryScene = dynamic(
  () => import('@/components/three/BreweryScene'),
  { ssr: false }
);

const Navigation = dynamic(
  () => import('@/components/layout/Navigation'),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import('@/components/layout/CustomCursor'),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import('@/components/layout/ScrollProgress'),
  { ssr: false }
);

const SoundToggle = dynamic(
  () => import('@/components/layout/SoundToggle'),
  { ssr: false }
);

const Footer = dynamic(
  () => import('@/components/layout/Footer'),
  { ssr: false }
);

// Sections
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false });
const CompanyStory = dynamic(() => import('@/components/sections/CompanyStory'), { ssr: false });
const Timeline = dynamic(() => import('@/components/sections/Timeline'), { ssr: false });
const BrewingProcess = dynamic(() => import('@/components/sections/BrewingProcess'), { ssr: false });
const Infrastructure = dynamic(() => import('@/components/sections/Infrastructure'), { ssr: false });
const QualityControl = dynamic(() => import('@/components/sections/QualityControl'), { ssr: false });
const CarlsbergPartnership = dynamic(() => import('@/components/sections/CarlsbergPartnership'), { ssr: false });
const Sustainability = dynamic(() => import('@/components/sections/Sustainability'), { ssr: false });
const Leadership = dynamic(() => import('@/components/sections/Leadership'), { ssr: false });
const Careers = dynamic(() => import('@/components/sections/Careers'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <SoundProvider>
      <SmoothScrollProvider>
        {/* Loading Experience */}
        {!isLoaded && <LoadingExperience onComplete={handleLoadComplete} />}

        {/* Custom Cursor (desktop only) */}
        <CustomCursor />

        {/* Navigation */}
        <Navigation />

        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Sound Toggle */}
        <SoundToggle />

        {/* 3D Brewery Scene — fixed background */}
        <BreweryScene />

        {/* Scrollable Content Overlay */}
        <div id="scroll-container" className="content-overlay">
          <HeroSection id="hero" />
          <CompanyStory id="company" />
          <Timeline id="timeline" />
          <BrewingProcess id="process" />
          <Infrastructure id="infrastructure" />
          <QualityControl id="quality" />
          <CarlsbergPartnership id="partnership" />
          <Sustainability id="sustainability" />
          <Leadership id="leadership" />
          <Careers id="careers" />
          <Contact id="contact" />
          <Footer />
        </div>
      </SmoothScrollProvider>
    </SoundProvider>
  );
}
