import { Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function JobPosting() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Get client id and token from cookie
    let clientId = "";
    let accessToken = "";
    const userDataCookie = Cookies.get('userData');
    const accessTokenCookie = Cookies.get('accessToken');
    if (userDataCookie) {
      try {
        const userData = JSON.parse(userDataCookie);
        clientId = userData._id || "";
      } catch (error) {
        console.error("Failed to parse userData cookie:", error);
      }
    }
    if (accessTokenCookie) {
      accessToken = accessTokenCookie.replace(/^"|"$/g, "");
    }

    // Fetch gigs posted by this client using Authorization header
    const fetchGigs = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/v1/client/myGigs?clientId=${clientId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = res.data;
        setProjects(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Failed to fetch gigs", err);
        setProjects([]);
      }
    };
    if (clientId && accessToken) fetchGigs();
  }, []);

  const handlePostGig = () => {
    navigate("/client/PostGig");
  };

  return (
    <div className="flex flex-col h-full p-6 md:ml-11">
      <div className="text-left mb-6 w-full mt-10">
        <div className="text-3xl md:text-5xl font-bold mb-2">Hire the right talent</div>
        <div className="text-3xl md:text-5xl font-bold">for your project</div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full mt-5 p-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-1/5" onClick={handlePostGig}>Post a Gig</button>
        <a href="#ongoing-jobs" className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-1/5 text-center">Gigs Posted</a>
      </div>
      <div id="ongoing-jobs" className="text-center mb-6 w-full mt-48"> {/* Increased top margin to create more space */}
        <div className="text-3xl md:text-3xl font-bold mb-2 mt-11">Your Ongoing Job Postings</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="max-w-[400px]">
            <CardHeader className="flex justify-center">
              <div className="flex flex-col items-center">
                <p className="text-md font-bold text-center">{project.title || project.name}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{project.description}</p>
              <p className="mt-2"><strong>Budget:</strong> {project.budget}</p>
              <p><strong>Location:</strong> {project.location}</p>
            </CardBody>
            <Divider />
            <CardFooter>
              {project.link && (
                <Link isExternal showAnchorIcon href={project.link}>
                  View Project
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </div>
  );
}

export default JobPosting;