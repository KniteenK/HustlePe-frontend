import { Avatar, Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Mail,
  MapPin,
  Star,
  Users,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<any>(null);
  const [proposals, setProposals] = useState<any[]>([]);
  const [showProposals, setShowProposals] = useState(false);
  const [loading, setLoading] = useState(true);
  const [proposalAction, setProposalAction] = useState(0);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const accessToken = Cookies.get("accessToken")?.replace(/^"|"$/g, "");
        const res = await axios.get(`http://localhost:2000/api/v1/client/gig/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setJob(res.data.data);
      } catch (err) {
        setJob(null);
      }
      setLoading(false);
    };
    if (jobId) fetchJob();
  }, [jobId]);

  useEffect(() => {
    const fetchProposals = async () => {
      if (showProposals) {
        try {
          const accessToken = Cookies.get("accessToken")?.replace(/^"|"$/g, "");
          const res = await axios.get(`http://localhost:2000/api/v1/client/proposals/${jobId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
          setProposals(res.data.data);
        } catch (err) {
          setProposals([]);
        }
      }
    };
    fetchProposals();
  }, [showProposals, proposalAction, jobId]);

  const fetchProposalsToggle = async () => {
    setShowProposals((prev) => !prev);
  };

  const handleAccept = async (hustlerId: string, proposalId?: string) => {
    try {
      const accessToken = Cookies.get("accessToken")?.replace(/^"|"$/g, "");
      await axios.post(
        "http://localhost:2000/api/v1/client/accept-proposal",
        { proposalId },
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      alert("Proposal accepted for this job!");
      setProposalAction((prev) => prev + 1);
    } catch (err) {
      alert("Failed to accept proposal.");
    }
  };

  const handleReject = async (proposalId: string) => {
    try {
      const accessToken = Cookies.get("accessToken")?.replace(/^"|"$/g, "");
      await axios.post(
        "http://localhost:2000/api/v1/client/reject-proposal",
        { proposalId },
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      alert("Proposal rejected!");
      setProposalAction((prev) => prev + 1);
    } catch (err) {
      alert("Failed to reject proposal.");
    }
  };

  const sortedProposals = [...proposals].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-lg border border-red-200">
          <CardBody className="p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h3>
            <p className="text-gray-500">The job you're looking for doesn't exist or has been removed.</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Job Details
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your job posting and review proposals
          </p>
        </div>

        {/* Job Information Card */}
        <Card className="shadow-lg border border-green-200 mb-8">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <h2 className="text-2xl font-bold">{job.title}</h2>
            </div>
          </CardHeader>
          <CardBody className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                
                {job.skills_req && job.skills_req.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills_req.map((skill: string, index: number) => (
                        <Chip key={index} variant="flat" color="success" size="sm">
                          {skill}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Budget</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">₹{job.budget}</p>
                </div>
                
                {job.location && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="text-gray-900">{job.location}</span>
                  </div>
                )}
                
                {job.deadline && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-700">Deadline:</span>
                    <span className="text-gray-900">{new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                
                {job.payment_option && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-gray-700">Payment Type:</span>
                    <Chip variant="flat" size="sm">{job.payment_option}</Chip>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Proposals Section */}
        <Card className="shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Proposals</h2>
              </div>
              <Button
                onClick={fetchProposalsToggle}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/50"
                endContent={<Eye className="h-4 w-4" />}
              >
                {showProposals ? "Hide Proposals" : "View All Proposals"}
              </Button>
            </div>
          </CardHeader>
          
          {showProposals && (
            <CardBody className="p-6">
              {sortedProposals.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Proposals Yet</h3>
                  <p className="text-gray-500">Your job posting hasn't received any proposals yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedProposals.map((proposal) => (
                    <Card key={proposal._id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardBody className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Freelancer Info */}
                          <div className="flex items-start gap-4">
                            <Avatar
                              src={proposal.hustler?.avatar || "/default-avatar.png"}
                              className="w-16 h-16 border-2 border-green-200"
                            />
                            <div className="flex-1">
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">
                                    {proposal.hustler?.first_name} {proposal.hustler?.last_name}
                                  </h3>
                                  <p className="text-green-600 font-medium">@{proposal.hustler?.username}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 lg:mt-0">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">{proposal.hustler?.rating || "N/A"}</span>
                                  </div>
                                  <Chip 
                                    color={getStatusColor(proposal.status)} 
                                    variant="flat" 
                                    size="sm"
                                    className="capitalize"
                                  >
                                    {proposal.status}
                                  </Chip>
                                </div>
                              </div>
                              
                              {/* Contact Info */}
                              <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-gray-500" />
                                  <span>{proposal.hustler?.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span>{proposal.hustler?.address?.city}, {proposal.hustler?.address?.country}</span>
                                </div>
                              </div>
                              
                              {/* Skills */}
                              {proposal.hustler?.skills && (
                                <div className="mb-4">
                                  <h4 className="font-semibold text-gray-700 mb-2">Skills:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {proposal.hustler.skills.map((skill: string, index: number) => (
                                      <Chip key={index} size="sm" variant="bordered">
                                        {skill}
                                      </Chip>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Cover Letter */}
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Cover Letter:</h4>
                                <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                                  {proposal.cover_letter}
                                </p>
                              </div>
                              
                              {/* Proposal Details */}
                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <div className="flex items-center gap-1 mb-1">
                                    <DollarSign className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-800">Budget</span>
                                  </div>
                                  <p className="font-bold text-green-700">
                                    ₹{proposal.expected_budget} ({proposal.budget_type})
                                  </p>
                                </div>
                                
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Calendar className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-800">Timeline</span>
                                  </div>
                                  <p className="font-medium text-blue-700">{proposal.estimated_timeline}</p>
                                </div>
                                
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Clock className="h-4 w-4 text-purple-600" />
                                    <span className="text-sm font-medium text-purple-800">Availability</span>
                                  </div>
                                  <p className="font-medium text-purple-700">{proposal.availability}</p>
                                </div>
                                
                                <div className="bg-orange-50 p-3 rounded-lg">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Clock className="h-4 w-4 text-orange-600" />
                                    <span className="text-sm font-medium text-orange-800">Working Hours</span>
                                  </div>
                                  <p className="font-medium text-orange-700">{proposal.working_hours}</p>
                                </div>
                              </div>
                              
                              {/* Submission Date */}
                              <p className="text-xs text-gray-500 mb-4">
                                Submitted: {new Date(proposal.createdAt).toLocaleString()}
                              </p>
                              
                              {/* Action Buttons */}
                              {proposal.status === "pending" && (
                                <div className="flex gap-3">
                                  <Button
                                    onClick={() => handleAccept(proposal.hustler._id, proposal._id)}
                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                                    startContent={<CheckCircle className="h-4 w-4" />}
                                  >
                                    Accept Proposal
                                  </Button>
                                  <Button
                                    onClick={() => handleReject(proposal._id)}
                                    variant="bordered"
                                    className="border-red-200 hover:bg-red-50 text-red-700"
                                    startContent={<XCircle className="h-4 w-4" />}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </CardBody>
          )}
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
