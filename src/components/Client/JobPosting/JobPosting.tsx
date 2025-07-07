import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Link } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Briefcase, DollarSign, ExternalLink, Eye, MapPin, Plus } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
            Hire the Right Talent
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            For Your Project
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Post your projects and connect with skilled freelancers who can bring your vision to life
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
            onClick={handlePostGig}
            startContent={<Plus className="h-5 w-5" />}
            size="lg"
          >
            Post a New Gig
          </Button>
          <Button
            variant="bordered"
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            onClick={() => document.getElementById('ongoing-jobs')?.scrollIntoView({ behavior: 'smooth' })}
            startContent={<Briefcase className="h-5 w-5" />}
            size="lg"
          >
            View Posted Gigs
          </Button>
        </div>

        {/* Posted Jobs Section */}
        <section id="ongoing-jobs">
          <Card className="shadow-lg border border-green-200 mb-8">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                <h3 className="text-2xl font-bold">Your Job Postings</h3>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Posted Yet</h3>
                  <p className="text-gray-500 mb-6">Start by posting your first project to find talented freelancers</p>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    onClick={handlePostGig}
                    startContent={<Plus className="h-4 w-4" />}
                  >
                    Post Your First Gig
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <Card key={index} className="border border-green-200 hover:shadow-xl transition-all duration-300 bg-white">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-3">
                        <div className="flex flex-col w-full">
                          <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {project.title || project.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Chip size="sm" color="success" variant="flat">
                              Active
                            </Chip>
                          </div>
                        </div>
                      </CardHeader>
                      <Divider className="bg-green-200" />
                      <CardBody className="p-4">
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="space-y-2">
                          {project.budget && (
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-gray-700">Budget:</span>
                              <span className="font-bold text-green-600">₹{project.budget}</span>
                            </div>
                          )}
                          
                          {project.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-gray-700">Location:</span>
                              <span className="text-gray-600">{project.location}</span>
                            </div>
                          )}
                        </div>
                      </CardBody>
                      <Divider className="bg-green-200" />
                      <CardFooter className="p-4">
                        <div className="flex flex-col w-full gap-3">
                          {project.link && (
                            <Link 
                              isExternal 
                              showAnchorIcon 
                              href={project.link}
                              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Project
                            </Link>
                          )}
                          <Button
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                            onClick={() => navigate(`/client/job/${project._id}`)}
                            startContent={<Eye className="h-4 w-4" />}
                            size="sm"
                            fullWidth
                          >
                            View Details
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default JobPosting;