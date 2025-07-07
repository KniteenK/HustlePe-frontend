import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Bell, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationBadgeProps {
  onNavigateToRequests?: () => void;
}

export default function NotificationBadge({ onNavigateToRequests }: NotificationBadgeProps) {
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const getAccessToken = () => {
    const accessTokenCookie = Cookies.get('accessToken');
    return accessTokenCookie ? accessTokenCookie.replace(/^"|"$/g, "") : "";
  };

  const fetchPendingRequests = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const response = await axios.get('http://localhost:2000/api/v1/chat/requests/received', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      const pendingRequests = response.data.data?.filter((req: any) => req.status === 'pending') || [];
      setPendingRequestsCount(pendingRequests.length);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    
    // Poll for new requests every 30 seconds
    const interval = setInterval(fetchPendingRequests, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleViewRequests = () => {
    setIsOpen(false);
    if (onNavigateToRequests) {
      onNavigateToRequests();
    }
  };

  return (
    <Popover 
      isOpen={isOpen} 
      onOpenChange={setIsOpen}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          className="relative text-gray-600 hover:text-gray-900"
        >
          <Bell className="h-5 w-5" />
          {pendingRequestsCount > 0 && (
            <Badge 
              content={pendingRequestsCount} 
              color="danger" 
              size="sm"
              className="absolute -top-1 -right-1"
            >
              <div></div>
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="px-1 py-2">
          <div className="text-small font-bold">Notifications</div>
          <div className="text-tiny">
            {pendingRequestsCount > 0 ? (
              <div className="mt-3">
                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">
                      {pendingRequestsCount} pending chat request{pendingRequestsCount > 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-orange-600">
                      New people want to chat with you
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2 bg-green-600 text-white"
                  onClick={handleViewRequests}
                >
                  View Requests
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No new notifications</p>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
