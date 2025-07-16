// pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import redisClient from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (token) {
    await redisClient.del(`associado:${token}`);
  }

  res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');

  res.status(200).json({ message: 'Logout realizado' });
}
