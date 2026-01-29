import React from 'react';
import { ArrowRight } from 'lucide-react';

const ClubSection: React.FC = React.memo(() => {
  return (
    <section className="relative bg-white py-40 px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-32 text-center">
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-black mb-12 tracking-tight leading-none">
            Inferno Club
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-12">
            Exclusive community for elite gamers
          </p>
          
          <button className="group px-12 py-6 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-colors inline-flex items-center gap-3">
            <span>Join Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Benefits - Simple List */}
        <div className="space-y-1 border-t border-black">
          <div className="flex items-center justify-between py-8 border-b border-black/10 hover:bg-black/5 transition-colors px-6">
            <span className="text-2xl font-bold text-black">Exclusive Access</span>
            <span className="text-sm text-gray-500">Early product releases</span>
          </div>
          
          <div className="flex items-center justify-between py-8 border-b border-black/10 hover:bg-black/5 transition-colors px-6">
            <span className="text-2xl font-bold text-black">Member Rewards</span>
            <span className="text-sm text-gray-500">Points & discounts</span>
          </div>
          
          <div className="flex items-center justify-between py-8 border-b border-black/10 hover:bg-black/5 transition-colors px-6">
            <span className="text-2xl font-bold text-black">Priority Support</span>
            <span className="text-sm text-gray-500">24/7 VIP line</span>
          </div>
          
          <div className="flex items-center justify-between py-8 border-b border-black/10 hover:bg-black/5 transition-colors px-6">
            <span className="text-2xl font-bold text-black">Elite Events</span>
            <span className="text-sm text-gray-500">Tournaments & sessions</span>
          </div>
          
          <div className="flex items-center justify-between py-8 border-b border-black/10 hover:bg-black/5 transition-colors px-6">
            <span className="text-2xl font-bold text-black">Special Perks</span>
            <span className="text-sm text-gray-500">Gifts & rewards</span>
          </div>
          
          <div className="flex items-center justify-between py-8 border-b border-black hover:bg-black/5 transition-colors px-6">
            <span className="text-2xl font-bold text-black">Beta Testing</span>
            <span className="text-sm text-gray-500">Shape the future</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-32 flex justify-between items-center border-t border-black pt-12">
          <div>
            <p className="text-5xl font-black text-black mb-2">50,000+</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Members</p>
          </div>
          <div>
            <p className="text-5xl font-black text-black mb-2">100+</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Events</p>
          </div>
          <div>
            <p className="text-5xl font-black text-black mb-2">24/7</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
});

ClubSection.displayName = 'ClubSection';

export default ClubSection;
