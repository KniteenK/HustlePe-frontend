import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button, Card, CardBody, CardHeader, Chip, Input } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Briefcase, DollarSign, Eye, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "./SearchIcon";

interface Gig {
  _id: string;
  title: string;
  description: string;
  status: string;
  skills_req: string[];
  budget: number;
  payment_option: string;
}

function FindWork() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchGigs = async () => {
    try {
      // Get access token from cookie for authentication
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      const response = await axios.post(
        'http://localhost:2000/api/v1/hustler/getGigs',
        {
          skillsArray,
          sortBy: 'createdAt',
          order: -1,
          page: 1,
          limit: 10,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const fetchedGigs: Gig[] = response.data.data;
      console.log(fetchedGigs);
      setGigs(fetchedGigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [skillsArray]); // Re-fetch gigs whenever skillsArray changes

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim() !== "") {
      if (!skillsArray.includes(searchInput.trim())) {
        setSkillsArray([...skillsArray, searchInput.trim()]);
      }
      setSearchInput(""); // Clear input field after adding
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillsArray(skillsArray.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                Available Gigs
              </h1>
              <p className="text-gray-600 text-lg">
                Discover and apply to projects that match your skills
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <Chip color="success" variant="flat" size="lg">
                {gigs.length} Gigs Available
              </Chip>
              <Button
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                onClick={() => navigate("/hustler/assigned-gigs")}
                endContent={<Eye className="h-4 w-4" />}
              >
                View Assigned Gigs
              </Button>
            </div>
          </div>

          {/* Search Section */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <SearchIcon size={24} />
                <h2 className="text-xl font-bold">Find Your Perfect Gig</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                <Input
                  classNames={{
                    base: "w-full",
                    inputWrapper: "h-12 border-2 border-green-200 hover:border-green-300 focus-within:border-green-500 bg-white",
                    input: "text-base",
                  }}
                  placeholder="Search for job titles, companies, skills, or categories..."
                  size="lg"
                  startContent={<SearchIcon size={20} className="text-green-600" />}
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                
                {/* Skills Filter */}
                {skillsArray.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, index) => (
                        <Chip
                          key={index}
                          onClose={() => removeSkill(skill)}
                          variant="flat"
                          color="success"
                          className="hover:bg-green-200 transition-colors"
                        >
                          {skill}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Gigs Table */}
        <Card className="shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <h2 className="text-xl font-bold">Available Projects</h2>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50">
                    <TableHead className="font-semibold text-green-800">Project Title</TableHead>
                    <TableHead className="font-semibold text-green-800">Description</TableHead>
                    <TableHead className="font-semibold text-green-800">Status</TableHead>
                    <TableHead className="font-semibold text-green-800">Skills Required</TableHead>
                    <TableHead className="font-semibold text-green-800">Budget</TableHead>
                    <TableHead className="font-semibold text-green-800">Payment</TableHead>
                    <TableHead className="font-semibold text-green-800">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gigs.map((gig) => (
                    <TableRow key={gig._id} className="hover:bg-green-50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="max-w-xs">
                          <h3 className="font-semibold text-gray-900 truncate">{gig.title}</h3>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-sm">
                          <p className="text-sm text-gray-600 line-clamp-2">{gig.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={gig.status === "open" ? "success" : "danger"}
                          variant="flat"
                          size="sm"
                        >
                          {gig.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {gig.skills_req.slice(0, 2).map((skill, index) => (
                            <Chip key={index} size="sm" variant="bordered" className="text-xs">
                              {skill}
                            </Chip>
                          ))}
                          {gig.skills_req.length > 2 && (
                            <Chip size="sm" variant="bordered" className="text-xs">
                              +{gig.skills_req.length - 2}
                            </Chip>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">₹{gig.budget}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm" variant="flat" color="default">
                          {gig.payment_option}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                          onClick={() => navigate(`/hustler/apply/${gig._id}`)}
                        >
                          Apply Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {gigs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No gigs available</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default FindWork;
