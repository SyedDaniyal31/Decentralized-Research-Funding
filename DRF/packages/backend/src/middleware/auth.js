const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const prisma = new PrismaClient();

async function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // If id/role missing, load from DB
    if (!payload.id || !payload.role) {
      const user = await prisma.user.findUnique({ where: { wallet: payload.wallet } });
      if (!user) return res.status(401).json({ error: 'User not found' });
      req.user = { id: user.id, wallet: user.wallet, role: user.role };
    } else {
      req.user = payload;
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

module.exports = { requireAuth, requireRole };
