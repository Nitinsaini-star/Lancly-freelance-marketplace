export type UserRole = 'freelancer' | 'client';

export type ExperienceLevel = 'Entry Level' | 'Intermediate' | 'Expert';

export type ProjectStatus = 'open' | 'in-progress' | 'completed' | 'closed';

export type ProposalStatus = 'pending' | 'interviewing' | 'accepted' | 'rejected';

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  projectCount: number;
  freelancerCount: number;
  popularSkills: string[];
  color: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  avatar: string;
  location: string;
  rating: number;
  reviewsCount: number;
  totalSpent: number;
  hireRate: number;
  memberSince: string;
  paymentVerified: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  budgetType: 'fixed' | 'hourly';
  budgetMin: number;
  budgetMax: number;
  description: string;
  fullDescription: string;
  requiredSkills: string[];
  deadline: string;
  estimatedDuration: string;
  experienceLevel: ExperienceLevel;
  client: ClientInfo;
  status: ProjectStatus;
  proposalsCount: number;
  featured?: boolean;
  createdAt: string;
  deliverables?: string[];
  scope: 'Small' | 'Medium' | 'Large';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
  completedDate?: string;
}

export interface Review {
  id: string;
  author: string;
  company?: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  projectTitle: string;
  cost?: number;
}

export interface Freelancer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  category: string;
  bio: string;
  hourlyRate: number;
  experienceLevel: ExperienceLevel;
  skills: string[];
  rating: number;
  reviewsCount: number;
  totalEarnings: string;
  jobsCompleted: number;
  jobSuccessRate: number;
  onTimeRate: number;
  location: string;
  memberSince: string;
  badge?: 'Top Rated' | 'Verified Pro' | 'Rising Star' | 'Expert';
  portfolio: PortfolioItem[];
  reviews: Review[];
  available: boolean;
  languages: string[];
  responseHours: number;
}

export type MilestoneStatus = 'pending' | 'funded' | 'in_progress' | 'submitted' | 'approved' | 'released';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  deliveryDays: number;
  status: MilestoneStatus;
  submissionNotes?: string;
  submissionLink?: string;
  submittedAt?: string;
  fundedAt?: string;
  releasedAt?: string;
}

export interface Proposal {
  id: string;
  projectId: string;
  projectTitle: string;
  category: string;
  clientName: string;
  clientId?: string;
  freelancerId: string;
  freelancerName: string;
  freelancerEmail: string;
  freelancerAvatar: string;
  coverLetter: string;
  bidAmount: number;
  deliveryDays: number;
  status: ProposalStatus;
  submittedAt: string;
  milestones?: Milestone[];
  clientFeedback?: string;
  attachments?: { name: string; size: string; url?: string }[];
  escrowFundedAmount?: number;
  releasedAmount?: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar: string;
  title: string;
  bio: string;
  hourlyRate: number;
  experienceLevel: ExperienceLevel;
  skills: string[];
  location: string;
  companyName: string;
  savedProjectIds: string[];
  balance: number;
  escrowLocked: number;
  totalEarned: number;
  totalSpent: number;
  memberSince: string;
  phone?: string;
  website?: string;
  verified: boolean;
}

export type UserProfile = UserAccount;

export interface ChatAttachment {
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  projectId?: string;
  projectTitle?: string;
  proposalId?: string;
  milestoneId?: string;
  attachments?: ChatAttachment[];
  systemEvent?: 'proposal_submitted' | 'proposal_accepted' | 'milestone_funded' | 'milestone_submitted' | 'milestone_released' | 'general_inquiry';
}

export interface ConversationParticipant {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  title?: string;
  company?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: ConversationParticipant[];
  projectId?: string;
  projectTitle?: string;
  proposalId?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  type: 'project' | 'general' | 'proposal';
}

export interface ProjectFilterState {
  searchQuery: string;
  category: string;
  budgetType: 'all' | 'fixed' | 'hourly';
  minBudget: number;
  maxBudget: number;
  experienceLevel: string;
  status: string;
  sortBy: 'newest' | 'budget-high' | 'budget-low' | 'proposals-low' | 'proposals-high';
}

export interface FreelancerFilterState {
  searchQuery: string;
  category: string;
  experienceLevel: string;
  minRating: number;
  maxHourlyRate: number;
  availableOnly: boolean;
  sortBy: 'rating' | 'experience' | 'rate-low' | 'rate-high' | 'jobs';
}

