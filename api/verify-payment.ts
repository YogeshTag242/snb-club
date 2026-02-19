import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("🔥 API HIT");
  console.log("Method:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      phone,
      email,
      city,
      amount,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    console.log("📦 Request Body:", req.body);

    // ✅ Check required env variables
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      !process.env.RAZORPAY_SECRET
    ) {
      console.error("❌ Missing environment variables");
      return res.status(500).json({ success: false });
    }

    // ✅ Check required fields
    if (
      !name ||
      !phone ||
      !email ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ success: false });
    }

    // ✅ Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Signature mismatch");
      return res.status(400).json({ success: false });
    }

    console.log("✅ Signature verified");

    // ✅ Create Supabase client INSIDE function
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // ✅ Insert into Supabase
    const { data, error } = await supabase.from("members").insert([
      {
        name,
        phone,
        email,
        city,
        amount,
        razorpay_payment_id,
        razorpay_order_id,
      },
    ]);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return res.status(500).json({ success: false });
    }

    console.log("✅ Data inserted successfully:", data);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Server Error:", err);
    return res.status(500).json({ success: false });
  }
}
