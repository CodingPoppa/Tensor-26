import React from 'react';
import Hero from '../components/sections/Hero';
import ProductOverview from '../components/sections/ProductOverview';
import ArchitectureIntegration from '../components/sections/ArchitectureIntegration';
import CustomCursor from '../components/ui/CustomCursor';

export default function LandingPage() {
  return (
    <>
      <CustomCursor />
      <main>
        <Hero />
        <ProductOverview />
        <ArchitectureIntegration />
      </main>
    </>
  );
}
