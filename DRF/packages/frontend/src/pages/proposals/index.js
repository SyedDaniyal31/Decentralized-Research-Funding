import React from 'react';
import ProposalCard from '../../components/ProposalCard';

export default function ProposalsList() {
  // Fetch proposals from API
  // const proposals = ...
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Proposals</h1>
      {/* Map proposals to ProposalCard */}
      {/* proposals.map(p => <ProposalCard key={p.id} proposal={p} />) */}
    </div>
  );
}
