import { Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../Hustler/Header/findWork/SearchIcon";

export default function KnowOrganisations() {
  const [searchInput, setSearchInput] = useState("");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchGigs();
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, [searchInput]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const fetchGigs = async () => {
    console.log("Fetching gigs with search input:", searchInput);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchInput.trim() !== "") {
      await fetchGigs();
      setSearchInput("");
    }
  };

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white pt-20">
      {/* Hero Section */}
      <section 
        id="hero"
        ref={setSectionRef('hero')}
        className="relative py-20 px-6 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slideUp">
              Find perfect <span className="text-green-300 animate-pulse">organisations</span><br />
              you are looking for
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed animate-slideUp animation-delay-300">
              Discover and connect with organizations that align with your vision and goals
            </p>
          </div>
          
          {/* Enhanced Search Section */}
          <div className="max-w-2xl mx-auto mb-16 animate-slideUp animation-delay-600">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <Input
                classNames={{
                  base: "w-full", 
                  mainWrapper: "h-14",
                  input: "text-lg text-white placeholder:text-gray-300",
                  inputWrapper: "h-full font-normal bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300",
                }}
                placeholder="Search for organizations, teams, or opportunities..."
                size="lg"
                startContent={<SearchIcon size={24} className="text-green-300" />}
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* Proposed Solution Section */}
        <section 
          id="solution"
          ref={setSectionRef('solution')}
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.has('solution') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Our <span className="text-green-300">Proposed Solution</span>
            </h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-green-100 leading-relaxed">
                By focusing on India's rapidly growing freelance market, we provide cutting-edge tools and unprecedented opportunities to help freelancers compete on a global scale and establish themselves as industry leaders.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Sections Grid */}
        <div 
          id="features"
          ref={setSectionRef('features')}
          className={`grid lg:grid-cols-2 gap-12 mb-20 transition-all duration-1000 ${
            visibleSections.has('features') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Organisations Feature */}
          <div className="bg-gradient-to-br from-green-600/10 to-green-400/5 rounded-3xl p-8 border border-green-400/20 hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-slideLeft">
            <h3 className="text-3xl font-bold mb-6 text-green-300">
              Organisations Feature
            </h3>
            <p className="text-lg text-green-100 leading-relaxed mb-6">
              High-rated freelancers can create teams and invite others, forming small business units. New freelancers gain experience by collaborating within these teams, benefitting from mentorship and bypassing early challenges.
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl font-bold text-green-300 mb-1 animate-bounce">500+</div>
              <div className="text-sm text-green-100">Active Organizations</div>
            </div>
          </div>

          {/* AI-Enabled Insights */}
          <div className="bg-gradient-to-br from-blue-600/10 to-blue-400/5 rounded-3xl p-8 border border-blue-400/20 hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-slideRight">
            <h3 className="text-3xl font-bold mb-6 text-blue-300">
              AI-Enabled Insights
            </h3>
            <p className="text-lg text-green-100 leading-relaxed mb-6">
              Advanced search and analytics capabilities, powered by AI, allow for personalized recommendations and data-driven decision-making for both freelancers and employers.
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-300 mb-1 animate-bounce">95%</div>
              <div className="text-sm text-green-100">Match Accuracy</div>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <section 
          id="payment"
          ref={setSectionRef('payment')}
          className={`transition-all duration-1000 ${
            visibleSections.has('payment') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Multiple <span className="text-green-300">Payment Methods</span>
            </h2>
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="text-lg md:text-xl text-green-100 leading-relaxed">
                Secure payment options including escrow accounts and milestone payments ensure transparent and fair financial transactions for all parties involved.
              </p>
            </div>
            
            {/* Payment Features */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Escrow Protection", desc: "Secure fund holding until project completion" },
                { title: "Milestone Payments", desc: "Pay as you go with project milestones" },
                { title: "Multiple Currencies", desc: "Support for various international currencies" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slideUp"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h4 className="text-xl font-semibold mb-3 text-green-300">{item.title}</h4>
                  <p className="text-green-100 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-slideLeft {
          animation: slideLeft 0.8s ease-out;
        }
        
        .animate-slideRight {
          animation: slideRight 0.8s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}