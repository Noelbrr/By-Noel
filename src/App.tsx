import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

const Logo = () => (
  <img
    src="https://raw.githubusercontent.com/Noelbrr/By-Noel/main/by-noel-logo-inverted.png"
    alt="By Noel Logo"
    className="w-24 h-24 md:w-32 md:h-32 object-contain"
  />
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    scrollRef.current = locomotiveScroll;

    const ctx = gsap.context(() => {
      gsap.to(".hero-section", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -300,
        opacity: 0,
        ease: "none",
      });

      gsap.from(".hero-content > *", {
        y: (i, el) => {
          if (el.tagName.toLowerCase() === 'img' && window.matchMedia("(min-width: 768px)").matches) {
            return -100;
          }
          return 100;
        },
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.from(".scroll-explore", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        delay: 1.2,
        ease: "power4.out",
      });

      gsap.to(".scroll-fade-wrapper", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top -50px", // Triggert leichtes Runterscrollen
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.utils.toArray(".reveal-text").forEach((text: any) => {
        const target = text.firstElementChild; // Das animiert den Text selbst, nicht den äußeren Container

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: text, // Der äußere Container bleibt starr und dient nur als Trigger
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5, // Leichte Glättung
          }
        });

        tl.fromTo(target,
          { opacity: 0.1, y: 50 },
          { opacity: 1, y: 0, ease: "none", duration: 1 }
        )
          .to(target,
            { opacity: 0.1, y: -50, ease: "none", duration: 1 },
            "+=1.5"
          );
      });



      gsap.to(".floating-contact-wrapper", {
        scrollTrigger: {
          trigger: "#contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 150,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => {
      ctx.revert();
      locomotiveScroll.destroy();
    };
  }, []);

  const scrollToContact = () => {
    if (contactRef.current) {
      scrollRef.current?.scrollTo(contactRef.current, {
        duration: 1.5,
        offset: 40,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const url = formData.get("url") || "";
    const message = formData.get("message") || "";

    const subject = encodeURIComponent(`Neue Projektanfrage von ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nWebsite: ${url}\n\nNachricht:\n${message}`
    );
    
    window.location.href = `mailto:Noelbrr17@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={containerRef} className="bg-black">
      <div className="floating-contact-wrapper fixed bottom-8 left-0 right-0 mx-auto w-max md:left-auto md:right-8 md:mx-0 z-50">
        <button
          onClick={scrollToContact}
          className="animate-fly-in bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl cursor-pointer hover:bg-gray-200 transition-colors"
        >
          Contact me
        </button>
      </div>
      <section className="hero-section min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="hero-content flex flex-col items-center gap-8 mb-24">
          <Logo />
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none max-w-4xl text-balance">
            Shopify Developer. Crafting high-performance e-commerce.
          </h1>
          <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl font-medium">
            Based in Germany. Building minimalist, intentional digital experiences for the world.
          </p>
        </div>
        <div className="scroll-fade-wrapper absolute bottom-8 md:bottom-12">
          <div className="scroll-explore animate-bounce text-[#86868b]">
            <span className="text-sm uppercase tracking-widest">Scroll to explore</span>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 py-24 gap-24 md:gap-48 bg-black">
        <div className="reveal-text max-w-5xl">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Shopify Specialist. <br />
            <span className="text-[#86868b]">Custom themes, headless builds, and performance optimization.</span>
          </h2>
        </div>
        <div className="reveal-text max-w-5xl self-end text-right">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Design-Led Engineering. <br />
            <span className="text-[#86868b]">Minimalist aesthetics meet robust, scalable functionality.</span>
          </h2>
        </div>
        <div className="reveal-text max-w-5xl">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Global Reach. <br />
            <span className="text-[#86868b]">Partnering with brands that value precision and intention.</span>
          </h2>
        </div>
      </section>

      <section className="work-section min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-black overflow-hidden">
        <div className="max-w-4xl w-full flex flex-col items-start md:items-center text-left md:text-center">
          <div className="w-full">
            <span className="text-[#86868b] uppercase tracking-widest text-sm font-bold mb-4 block">FEATURED PROJECT</span>
            <h3 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter">Ungoverned</h3>
            <p className="text-xl md:text-2xl text-[#86868b] mb-8 leading-relaxed max-w-2xl md:mx-auto">
              A custom Shopify theme built for an Australian electric tracked vehicle brand.
              Engineered for speed, built for impact.
            </p>
            <div className="h-[1px] w-full bg-white/10 mb-8" />
            <div className="flex justify-start md:justify-center gap-12 text-sm uppercase tracking-widest font-bold">
              <div>
                <p className="text-[#86868b] mb-1">ROLE</p>
                <p>FRONT-END DEVELOPER</p>
              </div>
              <div>
                <p className="text-[#86868b] mb-1">LINK</p>
                <a href="https://ungoverned.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-[#86868b] transition-colors underline decoration-white/30 underline-offset-4">ungoverned.com.au</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact-section"
        ref={contactRef}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-black"
      >
        <div className="max-w-3xl w-full">
          <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter text-center">Let's build.</h2>
          <form className="space-y-8" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Noel Breuer"
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="hello@bynoel.de"
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Current Website</label>
              <input
                type="url"
                name="url"
                placeholder="Paste Link here"
                className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl resize-none"
              />
            </div>
            <button type="submit" className="w-full bg-white text-black font-bold py-6 rounded-full text-xl hover:bg-[#86868b] hover:text-white transition-all duration-500 mt-8">
              Send Inquiry
            </button>
          </form>
        </div>

        <div className="mt-24 text-[#86868b] text-sm uppercase tracking-[0.2em] font-medium opacity-50">
          © {new Date().getFullYear()} By Noel — All Rights Reserved
        </div>
      </section>
    </div>
  );
}
