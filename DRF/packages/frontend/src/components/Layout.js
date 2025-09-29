import React from 'react';
import WalletConnect from './WalletConnect';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-4 bg-primary text-white">
        <h1 className="text-xl font-bold">DRF Platform</h1>
        <WalletConnect />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="px-6 py-4 bg-dark text-white text-center">&copy; {new Date().getFullYear()} DRF</footer>
    </div>
  );
}
