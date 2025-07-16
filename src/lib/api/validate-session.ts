// pages/api/validate-session.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import redisClient from '@/lib/redis'; // seu client redis configurado

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const session = await redisClient.get(`associado:${token}`);

  if (!session) {
    return res.status(401).json({ error: 'Sessão inválida ou expirada' });
  }

  return res.status(200).json({ message: 'Sessão válida', session: JSON.parse(session) });
}
