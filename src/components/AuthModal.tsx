import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  Building2, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, UserRole, ExperienceLevel } from '../types';
import { DEMO_CLIENT_ACCOUNT, DEMO_FREELANCER_ACCOUNT } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
  initialRole?: UserRole;
  allAccounts: UserProfile[];
  onSaveAccount: (account: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
  initialRole = 'freelancer',
  allAccounts,
  onSaveAccount
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Role specific fields
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(65);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Expert');
  const [skills, setSkills] = useState('React, TypeScript, Tailwind CSS');
  const [location, setLocation] = useState('Austin, TX, USA');
  const [bio, setBio] = useState('');

  const handleQuickDemoLogin = (demoRole: UserRole) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const account = demoRole === 'client' ? DEMO_CLIENT_ACCOUNT : DEMO_FREELANCER_ACCOUNT;
      onLoginSuccess(account);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      onClose();
    }, 400);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (mode === 'login') {
        // Search in existing accounts or match demo
        const existing = allAccounts.find(
          acc => acc.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (existing) {
          onLoginSuccess(existing);
          onClose();
        } else {
          // If not found, dynamically log in / create session with standard defaults
          const isClient = email.toLowerCase().includes('client') || email.toLowerCase().includes('sarah');
          const dynamicUser: UserProfile = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()),
            email: email.trim(),
            role: isClient ? 'client' : 'freelancer',
            avatar: isClient 
              ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
            title: isClient ? 'Hiring Manager & Product Lead' : 'Full-Stack Developer',
            bio: 'Active member on Lancly marketplace.',
            hourlyRate: isClient ? 0 : 70,
            experienceLevel: 'Expert',
            skills: isClient ? ['Project Management', 'Hiring'] : ['React', 'TypeScript', 'Node.js'],
            location: 'San Francisco, CA',
            companyName: isClient ? 'InnovateCorp' : '',
            savedProjectIds: [],
            balance: isClient ? 10000 : 2500,
            escrowLocked: 0,
            totalEarned: isClient ? 0 : 12000,
            totalSpent: isClient ? 15000 : 0,
            memberSince: 'Aug 2026',
            verified: true
          };
          onSaveAccount(dynamicUser);
          onLoginSuccess(dynamicUser);
          onClose();
        }
      } else {
        // Registration Flow
        if (!name.trim()) {
          setErrorMsg('Please enter your full name.');
          return;
        }

        const skillsArr = skills.split(',').map(s => s.trim()).filter(Boolean);
        const newUser: UserProfile = {
          id: 'user-' + Date.now(),
          name: name.trim(),
          email: email.trim(),
          password: password,
          role: selectedRole,
          avatar: selectedRole === 'client'
            ? 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          title: selectedRole === 'client' ? (title || 'VP of Operations') : (title || 'Freelance Specialist'),
          bio: bio.trim() || (selectedRole === 'client' ? 'Looking to hire verified top-tier talent.' : 'Passionate freelancer delivering high-quality deliverables on time.'),
          hourlyRate: selectedRole === 'client' ? 0 : Number(hourlyRate || 50),
          experienceLevel: experienceLevel,
          skills: skillsArr.length > 0 ? skillsArr : ['UI/UX', 'Development'],
          location: location.trim() || 'United States',
          companyName: selectedRole === 'client' ? (companyName.trim() || 'Venture Studio') : '',
          savedProjectIds: [],
          balance: selectedRole === 'client' ? 8500 : 1200,
          escrowLocked: 0,
          totalEarned: 0,
          totalSpent: 0,
          memberSince: 'Aug 2026',
          verified: true
        };

        onSaveAccount(newUser);
        onLoginSuccess(newUser);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        onClose();
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              L
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-none">
                {mode === 'login' ? 'Welcome Back to Lancly' : 'Create Your Lancly Account'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'login' 
                  ? 'Sign in to manage your proposals, escrows, and messages' 
                  : 'Join thousands of verified clients & top freelancers'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle (Login vs Register) */}
        <div className="p-1.5 mx-6 mt-4 bg-slate-100 rounded-2xl grid grid-cols-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              mode === 'login' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              mode === 'register' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Quick Demo Credentials Bar */}
        <div className="px-6 pt-3">
          <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Quick Test 1-Click Access
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">Instant session</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('client')}
                className="px-3 py-2 bg-white hover:bg-emerald-100/50 border border-emerald-200 rounded-xl text-left transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-slate-900">Sarah Connor</p>
                <p className="text-[10px] text-emerald-700 font-medium">Demo Client (VP Product)</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('freelancer')}
                className="px-3 py-2 bg-white hover:bg-emerald-100/50 border border-emerald-200 rounded-xl text-left transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-slate-900">Nitin Saini</p>
                <p className="text-[10px] text-emerald-700 font-medium">Demo Freelancer (Dev)</p>
              </button>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAuthSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              {errorMsg}
            </div>
          )}

          {/* Registration Role Selection */}
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Your Primary Account Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('client')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'client'
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Building2 className={`w-5 h-5 ${selectedRole === 'client' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    {selectedRole === 'client' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs font-bold text-slate-900">I am a Client</p>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Post projects, hire talent & fund milestones</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('freelancer')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'freelancer'
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Briefcase className={`w-5 h-5 ${selectedRole === 'freelancer' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    {selectedRole === 'freelancer' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs font-bold text-slate-900">I am a Freelancer</p>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Bid on jobs, deliver milestones & earn payouts</p>
                </button>
              </div>
            </div>
          )}

          {/* Full Name for Registration */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Additional Role-Specific Fields during Registration */}
          {mode === 'register' && selectedRole === 'client' && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Digital Corp"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Head of Product"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === 'register' && selectedRole === 'freelancer' && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior React Developer"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hourly Rate ($/hr)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Top Skills (comma-separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, TypeScript, Tailwind, Node.js"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
          >
            {loading ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Escrow & Identity Protected</span>
          </div>
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            {mode === 'login' ? "Don't have an account? Sign Up" : 'Already registered? Log In'}
          </button>
        </div>

      </div>
    </div>
  );
};
