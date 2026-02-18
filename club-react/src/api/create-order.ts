import type { VercelRequest, VercelResponse } from "@vercel/node";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, city, amount } = req.body;

    // ✅ Insert user as pending
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          phone,
          city,
          amount,
          payment_status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return res.status(400).json({ error: error.message });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // ✅ FIXED HERE
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise correctly
      currency: "INR",
      receipt: data.id.toString(),
    });

    return res.status(200).json({
      orderId: order.id,
      userId: data.id,
      amount: order.amount,
    });

  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
