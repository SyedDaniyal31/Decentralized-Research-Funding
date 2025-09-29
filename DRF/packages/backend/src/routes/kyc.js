const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth, requireRole } = require('../middleware/auth');
const kycService = require('../services/kyc');
const router = express.Router();
const prisma = new PrismaClient();

// POST /kyc/initiate
router.post('/initiate', requireAuth, async (req, res) => {
  try {
    const kyc = await kycService.initiateKYC(req.user.wallet);
    res.json(kyc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /kyc/status
router.get('/status', requireAuth, async (req, res) => {
  const kyc = await prisma.kYC.findUnique({ where: { userId: req.user.id } });
  res.json(kyc);
});

// POST /kyc/webhook
router.post('/webhook', async (req, res) => {
  try {
    await kycService.handleWebhook(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /kyc/approve
router.post('/approve', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { userId } = req.body;
  await prisma.kYC.update({ where: { userId }, data: { status: 'APPROVED' } });
  res.json({ success: true });
});

// POST /kyc/reject
router.post('/reject', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { userId } = req.body;
  await prisma.kYC.update({ where: { userId }, data: { status: 'REJECTED' } });
  res.json({ success: true });
});

module.exports = router;
