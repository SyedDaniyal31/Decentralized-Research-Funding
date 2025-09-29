import React from 'react';

export default function ProposalCard({ proposal }) {
  // Destructure proposal fields
  // const { title, researcher, fundingAmount, status } = proposal;
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow">
      {/* Proposal summary info */}
      <h2 className="text-xl font-semibold">Proposal Title</h2>
      {/* Funding progress, voting status, quick actions */}
    </div>
  );
}
