import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false })
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
    } = req.body

    // 🔐 VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false })
    }

    // ✅ SAVE TO SUPABASE
    const { error } = await supabase.from('users').insert([
      {
        name,
        phone,
        email,
        city,
        amount,
        payment_status: 'paid',
        payment_id: razorpay_payment_id,
      },
    ])

    if (error) {
      return res.status(500).json({ success: false })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ success: false })
  }
}
