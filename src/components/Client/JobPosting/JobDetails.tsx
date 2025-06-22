import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<any>(null);
  const [proposals, setProposals] = useState<any[]>([]);
  const [showProposals, setShowProposals] = useState(false);
  const [loading, setLoading] = useState(true);
  const [proposalAction, setProposalAction] = useState(0); // increment to trigger update

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

  // Fetch proposals when proposals are shown or after accept/reject
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

  // Sort proposals: pending first, then accepted/rejected
  const sortedProposals = [...proposals].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return 0;
  });

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Job Details</h2>
      <div className="mb-4">
        <div><strong>Title:</strong> {job.title}</div>
        <div><strong>Description:</strong> {job.description}</div>
        <div><strong>Budget:</strong> {job.budget}</div>
        <div><strong>Location:</strong> {job.location}</div>
        {/* ...other job details... */}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={fetchProposalsToggle}
      >
        {showProposals ? "Hide Proposals" : "See All Proposals"}
      </button>
      {showProposals && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Proposals</h3>
          {sortedProposals.length === 0 && <div>No proposals yet.</div>}
          {sortedProposals.map((proposal) => (
            <div key={proposal._id} className="border p-4 mb-4 rounded bg-white shadow flex items-start justify-between">
              <div>
                <div className="flex gap-4 items-center mb-2">
                  <img
                    src={proposal.hustler?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <div className="font-semibold text-lg">
                      {proposal.hustler?.first_name} {proposal.hustler?.last_name}
                      <span className="ml-2 text-gray-500 text-sm">
                        @{proposal.hustler?.username}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {proposal.hustler?.email}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {proposal.hustler?.address?.city}, {proposal.hustler?.address?.country}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Skills:</span> {proposal.hustler?.skills?.join(", ")}
                    </div>
                    <div className="text-sm text-yellow-600">
                      <span className="font-medium">Rating:</span> {proposal.hustler?.rating || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Cover Letter:</span> {proposal.cover_letter}
                </div>
                <div className="flex flex-wrap gap-4 text-sm mb-2">
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
                <div className="text-xs text-gray-400 mb-2">
                  <span className="font-medium">Submitted:</span> {new Date(proposal.createdAt).toLocaleString()}
                </div>
                {proposal.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleAccept(proposal.hustler._id, proposal._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(proposal._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
              <div className="ml-4 flex flex-col items-end min-w-[120px]">
                {proposal.status === "pending" ? (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                ) : proposal.status === "rejected" ? (
                  <span className="text-red-600 font-semibold">Rejected</span>
                ) : (
                  <span className="text-green-600 font-semibold">Action Taken</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
