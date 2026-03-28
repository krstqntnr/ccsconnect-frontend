import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, Paperclip, X, Users, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

export function ChatMessaging() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    { id: '1', name: 'Placement Cell', type: 'placement', avatar: 'PC', status: 'online', lastMessage: 'Your interview is scheduled for tomorrow', unreadCount: 2 },
    { id: '2', name: 'Tech Corp Recruiter', type: 'recruiter', avatar: 'TC', status: 'online', lastMessage: 'We would like to schedule a follow-up', unreadCount: 1 },
    { id: '3', name: 'Sarah Alumni', type: 'alumni', avatar: 'SA', status: 'offline', lastMessage: 'Great session today! Keep practicing' },
  ];

  const messages = [
    { id: '1', sender: 'Placement Cell', senderType: 'placement', content: 'Your interview with Tech Corp has been scheduled for tomorrow at 2 PM.', timestamp: new Date(Date.now() - 60 * 60 * 1000) },
    { id: '2', sender: 'You', senderType: 'student', content: 'Thank you for the update. Should I prepare anything specific?', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
    { id: '3', sender: 'Placement Cell', senderType: 'placement', content: 'Please bring your updated resume and portfolio. The interview will be technical focused.', timestamp: new Date(Date.now() - 15 * 60 * 1000), attachment: { name: 'Interview_Guidelines.pdf', type: 'document' } },
  ];

  const handleSendMessage = () => {
    if (message.trim()) setMessage('');
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'placement': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'recruiter': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'alumni': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <motion.div className="fixed bottom-6 right-6 z-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={() => setIsOpen(true)} className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl">
          <MessageCircle className="w-6 h-6" />
          <motion.div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <span className="text-xs text-white">3</span>
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 right-0 w-full max-w-md h-2/3 bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-orange-500" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">Messages</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="w-8 h-8 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {selectedChat ? (
                <>
                  <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)} className="w-8 h-8 p-0 text-gray-600 dark:text-gray-400">←</Button>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">PC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-gray-800 dark:text-gray-100">Placement Cell</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Online</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.senderType === 'student' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-3 rounded-2xl ${
                          msg.senderType === 'student'
                            ? 'bg-orange-500 dark:bg-orange-600 text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-md'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          {msg.attachment && (
                            <div className="mt-2 p-2 bg-white/20 dark:bg-white/10 rounded-lg flex items-center gap-2">
                              <Paperclip className="w-4 h-4" />
                              <span className="text-xs">{msg.attachment.name}</span>
                            </div>
                          )}
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 dark:text-gray-400">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        size="sm"
                        className="w-8 h-8 p-0 text-gray-500 dark:text-gray-400 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search contacts..."
                        className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {filteredContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setSelectedChat(contact.id)}
                      >
                        <div className="p-4 cursor-pointer border-b border-gray-50 dark:border-gray-700 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">
                                  {contact.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm text-gray-800 dark:text-gray-100 truncate">{contact.name}</p>
                                {contact.unreadCount && (
                                  <Badge variant="destructive" className="text-xs px-2 py-0.5">
                                    {contact.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                                <Badge variant="secondary" className={`text-xs ${getStatusColor(contact.type)}`}>
                                  {contact.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}