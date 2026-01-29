import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const ProductSection: React.FC = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Play video only when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay might be blocked
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="relative bg-black min-h-screen flex items-center"
    >
      <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Video - Optimized for performance */}
          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              style={{ 
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              <source src="/assets/new new.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Right - Content */}
          <div className="text-white space-y-8">
            <div>
              <p className="text-sm font-mono text-gray-400 mb-4 tracking-widest uppercase">
                Ultra Gaming Experience
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                Inferno Ultra Gaming X
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                The ultimate gaming headset engineered for champions. Experience unmatched audio clarity, 
                zero-latency wireless, and all-day comfort in one revolutionary package.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <h3 className="text-lg font-bold mb-1">50mm Titanium Drivers</h3>
                  <p className="text-gray-400">Crystal-clear audio with deep bass response</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Active Noise Cancellation</h3>
                  <p className="text-gray-400">Block out distractions, focus on victory</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <h3 className="text-lg font-bold mb-1">30-Hour Battery Life</h3>
                  <p className="text-gray-400">Game all day without interruption</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <span>Pre-Order Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Starting at $399 • Ships Q2 2026
            </p>
          </div>

        </div>
      </div>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';

export default ProductSection;
