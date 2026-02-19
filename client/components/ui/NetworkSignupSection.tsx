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
  }, []);

  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name);
  const validatePhone = (phone: string) => /^[0-9+\-\s]+$/.test(phone);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearAndReload = () => {
    setFormData({ name: "", phone: "", email: "", city: "" });
    setCitySuggestions([]);
    setTimeout(() => window.location.reload(), 400);
  };

  /* 🔥 UPDATED PROFESSIONAL PAYMENT FLOW */
  const handlePayment = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    if (!validateName(formData.name)) {
      alert("Invalid Name");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Invalid Phone");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Invalid Email");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    try {
      // ✅ STEP 1: Create order from backend
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
      });

      const orderData = await orderRes.json();

      if (!orderData.order_id) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SPACE AND BEAUTY CLUB",
        description: "Lifetime Membership",
        order_id: orderData.order_id, // VERY IMPORTANT

        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              amount: 2500,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const data = await verifyRes.json();

          if (data.success) {
            alert("Payment successful!");
            clearAndReload();
          } else {
            alert("Payment verification failed.");
          }
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
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <InputField
          label="Name*"
          value={formData.name}
          onChange={(e: any) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <InputField
          label="Phone*"
          value={formData.phone}
          onChange={(e: any) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />

        <InputField
          label="Email*"
          value={formData.email}
          onChange={(e: any) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        {/* City */}
        <div className="mt-4">
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
            placeholder="Choose City"
            className="w-full border p-3 rounded-lg"
          />

          {citySuggestions.length > 0 && (
            <div className="border mt-2 rounded-lg bg-white">
              {citySuggestions.map((city, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
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

        <button
          onClick={handlePayment}
          className="w-full mt-6 py-4 bg-pink-500 text-white rounded-full"
        >
          Life-Time Membership @ ₹2500
        </button>
      </div>
    </section>
  );
}

function InputField({ label, value, onChange }: any) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full border p-3 rounded-lg"
      />
    </div>
  );
}
