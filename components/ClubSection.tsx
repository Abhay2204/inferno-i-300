import React, { useMemo } from 'react';
import { Users, Trophy, Headphones, Zap, Star, Gift, Crown, ArrowRight } from 'lucide-react';

const ClubSection: React.FC = React.memo(() => {
  const benefits = useMemo(() => [
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Exclusive Access",
      description: "Early access to new products, limited editions, and beta features before anyone else"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Member Rewards",
      description: "Earn points on every purchase, unlock special discounts and exclusive merchandise"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Priority Support",
      description: "Dedicated VIP support line with 24/7 access and faster response times"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Events",
      description: "Join exclusive tournaments, gaming sessions, and connect with pro gamers"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Special Perks",
      description: "Birthday surprises, anniversary gifts, and personalized recommendations"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Beta Testing",
      description: "Test new features and products before launch and shape the future of Inferno"
    }
  ], []);

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-32 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-mono text-gray-900 uppercase tracking-widest">
              Inferno Club
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Join the Elite
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Become part of our exclusive community and unlock premium benefits, 
            early access, and connect with gamers worldwide.
          </p>
          
          <button className="group px-10 py-5 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-all flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl">
            <span className="text-lg">Join Now - Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 50,000+ members worldwide
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-white">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-black rounded-3xl p-12 md:p-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to level up?
          </h3>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of gamers who are already part of the Inferno Club
          </p>
          <button className="px-10 py-5 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg">
            Create Your Account
          </button>
        </div>
      </div>
    </section>
  );
});

ClubSection.displayName = 'ClubSection';

export default ClubSection;
