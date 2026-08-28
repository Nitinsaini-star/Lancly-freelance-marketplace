import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Briefcase, 
  Sparkles, 
  CheckCheck, 
  Clock, 
  DollarSign, 
  FileText, 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ShieldCheck, 
  Layers,
  ArrowUpRight,
  PlusCircle,
  Smile,
  AlertCircle
} from 'lucide-react';
import { Conversation, ChatMessage, UserProfile, Project, ChatAttachment } from '../types';

interface MessagingViewProps {
  currentUser: UserProfile;
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string, attachments?: ChatAttachment[], systemEvent?: ChatMessage['systemEvent']) => void;
  onViewProjectDetails?: (projectId: string) => void;
  onOpenMilestoneDeliverable?: (proposalId: string) => void;
  allProjects?: Project[];
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  currentUser,
  conversations,
  messages,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onViewProjectDetails,
  onOpenMilestoneDeliverable,
  allProjects = []
}) => {
  const [filterType, setFilterType] = useState<'all' | 'project' | 'proposal' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedAttachments, setSelectedAttachments] = useState<ChatAttachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingContactName, setTypingContactName] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessages = activeConversation ? (messages[activeConversation.id] || []) : [];

  // Recipient in active conversation
  const recipient = activeConversation?.participants.find(p => p.id !== currentUser.id) || activeConversation?.participants[0];

  // Linked Project if any
  const linkedProject = allProjects.find(p => p.id === activeConversation?.projectId);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversationId, activeMessages.length, isTyping]);

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    const matchesFilter = filterType === 'all' || c.type === filterType;
    const otherParticipant = c.participants.find(p => p.id !== currentUser.id);
    const matchesSearch = 
      (otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (c.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!messageInput.trim() && selectedAttachments.length === 0) || !activeConversation) return;

    const textToSend = messageInput.trim();
    const attachmentsToSend = [...selectedAttachments];

    setMessageInput('');
    setSelectedAttachments([]);

    onSendMessage(activeConversation.id, textToSend, attachmentsToSend.length > 0 ? attachmentsToSend : undefined);

    // Contextual auto-reply simulation if talking with a mock recipient
    if (recipient && recipient.id !== currentUser.id) {
      setTimeout(() => {
        setIsTyping(true);
        setTypingContactName(recipient.name);
      }, 800);

      setTimeout(() => {
        setIsTyping(false);
        let autoReply = `Got it! Thanks for the update. I will review this and get back to you shortly.`;
        
        if (textToSend.toLowerCase().includes('milestone') || textToSend.toLowerCase().includes('escrow') || textToSend.toLowerCase().includes('fund')) {
          autoReply = `Thank you! I see the milestone update. All deliverables are moving forward as planned.`;
        } else if (textToSend.toLowerCase().includes('timeline') || textToSend.toLowerCase().includes('deadline') || textToSend.toLowerCase().includes('when')) {
          autoReply = `We are right on schedule according to our milestone plan. Next preview delivery will be ready within 48 hours!`;
        } else if (textToSend.toLowerCase().includes('rate') || textToSend.toLowerCase().includes('cost') || textToSend.toLowerCase().includes('budget') || textToSend.toLowerCase().includes('bid')) {
          autoReply = `The pricing and milestone breakdowns are confirmed as specified in the proposal. Let me know if you need any adjustments.`;
        } else if (textToSend.toLowerCase().includes('portfolio') || textToSend.toLowerCase().includes('sample') || textToSend.toLowerCase().includes('link')) {
          autoReply = `Here is our live project staging link: https://staging.lancly-talent.app/preview for your review!`;
        }

        onSendMessage(activeConversation.id, autoReply);
      }, 2400);
    }
  };

  const handleMockAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newAttachment: ChatAttachment = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'document'
    };

    setSelectedAttachments(prev => [...prev, newAttachment]);
  };

  const quickReplies = [
    'Can you confirm the milestone timeline?',
    'I have funded the milestone in escrow!',
    'Looks great, approving the phase deliverables now.',
    'Could you share the live demo staging link?',
    'Available for a quick technical sync today?'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[780px] max-h-[86vh]">
        
        {/* Left Column: Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50 ${activeConversationId ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">Messages</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {conversations.length} Active
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats or projects..."
                className="w-full pl-9 pr-3 py-2 bg-slate-100 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {(['all', 'project', 'proposal', 'general'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                    filterType === type
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200/70 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'all' ? 'All Chats' : type === 'project' ? 'Projects' : type === 'proposal' ? 'Bids' : 'Inquiries'}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations Scrollable Area */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                <p className="text-xs font-semibold">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const other = conv.participants.find(p => p.id !== currentUser.id) || conv.participants[0];
                const isSelected = activeConversation?.id === conv.id;

                return (
                  <button
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-l-4 border-emerald-600' 
                        : 'hover:bg-slate-100/70 bg-transparent'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={other.avatar}
                        alt={other.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
                      />
                      {other.isOnline && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{other.name}</h4>
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                          {new Date(conv.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {conv.projectTitle && (
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 truncate max-w-[180px]">
                            {conv.projectTitle}
                          </span>
                        </div>
                      )}

                      <p className="text-xs text-slate-500 truncate leading-tight">
                        {conv.lastMessage}
                      </p>
                    </div>

                    {conv.unreadCount > 0 && !isSelected && (
                      <span className="w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Viewport */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            
            {/* Chat Top Header */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectConversation('')}
                  className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <img
                    src={recipient?.avatar}
                    alt={recipient?.name}
                    className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                  {recipient?.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{recipient?.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-700 capitalize">
                      {recipient?.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {recipient?.title || recipient?.company || (recipient?.isOnline ? 'Online now' : 'Active recently')}
                  </p>
                </div>
              </div>

              {/* Top Action Buttons */}
              <div className="flex items-center gap-2">
                {activeConversation.projectId && onViewProjectDetails && (
                  <button
                    onClick={() => onViewProjectDetails(activeConversation.projectId!)}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Project Info</span>
                  </button>
                )}

                <div className="hidden lg:flex items-center text-xs font-semibold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lancly SafePay Active</span>
                </div>
              </div>
            </div>

            {/* Linked Project Banner */}
            {activeConversation.projectId && (
              <div className="px-6 py-2.5 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50 border-b border-emerald-100 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Project Thread:</span>
                  <span className="font-extrabold text-slate-900 truncate">{activeConversation.projectTitle}</span>
                </div>

                {activeConversation.proposalId && onOpenMilestoneDeliverable && (
                  <button
                    onClick={() => onOpenMilestoneDeliverable(activeConversation.proposalId!)}
                    className="shrink-0 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Milestones & Escrow</span>
                  </button>
                )}
              </div>
            )}

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
              {activeMessages.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-60" />
                  <p className="text-xs font-bold text-slate-700">Start the conversation</p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    Send a message to discuss project specifications, milestones, or timeline deliverables.
                  </p>
                </div>
              ) : (
                activeMessages.map((msg) => {
                  const isMine = msg.senderId === currentUser.id;

                  // Render System Events (Milestone funded, submitted, etc.)
                  if (msg.systemEvent) {
                    return (
                      <div key={msg.id} className="flex justify-center my-3">
                        <div className="max-w-md px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-center shadow-2xs">
                          <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs mb-0.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>
                              {msg.systemEvent === 'milestone_funded' && 'Escrow Milestone Funded'}
                              {msg.systemEvent === 'milestone_submitted' && 'Milestone Deliverable Submitted'}
                              {msg.systemEvent === 'milestone_released' && 'Milestone Payment Released'}
                              {msg.systemEvent === 'proposal_accepted' && 'Proposal Accepted'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700">{msg.text}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2.5 ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMine && (
                        <img
                          src={msg.senderAvatar}
                          alt={msg.senderName}
                          className="w-7 h-7 rounded-xl object-cover border border-slate-200 mb-1"
                        />
                      )}

                      <div className={`max-w-[78%] sm:max-w-[65%] space-y-1 ${isMine ? 'items-end' : 'items-start'}`}>
                        
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                            isMine
                              ? 'bg-emerald-600 text-white rounded-br-xs'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {/* Attachments */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-2.5 space-y-1.5 pt-2 border-t border-white/20">
                              {msg.attachments.map((att, idx) => (
                                <div
                                  key={idx}
                                  className={`flex items-center gap-2 p-2 rounded-xl text-xs ${
                                    isMine ? 'bg-emerald-700/60 text-white' : 'bg-slate-100 text-slate-800'
                                  }`}
                                >
                                  <FileText className="w-4 h-4 shrink-0" />
                                  <span className="truncate flex-1 font-medium">{att.name}</span>
                                  <span className="text-[10px] opacity-75 shrink-0">{att.size}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className={`flex items-center gap-1 text-[10px] text-slate-400 px-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
                          <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {isMine && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  <span>{typingContactName || 'Freelancer'} is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Bar */}
            <div className="px-6 py-2 bg-slate-50/90 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Quick Prompts:
              </span>
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMessageInput(qr);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-600 text-[11px] font-semibold rounded-lg border border-slate-200 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Selected Pending Attachments Preview */}
            {selectedAttachments.length > 0 && (
              <div className="px-6 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-2">
                {selectedAttachments.map((att, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="max-w-[120px] truncate">{att.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedAttachments(prev => prev.filter((_, i) => i !== idx))}
                      className="text-emerald-600 hover:text-emerald-900 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Message Input Box */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleMockAttachmentUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Attach Document or Image"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Message ${recipient?.name || 'collaborator'}...`}
                className="flex-1 px-4 py-2.5 bg-slate-100 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-emerald-500 outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!messageInput.trim() && selectedAttachments.length === 0}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 bg-white">
            <div>
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
              <h3 className="text-base font-bold text-slate-700">Select a Conversation</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Choose a project or applicant from the list to view real-time messages and milestone payment histories.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
