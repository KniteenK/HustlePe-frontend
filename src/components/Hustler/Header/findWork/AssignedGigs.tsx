import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Assigned Gigs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : assignedGigs.length === 0 ? (
        <div className="text-center text-gray-500">No assigned gigs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedGigs.map((gig) => (
            <Card key={gig._id} className="max-w-[400px]">
              <CardHeader className="flex flex-col items-start">
                <span className="font-bold text-lg">{gig.title}</span>
                <span className="text-sm text-gray-500">{gig.location}</span>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="mb-2">{gig.description}</div>
                <div>
                  <strong>Budget:</strong> {gig.budget}
                </div>
                <div>
                  <strong>Status:</strong> {gig.status}
                </div>
                {/* Add more gig details if needed */}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedGigs;
