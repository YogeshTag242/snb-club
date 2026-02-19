import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Supabase admin client — service role key bypasses RLS for trusted writes
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      phone,
      email,
      city,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    // ✅ STEP 1: Verify signature to confirm payment is genuine
    // Razorpay signs the payment using: order_id + "|" + payment_id
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      // Signature mismatch = payment is fake or tampered
      return res.status(400).json({
        success: false,
        error: "Payment signature verification failed. Possible fraud attempt.",
      });
    }

    // ✅ STEP 2: Signature matched — save everything to Supabase
    const { error: dbError } = await supabase.from("members").insert([
      {
        name,
        phone,
        email,
        city,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        amount: 2500,        // ₹2500 (store in rupees for readability)
        amount_paise: 250000, // 250000 paise
        status: "success",
        // created_at is auto-set by Supabase if you add it as default: now()
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Payment was real but DB failed — log it so you don't lose the record
      return res.status(500).json({
        success: false,
        error: "Payment verified but failed to save. Contact support with payment ID: " + razorpay_payment_id,
      });
    }

    // ✅ All done!
    return res.status(200).json({ success: true });

  } catch (err: any) {
    console.error("Verify payment error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
