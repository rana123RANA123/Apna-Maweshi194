import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLocale } from '../../context/LocaleContext';
import {
  MessageSquare,
  Send,
  Phone,
  CheckCircle2,
  Paperclip,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    setSelectedListing,
    listings,
  } = useMarketplace();
  const { formatPrice, language } = useLocale();

  const [inputMsg, setInputMsg] = useState('');

  const activeConv =
    conversations.find(c => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMsg);
    setInputMsg('');
  };

  const quickReplies = [
    'Assalam-o-Alaikum, kya yeh rate final hai?',
    'Janwar ke daant aur chalne ki video WhatsApp bhej dein.',
    'Mandi mein kis waqt dekhne aa saktay hain?',
    'Kya vaccination aur doodh ki paki guarantee hai?',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden flex flex-col md:flex-row h-[75vh]">
        {/* Left Side: Conversation List */}
        <div
          className={`w-full md:w-80 border-r border-stone-200 flex flex-col ${
            activeConversationId && 'hidden md:flex'
          }`}
        >
          <div className="p-4 border-b border-stone-200">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-800" />
              <span>Mandi Chats & Inquiries</span>
            </h2>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-stone-100">
            {conversations.map(conv => {
              const isSelected = activeConv?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 hover:bg-stone-50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-50/60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {conv.otherUser.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-stone-900 truncate">
                          {conv.otherUser.name}
                        </h3>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 shrink-0">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window */}
        {activeConv ? (
          <div className="flex-1 flex flex-col h-full bg-[#fcfbf7]">
            {/* Chat Top Bar */}
            <div className="p-3 sm:p-4 bg-white border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1 text-stone-500 hover:text-stone-800"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                  {activeConv.otherUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    {activeConv.otherUser.name}
                  </h3>
                  <span className="text-[11px] text-stone-500">
                    {activeConv.otherUser.role} · Verified Contact
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${activeConv.otherUser.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="hidden sm:inline">Direct Call</span>
                </a>
              </div>
            </div>

            {/* Listing Context Pill Card */}
            {activeConv.listingContext && (
              <div className="p-2.5 bg-amber-50/70 border-b border-amber-200/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <img
                    src={activeConv.listingContext.imageUrl}
                    alt={activeConv.listingContext.title}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded object-cover shrink-0 border border-stone-200"
                  />
                  <div className="truncate">
                    <span className="font-bold text-stone-900 truncate block">
                      {activeConv.listingContext.title}
                    </span>
                    <span className="font-mono tabular-nums text-emerald-900 font-extrabold text-[11px]">
                      {formatPrice(activeConv.listingContext.price)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const match = listings.find(l => l.id === activeConv.listingContext?.id);
                    if (match) setSelectedListing(match);
                  }}
                  className="px-2.5 py-1 rounded bg-white border border-amber-300 text-[11px] font-bold text-amber-900 hover:bg-amber-100 shrink-0"
                >
                  View Details
                </button>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Safety notice in chat */}
              <div className="p-2.5 rounded-lg bg-stone-100 text-[11px] text-stone-600 text-center max-w-md mx-auto">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 inline mr-1" />
                Never transfer full payment or advance token without physically checking the animal.
              </div>

              {activeConv.messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md rounded-xl p-3 text-xs leading-relaxed ${
                      m.isMine
                        ? 'bg-emerald-800 text-white rounded-br-xs shadow-2xs'
                        : 'bg-white text-stone-900 border border-stone-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Quick Replies Bar */}
            <div className="p-2 bg-stone-50 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMsg(qr)}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] text-stone-700 whitespace-nowrap hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                placeholder="Type your message in Urdu or English..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-stone-400 text-xs">
            <MessageSquare className="w-10 h-10 mb-2" />
            <span>Select a conversation to start chatting</span>
          </div>
        )}
      </div>
    </div>
  );
};
