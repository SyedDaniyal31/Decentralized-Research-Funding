const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth, requireRole } = require('../middleware/auth');
const ipfsService = require('../services/ipfs');
const blockchainService = require('../services/blockchain');
const router = express.Router();
const prisma = new PrismaClient();

// GET /proposals
router.get('/', async (req, res) => {
  const proposals = await prisma.proposal.findMany({ include: { researcher: true, milestones: true } });
  res.json(proposals);
});

// GET /proposals/:id
router.get('/:id', async (req, res) => {
  const proposal = await prisma.proposal.findUnique({
    where: { id: req.params.id },
    include: { researcher: true, milestones: true }
  });
  if (!proposal) return res.status(404).json({ error: 'Not found' });
  res.json(proposal);
});

// POST /proposals
router.post('/', requireAuth, requireRole('RESEARCHER'), async (req, res) => {
  const { title, abstract, ipfsHash, fundingAmount, milestoneCount } = req.body;
  if (!title || !ipfsHash || !fundingAmount || !milestoneCount) return res.status(400).json({ error: 'Missing fields' });
  const proposal = await prisma.proposal.create({
    data: {
      title,
      abstract,
      ipfsHash,
      fundingAmount,
      researcherId: req.user.id,
      milestones: {
        create: Array.from({ length: milestoneCount }).map((_, i) => ({ index: i }))
      }
    },
    include: { milestones: true }
  });
  // Call blockchain to submit proposal
  await blockchainService.submitProposal(ipfsHash, fundingAmount, milestoneCount, req.user.wallet);
  res.json(proposal);
});

// POST /proposals/:id/milestones
router.post('/:id/milestones', requireAuth, requireRole('RESEARCHER'), async (req, res) => {
  const { ipfsProof, index } = req.body;
  if (!ipfsProof || typeof index !== 'number') return res.status(400).json({ error: 'Missing fields' });
  const milestone = await prisma.milestone.update({
    where: { proposalId_index: { proposalId: req.params.id, index } },
    data: { ipfsProof }
  });
  // Call blockchain to submit milestone
  await blockchainService.submitMilestone(req.params.id, ipfsProof, req.user.wallet);
  res.json(milestone);
});

module.exports = router;
