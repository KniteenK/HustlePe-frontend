import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../findWork/SearchIcon"; // Adjust the import path as necessary

const mockOrganizations = [
  { _id: 1, name: "Tech Corp", description: "A leading tech company specializing in software development.", location: "San Francisco, CA" },
  { _id: 2, name: "Design Studio", description: "A creative design agency offering web and graphic design services.", location: "New York, NY" },
  { _id: 3, name: "Marketing Experts", description: "A marketing firm helping businesses grow their online presence.", location: "Chicago, IL" },
  { _id: 4, name: "Finance Solutions", description: "Providing financial consulting and investment services.", location: "Boston, MA" },
  { _id: 5, name: "Health Innovators", description: "Innovative healthcare solutions for modern medical challenges.", location: "Los Angeles, CA" },
];

const getOrganizations = async ({ searchQuery }) => {
  try {
    // Mock filtering logic
    if (searchQuery.toLowerCase().includes("tech")) {
      return mockOrganizations.filter(org => org.name.toLowerCase().includes("tech"));
    }
    return mockOrganizations;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw new Error('Error fetching organizations by search query');
  }
};

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchOrganizations = async () => {
    try {
      const fetchedOrganizations = await getOrganizations({ searchQuery: searchInput.trim() });
      console.log('Fetched organizations:', fetchedOrganizations);  
      setOrganizations(fetchedOrganizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations(); // Fetch organizations on component mount

    const intervalId = setInterval(() => {
      fetchOrganizations();
    }, 5000); // Fetch organizations every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [searchInput]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && searchInput.trim() !== "") {
      await fetchOrganizations();
      setSearchInput("");
    }
  };

  return (
    <div className='h-full'>
      <div className='mt-[5%] ml-[10%]'>
        <div>
          <h1 className='text-4xl'>Organizations</h1>
        </div>
        <div className="mt-[2%]">
          <Input
            classNames={{
              base: "w-[50%] h-10", 
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search for organizations"
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {organizations.map((org) => (
            <div key={org._id} className="p-4 bg-white rounded shadow-md text-black">
              <h2 className="text-xl font-bold">{org.name}</h2>
              <p>{org.description}</p>
              <p className="font-semibold">{org.location}</p>
              <Button className="mt-2" auto>Contact</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Organizations;