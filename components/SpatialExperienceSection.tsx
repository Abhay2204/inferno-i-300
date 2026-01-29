import React, { useRef, useEffect } from 'react';

const SpatialExperienceSection: React.FC = React.memo(() => {
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
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Video Background - Optimized */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <source src="/assets/spatial 3d.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center h-full text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3 drop-shadow-lg">
            Spatial 3D Gaming Experience
          </h2>
          <p className="text-sm md:text-base text-gray-300 font-light tracking-wide drop-shadow-lg">
            IMMERSIVE AUDIO TECHNOLOGY
          </p>
        </div>

        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
          Experience three-dimensional audio precision with pinpoint accuracy.
          <br />
          Every sound positioned exactly where it belongs.
        </p>
      </div>
    </section>
  );
});

SpatialExperienceSection.displayName = 'SpatialExperienceSection';

export default SpatialExperienceSection;
