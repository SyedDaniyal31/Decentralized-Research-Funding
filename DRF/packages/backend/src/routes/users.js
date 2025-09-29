const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth, requireRole } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

// GET /users/me
router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { wallet: req.user.wallet } });
  res.json(user);
});

// POST /users/register
router.post('/register', async (req, res) => {
  const { wallet, role, name, email } = req.body;
  if (!wallet || !role) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await prisma.user.create({
      data: { wallet, role, name, email }
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// PUT /users/me
router.put('/me', requireAuth, async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { wallet: req.user.wallet },
    data: { name, email }
  });
  res.json(user);
});

module.exports = router;
