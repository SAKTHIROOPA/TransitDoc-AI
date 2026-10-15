import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DecodedJwtModal from './DecodedJwtModal';
import AboutModal from './AboutModal';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jwtModalOpen, setJwtModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onOpenAbout={() => setAboutModalOpen(true)}
      />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
        }`}
      >
        {/* Topbar */}
        <Topbar
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
          onOpenJwtModal={() => setJwtModalOpen(true)}
          onOpenAbout={() => setAboutModalOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
          <Outlet />
        </main>
      </div>

      {/* Modals */}
      <DecodedJwtModal
        isOpen={jwtModalOpen}
        onClose={() => setJwtModalOpen(false)}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </div>
  );
}
