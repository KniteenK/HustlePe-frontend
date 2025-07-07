import { Avatar, Button, Card, CardBody, CardHeader, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowLeft, Award, Briefcase, Building2, Calendar, DollarSign, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface OrganizationDetails {
  _id: string;
  name: string;
  description: string;
  founder: {
    _id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  members: Array<{
    hustler: {
      _id: string;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
      skills: string[];
      experience: Array<{
        company: string;
        position: string;
        start_date: string;
        end_date?: string;
        currently_working: boolean;
      }>;
    };
    position: string;
  }>;
  rating: number;
  createdAt: string;
  currentGigs: Array<{
    _id: string;
    title: string;
    budget: number;
    status: string;
    deadline: string;
  }>;
  pastGigs: Array<{
    _id: string;
    title: string;
    budget: number;
    status: string;
    deadline: string;
  }>;
  stats: {
    totalMembers: number;
    activeGigs: number;
    completedGigs: number;
    totalRevenue: number;
  };
}

function OrganizationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [organization, setOrganization] = useState<OrganizationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [desiredPosition, setDesiredPosition] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [userOrganizationStatus, setUserOrganizationStatus] = useState<{
    isMember: boolean;
    isFounder: boolean;
    hasOrganization: boolean;
  }>({ isMember: false, isFounder: false, hasOrganization: false });

  const fetchOrganizationDetails = async () => {
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      const response = await axios.get(
        `http://localhost:2000/api/v1/organization/${id}/details`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      setOrganization(response.data.data);
    } catch (error) {
      console.error('Error fetching organization details:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      // Check user's current organization status
      try {
        const myOrgResponse = await axios.get(
          `http://localhost:2000/api/v1/organization/my-organization`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        if (myOrgResponse.data.data) {
          const userOrg = myOrgResponse.data.data;
          setUserOrganizationStatus({
            isMember: userOrg._id === id,
            isFounder: userOrg.isFounder && userOrg._id === id,
            hasOrganization: true
          });
          
          // If user is already a member of this organization, no need to check applications
          if (userOrg._id === id) {
            return;
          }
        }
      } catch (orgError: any) {
        // User doesn't have an organization (404 error is expected)
        if (orgError.response && orgError.response.status === 404) {
          setUserOrganizationStatus({
            isMember: false,
            isFounder: false,
            hasOrganization: false
          });
        } else {
          console.error('Error checking user organization:', orgError);
        }
      }

      // Check applications only if user is not a member of this org
      const response = await axios.get(
        `http://localhost:2000/api/v1/organization/my-applications`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const applications = response.data.data;
      const hasAppliedToThisOrg = applications.some(
        (app: any) => app.organization._id === id
      );
      setHasApplied(hasAppliedToThisOrg);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const handleApply = async () => {
    if (!applicationMessage.trim() || !desiredPosition.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setApplying(true);
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      await axios.post(
        `http://localhost:2000/api/v1/organization/${id}/apply`,
        {
          application_message: applicationMessage,
          desired_position: desiredPosition,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      alert("Application submitted successfully!");
      setHasApplied(true);
      onClose();
      setApplicationMessage("");
      setDesiredPosition("");
    } catch (error: any) {
      console.error('Error applying to organization:', error);
      alert(error.response?.data?.message || "Failed to submit application");
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrganizationDetails();
      checkApplicationStatus();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading organization details...</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Organization Not Found</h2>
          <p className="text-gray-600 mb-4">The organization you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/hustler/organizations")}>
            Go Back to Organizations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/hustler/organizations")}
            className="mb-4"
            startContent={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Organizations
          </Button>
        </div>

        {/* Organization Header */}
        <Card className="mb-6 shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-start gap-6 w-full">
              <Avatar
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(organization.name)}&background=16a34a&color=ffffff`}
                alt={organization.name}
                className="w-24 h-24 border-4 border-white"
                fallback={<Building2 className="h-12 w-12 text-green-600" />}
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{organization.name}</h1>
                <p className="text-green-100 mb-4 text-lg">{organization.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {new Date(organization.createdAt).getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>Rating: {organization.rating}/5</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {userOrganizationStatus.isMember ? (
                  userOrganizationStatus.isFounder ? (
                    <Button
                      className="bg-white text-green-700 hover:bg-green-50 font-semibold"
                      onClick={() => navigate("/hustler/my-organization")}
                    >
                      Manage Organization
                    </Button>
                  ) : (
                    <Chip color="primary" variant="flat">
                      You are a member
                    </Chip>
                  )
                ) : userOrganizationStatus.hasOrganization ? (
                  <Chip color="warning" variant="flat">
                    Already in organization
                  </Chip>
                ) : !hasApplied ? (
                  <Button
                    className="bg-white text-green-700 hover:bg-green-50 font-semibold"
                    onClick={onOpen}
                  >
                    Apply to Join
                  </Button>
                ) : (
                  <Chip color="success" variant="flat">
                    Application Submitted
                  </Chip>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border border-green-200">
            <CardBody className="text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{organization.stats.totalMembers}</h3>
              <p className="text-gray-600">Total Members</p>
            </CardBody>
          </Card>
          <Card className="border border-green-200">
            <CardBody className="text-center">
              <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{organization.stats.activeGigs}</h3>
              <p className="text-gray-600">Active Gigs</p>
            </CardBody>
          </Card>
          <Card className="border border-green-200">
            <CardBody className="text-center">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{organization.stats.completedGigs}</h3>
              <p className="text-gray-600">Completed Gigs</p>
            </CardBody>
          </Card>
          <Card className="border border-green-200">
            <CardBody className="text-center">
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">₹{organization.stats.totalRevenue.toLocaleString()}</h3>
              <p className="text-gray-600">Total Revenue</p>
            </CardBody>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Members */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6" />
                Team Members
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {organization.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <Avatar
                      src={member.hustler.avatar}
                      alt={member.hustler.username}
                      className="w-12 h-12"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {member.hustler.first_name} {member.hustler.last_name}
                      </h4>
                      <p className="text-sm text-gray-600">{member.position}</p>
                      <p className="text-xs text-gray-500">@{member.hustler.username}</p>
                    </div>
                    <div className="text-right">
                      <Chip size="sm" color="success" variant="flat">
                        {member.hustler.skills.length} Skills
                      </Chip>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Current Gigs */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Current Projects
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {organization.currentGigs.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No active projects</p>
                  </div>
                ) : (
                  organization.currentGigs.map((gig) => (
                    <div key={gig._id} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{gig.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">₹{gig.budget}</span>
                        </div>
                        <Chip size="sm" color="success" variant="flat">
                          {gig.status}
                        </Chip>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Application Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold text-green-700">Apply to {organization.name}</h2>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Position *
                  </label>
                  <Input
                    placeholder="e.g., Frontend Developer, Project Manager"
                    value={desiredPosition}
                    onChange={(e) => setDesiredPosition(e.target.value)}
                    variant="bordered"
                    classNames={{
                      input: "text-gray-900",
                      inputWrapper: "border-green-200 focus-within:border-green-500"
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Message *
                  </label>
                  <Textarea
                    placeholder="Tell them why you want to join this organization and what you can contribute..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    variant="bordered"
                    rows={6}
                    classNames={{
                      input: "text-gray-900",
                      inputWrapper: "border-green-200 focus-within:border-green-500"
                    }}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                onPress={handleApply}
                isLoading={applying}
              >
                Submit Application
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default OrganizationDetail;
