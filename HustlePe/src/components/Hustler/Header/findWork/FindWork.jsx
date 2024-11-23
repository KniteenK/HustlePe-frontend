import { Chip, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "./SearchIcon.jsx"; // Adjust the import path as necessary

const getGigs = async ({ skillsArray, sortBy = 'createdAt', order = -1, page = 1, limit = 10 }) => {
  try {
    const response = await axios.post('http://localhost:2000/api/v1/hustler/FindWork', {
      skillsArray,
      sortBy,
      order,
      page,
      limit,
    });

    return response.data.jobs; // Assuming the API returns an object with a 'jobs' property
  } catch (error) {
    console.error('Error fetching gigs:', error);
    throw new Error('Error fetching jobs by skills and filter');
  }
};

function FindWork() {
  const [gigs, setGigs] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchGigs = async () => {
    try {
      const fetchedGigs = await getGigs({ skillsArray: [searchInput.trim()] });
      console.log('Fetched gigs:', fetchedGigs);  
      setGigs(fetchedGigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchGigs();
    }, 5000); // Fetch gigs every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [searchInput]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && searchInput.trim() !== "") {
      await fetchGigs();
      setSearchInput("");
    }
  };

  const handleClose = (gigToRemove) => {
    setGigs(gigs.filter(gig => gig._id !== gigToRemove._id));
  };

  return (
    <div className='h-screen'>
      <div className='mt-[5%] ml-[10%]'>
        <div>
          <h1 className='text-4xl'>Gigs</h1>
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
        <div className="flex gap-2 mt-4">
          {gigs.map((gig, index) => (
            <Chip key={index} onClose={() => handleClose(gig)} variant="flat">
              {gig.title}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindWork;