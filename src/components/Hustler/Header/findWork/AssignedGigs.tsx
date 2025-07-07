import { Button, Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Briefcase, Calendar, CheckCircle, Clock, DollarSign, Eye, MapPin, MessageSquare, User } from "lucide-react";
import { useEffect, useState } from "react";

const AssignedGigs = () => {
  const [assignedGigs, setAssignedGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedGigs = async () => {
      setLoading(true);
      try {
        const accessToken = Cookies.get("accessToken")?.replace(/^"|"$/g, "");
        const res = await axios.post(
          "http://localhost:2000/api/v1/hustler/getAssignedGigs",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAssignedGigs(res.data.data || []);
      } catch (err) {
        setAssignedGigs([]);
      }
      setLoading(false);
    };
    fetchAssignedGigs();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'in_progress':
        return 'success';
      case 'completed':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your assigned gigs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                My Assigned Projects
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your active projects and track your progress
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Chip color="success" variant="flat" size="lg" className="font-semibold">
                <Briefcase className="h-4 w-4 mr-1" />
                {assignedGigs.length} Active Projects
              </Chip>
              <Button
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                onClick={() => window.location.href = '/hustler/FindWork'}
                endContent={<Eye className="h-4 w-4" />}
              >
                Browse More Gigs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your assigned projects...</p>
            </div>
          </div>
        ) : assignedGigs.length === 0 ? (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto shadow-lg border border-green-200">
              <CardBody className="p-8">
                <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Active Projects</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  You don't have any assigned projects at the moment. Start exploring available gigs to begin your freelancing journey!
                </p>
                <Button 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                  size="lg"
                  onClick={() => window.location.href = '/hustler/FindWork'}
                >
                  Explore Available Gigs
                </Button>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {assignedGigs.map((gig) => (
              <Card key={gig._id} className="hover:shadow-xl transition-all duration-300 border border-green-200 bg-white">
                <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-green-100">
                  <div className="flex flex-col w-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                        {gig.title}
                      </h3>
                      <Chip 
                        color={getStatusColor(gig.status)} 
                        variant="flat" 
                        size="sm"
                        className="ml-2 flex-shrink-0 font-medium"
                      >
                        {gig.status?.replace('_', ' ').toUpperCase()}
                      </Chip>
                    </div>
                    {gig.client_name && (
                      <div className="flex items-center text-sm text-gray-600 bg-white rounded-lg p-2">
                        <User className="h-4 w-4 mr-2 text-green-600" />
                        <span className="font-medium">Client: {gig.client_name}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <Divider className="bg-green-200" />
                <CardBody className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                      {gig.description}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {gig.budget && (
                        <div className="flex items-center text-sm bg-green-50 p-2 rounded-lg">
                          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                          <span className="font-medium text-gray-700">Budget: </span>
                          <span className="ml-1 font-bold text-green-700">₹{gig.budget}</span>
                        </div>
                      )}
                      
                      {gig.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="truncate">{gig.location}</span>
                        </div>
                      )}
                      
                      {gig.deadline && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                          <span>Due: {new Date(gig.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {gig.duration && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-purple-600" />
                          <span>Duration: {gig.duration}</span>
                        </div>
                      )}
                    </div>

                    {gig.skills_req && gig.skills_req.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {gig.skills_req.slice(0, 3).map((skill: string, index: number) => (
                            <Chip 
                              key={index} 
                              size="sm" 
                              variant="bordered" 
                              className="text-xs border-green-200 hover:bg-green-50"
                            >
                              {skill}
                            </Chip>
                          ))}
                          {gig.skills_req.length > 3 && (
                            <Chip size="sm" variant="bordered" className="text-xs border-green-200">
                              +{gig.skills_req.length - 3} more
                            </Chip>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                        endContent={<Eye className="h-3 w-3" />}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="bordered"
                        className="flex-1 border-green-200 hover:bg-green-50 text-green-700 font-medium"
                        endContent={<MessageSquare className="h-3 w-3" />}
                      >
                        Message
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedGigs;
