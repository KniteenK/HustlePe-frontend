import { Avatar, Badge, Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { MessageCircle, Plus, Search, Send, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface User {
  _id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  userType: 'Hustler' | 'Client';
  skills?: string[];
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  senderType: 'Hustler' | 'Client';
  message: string;
  timestamp: string;
  messageType: string;
  isRead: boolean;
}

interface Conversation {
  _id: string;
  lastMessage: string;
  lastTimestamp: string;
  lastSender: string;
  lastSenderType: string;
  messageCount: number;
  otherUser: User;
  otherUserType: string;
  otherUserId: string;
}

function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  const { isOpen: isNewChatOpen, onOpen: onNewChatOpen, onClose: onNewChatClose } = useDisclosure();
  const [newChatMessage, setNewChatMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get current user info
  const getCurrentUser = () => {
    const userDataCookie = Cookies.get('userData');
    if (userDataCookie) {
      try {
        return JSON.parse(userDataCookie);
      } catch (error) {
        console.error("Failed to parse userData cookie:", error);
      }
    }
    return null;
  };

  const getAccessToken = () => {
    const accessTokenCookie = Cookies.get('accessToken');
    return accessTokenCookie ? accessTokenCookie.replace(/^"|"$/g, "") : "";
  };

  const currentUser = getCurrentUser();
  const accessToken = getAccessToken();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket connection
  useEffect(() => {
    if (!currentUser) return;

    const socket = io("http://localhost:2000", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("receiveMessage", (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on("userTyping", ({ userId, isTyping: typing }) => {
      if (userId !== currentUser._id) {
        setIsTyping(typing);
        if (typing && typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
        }
      }
    });

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socket.disconnect();
    };
  }, [currentUser]);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/v1/chat/conversations', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setConversations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for selected conversation
  const fetchMessages = async (otherUserId: string) => {
    try {
      const response = await axios.get(`http://localhost:2000/api/v1/chat/history?otherUserId=${otherUserId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setMessages(response.data.data.history || []);
      
      // Join socket room
      if (socketRef.current && currentUser) {
        socketRef.current.emit("joinChat", {
          currentUserId: currentUser._id,
          otherUserId: otherUserId
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Search users
  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:2000/api/v1/chat/search-users?query=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !socketRef.current || !currentUser) return;

    setSending(true);
    try {
      socketRef.current.emit("sendMessage", {
        currentUserId: currentUser._id,
        otherUserId: selectedConversation.otherUserId,
        senderId: currentUser._id,
        senderType: 'Client',
        message: newMessage,
        messageType: 'text'
      });
      
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  // Send chat request
  const sendChatRequest = async () => {
    if (!selectedUser || !newChatMessage.trim()) return;

    try {
      await axios.post('http://localhost:2000/api/v1/chat/request', {
        receiverId: selectedUser._id,
        receiverType: selectedUser.userType,
        message: newChatMessage
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      alert('Chat request sent successfully!');
      setSelectedUser(null);
      setNewChatMessage("");
      onNewChatClose();
    } catch (error: any) {
      console.error('Error sending chat request:', error);
      alert(error.response?.data?.message || 'Failed to send chat request');
    }
  };

  // Handle typing
  const handleTyping = () => {
    if (!socketRef.current || !selectedConversation || !currentUser) return;

    const roomId = [currentUser._id, selectedConversation.otherUserId].sort().join("_");
    socketRef.current.emit("typing", {
      roomId,
      userId: currentUser._id,
      isTyping: true
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (socketRef.current) {
        socketRef.current.emit("typing", {
          roomId,
          userId: currentUser._id,
          isTyping: false
        });
      }
    }, 1000);
  };

  useEffect(() => {
    if (currentUser) {
      fetchConversations();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.otherUserId);
    }
  }, [selectedConversation]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
              Messages
            </h1>
            <p className="text-gray-600 text-lg">
              Communicate with freelancers and manage your conversations
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
            onClick={onNewChatOpen}
            startContent={<Plus className="h-4 w-4" />}
          >
            New Chat
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations Sidebar */}
          <Card className="lg:col-span-1 shadow-lg border border-green-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
              <div className="flex items-center gap-2 w-full">
                <Users className="h-5 w-5" />
                <span className="font-bold">Conversations</span>
                <Badge content={conversations.length} color="success" variant="flat" className="ml-auto">
                  <div></div>
                </Badge>
              </div>
            </CardHeader>
            <CardBody className="p-0 flex flex-col h-full">
              {/* Search */}
              <div className="p-4 border-b border-green-100">
                <Input
                  placeholder="Search conversations..."
                  startContent={<Search className="h-4 w-4 text-gray-400" />}
                  classNames={{
                    inputWrapper: "border-green-200 hover:border-green-300 focus-within:border-green-500",
                  }}
                />
              </div>
              
              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                      <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No Conversations</h3>
                      <p className="text-gray-500 text-sm">
                        Start a new conversation with freelancers
                      </p>
                    </div>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation._id}
                      className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-green-50 transition-colors border-b border-gray-100 ${
                        selectedConversation?._id === conversation._id ? "bg-green-100 border-l-4 border-l-green-600" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <Avatar
                        src={conversation.otherUser.avatar}
                        alt={conversation.otherUser.username}
                        className="w-12 h-12"
                        fallback={<Users className="h-6 w-6" />}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {conversation.otherUser.first_name} {conversation.otherUser.last_name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastTimestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge size="sm" variant="flat" color={conversation.otherUserType === 'Hustler' ? 'success' : 'primary'}>
                            {conversation.otherUserType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 shadow-lg border border-green-200 overflow-hidden">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="bg-white border-b border-green-100 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={selectedConversation.otherUser.avatar}
                      alt={selectedConversation.otherUser.username}
                      className="w-10 h-10"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedConversation.otherUser.first_name} {selectedConversation.otherUser.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.otherUserType} • @{selectedConversation.otherUser.username}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardBody className="p-0 flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex ${message.sender._id === currentUser?._id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender._id === currentUser?._id
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender._id === currentUser?._id ? 'text-green-100' : 'text-gray-500'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 bg-white border-t border-green-100">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          handleTyping();
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        classNames={{
                          inputWrapper: "border-green-200 hover:border-green-300 focus-within:border-green-500",
                        }}
                      />
                      <Button
                        isIconOnly
                        className="bg-green-600 text-white"
                        onClick={sendMessage}
                        isLoading={sending}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </>
            ) : (
              <CardBody className="flex items-center justify-center h-full text-center">
                <div className="max-w-md">
                  <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <MessageCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to Messages
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Connect with talented freelancers and manage all your project communications in one place. 
                    Select a conversation from the sidebar to start chatting, or use the "New Chat" button above to start a conversation.
                  </p>
                </div>
              </CardBody>
            )}
          </Card>
        </div>
      </div>

      {/* New Chat Modal */}
      <Modal isOpen={isNewChatOpen} onClose={onNewChatClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-xl font-bold text-gray-900">Start New Conversation</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search for freelancers
                </label>
                <Input
                  placeholder="Search by name, username, or email..."
                  startContent={<Search className="h-4 w-4 text-gray-400" />}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    searchUsers(e.target.value);
                  }}
                />
              </div>

              {searchResults.length > 0 && (
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                  {searchResults.map((user) => (
                    <div
                      key={user._id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                        selectedUser?._id === user._id ? 'bg-green-50' : ''
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <Avatar
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {user.first_name} {user.last_name}
                        </h4>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                        <Badge size="sm" variant="flat" color={user.userType === 'Hustler' ? 'success' : 'primary'}>
                          {user.userType}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Write your first message..."
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onNewChatClose}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 text-white"
              onPress={sendChatRequest}
              disabled={!selectedUser || !newChatMessage.trim()}
            >
              Send Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Messages;