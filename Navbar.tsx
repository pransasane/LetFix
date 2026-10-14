import React, { useState } from 'react';
import { 
  PlusCircle, 
  BarChart3, 
  Map as MapIcon, 
  FileText, 
  Menu, 
  X, 
  ShieldCheck, 
  Info,
  Search,
  CheckCircle2,
  ArrowRight,
  Hash
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, reportId?: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onTrackComplaintId?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isAdmin,
  onToggleAdmin,
  onTrackComplaintId
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackInput, setTrackInput] = useState('');
  const [trackError, setTrackError] = useState('');

  const navItems = [
    { id: 'home', label: 'Home', icon: MapIcon },
    { id: 'map', label: 'Explore Map', icon: MapIcon },
    { id: 'reports', label: 'All Complaints', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackInput.trim().toUpperCase();
    if (!clean) {
      setTrackError('Please enter your Complaint ID (e.g. LF-2026-0101)');
      return;
    }
    if (onTrackComplaintId) {
      onTrackComplaintId(clean);
    } else {
      onNavigate('report-detail', clean);
    }
    setTrackModalOpen(false);
    setTrackInput('');
    setTrackError('');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Professional Let'sFix Logo (Civic-Tech badge removed) */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              {/* Bespoke Geometric Brand Emblem */}
              <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-slate-800 transition-all shadow-md flex items-center justify-center p-2 relative overflow-hidden">
                <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                  {/* Subtle background grid mark */}
                  <circle cx="16" cy="16" r="14" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Modern Location Pin Body */}
                  <path 
                    d="M16 3C10.477 3 6 7.477 6 13C6 20.5 16 29 16 29C16 29 26 20.5 26 13C26 7.477 21.523 3 16 3Z" 
                    fill="url(#pinGrad)" 
                  />
                  {/* Dynamic Repair / Fix Check Chevron */}
                  <path 
                    d="M12 13.5L14.5 16L20 10.5" 
                    stroke="#ffffff" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <defs>
                    <linearGradient id="pinGrad" x1="6" y1="3" x2="26" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0d9488" />
                      <stop offset="1" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Wordmark */}
              <div className="flex flex-col">
                <div className="flex items-baseline font-black tracking-tight text-2xl leading-none">
                  <span className="text-slate-900">Let's</span>
                  <span className="text-teal-600">Fix</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-0.5"></span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                  Municipal Action Portal
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
                      isActive
                        ? 'border-teal-600 text-slate-900 font-bold'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Area */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* Track Complaint Button */}
              <button
                onClick={() => setTrackModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                title="Track real-time status of your complaint with Complaint ID"
              >
                <Search className="w-3.5 h-3.5 text-teal-600" />
                <span>Track Complaint</span>
              </button>

              {/* Admin Portal Toggle */}
              <button
                onClick={() => {
                  if (!isAdmin) {
                    onToggleAdmin();
                  } else {
                    handleNavClick('admin');
                  }
                }}
                title={isAdmin ? "Logged in as Municipal Officer (Click to open Admin Panel)" : "Log in as Municipal Officer"}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isAdmin
                    ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Officer Mode' : 'Officer Login'}</span>
              </button>

              {/* Prominent File a Complaint Button */}
              <button
                onClick={() => handleNavClick('report-issue')}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>File a Complaint</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setTrackModalOpen(true)}
                className="p-1.5 text-slate-700 bg-slate-100 rounded-lg text-xs"
                title="Track"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavClick('report-issue')}
                className="bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setTrackModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 mb-2 border border-teal-200"
            >
              <Search className="w-4 h-4 text-teal-600" />
              <span>Track Complaint Status by ID</span>
            </button>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  if (!isAdmin) {
                    onToggleAdmin();
                  } else {
                    handleNavClick('admin');
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>{isAdmin ? 'Officer Mode (Active)' : 'Municipal Officer Access'}</span>
                </span>
                {isAdmin && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Track Complaint Modal */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Hash className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Track Complaint Status
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Get real-time updates on your registered civic complaint
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTrackModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Enter Your Complaint ID or Ticket Number:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={trackInput}
                    onChange={(e) => {
                      setTrackInput(e.target.value);
                      setTrackError('');
                    }}
                    placeholder="e.g. LF-2026-0101 or LF-2026-XXXX"
                    className="w-full py-2.5 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 uppercase tracking-wider"
                    autoFocus
                  />
                  <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                </div>
                {trackError && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{trackError}</p>
                )}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
                <span className="font-semibold text-slate-800">Quick Demo Test IDs:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['LF-2026-0101', 'LF-2026-0102', 'LF-2026-0104'].map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setTrackInput(id)}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono hover:bg-teal-50 hover:border-teal-400 hover:text-teal-800 cursor-pointer"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setTrackModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Fetch Official Docket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
