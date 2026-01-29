import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";


export default function NetworkSignupSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  /* Load Razorpay script */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* Razorpay handler */
  const handlePayment = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_8sKJHd9xxx", // 🔴 replace with your key
      amount: 2500 * 100, // in paise
      currency: "INR",
      name: "Your Brand Name",
      description: "Lifetime Membership",
      image: "/logo.png",

      handler: function (response) {
        console.log("Payment Success:", response.razorpay_payment_id);
        alert("Payment successful!");
        // You can redirect or save data here
      },

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },

      notes: {
        city: formData.city,
      },

      theme: {
        color: "#FF566D",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <section id="form-section" className="bg-bg-light py-24 relative overflow-hidden" >
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              icon={<UserIcon />}
            />

            <InputField
              label="Phone Number with Country Code*"
              placeholder="+91-9021-3424-20"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              icon={<Phone className="w-5 h-5 text-pink-primary" />}
            />

            <InputField
              label="Email*"
              placeholder="jennifer@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              icon={<Mail className="w-5 h-5 text-pink-primary" />}
            />

            {/* City */}
            <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-gray-300">
              <MapPin className="w-5 h-5 text-pink-primary" />
              <div className="flex-1">
                <label className="font-visby text-xs gradient-text font-medium block">
                  Choose city
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="Chennai, Tamil Nadu"
                  className="w-full font-visby text-lg font-medium text-black/50 outline-none"
                />
              </div>
              <ChevronDown className="w-5 h-5 text-black" />
            </div>

            {/* CTA */}
            <button
              onClick={handlePayment}
              type="button"
              className="w-full py-4 rounded-full bg-gradient-primary text-white font-visby font-medium text-base md:text-xl hover:opacity-90 transition "
            >
              <span className="gradient-text1">Life-Time Membership @ ₹2500</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable Input */
function InputField({ label, value, onChange, placeholder, icon }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-gray-300">
      <div className="flex-1">
        <label className="font-visby text-xs gradient-text font-medium block">
          {label}
        </label>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full font-visby text-lg font-medium text-black/50 outline-none"
        />
      </div>
      {icon}
    </div>
  );
}

/* Name Icon */
function UserIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 21 21" fill="none">
      <path
        d="M5.5 12.7C8.7 11.4 12.3 11.4 15.5 12.7"
        stroke="url(#grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.5 2.5C12.7 2.5 14.4 4.2 14.4 6.4
           C14.4 8.6 12.7 10.3 10.5 10.3
           C8.3 10.3 6.6 8.6 6.6 6.4
           C6.6 4.2 8.3 2.5 10.5 2.5Z"
        stroke="url(#grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="21" y2="21">
          <stop offset="0%" stopColor="#D14E9A" />
          <stop offset="100%" stopColor="#FF566D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
