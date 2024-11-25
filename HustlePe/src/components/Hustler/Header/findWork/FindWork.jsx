import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "./SearchIcon.jsx"; // Adjust the import path as necessary

function FindWork() {
  const [gigs, setGigs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [skillsArray, setSkillsArray] = useState([]);

  const fetchGigs = async () => {
    try {
      const response = await axios.post('http://localhost:2000/api/v1/hustler/getGigs', {
        skillsArray,
        sortBy: 'createdAt',
        order: -1,
        page: 1,
        limit: 10,
      });
      const fetchedGigs = response.data.data; // Access the 'data' property of the response object
      console.log(fetchedGigs);
      setGigs(fetchedGigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [skillsArray]); // Re-fetch gigs whenever skillsArray changes

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchInput.trim() !== "") {
      if (!skillsArray.includes(searchInput.trim())) {
        setSkillsArray([...skillsArray, searchInput.trim()]);
      }
      setSearchInput(""); // Clear input field after adding
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkillsArray(skillsArray.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="h-full">
      <div className="mt-[5%] ml-[10%]">
        <div>
          <h1 className="text-4xl">Gigs</h1>
        </div>
        <div className="mt-[2%]">
          <Input
            classNames={{
              base: "w-[50%] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search for Job titles, companies, skills or category"
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {skillsArray.map((skill, index) => (
            <span
              key={index}
              className="flex items-center px-3 py-1 bg-gray-200 text-black rounded-full"
            >
              {skill}
              <button
                className="ml-2 text-red-600 hover:text-red-800"
                onClick={() => removeSkill(skill)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%]">Title</TableHead>
                <TableHead className="w-[15%]">Description</TableHead>
                <TableHead className="w-[5%]">Status</TableHead>
                <TableHead className="w-[10%]">Skills Required</TableHead>
                <TableHead className="w-[5%]">Budget</TableHead>
                <TableHead className="w-[5%]">Payment Option</TableHead>
                <TableHead className="w-[5%]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gigs.map((gig) => (
                <TableRow key={gig._id}>
                  <TableCell className="font-medium">{gig.title}</TableCell>
                  <TableCell>{gig.description}</TableCell>
                  <TableCell>
                    <button
                      className={`px-2 py-1 rounded text-white ${
                        gig.status === "open" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {gig.status}
                    </button>
                  </TableCell>
                  <TableCell>{gig.skills_req.join(", ")}</TableCell>
                  <TableCell>{gig.budget}</TableCell>
                  <TableCell>{gig.payment_option}</TableCell>
                  <TableCell>
                    <Button auto className="mt-2">Apply</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default FindWork;
