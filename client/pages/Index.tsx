import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone, Mail, MapPin, Brain, Heart, Search, TrendingUp, Plus, Minus } from "lucide-react";
import EventsSection from "@/components/ui/EventSection";
import UpcomingEvents from "@/components/ui/UpcomingEvents";
import EffortlessBelonging from "@/components/ui/EffortlessBelonging";
import { Carousel } from "@/components/ui/carousel";
import AnimatedGallery from "@/components/ui/AnimatedGallery";
import HeroSection from "@/components/ui/HeroSection";
import FeatureCarousel from "@/components/ui/FeatureCarousel";
import FAQSection from "@/components/ui/FAQSection";
import TestimonialSlider from "@/components/ui/TestimonialSlider";
import WhyUs from "@/components/ui/whyus";
import MobileMenu from "@/components/ui/MobileMenu";
import NetworkSignupSection from "@/components/ui/NetworkSignupSection";

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: ""
  });

  // Auto-scroll animation for feature cards
  useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller');
    scrollers.forEach((scroller) => {
      const scrollerInner = scroller.querySelector('.scroller-inner');
      if (scrollerInner) {
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    });
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How to create an account?",
      answer: "Create your account to become part of our women's community club. Sign up using your basic details to access members-only activities and updates. Once registered, you can connect, participate, and grow with like-minded women. Your journey with our supportive community starts here."
    },
    {
      question: "Who can join the women's community club?",
      answer: "Our community is open to all women who are looking to connect, grow, and build meaningful relationships. Whether you're seeking personal growth, professional development, or simply looking for a supportive community, you're welcome here."
    },
    {
      question: "Is there any membership fee to create an account?",
      answer: "Yes, we offer a lifetime membership for ₹2,500. This one-time payment gives you unlimited access to all our events, workshops, and community activities - no recurring fees, no hidden costs."
    },
    {
      question: "What benefits do members receive after joining?",
      answer: "Members get access to exclusive events, workshops, networking opportunities, wellness programs, and a supportive community of like-minded women. You'll also receive invitations to special gatherings and access to our online platform."
    },
    {
      question: "Will there be workshops or skill-building sessions for members?",
      answer: "Absolutely! We regularly organize workshops covering various topics including career development, wellness, creative pursuits, and personal growth. All workshops are designed specifically for our members' needs."
    },
    {
      question: "Are community activities available in multiple locations?",
      answer: "Currently, we're based in select cities, but we're expanding. Check our events calendar for activities in your area, and we also offer online events that you can join from anywhere."
    },
    {
      question: "Can I cancel or deactivate my account anytime?",
      answer: "Yes, you have full control over your account. You can deactivate it at any time through your account settings. However, since it's a lifetime membership, your access will always be available whenever you want to return."
    },
    {
      question: "How can I contact the community team for support?",
      answer: "You can reach out to us through our contact form, email, or social media channels. Our team is here to help you with any questions or concerns you might have."
    }
  ];

  return (
    <div className="min-h-screen bg-bg-cream overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/a2dba048841fb8fad06150c1c294d95db7325c86?width=196" 
              alt="Space & Beauty Club" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
         <nav className="hidden md:flex items-center gap-10">
  <a href="/" className="font-urbanist text-lg font-bold gradient-text">
    Home
  </a>

  <a
    href="#why-us"
    className="font-urbanist text-lg text-text-dark/60 hover:text-text-dark transition"
  >
    Why Us
  </a>

  <a
    href="#up-events"
    className="font-urbanist text-lg text-text-dark/60 hover:text-text-dark transition"
  >
    Events
  </a>

  <a
    href="#testimonials1"
    className="font-urbanist text-lg text-text-dark/60 hover:text-text-dark transition"
  >
    Testimonials
  </a>
</nav>


          {/* CTA Button */}
          <button
  onClick={() => {
    const section = document.getElementById("form-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="hidden md:block px-10 py-3.5 rounded-3xl bg-gradient-primary text-white font-urbanist text-lg font-semibold hover:opacity-90 transition"
>
  JOIN OUR CLUB
</button>


          {/* Mobile Menu Button */}
          {/* <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
<MobileMenu/>
        </div>
      </header>

<HeroSection/>

     

      {/* Scrolling Feature Cards Section */}
      <section className="bg-white py-0 overflow-hidden">
        <div className="scroller" data-animated="true">
          <div className="scroller-inner flex gap-5 animate-slide-left">
            {/* Feature Card 1 */}
            <div className="flex-shrink-0 w-[280px] h-[175px] p-3 rounded-[21px] border border-border-pink bg-white shadow-md">
              <div className="flex items-center gap-3 h-full">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/bcfc50b4fe41e16cda146ac1d467009d7cde5db4?width=262" 
                  alt="Member"
                  className="w-32 h-full object-cover rounded-2xl"
                />
                <div className="flex flex-col justify-center gap-3 flex-1">
                  <h3 className="font-manrope text-sm font-bold gradient-text text-center">
                    Come as you are.
                  </h3>
                  <p className="text-xs text-text-dark/80 text-center">
                    A women-only space that <span className="font-bold">feels like home.</span>
                  </p>
                  <button className="w-full py-2 rounded-full bg-gradient-primary text-white text-xs font-bold">
                    Join Now
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Card 2 - Image */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-white shadow-md overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/75e0f4cb83c1ec063a59b0249376d6d38e842741?width=560" 
                alt="Community event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Feature Card 3 - Testimonial */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-6 flex flex-col items-center justify-center gap-2">
              <div className="w-14 h-14 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/f75de16025440cd4ec91c613d57974312199b57d?width=112')"}} />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" viewBox="0 0 24 24" fill="#F4E112">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-center text-text-dark">
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              </p>
            </div>

            {/* Feature Card 4 - Problem Solving */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-6 flex flex-col items-center gap-2">
              <div className="p-3 rounded-full border-2 border-border-pink bg-border-pink">
                <Brain className="w-6 h-6 text-text-dark/60" />
              </div>
              <h3 className="font-kraskario text-3xl capitalize text-center">Problem Solving</h3>
              <p className="text-base text-center text-text-dark/70 font-semibold">
                Navigate life's everyday challenges with clarity.
              </p>
            </div>

            {/* Feature Card 5 - Cooking */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-1.5 overflow-hidden">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/8c6cb4c5492a06edfda2a6664e5ce99dccffb599?width=572" 
                  alt="Cooking session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-manrope text-sm font-bold text-center">Cooking Sessions</h3>
                  <p className="text-white text-xs text-center font-semibold">
                    " Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 6 - Built for Women */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-6 relative overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=196" 
                alt="Woman"
                className="absolute right-0 top-0 h-full w-24 object-cover"
              />
              <div className="relative z-10 space-y-4">
                <h3 className="font-kraskario text-3xl capitalize">Built for womens</h3>
                <p className="text-sm text-text-dark/70 font-semibold max-w-[160px]">
                  Navigate life's everyday challenges with clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Feature Cards Section */}
      <section className="bg-white py-5 overflow-hidden">
        <div className="scroller" data-animated="true">
          <div className="scroller-inner flex gap-5 animate-slide-right">
            {/* Feature Card 1 */}
            <div className="flex-shrink-0 w-[280px] h-[175px] p-3 rounded-[21px] border border-border-pink bg-white shadow-md">
              <div className="flex items-center gap-3 h-full">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/bcfc50b4fe41e16cda146ac1d467009d7cde5db4?width=262" 
                  alt="Member"
                  className="w-32 h-full object-cover rounded-2xl"
                />
                <div className="flex flex-col justify-center gap-3 flex-1">
                  <h3 className="font-manrope text-sm font-bold gradient-text text-center">
                    Come as you are.
                  </h3>
                  <p className="text-xs text-text-dark/80 text-center">
                    A women-only space that <span className="font-bold">feels like home.</span>
                  </p>
                  <button className="w-full py-2 rounded-full bg-gradient-primary text-white text-xs font-bold">
                    Join Now
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Card 2 - Image */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-white shadow-md overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/75e0f4cb83c1ec063a59b0249376d6d38e842741?width=560" 
                alt="Community event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Feature Card 3 - Testimonial */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-6 flex flex-col items-center justify-center gap-2">
              <div className="w-14 h-14 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/f75de16025440cd4ec91c613d57974312199b57d?width=112')"}} />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" viewBox="0 0 24 24" fill="#F4E112">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-center text-text-dark">
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              </p>
            </div>

            {/* Feature Card 4 - Problem Solving */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-6 flex flex-col items-center gap-2">
              <div className="p-3 rounded-full border-2 border-border-pink bg-border-pink">
                <Brain className="w-6 h-6 text-text-dark/60" />
              </div>
              <h3 className="font-kraskario text-3xl capitalize text-center">Problem Solving</h3>
              <p className="text-base text-center text-text-dark/70 font-semibold">
                Navigate life's everyday challenges with clarity.
              </p>
            </div>

            {/* Feature Card 5 - Cooking */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-1.5 overflow-hidden">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/8c6cb4c5492a06edfda2a6664e5ce99dccffb599?width=572" 
                  alt="Cooking session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-manrope text-sm font-bold text-center">Cooking Sessions</h3>
                  <p className="text-white text-xs text-center font-semibold">
                    " Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 6 - Built for Women */}
            <div className="flex-shrink-0 w-[280px] h-[176px] rounded-[21px] border border-border-pink bg-white shadow-md p-6 relative overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=196" 
                alt="Woman"
                className="absolute right-0 top-0 h-full w-24 object-cover"
              />
              <div className="relative z-10 space-y-4">
                <h3 className="font-kraskario text-3xl capitalize">Built for womens</h3>
                <p className="text-sm text-text-dark/70 font-semibold max-w-[160px]">
                  Navigate life's everyday challenges with clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <WhyUs/>
      {/* We Can Help Transform You Section */}
     

      {/* Connection Built on Trust Section */}
      <section className="bg-bg-light  md:py-24">
  <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-20 items-center">
    {/* Left Content */}
    <div className="space-y-8">
      <h2 className="font-kraskario text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-text-dark">
        Connection Built on <span className="gradient-text1">Emotional Trust.</span>
      </h2>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-kraskario text-2xl md:text-4xl">
            "Not another <span className="text-gray-400">networking event</span>"
          </h3>
          <p className="font-manrope text-base text-text-dark/60">
            Ditch the business cards for genuine heart-to-hearts.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-kraskario text-2xl md:text-4xl">
            "No awkward <span className="text-gray-400">icebreakers</span>"
          </h3>
          <p className="font-manrope text-base text-text-dark/60">
            Skip the small talk. We dive deep into what matters from the start.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-kraskario text-2xl md:text-4xl gradient-text">
            "Real friendships"
          </h3>
          <p className="font-manrope text-base md:text-[18px] text-text-dark/80">
            Find the kind of women who celebrate your wins and walk beside you in your growth. Authentic storytelling is our foundation.
          </p>
        </div>
      </div>

        <a href="#membership-form ">
      <button
  onClick={() => {
    const section = document.getElementById("form-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="mt-10 inline-flex items-center gap-5 px-6 py-3 rounded-full bg-gradient-cta text-white font-manrope text-base font-semibold hover:opacity-90 transition"
>
  Explore Membership
  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
    <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
      <path
        d="M1.76758 7.0711H12.3736M7.66016 2.35638L12.374 7.07019L7.66016 11.784"
        stroke="white"
        strokeWidth="1.32576"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
</button>

      </a>
    </div>

    {/* Right Content - Image with Labels */}
    <div className="relative">
      <div className="rounded-[30px] overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/fd3d8584903023c97be9f8c24287c2227441984a?width=1165"
          alt="Women connecting"
          className="w-full h-auto animate-scale-in"
        />
      </div>

      {/* Floating Card - hidden on mobile */}
      <div className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl p-8 max-w-sm animate-float-slow hidden md:flex">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-bg-beige">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M15.2275 17.7754C15.2305 18.2024 15.1525 18.6264 14.9975 19.0254C14.8298 19.4204 14.5889 19.78 14.2875 20.0854C13.9826 20.3912 13.619 20.6321 13.2186 20.7936C12.8182 20.9552 12.3892 21.034 11.9575 21.0254C11.5249 21.0281 11.0963 20.943 10.6975 20.7754C9.89794 20.4407 9.26215 19.8049 8.92749 19.0054C8.77063 18.6145 8.69247 18.1965 8.69749 17.7754"
                stroke="#141414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.2266 7.97461C16.6073 7.97461 17.7266 6.85532 17.7266 5.47461C17.7266 4.0939 16.6073 2.97461 15.2266 2.97461C13.8459 2.97461 12.7266 4.0939 12.7266 5.47461C12.7266 6.85532 13.8459 7.97461 15.2266 7.97461Z"
                stroke="#141414"
                strokeWidth="1.5"
              />
              <path
                d="M10.5673 2.97461C10.1766 3.29421 9.91681 3.74614 9.83729 4.24461C9.80457 4.39838 9.73605 4.54228 9.63729 4.66461C9.54275 4.79171 9.41936 4.89453 9.27729 4.96461L8.48729 5.34461C7.85397 5.65583 7.29213 6.09509 6.83729 6.63461C5.43729 8.30461 5.43729 9.05461 5.43729 11.9046C5.43729 13.1946 4.06729 14.3646 3.70729 15.5246C3.48729 16.2146 3.36729 17.7746 5.18729 17.7746H18.7673"
                stroke="#141414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-kraskario text-2xl md:text-4xl">
            Plans that feel exciting not exhausting.
          </h3>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 right-6 flex items-center gap-3 animate-fade-in animation-delay-200">
        <div className="w-2 h-2 rounded-full bg-[#D7A08A]" />
        <span className="font-manrope text-sm md:text-base font-medium">
          WALK & TALK SESSIONS
        </span>
      </div>

      <div className="absolute bottom-32 -left-8 flex items-center gap-3 animate-fade-in animation-delay-400">
        <div className="w-2 h-2 rounded-full bg-[#D7A08A]" />
        <span className="font-manrope text-sm md:text-base font-medium">
          Story & Soul Conversations
        </span>
      </div>
    </div>
  </div>
</section>


      {/* Things We Do Together Section */}
     
      <EventsSection/>
     <UpcomingEvents/>
     <EffortlessBelonging/>    
      <Carousel/>


<TestimonialSlider/>
     
      {/* FAQ Section */}
      {/* <section className="bg-bg-light py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-16"> */}
            {/* Left Side - FAQ Info */}
            {/* <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-manrope text-5xl font-light leading-tight text-text-dark">
                  Frequently Asked
                  <br />
                  <span className="gradient-text">Questions</span>
                </h2>
                <p className="font-manrope text-base text-text-dark">
                  Visit our Frequently Asked Questions to find helpful information.
                </p>
              </div> */}

              {/* Contact Form */}
              {/* <div className="p-8 rounded-[20px] border border-text-dark/20 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-manrope text-2xl font-semibold">Can't locate the answers you need?</h3>
                  <p className="font-manrope text-lg font-semibold text-text-dark/50">
                    We're here to help with any questions you have!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-manrope text-base font-semibold text-text-dark/50 block mb-2">
                      Ask Your Question
                    </label>
                    <input 
                      type="text"
                      placeholder="write here..."
                      className="w-full px-6 py-4 rounded-[10px] border border-text-dark/20 font-manrope text-base placeholder:text-text-dark/20"
                    />
                  </div>

                  <button className="px-8 py-4 rounded-[25px] bg-gradient-primary text-white font-manrope text-base font-semibold hover:opacity-90 transition">
                    SEND NOW
                  </button>
                </div>
              </div>
            </div> */}

            {/* Right Side - FAQ Accordion */}
            {/* <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border-b border-text-dark/30 pb-5"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start gap-5 text-left"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                      {openFaq === index ? (
                        <Minus className="w-3 h-3 text-white" />
                      ) : (
                        <Plus className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-manrope text-lg font-semibold text-black mb-3">
                        {faq.question}
                      </h3>
                      {openFaq === index && (
                        <p className="font-manrope text-sm text-black leading-relaxed animate-fade-in">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Decorative Element */}
        {/* <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
      </section> */}
<FAQSection/>

<AnimatedGallery/>
      
<NetworkSignupSection/>
     
      {/* Footer */}
     <footer className="bg-white relative overflow-hidden">
  {/* Hero Image Background */}
  <div className="relative h-[512px] flex justify-center overflow-hidden">
    {/* Layer background */}
   <div className="absolute inset-0 z-10" 
     style={{
       background: "linear-gradient(to right, #D49DC3, #A3CEF1, #D49DC3)"
     }}
/>


    {/* Image on top of layer */}
    <div className="w-full md:w-[95%] lg:w-[95%] h-full relative z-20">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/d797f2c8de5da7bef030ef71c5122cf1818991a1?width=2680"
        alt="Footer background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content on top of image */}
      <div className="relative z-30 h-full flex flex-col justify-between p-12 md:p-24">
        <div className="space-y-8">
          <h2 className="font-baskerville text-5xl md:text-5xl text-text-dark leading-tight max-w-md">
            This page ends here.
            <br />
            The belonging doesn't.
          </h2>
          
          <button
  onClick={() => {
    const form = document.getElementById("form-section");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  }}
  className="px-8 py-4 rounded-[25px] bg-gradient-primary text-white font-manrope text-base font-semibold hover:opacity-90 transition uppercase"
>
  <span className="gradient-text1">Join Us</span>
</button>

        </div>
      </div>
    </div>
  </div>
  {/* Marquee Text */}
 {/* Marquee Overlay */}

<div className="absolute inset-x-0 top-[65%] -translate-y-1/2 z-10 overflow-hidden pointer-events-none">
  <div className="whitespace-nowrap animate-slide-left">
    <span className="text-[128px] font-manrope font-bold uppercase inline-block px-8 text-black/10">
      Connect . Belong . Inspire . Thrive
    </span>
    <span className="text-[128px] font-manrope font-bold uppercase inline-block px-8 text-black/10">
      Connect . Belong . Inspire . Thrive
    </span>
  </div>
</div>

{/* Line 2 – Left to Right */}
<div className="absolute inset-x-0 top-[80%] -translate-y-1/2 z-10 overflow-hidden pointer-events-none">
  <div className="whitespace-nowrap animate-slide-right">
    <span className="text-[128px] font-manrope font-bold uppercase inline-block px-8 text-black/10">
      Connect . Belong . Inspire . Thrive
    </span>
    <span className="text-[128px] font-manrope font-bold uppercase inline-block px-8 text-black/10">
      Connect . Belong . Inspire . Thrive
    </span>
  </div>
</div>


  {/* Footer Content */}
 <div className="relative py-12">
  {/* Background Image Overlay */}
  <div
    className="absolute inset-0 w-full h-full bg-cover bg-center opacity-2 pointer-events-none"
    style={{
      backgroundImage: "url('https://i.postimg.cc/g2tvGhxq/mmmm.png')",
    }}
  ></div>

  {/* Content */}
  <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 bg-white/0">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      {/* Column 1 - Brand */}
      <div className="space-y-4">
        <h3 className="font-manrope text-sm font-semibold uppercase tracking-wider text-text-dark">
          SpaceAndBeautyClub
        </h3>
        <p className="font-manrope text-xs text-text-dark leading-relaxed">
          Meet like-minded people.
          <br />
          Share meaningful moments.
        </p>
      </div>

      {/* Columns 2 & 3 - Empty for spacing */}
      <div />
      <div />

      {/* Column 4 - Links */}
      <div>
        <h3 className="font-manrope text-sm font-bold mb-6">About Us</h3>
        <ul className="space-y-4 font-manrope text-xs font-medium">
          {[
            "The Community",
            "Membership Benefits",
            "Events & Workshops",
            "Member Stories",
            "Wellness & Self-Care",
            "FAQs",
            "Contact & Support",
          ].map((item) => (
            <li key={item}>
              <Link to="#" className="hover:text-pink-primary transition">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="flex flex-wrap items-center pt-8 border-t border-gray-200 gap-4 justify-between">
      <p className="font-manrope text-xs font-semibold text-text-dark flex-1 text-center md:text-left">
        © Spaceandbeautyclub 2026
      </p>

      <div className="flex gap-4 md:gap-10 font-manrope text-[7px] md:text-xs font-semibold text-text-dark flex-1 justify-center md:justify-end">
  {["Privacy Policy", "Terms and Conditions", "Sitemap"].map((item) => (
    <Link key={item} to="#" className="hover:text-pink-primary transition">
      {item}
    </Link>
  ))}
</div>

    </div>
  </div>
</div>


</footer>

     
    </div>
  );
}
