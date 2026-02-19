import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function NetworkSignupSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const cities = [
    "Chennai","Coimbatore","Madurai","Salem","Tiruppur",
    "Mumbai","Bangalore","Delhi","Hyderabad","Kolkata",
    "Pune","Ahmedabad","Jaipur","Lucknow","Nagpur"
  ];

  /* Load Razorpay */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) document.body.removeChild(existing);
    };
  }, []);

  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name);
  const validatePhone = (phone: string) => /^[0-9+\-\s]{10,15}$/.test(phone);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearAndReload = () => {
    setFormData({ name: "", phone: "", email: "", city: "" });
    setCitySuggestions([]);
    setTimeout(() => window.location.reload(), 400);
  };

  /* ✅ COMPLETE PROFESSIONAL PAYMENT FLOW */
  const handlePayment = async () => {
    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.city) {
      alert("Please fill all required fields including city");
      return;
    }

    if (!validateName(formData.name)) {
      alert("Name should contain only alphabets and spaces");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Phone must be 10-15 digits with optional + or -");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh and try again.");
      return;
    }

    setLoading(true);

    try {
      // ✅ STEP 1: Create order from backend with form data
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: 2500 * 100, // paise
          currency: "INR",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city 
        }),
      });

      if (!orderRes.ok) {
        throw new Error("Order creation failed");
      }

      const orderData = await orderRes.json();

      if (!orderData.id) {
        throw new Error("Invalid order response");
      }

      // ✅ STEP 2: Open Razorpay checkout
      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_S9bksWa04mgxRd", // Vercel: NEXT_PUBLIC_RAZORPAY_KEY_ID
        amount: orderData.amount?.toString() || "250000",
        currency: orderData.currency || "INR",
        name: "SPACE AND BEAUTY CLUB",
        description: "Lifetime Membership - Professional Network",
        order_id: orderData.id,
        image: "https://spaceandbeauty.com/cdn/shop/files/PNG_Black_copy.png?v=1767685453&width=100",

        handler: async function (response: any) {
          // ✅ STEP 3: Verify payment server-side & save to Supabase
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              city: formData.city,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const data = await verifyRes.json();

          if (data.success) {
            alert("🎉 Payment successful! Welcome to the network. Page will reload.");
            clearAndReload();
          } else {
            alert(`Payment verification failed: ${data.error || "Unknown error"}. Contact support with payment ID: ${response.razorpay_payment_id}`);
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment dismissed");
          },
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone.replace(/[\s-]/g, ""), // Clean phone
        },

        notes: {
          city: formData.city,
          address: "Lifetime Membership",
        },

        theme: {
          color: "#FF566D",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err: any) {
      console.error("Payment error:", err);
      alert(`Payment initiation failed: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form-section" className="bg-bg-light py-24 relative overflow-hidden">
      {/* Background */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/4e8681ceb490e005277a4d396b58edee067b55f5?width=2912"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-1 pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <h2 className="font-manrope text-5xl md:text-6xl font-bold text-text-dark leading-tight">
              Your network is waiting for you.
            </h2>
            <p className="font-manrope text-xl text-text-light">
              Join our exclusive lifetime membership and expand your
              professional network with like-minded leaders.
            </p>
          </div>

          {/* Right – Form */}
          <div className="bg-white rounded-[30px] border border-[#CD9A9A] shadow-lg p-10 space-y-6">
            <InputField
              label="Name*"
              placeholder="Jennifer Maddy"
              value={formData.name}
              onChange={(val: string) => {
                if (/^[A-Za-z\s]*$/.test(val)) {
                  setFormData({ ...formData, name: val });
                }
              }}
              icon={<UserIcon />}
              disabled={loading}
            />

            <InputField
              label="Phone Number with Country Code*"
              placeholder="+91-9021-3424-20"
              value={formData.phone}
              onChange={(val: string) => {
                if (/^[0-9+\-\s]*$/.test(val)) {
                  setFormData({ ...formData, phone: val });
                }
              }}
              icon={<Phone className="w-5 h-5 text-pink-primary" />}
              disabled={loading}
            />

            <InputField
              label="Email*"
              placeholder="jennifer@gmail.com"
              value={formData.email}
              onChange={(val: string) => setFormData({ ...formData, email: val })}
              icon={<Mail className="w-5 h-5 text-pink-primary" />}
              disabled={loading}
            />

            {/* City Autocomplete */}
            <div className="relative">
              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-gray-300">
                <MapPin className="w-5 h-5 text-pink-primary" />
                <div className="flex-1">
                  <label className="font-visby text-xs gradient-text font-medium block mb-1">
                    Choose city*
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, city: value });
                      if (value.length >= 2) {
                        setCitySuggestions(
                          cities.filter((c) =>
                            c.toLowerCase().includes(value.toLowerCase())
                          )
                        );
                      } else {
                        setCitySuggestions([]);
                      }
                    }}
                    placeholder="Chennai, Coimbatore..."
                    className="w-full font-visby text-lg font-medium text-black placeholder-gray-400 outline-none bg-transparent"
                    disabled={loading}
                  />
                </div>
                <ChevronDown className="w-5 h-5 text-black" />
              </div>

              {/* Suggestions */}
              {citySuggestions.length > 0 && (
                <div className="absolute w-full bg-white border rounded-xl mt-2 max-h-40 overflow-y-auto z-20 shadow-lg">
                  {citySuggestions.map((city, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all"
                      onClick={() => {
                        setFormData({ ...formData, city });
                        setCitySuggestions([]);
                      }}
                    >
                      <span className="font-medium">{city}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-primary text-white font-visby font-medium text-base md:text-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <span className="gradient-text1">Life-Time Membership @ ₹2500</span>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Secure payment via Razorpay. Your data is stored safely in Supabase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable Input Component */
function InputField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  disabled = false 
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-gray-300 focus-within:border-pink-primary transition-all">
      <div className="flex-1">
        <label className="font-visby text-xs gradient-text font-medium block mb-1">
          {label}
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full font-visby text-lg font-medium text-black placeholder-gray-400 outline-none bg-transparent"
          disabled={disabled}
        />
      </div>
      {icon}
    </div>
  );
}

/* User Icon */
function UserIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 21 21" fill="none">
      <path d="M5.5 12.7C8.7 11.4 12.3 11.4 15.5 12.7" stroke="url(#grad)" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M10.5 2.5C12.7 2.5 14.4 4.2 14.4 6.4C14.4 8.6 12.7 10.3 10.5 10.3C8.3 10.3 6.6 8.6 6.6 6.4C6.6 4.2 8.3 2.5 10.5 2.5Z" stroke="url(#grad)" strokeWidth="1.8" strokeLinecap="round"/>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="21" y2="21">
          <stop offset="0%" stopColor="#D14E9A" />
          <stop offset="100%" stopColor="#FF566D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
