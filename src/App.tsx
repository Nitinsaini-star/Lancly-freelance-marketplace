import React, { useState, useEffect, useCallback } from 'react';
import { 
  getStoredProjects, 
  saveStoredProjects, 
  getStoredFreelancers, 
  saveStoredFreelancers, 
  getStoredProposals, 
  saveStoredProposals, 
  getStoredUserProfile, 
  saveStoredUserProfile,
  getStoredUserAccounts,
  saveStoredUserAccounts,
  getStoredConversations,
  saveStoredConversations,
  getStoredMessages,
  saveStoredMessages,
  INITIAL_CATEGORIES,
  resetAllData,
  DEMO_CLIENT_ACCOUNT,
  DEMO_FREELANCER_ACCOUNT
} from './data/mockData';
import { 
  Project, 
  Freelancer, 
  Proposal, 
  UserProfile, 
  ProjectFilterState, 
  FreelancerFilterState,
  Conversation,
  ChatMessage,
  ChatAttachment,
  UserRole
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { FeaturedFreelancersSection } from './components/FeaturedFreelancersSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ProjectListings } from './components/ProjectListings';
import { FreelancerListings } from './components/FreelancerListings';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { FreelancerProfileModal } from './components/FreelancerProfileModal';
import { HireModal } from './components/HireModal';
import { PostProjectModal } from './components/PostProjectModal';
import { DashboardView } from './components/DashboardView';
import { MessagingView } from './components/MessagingView';
import { MilestoneModal } from './components/MilestoneModal';
import { AuthModal } from './components/AuthModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Navigation tab state: 'home' | 'projects' | 'freelancers' | 'how-it-works' | 'messages' | 'dashboard'
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Core Data States
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());
  const [freelancers, setFreelancers] = useState<Freelancer[]>(() => getStoredFreelancers());
  const [proposals, setProposals] = useState<Proposal[]>(() => getStoredProposals());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getStoredUserProfile());
  const [userAccounts, setUserAccounts] = useState<UserProfile[]>(() => getStoredUserAccounts());
  const [conversations, setConversations] = useState<Conversation[]>(() => getStoredConversations());
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => getStoredMessages());
  const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
    const stored = getStoredConversations();
    return stored.length > 0 ? stored[0].id : null;
  });

  const categories = INITIAL_CATEGORIES;

  // Filter States
  const [projectFilters, setProjectFilters] = useState<ProjectFilterState>({
    searchQuery: '',
    category: 'all',
    budgetType: 'all',
    minBudget: 0,
    maxBudget: 0,
    experienceLevel: 'all',
    status: 'all',
    sortBy: 'newest'
  });

  const [freelancerFilters, setFreelancerFilters] = useState<FreelancerFilterState>({
    searchQuery: '',
    category: 'all',
    experienceLevel: 'all',
    minRating: 0,
    maxHourlyRate: 0,
    availableOnly: false,
    sortBy: 'rating'
  });

  // Modal Dialogs State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const [hireFreelancer, setHireFreelancer] = useState<Freelancer | null>(null);
  const [isPostProjectOpen, setIsPostProjectOpen] = useState<boolean>(false);
  const [selectedMilestoneProposal, setSelectedMilestoneProposal] = useState<Proposal | null>(null);
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalRole, setAuthModalRole] = useState<UserRole>('freelancer');

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to LocalStorage on updates
  useEffect(() => {
    saveStoredProjects(projects);
  }, [projects]);

  useEffect(() => {
    saveStoredFreelancers(freelancers);
  }, [freelancers]);

  useEffect(() => {
    saveStoredProposals(proposals);
  }, [proposals]);

  useEffect(() => {
    saveStoredUserProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    saveStoredUserAccounts(userAccounts);
  }, [userAccounts]);

  useEffect(() => {
    saveStoredConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    saveStoredMessages(messages);
  }, [messages]);

  // Calculate unread messages count
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  // Authentication Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login', role: UserRole = 'freelancer') => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (account: UserProfile) => {
    setUserProfile(account);
    showToast(`Welcome back, ${account.name}! Signed in as ${account.role}.`, 'success');
  };

  const handleLogout = () => {
    // Switch to opposite demo or prompt login
    const nextAccount = userProfile.role === 'client' ? DEMO_FREELANCER_ACCOUNT : DEMO_CLIENT_ACCOUNT;
    setUserProfile(nextAccount);
    showToast(`Switched active profile session to ${nextAccount.name} (${nextAccount.role}).`, 'info');
  };

  const handleSaveAccount = (account: UserProfile) => {
    setUserAccounts(prev => {
      const idx = prev.findIndex(a => a.id === account.id || a.email.toLowerCase() === account.email.toLowerCase());
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = account;
        return updated;
      }
      return [account, ...prev];
    });
  };

  // Toggle bookmark/saved project
  const handleToggleSaveProject = useCallback((projectId: string) => {
    setUserProfile((prev) => {
      const isCurrentlySaved = prev.savedProjectIds.includes(projectId);
      const updatedSaved = isCurrentlySaved
        ? prev.savedProjectIds.filter((id) => id !== projectId)
        : [...prev.savedProjectIds, projectId];

      showToast(
        isCurrentlySaved ? 'Project removed from saved items.' : 'Project saved to your bookmarks!',
        'info'
      );

      return {
        ...prev,
        savedProjectIds: updatedSaved
      };
    });
  }, [showToast]);

  // Search Submissions
  const handleSearchSubmit = useCallback((query: string, type: 'projects' | 'freelancers') => {
    if (type === 'projects') {
      setProjectFilters((prev) => ({ ...prev, searchQuery: query, category: 'all' }));
      setCurrentTab('projects');
    } else {
      setFreelancerFilters((prev) => ({ ...prev, searchQuery: query, category: 'all' }));
      setCurrentTab('freelancers');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleHeroSearch = useCallback((query: string, category: string, mode: 'projects' | 'freelancers') => {
    if (mode === 'projects') {
      setProjectFilters((prev) => ({
        ...prev,
        searchQuery: query,
        category: category || 'all'
      }));
      setCurrentTab('projects');
    } else {
      setFreelancerFilters((prev) => ({
        ...prev,
        searchQuery: query,
        category: category || 'all'
      }));
      setCurrentTab('freelancers');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = useCallback((categoryName: string) => {
    setProjectFilters((prev) => ({
      ...prev,
      category: categoryName,
      searchQuery: ''
    }));
    setCurrentTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Submit Proposal with Milestones
  const handleSubmitProposal = useCallback((proposalData: Omit<Proposal, 'id' | 'submittedAt' | 'status'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: 'prop-' + Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      escrowFundedAmount: 0,
      releasedAmount: 0
    };

    setProposals((prev) => [newProposal, ...prev]);

    setProjects((prev) =>
      prev.map((p) =>
        p.id === proposalData.projectId
          ? { ...p, proposalsCount: p.proposalsCount + 1 }
          : p
      )
    );

    // Create / Connect Conversation Thread for this proposal
    const clientId = proposalData.clientId || 'user-client-1';
    const conversationId = `conv-${proposalData.projectId}-${userProfile.id}`;
    const newConv: Conversation = {
      id: conversationId,
      participantIds: [userProfile.id, clientId],
      projectId: proposalData.projectId,
      projectTitle: proposalData.projectTitle,
      proposalId: newProposal.id,
      participants: [
        {
          id: userProfile.id,
          name: userProfile.name,
          avatar: userProfile.avatar,
          role: 'freelancer',
          title: userProfile.title,
          isOnline: true
        },
        {
          id: clientId,
          name: proposalData.clientName,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
          role: 'client',
          company: proposalData.clientName,
          isOnline: true
        }
      ],
      lastMessage: `Submitted proposal: $${proposalData.bidAmount} with ${proposalData.milestones?.length || 0} milestones`,
      lastMessageTimestamp: new Date().toISOString(),
      unreadCount: 0,
      type: 'proposal'
    };

    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: conversationId,
      senderId: userProfile.id,
      senderName: userProfile.name,
      senderAvatar: userProfile.avatar,
      senderRole: userProfile.role,
      text: `Hello! I have submitted a formal proposal with ${proposalData.milestones?.length || 0} milestone phases for "${proposalData.projectTitle}".\n\nCover Letter: "${proposalData.coverLetter.substring(0, 140)}..."`,
      timestamp: new Date().toISOString()
    };

    setConversations(prev => [newConv, ...prev.filter(c => c.id !== conversationId)]);
    setMessages(prev => ({
      ...prev,
      [conversationId]: [initialMsg]
    }));

    showToast(`Proposal & milestone plan submitted for "${proposalData.projectTitle}"!`, 'success');
  }, [userProfile, showToast]);

  // Post a Project
  const handleProjectCreated = useCallback((newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    showToast(`Project "${newProject.title}" has been published!`, 'success');
    setCurrentTab('projects');
  }, [showToast]);

  // Direct Hire Request
  const handleSendHireRequest = useCallback((
    freelancerName: string,
    projectTitle: string,
    amount: number,
    message: string
  ) => {
    const newProposal: Proposal = {
      id: 'invite-' + Date.now(),
      projectId: 'proj-direct-' + Date.now(),
      projectTitle,
      category: 'Direct Hire',
      clientName: userProfile.name,
      clientId: userProfile.id,
      freelancerId: 'fl-direct-' + Date.now(),
      freelancerName,
      freelancerEmail: 'talent@lancly.io',
      freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      coverLetter: message,
      bidAmount: amount,
      deliveryDays: 14,
      status: 'interviewing',
      submittedAt: new Date().toISOString(),
      milestones: [
        {
          id: 'ms-direct-1',
          title: 'Direct Hire Milestone Phase',
          description: message,
          amount: amount,
          deliveryDays: 14,
          status: 'pending'
        }
      ]
    };

    setProposals((prev) => [newProposal, ...prev]);
    showToast(`Project invitation & milestone bid sent to ${freelancerName}!`, 'success');
  }, [userProfile.name, userProfile.id, showToast]);

  // Withdraw proposal
  const handleWithdrawProposal = useCallback((proposalId: string) => {
    setProposals((prev) => prev.filter((p) => p.id !== proposalId));
    showToast('Proposal has been withdrawn.', 'info');
  }, [showToast]);

  // Accept / Update Proposal Status
  const handleUpdateProposalStatus = useCallback((
    proposalId: string,
    status: 'accepted' | 'rejected' | 'interviewing'
  ) => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          const updatedMilestones = p.milestones?.map(m => 
            status === 'accepted' && m.status === 'pending' ? { ...m, status: 'funded' as const } : m
          );
          return {
            ...p,
            status,
            milestones: updatedMilestones || p.milestones
          };
        }
        return p;
      })
    );

    if (status === 'accepted') {
      showToast('Contract activated! Escrow milestones ready for delivery.', 'success');
    }
  }, [showToast]);

  // Real-time Chat: Send Message
  const handleSendMessage = useCallback((
    conversationId: string,
    text: string,
    attachments?: ChatAttachment[],
    systemEvent?: ChatMessage['systemEvent']
  ) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      conversationId,
      senderId: userProfile.id,
      senderName: userProfile.name,
      senderAvatar: userProfile.avatar,
      senderRole: userProfile.role,
      text,
      timestamp: new Date().toISOString(),
      attachments,
      systemEvent
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text || (attachments && attachments.length > 0 ? `Sent ${attachments[0].name}` : 'Updated milestone status'),
              lastMessageTimestamp: new Date().toISOString()
            }
          : c
      )
    );
  }, [userProfile]);

  // Direct Chat Trigger
  const handleOpenDirectChat = useCallback((
    participantId: string,
    proposalOrProjectId?: string,
    projectTitle?: string
  ) => {
    const existing = conversations.find(c => 
      c.participants.some(p => p.id === participantId) &&
      (!proposalOrProjectId || c.projectId === proposalOrProjectId || c.proposalId === proposalOrProjectId)
    );

    if (existing) {
      setActiveConversationId(existing.id);
      setCurrentTab('messages');
    } else {
      const convId = `conv-${Date.now()}`;
      const partner = freelancers.find(f => f.id === participantId);
      
      const newConv: Conversation = {
        id: convId,
        participantIds: [userProfile.id, participantId],
        projectId: proposalOrProjectId,
        projectTitle: projectTitle || 'Project Consultation & Inquiry',
        participants: [
          {
            id: userProfile.id,
            name: userProfile.name,
            avatar: userProfile.avatar,
            role: userProfile.role,
            isOnline: true
          },
          {
            id: participantId,
            name: partner?.name || 'Verified Talent',
            avatar: partner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            role: userProfile.role === 'client' ? 'freelancer' : 'client',
            title: partner?.title,
            company: partner?.name,
            isOnline: true
          }
        ],
        lastMessage: 'Conversation initialized.',
        lastMessageTimestamp: new Date().toISOString(),
        unreadCount: 0,
        type: 'general'
      };

      setConversations(prev => [newConv, ...prev]);
      setMessages(prev => ({
        ...prev,
        [convId]: [
          {
            id: `msg-${Date.now()}`,
            conversationId: convId,
            senderId: userProfile.id,
            senderName: userProfile.name,
            senderAvatar: userProfile.avatar,
            senderRole: userProfile.role,
            text: `Hi! I would like to connect regarding ${projectTitle || 'potential collaboration'}.`,
            timestamp: new Date().toISOString()
          }
        ]
      }));
      setActiveConversationId(convId);
      setCurrentTab('messages');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [conversations, freelancers, userProfile]);

  // Milestone Actions
  const handleFundMilestone = (proposalId: string, milestoneId: string, amount: number) => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          const updatedMilestones = p.milestones?.map(m => 
            m.id === milestoneId ? { ...m, status: 'funded' as const } : m
          );
          return {
            ...p,
            status: 'accepted',
            milestones: updatedMilestones,
            escrowFundedAmount: (p.escrowFundedAmount || 0) + amount
          };
        }
        return p;
      })
    );

    // Update user balance
    setUserProfile(prev => ({
      ...prev,
      balance: Math.max(0, (prev.balance || 0) - amount),
      escrowLocked: (prev.escrowLocked || 0) + amount
    }));

    // Post to linked conversation if exists
    const linkedConv = conversations.find(c => c.proposalId === proposalId);
    if (linkedConv) {
      handleSendMessage(
        linkedConv.id,
        `Client has deposited $${amount} into SafePay Escrow for this phase.`,
        undefined,
        'milestone_funded'
      );
    }

    showToast(`$${amount} deposited into Escrow! Freelancer notified to begin work.`, 'success');
  };

  const handleSubmitMilestoneDeliverable = (proposalId: string, milestoneId: string, notes: string, link: string) => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          const updatedMilestones = p.milestones?.map(m => 
            m.id === milestoneId ? { 
              ...m, 
              status: 'submitted' as const,
              submissionNotes: notes,
              submissionLink: link,
              submittedAt: new Date().toISOString()
            } : m
          );
          return { ...p, milestones: updatedMilestones };
        }
        return p;
      })
    );

    // Post event into chat
    const linkedConv = conversations.find(c => c.proposalId === proposalId);
    if (linkedConv) {
      handleSendMessage(
        linkedConv.id,
        `Milestone Deliverable Submitted:\n"${notes}"\n${link ? `Work Link: ${link}` : ''}`,
        undefined,
        'milestone_submitted'
      );
    }

    showToast('Phase deliverables submitted to client for approval!', 'success');
  };

  const handleReleaseMilestonePayment = (proposalId: string, milestoneId: string, amount: number) => {
    const releaseTimestamp = new Date().toISOString();

    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          const updatedMilestones = p.milestones?.map(m => 
            m.id === milestoneId ? { 
              ...m, 
              status: 'released' as const,
              releasedAt: releaseTimestamp
            } : m
          );
          return {
            ...p,
            milestones: updatedMilestones,
            releasedAmount: (p.releasedAmount || 0) + amount,
            escrowFundedAmount: Math.max(0, (p.escrowFundedAmount || 0) - amount)
          };
        }
        return p;
      })
    );

    // Update balances based on active role
    setUserProfile(prev => {
      if (prev.role === 'freelancer') {
        const netEarnings = Math.round(amount * 0.9);
        return {
          ...prev,
          balance: (prev.balance || 0) + netEarnings,
          totalEarned: (prev.totalEarned || 0) + amount
        };
      } else {
        return {
          ...prev,
          escrowLocked: Math.max(0, (prev.escrowLocked || 0) - amount),
          totalSpent: (prev.totalSpent || 0) + amount
        };
      }
    });

    // Post event in chat
    const linkedConv = conversations.find(c => c.proposalId === proposalId);
    if (linkedConv) {
      handleSendMessage(
        linkedConv.id,
        `Milestone payment of $${amount} approved and released to freelancer!`,
        undefined,
        'milestone_released'
      );
    }

    showToast(`$${amount} payment released from escrow to freelancer!`, 'success');
  };

  const handleRequestMilestoneChanges = (proposalId: string, milestoneId: string, feedback: string) => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          const updatedMilestones = p.milestones?.map(m => 
            m.id === milestoneId ? { ...m, status: 'in_progress' as const } : m
          );
          return { ...p, milestones: updatedMilestones };
        }
        return p;
      })
    );

    const linkedConv = conversations.find(c => c.proposalId === proposalId);
    if (linkedConv) {
      handleSendMessage(
        linkedConv.id,
        `Client requested revisions on milestone phase:\n"${feedback}"`
      );
    }

    showToast('Revision notes sent to freelancer.', 'info');
  };

  // Reset Data
  const handleResetData = useCallback(() => {
    resetAllData();
    setProjects(getStoredProjects());
    setFreelancers(getStoredFreelancers());
    setProposals(getStoredProposals());
    setUserProfile(getStoredUserProfile());
    setConversations(getStoredConversations());
    setMessages(getStoredMessages());
    showToast('Marketplace data has been reset to defaults.', 'info');
  }, [showToast]);

  // Saved Projects List
  const savedProjectsList = projects.filter((p) =>
    userProfile.savedProjectIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        onOpenPostProject={() => setIsPostProjectOpen(true)}
        savedCount={userProfile.savedProjectIds.length}
        unreadMessagesCount={unreadMessagesCount}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main App Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <Hero
              categories={categories}
              onSearch={handleHeroSearch}
              onSelectCategory={handleSelectCategory}
              onOpenPostProject={() => setIsPostProjectOpen(true)}
              setCurrentTab={setCurrentTab}
            />

            <CategoriesSection
              categories={categories}
              onSelectCategory={handleSelectCategory}
              setCurrentTab={setCurrentTab}
            />

            <FeaturedProjectsSection
              projects={projects}
              onSelectProject={(p) => setSelectedProject(p)}
              onToggleSave={handleToggleSaveProject}
              savedProjectIds={userProfile.savedProjectIds}
              setCurrentTab={setCurrentTab}
              onOpenPostProject={() => setIsPostProjectOpen(true)}
            />

            <FeaturedFreelancersSection
              freelancers={freelancers}
              onSelectFreelancer={(fl) => setSelectedFreelancer(fl)}
              onOpenHireModal={(fl) => setHireFreelancer(fl)}
              setCurrentTab={setCurrentTab}
            />

            <HowItWorksSection
              onOpenPostProject={() => setIsPostProjectOpen(true)}
              setCurrentTab={setCurrentTab}
            />
          </div>
        )}

        {currentTab === 'projects' && (
          <ProjectListings
            projects={projects}
            categories={categories}
            filters={projectFilters}
            setFilters={setProjectFilters}
            onSelectProject={(p) => setSelectedProject(p)}
            onToggleSave={handleToggleSaveProject}
            savedProjectIds={userProfile.savedProjectIds}
            onOpenPostProject={() => setIsPostProjectOpen(true)}
          />
        )}

        {currentTab === 'freelancers' && (
          <FreelancerListings
            freelancers={freelancers}
            categories={categories}
            filters={freelancerFilters}
            setFilters={setFreelancerFilters}
            onSelectFreelancer={(fl) => setSelectedFreelancer(fl)}
            onOpenHireModal={(fl) => setHireFreelancer(fl)}
          />
        )}

        {currentTab === 'messages' && (
          <MessagingView
            currentUser={userProfile}
            conversations={conversations}
            messages={messages}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => setActiveConversationId(id)}
            onSendMessage={handleSendMessage}
            allProjects={projects}
            onViewProjectDetails={(projectId) => {
              const proj = projects.find(p => p.id === projectId);
              if (proj) setSelectedProject(proj);
            }}
            onOpenMilestoneDeliverable={(proposalId) => {
              const prop = proposals.find(p => p.id === proposalId);
              if (prop) setSelectedMilestoneProposal(prop);
            }}
          />
        )}

        {currentTab === 'how-it-works' && (
          <div className="py-8 bg-slate-900 min-h-screen">
            <HowItWorksSection
              onOpenPostProject={() => setIsPostProjectOpen(true)}
              setCurrentTab={setCurrentTab}
            />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            projects={projects}
            proposals={proposals}
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenPostProject={() => setIsPostProjectOpen(true)}
            onWithdrawProposal={handleWithdrawProposal}
            onUpdateProposalStatus={handleUpdateProposalStatus}
            onToggleSave={handleToggleSaveProject}
            savedProjects={savedProjectsList}
            showToast={showToast}
            onOpenMilestoneModal={(prop) => setSelectedMilestoneProposal(prop)}
            onOpenChatWithUser={handleOpenDirectChat}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenPostProject={() => setIsPostProjectOpen(true)}
        onResetData={handleResetData}
      />

      {/* Modal 1: Project Details & Proposal Submission with Milestones */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          userProfile={userProfile}
          onSubmitProposal={handleSubmitProposal}
          isSaved={userProfile.savedProjectIds.includes(selectedProject.id)}
          onToggleSave={handleToggleSaveProject}
          existingProposals={proposals.filter((p) => p.projectId === selectedProject.id)}
          onOpenDirectChat={handleOpenDirectChat}
        />
      )}

      {/* Modal 2: Freelancer Profile & Portfolio Showcase */}
      {selectedFreelancer && (
        <FreelancerProfileModal
          freelancer={selectedFreelancer}
          onClose={() => setSelectedFreelancer(null)}
          onOpenHireModal={(fl) => {
            setSelectedFreelancer(null);
            setHireFreelancer(fl);
          }}
          userProjects={projects}
        />
      )}

      {/* Modal 3: Direct Hire / Send Project Invitation */}
      {hireFreelancer && (
        <HireModal
          freelancer={hireFreelancer}
          onClose={() => setHireFreelancer(null)}
          userProjects={projects}
          onSendHireRequest={handleSendHireRequest}
        />
      )}

      {/* Modal 4: Post a New Project Modal */}
      <PostProjectModal
        isOpen={isPostProjectOpen}
        onClose={() => setIsPostProjectOpen(false)}
        categories={categories}
        userProfile={userProfile}
        onProjectCreated={handleProjectCreated}
      />

      {/* Modal 5: Milestone & Escrow Hub Modal */}
      {selectedMilestoneProposal && (
        <MilestoneModal
          proposal={selectedMilestoneProposal}
          currentUser={userProfile}
          onClose={() => setSelectedMilestoneProposal(null)}
          onFundMilestone={handleFundMilestone}
          onSubmitMilestoneDeliverable={handleSubmitMilestoneDeliverable}
          onReleaseMilestonePayment={handleReleaseMilestonePayment}
          onRequestMilestoneChanges={handleRequestMilestoneChanges}
          onOpenChatWithUser={handleOpenDirectChat}
        />
      )}

      {/* Modal 6: User Authentication Modal (Client / Freelancer) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        initialRole={authModalRole}
        allAccounts={userAccounts}
        onSaveAccount={handleSaveAccount}
      />

    </div>
  );
}
