import { useEffect, useRef } from "react";
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
      // Hero Parallax effect
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

      gsap.from(".hero-content > *, .scroll-explore", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Beim runterscrollen das "Scroll to explore" ausblenden
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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          }
        });
        
        // 1. Phase: Einblenden von unten
        tl.fromTo(text, 
          { opacity: 0.1, y: 50 },
          { opacity: 1, y: 0, ease: "none", duration: 1 }
        )
        // 2. Phase: Ausblenden nach oben (mit Verzögerung, damit es mittig lesbar bleibt)
        .to(text, 
          { opacity: 0.1, y: -50, ease: "none", duration: 1 },
          "+=1.5"
        );
      });

      gsap.to(".work-image", {
        scrollTrigger: {
          trigger: ".work-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        ease: "none",
      });

      // Beim Contact-Bereich am Ende soll er verschwinden (nur opacity)
      gsap.to(".floating-contact", {
        scrollTrigger: {
          trigger: "#contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
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
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      });
    }
  };

  return (
    <div ref={containerRef} className="bg-black">
      <button
        onClick={scrollToContact}
        className="animate-fly-in floating-contact fixed bottom-8 left-0 right-0 mx-auto w-max md:left-auto md:right-8 md:mx-0 z-50 bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl cursor-pointer"
      >
        Contact me
      </button>
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
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center">
          <div className="order-2 md:order-1">
            <span className="text-[#86868b] uppercase tracking-widest text-sm font-bold mb-4 block">FEATURED PROJECT</span>
            <h3 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter">Ungoverned</h3>
            <p className="text-xl md:text-2xl text-[#86868b] mb-8 leading-relaxed">
              A custom Shopify theme built for an Australian electric tracked vehicle brand. 
              Engineered for speed, built for impact.
            </p>
            <div className="h-[1px] w-full bg-white/10 mb-8" />
            <div className="flex gap-8 text-sm uppercase tracking-widest font-bold">
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
          <div className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900">
            <img 
              src="https://raw.githubusercontent.com/Noelbrr/By-Noel/main/ungoverned_screenshot_website_shopify_design_by_noel.png" 
              alt="Ungoverned Project" 
              className="work-image absolute inset-0 w-full h-[120%] object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
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
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Noel Breuer" 
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="hello@bynoel.de" 
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Current Website</label>
              <input 
                type="url" 
                placeholder="Paste Link here" 
                className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#86868b] font-bold ml-1">Message</label>
              <textarea 
                rows={4} 
                placeholder="Tell me about your project..." 
                className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl resize-none"
              />
            </div>
            <button className="w-full bg-white text-black font-bold py-6 rounded-full text-xl hover:bg-[#86868b] hover:text-white transition-all duration-500 mt-8">
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
