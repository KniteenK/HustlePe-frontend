import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Proposals for this Gig</h2>
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <>
          {proposals.length === 0 && (
            <div className="text-center text-gray-500 mb-6">No proposals yet.</div>
          )}
          <div className="flex flex-col gap-4">
            {proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="border border-gray-200 shadow-sm p-4 rounded-lg flex gap-4 items-center bg-white"
              >
                <img
                  src={proposal.hustler?.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-lg">
                      {proposal.hustler?.first_name} {proposal.hustler?.last_name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      @{proposal.hustler?.username}
                    </span>
                    <span className="ml-2 text-yellow-600 text-xs">
                      Rating: {proposal.hustler?.rating || "N/A"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Skills:</span>{" "}
                    {proposal.hustler?.skills?.join(", ")}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-medium">Cover Letter:</span> {proposal.cover_letter}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span>
                      <span className="font-medium">Budget:</span> {proposal.expected_budget} ({proposal.budget_type})
                    </span>
                    <span>
                      <span className="font-medium">Timeline:</span> {proposal.estimated_timeline}
                    </span>
                    <span>
                      <span className="font-medium">Availability:</span> {proposal.availability}
                    </span>
                    <span>
                      <span className="font-medium">Working Hours:</span> {proposal.working_hours}
                    </span>
                    <span>
                      <span className="font-medium">Status:</span> {proposal.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">Apply to this Gig</h3>
        {alreadyApplied ? (
          <div className="text-green-600 text-center font-medium">
            You have already applied to this gig.
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex flex-col gap-4">
            <Textarea
              label="Cover Letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
              minRows={3}
              className="bg-gray-50"
              labelPlacement="outside"
            />
            <div className="flex flex-col md:flex-row gap-4">
              {budgetType === "hourly" ? (
                <>
                  <Input
                    label="Hourly Rate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value.replace(/^0+/, ""))}
                    required
                    className="bg-gray-50"
                    labelPlacement="outside"
                    min={0}
                    step="any"
                  />
                  <Input
                    label="Number of Hours"
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value.replace(/^0+/, ""))}
                    required
                    className="bg-gray-50"
                    labelPlacement="outside"
                    min={0}
                    step="any"
                  />
                  <div className="flex items-center text-base font-medium mt-2 md:mt-0">
                    <span>Total Price:&nbsp;</span>
                    <span className="text-blue-600">
                      {hourlyRate && hours
                        ? `₹${(parseFloat(hourlyRate) * parseFloat(hours || "0")).toFixed(2)}`
                        : "₹0.00"}
                    </span>
                  </div>
                </>
              ) : (
                <Input
                  label="Expected Budget"
                  type="number"
                  value={expectedBudget}
                  onChange={(e) => setExpectedBudget(e.target.value.replace(/^0+/, ""))}
                  required
                  className="bg-gray-50"
                  labelPlacement="outside"
                  min={0}
                  step="any"
                />
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Budget Type</label>
                <select
                  className="border rounded px-2 py-2 w-full bg-gray-50"
                  value={budgetType}
                  onChange={(e) => setBudgetType(e.target.value)}
                >
                  <option value="fixed">Fixed</option>
                  <option value="hourly">Hourly</option>
                  <option value="negotiable">Negotiable</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                label="Estimated Timeline"
                value={estimatedTimeline}
                onChange={(e) => setEstimatedTimeline(e.target.value)}
                className="bg-gray-50"
                labelPlacement="outside"
              />
              <Input
                label="Availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="bg-gray-50"
                labelPlacement="outside"
              />
              <Input
                label="Working Hours"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="bg-gray-50"
                labelPlacement="outside"
              />
            </div>
            <Button color="primary" type="submit" className="mt-2 w-full md:w-1/3 mx-auto">
              Apply
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyToGig;
