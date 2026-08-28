import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Bookmark, 
  PlusCircle, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  MessageSquare,
  LogOut,
  LogIn,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onOpenPostProject: () => void;
  savedCount: number;
  unreadMessagesCount: number;
  onOpenAuth: (mode?: 'login' | 'register', role?: UserRole) => void;
  onLogout: () => void;
  onSearchSubmit: (query: string, type: 'projects' | 'freelancers') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userProfile,
  setUserProfile,
  onOpenPostProject,
  savedCount,
  unreadMessagesCount,
  onOpenAuth,
  onLogout,
  onSearchSubmit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [searchType, setSearchType] = useState<'projects' | 'freelancers'>('projects');

  const toggleRole = () => {
    const newRole: UserRole = userProfile.role === 'freelancer' ? 'client' : 'freelancer';
    setUserProfile(prev => ({
      ...prev,
      role: newRole
    }));
  };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      onSearchSubmit(navSearch.trim(), searchType);
      if (searchType === 'projects') {
        setCurrentTab('projects');
      } else {
        setCurrentTab('freelancers');
      }
      setNavSearch('');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Explore Projects' },
    { id: 'freelancers', label: 'Find Freelancers' },
    { id: 'messages', label: 'Messages', badge: unreadMessagesCount },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => {
                setCurrentTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">Lanc<span className="text-emerald-600">ly</span></span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5 font-medium">Freelance Marketplace</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setCurrentTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer relative flex items-center gap-1.5 ${
                    currentTab === item.id
                      ? 'text-emerald-700 bg-emerald-50/90 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar in Desktop Header */}
          <div className="hidden xl:flex items-center flex-1 max-w-xs mx-6">
            <form onSubmit={handleNavSearch} className="w-full relative">
              <input
                id="header-search-input"
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder={`Search ${searchType}...`}
                className="w-full pl-9 pr-20 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <div className="absolute right-1.5 top-1.5 flex items-center">
                <button
                  type="button"
                  onClick={() => setSearchType(searchType === 'projects' ? 'freelancers' : 'projects')}
                  className="text-[10px] font-semibold uppercase text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                  title="Toggle search mode"
                >
                  {searchType === 'projects' ? 'Jobs' : 'Talent'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            {/* Quick Role Switcher Pill */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                id="role-switch-freelancer-btn"
                onClick={() => setUserProfile(prev => ({ ...prev, role: 'freelancer' }))}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  userProfile.role === 'freelancer'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Freelancer
              </button>
              <button
                id="role-switch-client-btn"
                onClick={() => setUserProfile(prev => ({ ...prev, role: 'client' }))}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  userProfile.role === 'client'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Client
              </button>
            </div>

            {/* Messages Icon Button */}
            <button
              id="messages-nav-btn"
              onClick={() => setCurrentTab('messages')}
              title="Messages & Negotiations"
              className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Saved Bookmarks Button */}
            <button
              id="saved-projects-nav-btn"
              onClick={() => {
                setCurrentTab('dashboard');
              }}
              title="Saved Projects"
              className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Post a Project CTA Button */}
            <button
              id="post-project-nav-btn"
              onClick={onOpenPostProject}
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Project</span>
            </button>

            {/* User Profile Dropdown & Auth Controls */}
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-8 h-8 rounded-xl object-cover border border-emerald-500/30 shadow-2xs"
                />
                <span className="hidden md:block text-xs font-bold text-slate-800 max-w-[90px] truncate text-left">
                  {userProfile.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Profile</p>
                    <p className="text-sm font-extrabold text-slate-900 truncate mt-0.5">{userProfile.name}</p>
                    <p className="text-xs text-slate-500 truncate">{userProfile.email}</p>
                    
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Role: {userProfile.role === 'freelancer' ? 'Freelancer' : 'Client'}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800">
                        Bal: ${(userProfile.balance || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => setCurrentTab('dashboard')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Dashboard & Proposals</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => setCurrentTab('messages')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Messages & Inquiries</span>
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={toggleRole}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Switch to {userProfile.role === 'freelancer' ? 'Client' : 'Freelancer'} Mode</span>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase">Toggle</span>
                    </button>
                    <button
                      onClick={() => onOpenAuth('register')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Create Another Account</span>
                      <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                  </div>

                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Sign Out / Switch User</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleNavSearch} className="relative mb-3">
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search projects or talent..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 text-sm rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-3">
            <button
              onClick={() => setUserProfile(prev => ({ ...prev, role: 'freelancer' }))}
              className={`py-2 text-xs font-semibold rounded-lg text-center ${
                userProfile.role === 'freelancer' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Freelancer Mode
            </button>
            <button
              onClick={() => setUserProfile(prev => ({ ...prev, role: 'client' }))}
              className={`py-2 text-xs font-semibold rounded-lg text-center ${
                userProfile.role === 'client' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Client Mode
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  currentTab === item.id
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPostProject();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Project</span>
            </button>
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Sign In / Switch User
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
