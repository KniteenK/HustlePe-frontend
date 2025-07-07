import { Avatar, Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowLeft, Building2, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Application {
  _id: string;
  organization: {
    _id: string;
    name: string;
    description: string;
    founder: string;
  };
  application_message: string;
  desired_position: string;
  status: 'pending' | 'accepted' | 'rejected';
  applied_at: string;
  responded_at?: string;
  response_message?: string;
}

function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      const response = await axios.get(
        'http://localhost:2000/api/v1/organization/my-applications',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'default';
    }
  };

  const handleWithdrawApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    setWithdrawing(applicationId);
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      await axios.delete(
        `http://localhost:2000/api/v1/organization/application/${applicationId}/withdraw`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      // Remove the application from the list
      setApplications(applications.filter(app => app._id !== applicationId));
      alert('Application withdrawn successfully');
    } catch (error: any) {
      console.error('Error withdrawing application:', error);
      alert(error.response?.data?.message || 'Failed to withdraw application');
    } finally {
      setWithdrawing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/hustler/organizations")}
            className="mb-4"
            startContent={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Organizations
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                My Applications
              </h1>
              <p className="text-gray-600 text-lg">
                Track your organization application status
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <Chip color="success" variant="flat" size="lg">
                {applications.length} Applications
              </Chip>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your applications...</p>
            </div>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto shadow-lg border border-green-200">
              <CardBody className="p-8">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Applications Yet
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  You haven't applied to any organizations yet. Explore available organizations and find your perfect team!
                </p>
                <Button 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  onClick={() => navigate("/hustler/organizations")}
                >
                  Browse Organizations
                </Button>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <Card key={application._id} className="shadow-lg border border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(application.organization.name)}&background=16a34a&color=ffffff`}
                        alt={application.organization.name}
                        className="w-16 h-16 border-2 border-green-200"
                        fallback={<Building2 className="h-8 w-8 text-green-600" />}
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {application.organization.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{application.desired_position}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Applied {new Date(application.applied_at).toLocaleDateString()}</span>
                          </div>
                          {application.responded_at && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Responded {new Date(application.responded_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Chip
                      color={getStatusColor(application.status)}
                      variant="flat"
                      size="lg"
                      className="capitalize"
                    >
                      {application.status}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Application Message</h4>
                      <p className="text-gray-700 leading-relaxed">{application.application_message}</p>
                    </div>
                    
                    {application.response_message && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Organization Response</h4>
                        <p className="text-gray-700 leading-relaxed">{application.response_message}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="bordered"
                        className="border-green-200 hover:bg-green-50 text-green-700"
                        onClick={() => navigate(`/hustler/organizations/${application.organization._id}`)}
                      >
                        View Organization
                      </Button>
                      
                      {application.status === 'pending' && (
                        <Button
                          color="danger"
                          variant="light"
                          onClick={() => handleWithdrawApplication(application._id)}
                          isLoading={withdrawing === application._id}
                        >
                          Withdraw Application
                        </Button>
                      )}
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
}

export default MyApplications;
