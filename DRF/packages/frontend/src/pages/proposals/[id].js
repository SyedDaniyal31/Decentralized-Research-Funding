import React from 'react';
import VotingInterface from '../../components/VotingInterface';
import MilestoneTracker from '../../components/MilestoneTracker';

export default function ProposalDetail() {
  // Fetch proposal by ID
  // const proposal = ...
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Proposal Title</h1>
      {/* Proposal details, researcher info, etc. */}
      <VotingInterface />
      <MilestoneTracker />
    </div>
  );
}
