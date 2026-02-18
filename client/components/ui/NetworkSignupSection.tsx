import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";



export default function NetworkSignupSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const [citySuggestions, setCitySuggestions] = useState([]);

  /* List of cities for suggestions */
  const cities = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupattur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
  "Kallakurichi",
  "Thane",            
  "Bangalore",  
  "Mumbai",   
  "Kolkata",     
  "Hyderabad",       
  "Ahmedabad",          
  "Pune",                
  "Gautam Buddh Nagar",  
  "Gurugram",           
  "Rangareddy",          
  "Dakshina Kannada",    
  "Delhi",     
  "Jaipur",        
  "Lucknow",             
  "Kanpur Nagar",        
  "Agra",                
  "Vadodara",           
  "Surat",               
  "Visakhapatnam",       
  "Thiruvananthapuram",  
  "Ernakulam",           
  "Nagpur",             
  "Indore",            
  "Bhopal",              
  "Patna",              
  "Varanasi",            
  "Howrah",              
  "Guwahati", 
  "Ranchi",              
  "Jabalpur",            
  "Cuttack",             
  "Bhubaneswar",
  "Raipur",             
  "Nagaland",    
  "Shimla",            
  "Dehradun",            
  "Gwalior",             
  "Patiala",             
  "Amritsar",            
  "Jalandhar",           
  "Hoshiarpur",          
  "Kolkata",      
  
  ];

  /* Load Razorpay script */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* Validation functions */
  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validatePhone = (phone) => /^[0-9+\-\s]+$/.test(phone);
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* CLEAR + RELOAD */
  const clearAndReload = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      city: "",
    });
    setCitySuggestions([]);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  /* Razorpay handler */
  const handlePayment = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    if (!validateName(formData.name)) {
      alert("Name should contain only alphabets");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Phone should contain only numbers or + -");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Enter valid email");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = { 
      key: "rzp_live_S9bksWa04mgxRd", // replace with your key id
      amount: 1 * 100,
      currency: "INR",
      name: "SPACE AND BEAUTY CLUB",
      description: "Lifetime Membership",
      image:
        "https://spaceandbeauty.com/cdn/shop/files/PNG_Black_copy.png?v=1767685453&width=100",

     handler: async function (response: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) {
  const res = await fetch("/api/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      amount: 1,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    }),
  });

  const data: { success: boolean } = await res.json();

  if (data.success) {
    clearAndReload();
  } else {
    alert("Payment verification failed. Contact support.");
  }
},

      /* CANCEL / FAILURE */
      modal: {
        ondismiss: function () {
          clearAndReload();
        },
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
              onChange={(e) => {
                const val = e.target.value;
                if (/^[A-Za-z\s]*$/.test(val)) {
                  setFormData({ ...formData, name: val });
                }
              }}
              icon={<UserIcon />}
            />

            <InputField
              label="Phone Number with Country Code*"
              placeholder="+91-9021-3424-20"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9+\-\s]*$/.test(val)) {
                  setFormData({ ...formData, phone: val });
                }
              }}
              icon={<Phone className="w-5 h-5 text-pink-primary" />}
            />

            <InputField
              label="Email*"
              placeholder="jennifer@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              icon={<Mail className="w-5 h-5 text-pink-primary " />}
            />

            {/* City */}
            <div className="relative">
              <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-gray-300">
                <MapPin className="w-5 h-5 text-pink-primary" />
                <div className="flex-1">
                  <label className="font-visby text-xs gradient-text font-medium block">
                    Choose city
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, city: value });
                      if (value.length >= 2) {
                        const filtered = cities.filter((c) =>
                          c.toLowerCase().includes(value.toLowerCase())
                        );
                        setCitySuggestions(filtered);
                      } else {
                        setCitySuggestions([]);
                      }
                    }}
                    placeholder="Chennai, Tamil Nadu"
                    className="w-full font-visby text-lg font-medium text-black placeholder-gray-400 outline-none"
                  />
                </div>
                <ChevronDown className="w-5 h-5 text-black" />
              </div>

              {/* Suggestions */}
              {citySuggestions.length > 0 && (
                <div className="absolute w-full bg-white border rounded-xl mt-2 max-h-40 overflow-y-auto z-20">
                  {citySuggestions.map((city, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setFormData({ ...formData, city });
                        setCitySuggestions([]);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
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
          className="w-full font-visby text-lg font-medium text-black placeholder-gray-400 outline-none"
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
