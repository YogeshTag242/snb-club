import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabase } from '../lib/supabase'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, phone, city, amount, payment_id } = req.body

    const { data, error } = await supabase.from('users').insert([
      {
        name,
        email,
        phone,
        city,
        amount,
        payment_status: 'paid',
        payment_id
      }
    ])

    if (error) throw error

    return res.status(200).json({ success: true, data })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
