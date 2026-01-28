import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Headphones, Radio } from 'lucide-react';

const WaitlistSection: React.FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Pause video when not in view to save resources
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay might be blocked, that's okay
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Side - Video */}
        <div className="relative h-[50vh] lg:h-screen overflow-hidden">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            <source src="/assets/new new.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 lg:to-black will-change-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden will-change-transform" />
        </div>

        {/* Right Side - Content */}
        <div className="relative flex items-center justify-center px-8 md:px-16 py-20 lg:py-0">
          <div className="max-w-xl w-full">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-8 will-change-transform">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-mono text-orange-500 uppercase tracking-widest">
                  Coming Soon
                </span>
              </div>

              {/* Title */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-none">
                Inferno Ultra
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  Gaming X
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                The next evolution in competitive gaming audio. Experience unparalleled precision, comfort, and performance.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center will-change-transform">
                    <Headphones className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-base">Next-gen spatial audio technology</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center will-change-transform">
                    <Radio className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-base">Ultra-low latency wireless connection</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center will-change-transform">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-base">50+ hour battery life</span>
                </div>
              </div>

              {/* Waitlist Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors will-change-transform"
                  />
                  <button
                    type="submit"
                    disabled={submitted}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2 disabled:from-green-500 disabled:to-green-600 whitespace-nowrap will-change-transform"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Joined!</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Be the first to know when pre-orders open. No spam, ever.
                </p>
              </form>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">2.4K+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">On Waitlist</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">Q2 2026</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Launch Date</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">$599</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Est. Price</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

WaitlistSection.displayName = 'WaitlistSection';

export default WaitlistSection;
