import { Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../Hustler/Header/findWork/SearchIcon";

export default function KnowHustler() {
  const [searchInput, setSearchInput] = useState("");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchGigs();
    }, 5000); // Fetch gigs every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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
    // Your fetch logic here
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
              Find the perfect freelance<br />
              <span className="text-green-300 animate-pulse">Job for your Profile</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed animate-slideUp animation-delay-300">
              Connect with opportunities that match your skills and grow your freelance career
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
                placeholder="Search for opportunities, skills, or questions..."
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
        {/* About Us Section */}
        <section 
          id="about"
          ref={setSectionRef('about')}
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.has('about') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              About <span className="text-green-300">Hustler</span>
            </h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-green-100 leading-relaxed">
                Hustler is a cutting-edge platform designed to bridge the gap between talented freelancers and forward-thinking clients. Whether you're a freelancer seeking your next breakthrough opportunity or a client in need of exceptional skilled professionals, Hustler provides the seamless connection you need to succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section 
          id="mission"
          ref={setSectionRef('mission')}
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.has('mission') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideLeft">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-green-300">Mission</span>
              </h2>
              <p className="text-lg md:text-xl text-green-100 leading-relaxed">
                Our mission is to create a thriving ecosystem where freelancers can showcase their expertise and clients can discover the perfect match for their projects. We believe in the transformative power of collaboration and strive to provide a platform that fosters innovation, growth, and success for everyone involved.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-2xl p-8 border border-green-400/30 hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-slideRight">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-300 mb-2 animate-bounce">10K+</div>
                <div className="text-lg text-green-100">Active Freelancers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Hustler Section */}
        <section 
          id="features"
          ref={setSectionRef('features')}
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.has('features') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Why Choose <span className="text-green-300">Hustler?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Skilled Talent", desc: "Access to a diverse pool of verified, skilled freelancers" },
              { title: "Easy Platform", desc: "Intuitive interface designed for seamless user experience" },
              { title: "Secure Payments", desc: "Multiple secure payment options with escrow protection" },
              { title: "24/7 Support", desc: "Round-the-clock customer support for your peace of mind" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slideUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-semibold mb-3 text-green-300">{item.title}</h3>
                <p className="text-green-100 leading-relaxed">{item.desc}</p>
              </div>
            ))}
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