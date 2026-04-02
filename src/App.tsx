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
  <svg 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 800"
    preserveAspectRatio="xMidYMid meet"
    className="w-24 h-24 md:w-32 md:h-32"
  >
    <g 
      transform="translate(-100.022948,1001.318098) scale(0.125029,-0.150093)"
      fill="#ffffff" 
      stroke="none"
    >
      <path d="M805 4941 l0 -1731 810 0 c464 0 861 5 930 10 417 36 696 145 885 347 176 188 254 497 205 813 -18 118 -45 202 -98 305 -81 155 -276 319 -434 366 -24 7 -43 16 -43 20 0 4 15 12 33 18 58 20 183 109 241 172 63 70 127 193 150 289 55 230 11 528 -104 704 -141 215 -384 335 -795 392 -102 14 -244 18 -950 21 l-830 4 0 -1730z"/>
      <path d="M2331 6046 c134 -29 230 -104 265 -209 24 -70 24 -205 1 -274 -23 -66 -86 -137 -149 -169 -90 -46 -159 -54 -465 -54 l-283 0 0 360 0 360 283 0 c203 0 300 -4 348 -14z"/>
      <path d="M2444 4706 c188 -55 283 -163 308 -349 19 -139 -14 -288 -82 -375 -40 -50 -121 -101 -203 -129 -82 -27 -84 -27 -424 -31 l-343 -4 0 457 0 457 343 -5 c285 -3 352 -7 401 -21z"/>
      <path d="M3680 6665 c0 -4 378 -579 1153 -1758 l157 -238 0 -730 0 -729 445 0 445 0 0 728 0 727 659 1003 660 1002 -489 0 -488 0 -318 -497 c-174 -274 -351 -551 -392 -616 -42 -65 -78 -114 -82 -110 -4 4 -182 281 -395 616 l-387 607 -484 0 c-266 0 -484 -2 -484 -5z"/>
      <path d="M3235 3000 c-346 -51 -581 -269 -650 -605 -19 -94 -22 -306 -5 -410 61 -382 336 -618 746 -642 518 -29 855 247 892 732 46 582 -276 940 -838 934 -52 -1 -117 -5 -145 -9z"/>
      <path d="M3519 2691 c196 -61 297 -288 270 -609 -24 -281 -167 -442 -393 -442 -198 0 -336 124 -383 343 -19 93 -19 291 0 384 47 218 182 340 379 342 39 1 91 -7 127 -18z"/>
      <path d="M800 2175 l0 -805 200 0 200 0 2 546 3 546 164 -309 c90 -169 221 -415 290 -545 l126 -238 233 0 232 0 0 805 0 805 -195 0 -195 0 0 -545 c0 -328 -4 -545 -9 -545 -5 0 -11 6 -13 13 -2 7 -75 147 -163 312 -87 165 -214 404 -281 530 l-123 230 -235 3 -236 2 0 -805z"/>
      <path d="M4540 2175 l0 -805 575 0 575 0 0 155 0 155 -365 0 -365 0 0 190 0 190 330 0 330 0 0 150 0 150 -330 0 -330 0 0 155 0 155 350 0 350 0 0 155 0 155 -560 0 -560 0 0 -805z"/>
      <path d="M6050 2175 l0 -805 570 0 570 0 0 155 0 155 -365 0 -365 0 0 650 0 650 -205 0 -205 0 0 -805z"/>
    </g>
  </svg>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    scrollRef.current = locomotiveScroll;

    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.utils.toArray(".reveal-text").forEach((text: any) => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
          opacity: 0.1,
          y: 50,
          duration: 1,
        });
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

      gsap.to(".floating-contact", {
        scrollTrigger: {
          trigger: "#contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 50,
        scale: 0.8,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power3.inOut",
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
        className="floating-contact fixed bottom-8 right-8 z-50 bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform duration-300 active:scale-95"
      >
        Contact me
      </button>
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="hero-content flex flex-col items-center gap-8 mb-24">
          <Logo />
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none max-w-4xl text-balance">
            Shopify Developer. Crafting high-performance e-commerce.
          </h1>
          <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl font-medium">
            Based in Germany. Building minimalist, intentional digital experiences for the world.
          </p>
        </div>
        <div className="absolute bottom-8 md:bottom-12 animate-bounce text-[#86868b]">
          <span className="text-sm uppercase tracking-widest">Scroll to explore</span>
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
            <span className="text-[#86868b] uppercase tracking-widest text-sm font-bold mb-4 block">Featured Case Study</span>
            <h3 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter">Ungoverned</h3>
            <p className="text-xl md:text-2xl text-[#86868b] mb-8 leading-relaxed">
              A custom Shopify theme built for an Australian electric tracked vehicle brand. 
              Engineered for speed, built for impact.
            </p>
            <div className="h-[1px] w-full bg-white/10 mb-8" />
            <div className="flex gap-8 text-sm uppercase tracking-widest font-bold">
              <div>
                <p className="text-[#86868b] mb-1">Role</p>
                <p>Lead Developer</p>
              </div>
              <div>
                <p className="text-[#86868b] mb-1">Tech</p>
                <p>Shopify Liquid / GSAP</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900">
            <img 
              src="https://picsum.photos/seed/ungoverned/1200/1500" 
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
