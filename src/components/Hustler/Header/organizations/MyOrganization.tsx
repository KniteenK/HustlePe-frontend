import { Avatar, Button, Card, CardBody, CardHeader, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowLeft, Building2, Calendar, DollarSign, Mail, Trash2, Users, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrganizationMember {
  hustler: {
    _id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    skills: string[];
  };
  position: string;
}

interface PendingApplication {
  _id: string;
  hustler: {
    _id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    skills: string[];
  };
  application_message: string;
  desired_position: string;
  applied_at: string;
}

interface MyOrganizationData {
  _id: string;
  name: string;
  description: string;
  members: OrganizationMember[];
  pendingApplications: PendingApplication[];
  isFounder: boolean;
  userPosition: string;
  createdAt: string;
  currentGigs: any[];
  pastGigs: any[];
}

function MyOrganization() {
  const navigate = useNavigate();
  const { isOpen: isDeleteOrgOpen, onOpen: onDeleteOrgOpen, onClose: onDeleteOrgClose } = useDisclosure();
  
  const [organization, setOrganization] = useState<MyOrganizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchMyOrganization = async () => {
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      const response = await axios.get(
        'http://localhost:2000/api/v1/organization/my-organization',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      setOrganization(response.data.data);
    } catch (error: any) {
      console.error('Error fetching organization:', error);
      if (error.response?.status === 404) {
        // User is not part of any organization
        navigate('/hustler/organizations');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRespondToApplication = async (applicationId: string, status: 'accepted' | 'rejected', responseMessage: string = '') => {
    setProcessing(true);
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      await axios.put(
        `http://localhost:2000/api/v1/organization/application/${applicationId}/respond`,
        {
          status,
          response_message: responseMessage
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      alert(`Application ${status} successfully!`);
      fetchMyOrganization(); // Refresh data
    } catch (error: any) {
      console.error('Error responding to application:', error);
      alert(error.response?.data?.message || 'Failed to respond to application');
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveMember = async (hustlerId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;

    setProcessing(true);
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      await axios.delete(
        `http://localhost:2000/api/v1/organization/${organization?._id}/remove-member/${hustlerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      alert('Member removed successfully!');
      fetchMyOrganization(); // Refresh data
    } catch (error: any) {
      console.error('Error removing member:', error);
      alert(error.response?.data?.message || 'Failed to remove member');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteOrganization = async () => {
    setProcessing(true);
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      await axios.delete(
        `http://localhost:2000/api/v1/organization/${organization?._id}/delete`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      alert('Organization deleted successfully!');
      navigate('/hustler/organizations');
    } catch (error: any) {
      console.error('Error deleting organization:', error);
      alert(error.response?.data?.message || 'Failed to delete organization');
    } finally {
      setProcessing(false);
      onDeleteOrgClose();
    }
  };

  const handleLeaveOrganization = async () => {
    if (!confirm('Are you sure you want to leave this organization?')) return;

    setProcessing(true);
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      await axios.post(
        'http://localhost:2000/api/v1/organization/leave',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      alert('Left organization successfully!');
      navigate('/hustler/organizations');
    } catch (error: any) {
      console.error('Error leaving organization:', error);
      alert(error.response?.data?.message || 'Failed to leave organization');
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchMyOrganization();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your organization...</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Found</h2>
          <p className="text-gray-600 mb-4">You are not part of any organization.</p>
          <Button onClick={() => navigate("/hustler/organizations")}>
            Browse Organizations
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
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{organization.name}</h1>
                  <Chip color="warning" variant="flat" size="sm">
                    {organization.userPosition}
                  </Chip>
                </div>
                <p className="text-green-100 mb-4 text-lg">{organization.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {new Date(organization.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{organization.members.length} Members</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {organization.isFounder && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onClick={onDeleteOrgOpen}
                  >
                    Delete Organization
                  </Button>
                )}
                {!organization.isFounder && (
                  <Button
                    color="warning"
                    variant="light"
                    size="sm"
                    onClick={handleLeaveOrganization}
                    isLoading={processing}
                  >
                    Leave Organization
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs aria-label="Organization management" className="w-full">
          <Tab key="members" title="Members">
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Team Members ({organization.members.length})
                  </h2>
                </div>
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
                      <div className="flex items-center gap-2">
                        <Chip size="sm" color="success" variant="flat">
                          {member.hustler.skills.length} Skills
                        </Chip>
                        {organization.isFounder && member.position !== 'Founder' && (
                          <Button
                            size="sm"
                            color="danger"
                            variant="light"
                            onClick={() => handleRemoveMember(member.hustler._id)}
                            isLoading={processing}
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>

          {organization.isFounder && (
            <Tab key="applications" title={`Applications (${organization.pendingApplications.length})`}>
              <Card className="shadow-lg border border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Mail className="h-6 w-6" />
                    Pending Applications ({organization.pendingApplications.length})
                  </h2>
                </CardHeader>
                <CardBody>
                  {organization.pendingApplications.length === 0 ? (
                    <div className="text-center py-8">
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No pending applications</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {organization.pendingApplications.map((application) => (
                        <div key={application._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <Avatar
                              src={application.hustler.avatar}
                              alt={application.hustler.username}
                              className="w-12 h-12"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {application.hustler.first_name} {application.hustler.last_name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                Desired Position: {application.desired_position}
                              </p>
                              <p className="text-sm text-gray-700 mb-3">
                                {application.application_message}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                Applied {new Date(application.applied_at).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                color="success"
                                onClick={() => handleRespondToApplication(application._id, 'accepted')}
                                isLoading={processing}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                color="danger"
                                variant="light"
                                onClick={() => handleRespondToApplication(application._id, 'rejected')}
                                isLoading={processing}
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Tab>
          )}

          <Tab key="projects" title="Projects">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Projects */}
              <Card className="shadow-lg border border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <h2 className="text-xl font-bold">Current Projects ({organization.currentGigs.length})</h2>
                </CardHeader>
                <CardBody>
                  {organization.currentGigs.length === 0 ? (
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No active projects</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {organization.currentGigs.map((gig) => (
                        <div key={gig._id} className="p-3 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">{gig.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>₹{gig.budget}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Past Projects */}
              <Card className="shadow-lg border border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <h2 className="text-xl font-bold">Completed Projects ({organization.pastGigs.length})</h2>
                </CardHeader>
                <CardBody>
                  {organization.pastGigs.length === 0 ? (
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No completed projects</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {organization.pastGigs.map((gig) => (
                        <div key={gig._id} className="p-3 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">{gig.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>₹{gig.budget}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          </Tab>
        </Tabs>

        {/* Delete Organization Modal */}
        <Modal isOpen={isDeleteOrgOpen} onClose={onDeleteOrgClose}>
          <ModalContent>
            <ModalHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold text-red-700">Delete Organization</h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-700">
                Are you sure you want to delete <strong>{organization.name}</strong>? 
                This action cannot be undone and will:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Remove all members from the organization</li>
                <li>Delete all pending applications</li>
                <li>Permanently delete the organization</li>
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onDeleteOrgClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteOrganization}
                isLoading={processing}
              >
                Delete Organization
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default MyOrganization;
