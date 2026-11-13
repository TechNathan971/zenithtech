import type { NextApiRequest, NextApiResponse } from "next";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }

  // For now the address is only checked, not stored. Step 13 saves it in the database.
  return res.status(200).json({ ok: true });
}
