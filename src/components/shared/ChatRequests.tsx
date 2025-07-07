import { Avatar, Badge, Button, Card, CardBody, CardHeader, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Check, Clock, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ChatRequest {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  senderType: 'Hustler' | 'Client';
  receiverId: {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  receiverType: 'Hustler' | 'Client';
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  respondedAt?: string;
}

interface ChatRequestsProps {
  userType: 'Client' | 'Hustler';
}

export default function ChatRequests({ userType }: ChatRequestsProps) {
  const [receivedRequests, setReceivedRequests] = useState<ChatRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ChatRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState<Set<string>>(new Set());

  const getAccessToken = () => {
    const accessTokenCookie = Cookies.get('accessToken');
    return accessTokenCookie ? accessTokenCookie.replace(/^"|"$/g, "") : "";
  };

  const accessToken = getAccessToken();

  const fetchReceivedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/v1/chat/requests/received', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setReceivedRequests(response.data.data || []);
    } catch (error) {
      console.error('Error fetching received requests:', error);
    }
  };

  const fetchSentRequests = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/v1/chat/requests/sent', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setSentRequests(response.data.data || []);
    } catch (error) {
      console.error('Error fetching sent requests:', error);
    }
  };

  const handleRequestResponse = async (requestId: string, status: 'accepted' | 'rejected') => {
    setProcessingRequests(prev => new Set(prev).add(requestId));
    
    try {
      await axios.put(`http://localhost:2000/api/v1/chat/request/${requestId}`, {
        status
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Refresh received requests
      await fetchReceivedRequests();
      
      // Show success message
      const action = status === 'accepted' ? 'accepted' : 'rejected';
      alert(`Chat request ${action} successfully!`);
    } catch (error: any) {
      console.error(`Error ${status} request:`, error);
      alert(error.response?.data?.message || `Failed to ${status} request`);
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  useEffect(() => {
    const loadRequests = async () => {
      await Promise.all([fetchReceivedRequests(), fetchSentRequests()]);
      setLoading(false);
    };
    loadRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Chat Requests
          </h1>
          <p className="text-gray-600">
            Manage your incoming and outgoing chat requests
          </p>
        </div>

        <Tabs 
          aria-label="Chat request tabs" 
          className="w-full"
          classNames={{
            tabList: "bg-white border border-green-200 rounded-lg",
            cursor: "bg-green-600",
            tab: "text-gray-600",
            tabContent: "group-data-[selected=true]:text-white"
          }}
        >
          <Tab 
            key="received" 
            title={
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Received</span>
                {receivedRequests.length > 0 && (
                  <Badge content={receivedRequests.length} color="danger" size="sm">
                    <div></div>
                  </Badge>
                )}
              </div>
            }
          >
            <Card className="mt-4">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <h3 className="text-lg font-semibold">Received Requests</h3>
              </CardHeader>
              <CardBody className="p-0">
                {receivedRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No pending requests</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {receivedRequests.map((request) => (
                      <div key={request._id} className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar
                            src={request.senderId.avatar}
                            alt={request.senderId.username}
                            className="w-12 h-12 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">
                                {request.senderId.first_name} {request.senderId.last_name}
                              </h4>
                              <Badge 
                                size="sm" 
                                variant="flat" 
                                color={request.senderType === 'Hustler' ? 'success' : 'primary'}
                              >
                                {request.senderType}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">@{request.senderId.username}</p>
                            <p className="text-gray-800 mb-3">{request.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatTime(request.createdAt)}
                              </span>
                              {request.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    color="success"
                                    variant="flat"
                                    startContent={<Check className="h-4 w-4" />}
                                    onClick={() => handleRequestResponse(request._id, 'accepted')}
                                    isLoading={processingRequests.has(request._id)}
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    color="danger"
                                    variant="flat"
                                    startContent={<X className="h-4 w-4" />}
                                    onClick={() => handleRequestResponse(request._id, 'rejected')}
                                    isLoading={processingRequests.has(request._id)}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>

          <Tab 
            key="sent" 
            title={
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Sent</span>
              </div>
            }
          >
            <Card className="mt-4">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <h3 className="text-lg font-semibold">Sent Requests</h3>
              </CardHeader>
              <CardBody className="p-0">
                {sentRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No sent requests</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {sentRequests.map((request) => (
                      <div key={request._id} className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar
                            src={request.receiverId.avatar}
                            alt={request.receiverId.username}
                            className="w-12 h-12 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">
                                {request.receiverId.first_name} {request.receiverId.last_name}
                              </h4>
                              <Badge 
                                size="sm" 
                                variant="flat" 
                                color={request.receiverType === 'Hustler' ? 'success' : 'primary'}
                              >
                                {request.receiverType}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">@{request.receiverId.username}</p>
                            <p className="text-gray-800 mb-3">{request.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatTime(request.createdAt)}
                              </span>
                              <Badge 
                                size="sm"
                                color={getStatusColor(request.status)}
                                variant="flat"
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
