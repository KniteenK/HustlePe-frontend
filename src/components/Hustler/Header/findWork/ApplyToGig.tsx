import { Avatar, Button, Card, CardBody, CardHeader, Chip, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Briefcase, Calendar, Clock, DollarSign, Star, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ApplyToGig = () => {
  const { gigId } = useParams();
  const [proposals, setProposals] = useState<any[]>([]);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedBudget, setExpectedBudget] = useState("");
  const [budgetType, setBudgetType] = useState("fixed");
  const [estimatedTimeline, setEstimatedTimeline] = useState("");
  const [availability, setAvailability] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hours, setHours] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const accessToken = Cookies.get("accessToken")?.replace(/^"|"$/g, "");
      const res = await axios.get(
        `http://localhost:2000/api/v1/hustler/proposals/${gigId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProposals(res.data.data || []);
      // Check if current user already applied
      const userData = Cookies.get("userData");
      if (userData) {
        const user = JSON.parse(userData);
        if (res.data.data.some((p: any) => p.hustler?._id === user._id)) {
          setAlreadyApplied(true);
        }
      }
    } catch (err) {
      setProposals([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (gigId) fetchProposals();
    // eslint-disable-next-line
  }, [gigId]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = Cookies.get("accessToken")?.replace(/^"|"$/g, "");
      let finalExpectedBudget = expectedBudget;
      if (budgetType === "hourly") {
        finalExpectedBudget = (
          parseFloat(hourlyRate) * parseFloat(hours || "0")
        ).toString();
      }
      await axios.post(
        "http://localhost:2000/api/v1/hustler/applyToJob",
        {
          gig_id: gigId,
          cover_letter: coverLetter,
          expected_budget: finalExpectedBudget,
          budget_type: budgetType,
          estimated_timeline: estimatedTimeline,
          availability,
          working_hours: workingHours,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAlreadyApplied(true);
      fetchProposals();
      setCoverLetter("");
      setExpectedBudget("");
      setBudgetType("fixed");
      setEstimatedTimeline("");
      setAvailability("");
      setWorkingHours("");
      setHourlyRate("");
      setHours("");
      alert("Applied successfully!");
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to apply"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
            Gig Proposals
          </h1>
          <p className="text-gray-600 text-lg">
            View existing proposals and submit your own application
          </p>
        </div>

        {/* Proposals Section */}
        <Card className="mb-8 shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Current Proposals</h2>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading proposals...</p>
              </div>
            ) : (
              <>
                {proposals.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No proposals yet. Be the first to apply!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {proposals.map((proposal) => (
                      <Card key={proposal._id} className="border border-green-200 hover:shadow-md transition-shadow duration-300">
                        <CardBody className="p-6">
                          <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-shrink-0">
                              <Avatar
                                src={proposal.hustler?.avatar || "/default-avatar.png"}
                                alt="avatar"
                                className="w-20 h-20 border-2 border-green-200"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">
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
                                    color={proposal.status === 'accepted' ? 'success' : 'default'} 
                                    variant="flat" 
                                    size="sm"
                                  >
                                    {proposal.status}
                                  </Chip>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Skills:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {proposal.hustler?.skills?.map((skill: string, index: number) => (
                                    <Chip key={index} size="sm" variant="bordered" className="border-green-200">
                                      {skill}
                                    </Chip>
                                  ))}
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Cover Letter:</h4>
                                <p className="text-gray-600 leading-relaxed">{proposal.cover_letter}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-green-600" />
                                  <span className="font-medium">Budget:</span>
                                  <span>₹{proposal.expected_budget} ({proposal.budget_type})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium">Timeline:</span>
                                  <span>{proposal.estimated_timeline}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-purple-600" />
                                  <span className="font-medium">Availability:</span>
                                  <span>{proposal.availability}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4 text-orange-600" />
                                  <span className="font-medium">Working Hours:</span>
                                  <span>{proposal.working_hours}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardBody>
        </Card>

        {/* Application Form */}
        <Card className="shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <h2 className="text-2xl font-bold">Submit Your Proposal</h2>
          </CardHeader>
          <CardBody className="p-6">
            {alreadyApplied ? (
              <div className="text-center py-8">
                <div className="bg-green-100 border border-green-300 rounded-lg p-6 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Application Submitted!</h3>
                  <p className="text-green-600">You have already applied to this gig.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-6">
                <div>
                  <Textarea
                    label="Cover Letter"
                    placeholder="Tell the client why you're the perfect fit for this project..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                    minRows={4}
                    className="mb-4"
                    classNames={{
                      input: "bg-white",
                      inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border border-green-200">
                    <CardHeader className="bg-green-50">
                      <h3 className="text-lg font-semibold text-green-800">Budget Information</h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Type</label>
                        <select
                          className="w-full border-2 border-green-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"
                          value={budgetType}
                          onChange={(e) => setBudgetType(e.target.value)}
                        >
                          <option value="fixed">Fixed Price</option>
                          <option value="hourly">Hourly Rate</option>
                          <option value="negotiable">Negotiable</option>
                        </select>
                      </div>
                      
                      {budgetType === "hourly" ? (
                        <div className="space-y-4">
                          <Input
                            label="Hourly Rate (₹)"
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value.replace(/^0+/, ""))}
                            required
                            min={0}
                            step="any"
                            classNames={{
                              inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                            }}
                          />
                          <Input
                            label="Estimated Hours"
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value.replace(/^0+/, ""))}
                            required
                            min={0}
                            step="any"
                            classNames={{
                              inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                            }}
                          />
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Total Estimated Cost: </span>
                              <span className="text-green-600 font-bold text-lg">
                                {hourlyRate && hours
                                  ? `₹${(parseFloat(hourlyRate) * parseFloat(hours || "0")).toFixed(2)}`
                                  : "₹0.00"}
                              </span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Input
                          label="Expected Budget (₹)"
                          type="number"
                          value={expectedBudget}
                          onChange={(e) => setExpectedBudget(e.target.value.replace(/^0+/, ""))}
                          required
                          min={0}
                          step="any"
                          classNames={{
                            inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                          }}
                        />
                      )}
                    </CardBody>
                  </Card>

                  <Card className="border border-green-200">
                    <CardHeader className="bg-green-50">
                      <h3 className="text-lg font-semibold text-green-800">Project Details</h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                      <Input
                        label=""
                        placeholder="e.g., 2 weeks, 1 month"
                        value={estimatedTimeline}
                        onChange={(e) => setEstimatedTimeline(e.target.value)}
                        classNames={{
                          inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                        }}
                      />
                      <Input
                        label=""
                        placeholder="e.g., Full-time, Part-time, Weekends"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        classNames={{
                          inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                        }}
                      />
                      <Input
                        label=""
                        placeholder="e.g., 9 AM - 5 PM IST"
                        value={workingHours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        classNames={{
                          inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                        }}
                      />
                    </CardBody>
                  </Card>
                </div>

                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
                    size="lg"
                  >
                    Submit Proposal
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ApplyToGig;
