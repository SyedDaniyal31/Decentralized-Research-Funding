const express = require('express');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const prisma = new PrismaClient();

// POST /auth/login
router.post('/login', async (req, res) => {
  const { wallet, signature, message } = req.body;
  if (!wallet || !signature || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    // ethers v6: ethers.verifyMessage
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    // Upsert user by wallet
    let user = await prisma.user.findUnique({ where: { wallet } });
    if (!user) {
      user = await prisma.user.create({ data: { wallet } });
    }
    // Issue JWT with id, wallet, role
    const token = jwt.sign({ id: user.id, wallet: user.wallet, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: 'Signature verification failed' });
  }
});

// POST /auth/logout
router.post('/logout', (req, res) => {
  // Client should delete token
  res.json({ success: true });
});

// POST /auth/refresh
router.post('/refresh', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign({ wallet: payload.wallet }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
