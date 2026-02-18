import { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
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
    const {
      userId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    await supabase
      .from("users")
      .update({
        payment_status: "success",
        payment_id: razorpay_payment_id,
      })
      .eq("id", userId);

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
