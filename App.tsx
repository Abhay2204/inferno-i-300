import React, { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { AuraColor } from './types';
import HeadsetVisual from './components/HeadsetVisual';
import AuraBackground from './components/AuraBackground';
import BackgroundGrid from './components/BackgroundGrid';
import Section from './components/Section';
import Cursor from './components/Cursor';
import Soundwave from './components/Soundwave';
import MagneticButton from './components/MagneticButton';
import SplashScreen from './components/SplashScreen';
import ExplodedView from './components/ExplodedView';
import SpatialExperienceSection from './components/SpatialExperienceSection';
import ProductSection from './components/ProductSection';
import WaitlistSection from './components/WaitlistSection';
import ClubSection from './components/ClubSection';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { Menu, Radio, BatteryCharging, Disc } from 'lucide-react';

const sections = [
  {
    id: 'hero',
    title: "Ghost In The Machine",
    subtitle: "System_Init",
    description: "The Inferno i-300 isn't just a headset. It's an extension of your neural pathways. Pure, unadulterated audio integration designed for the elite.",
    alignment: 'left' as const,
    auraColor: AuraColor.WHITE
  },
  {
    id: 'anc',
    title: "Absolute Silence",
    subtitle: "Isolation_Mode",
    description: "Proprietary AI-driven inverse frequencies eliminate 99.9% of external chaos. Step into the void where only your signal exists.",
    alignment: 'left' as const,
    auraColor: AuraColor.BLUE
  },
  {
    id: 'spatial',
    title: "Spatial Awareness",
    subtitle: "360_Tracking",
    description: "Experience sound as a physical dimension. Enemy footsteps, distant rain, tactical reloading—all pinpointed in accurate 3D space.",
    alignment: 'right' as const,
    auraColor: AuraColor.PURPLE
  },
  {
    id: 'drivers',
    title: "Titanium Core",
    subtitle: "Hardware_Spec",
    description: "50mm custom-tuned titanium drivers deliver bass that hits like a shockwave and highs as sharp as a laser. Precision engineering.",
    alignment: 'left' as const,
    auraColor: AuraColor.RED
  },
  {
    id: 'latency',
    title: "Zero Latency",
    subtitle: "Lightspeed_Link",
    description: "Faster than thought. Our proprietary Lightspeed protocol ensures your reaction time is the only variable that matters.",
    alignment: 'split' as const,
    auraColor: AuraColor.CYAN
  }
];

const App: React.FC = () => {
  const [currentAura, setCurrentAura] = useState<AuraColor>(AuraColor.WHITE);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.round(latest * 100));
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-white text-black cursor-none">
      <Cursor />
      <Navigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <AuraBackground color={currentAura} />
      <BackgroundGrid />
      
      {/* ---------------- Fixed UI Layer (HUD) ---------------- */}
      
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 pointer-events-none mix-blend-difference text-white">
        <div className="flex flex-col gap-1">
            <div className="text-2xl font-black tracking-tighter pointer-events-auto uppercase">Inferno i-300</div>
            <div className="flex items-center gap-2 text-[10px] font-mono opacity-80">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                SYSTEM ONLINE
            </div>
        </div>
        <MagneticButton className="pointer-events-auto group">
            <div 
              onClick={() => setMenuOpen(true)}
              className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-colors cursor-pointer"
            >
                <Menu className="w-6 h-6" />
            </div>
        </MagneticButton>
      </header>

      {/* Side Status Bar */}
      <div className="fixed top-0 right-0 h-full w-24 hidden lg:flex flex-col items-center justify-center gap-8 z-40 border-l border-black/5 pointer-events-none mix-blend-multiply">
          <div className="rotate-90 text-[10px] font-mono tracking-widest text-gray-400 w-32 text-center">
              SCROLL STATUS
          </div>
          <div className="h-32 w-[1px] bg-black/10 relative overflow-hidden">
             <div 
               className="absolute top-0 left-0 w-full bg-black transition-all duration-100"
               style={{ height: `${progress}%` }}
             />
          </div>
          <div className="rotate-90 text-[10px] font-mono font-bold">
              {progress.toString().padStart(3, '0')}%
          </div>
      </div>

      {/* Bottom Technical Bar */}
      <div className="fixed bottom-0 left-0 w-full p-6 md:p-10 flex justify-between items-end z-40 pointer-events-none mix-blend-difference text-white">
         <div className="flex gap-8 font-mono text-[10px]">
            <div className="flex items-center gap-2">
                <Radio className="w-3 h-3" />
                <span>FREQ: 2.4GHZ</span>
            </div>
            <div className="flex items-center gap-2">
                <BatteryCharging className="w-3 h-3" />
                <span>PWR: 98%</span>
            </div>
            <div className="flex items-center gap-2">
                <Disc className="w-3 h-3" />
                <span>DRVR: 50MM</span>
            </div>
         </div>
      </div>

      <Soundwave />

      {/* ---------------- Fixed Visual Layer ---------------- */}
      <HeadsetVisual />

      {/* ---------------- Scrolling Content Layer ---------------- */}
      <main id="scroll-container" className="relative w-full z-10">
         <div className="w-full h-[20vh]" /> {/* Intro Buffer */}
         
         {sections.map((section, index) => (
           <Section
             key={section.id}
             index={index}
             {...section}
             onInView={setCurrentAura}
           />
         ))}
         
         <div className="h-[50vh]" /> {/* Outro Buffer */}
      </main>

      {/* ---------------- Exploded View Section ---------------- */}
      <ExplodedView />

      {/* ---------------- Spatial Experience Section ---------------- */}
      <SpatialExperienceSection />

      {/* ---------------- Product Section ---------------- */}
      <div id="products">
        <ProductSection />
      </div>

      {/* ---------------- Waitlist Section - Removed duplicate, form integrated into ProductSection ---------------- */}
      {/* <div id="waitlist">
        <WaitlistSection />
      </div> */}

      {/* ---------------- Club Section ---------------- */}
      <div id="club">
        <ClubSection />
      </div>

      {/* ---------------- Footer ---------------- */}
      <Footer />
    </div>
  );
};

export default App;