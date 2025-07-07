import { Badge, Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { MessageCircle, Search, Users } from "lucide-react";

function Messages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Messages
          </h1>
          <p className="text-gray-600 text-lg">
            Communicate with freelancers and manage your conversations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Contacts Sidebar */}
          <Card className="lg:col-span-1 shadow-lg border border-green-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
              <div className="flex items-center gap-2 w-full">
                <Users className="h-5 w-5" />
                <span className="font-bold">Freelancers</span>
                <Badge content={0} color="success" variant="flat" className="ml-auto">
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
              
              {/* Empty State */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Conversations</h3>
                  <p className="text-gray-500 text-sm">
                    Start hiring freelancers to begin conversations
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 shadow-lg border border-green-200 overflow-hidden">
            <CardBody className="flex items-center justify-center h-full text-center">
              <div className="max-w-md">
                <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <MessageCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Messages
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Connect with talented freelancers and manage all your project communications in one place. 
                  Start by posting a project or selecting a freelancer to begin your conversation.
                </p>
                <Button 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                  size="lg"
                >
                  Post Your First Project
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Messages;