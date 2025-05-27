import { Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "Project 1",
    description: "Description for project 1",
    budget: "$1000",
    location: "New York",
    link: "https://example.com/project1"
  },
  {
    title: "Project 2",
    description: "Description for project 2",
    budget: "$2000",
    location: "San Francisco",
    link: "https://example.com/project2"
  },
  // Add more projects as needed
];
function JobPosting() {
  const navigate = useNavigate();

  const handlePostGig = () => {
    navigate("/client/PostGig");
  }
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
                <p className="text-md font-bold text-center">{project.title}</p>
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
              <Link isExternal showAnchorIcon href={project.link}>
                View Project
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </div>
  );
}

export default JobPosting;