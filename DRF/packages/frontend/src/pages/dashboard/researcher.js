import React from 'react';
import MilestoneTracker from '../../components/MilestoneTracker';

export default function ResearcherDashboard() {
  // Fetch proposals and milestones for researcher
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Researcher Dashboard</h1>
      {/* Proposal status, milestone progress, funding received */}
      <MilestoneTracker />
    </div>
  );
}
