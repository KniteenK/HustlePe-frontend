import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../findWork/SearchIcon"; // Adjust the import path as necessary

const getOrganizations = async () => {
  try {
    console.log('Fetching organizations...');
    const response = await fetch("http://localhost:2000/api/v1/organization/all");
    if (!response.ok) {
      throw new Error("Failed to fetch organizations");
    }
    const data = await response.json();
    console.log('Organizations fetched:', data);
    // The organizations are in data.data (array)
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw new Error('Error fetching organizations');
  }
};

function Organizations() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchOrganizations = async () => {
    try {
      const fetchedOrganizations = await getOrganizations();
      setOrganizations(fetchedOrganizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();

    const intervalId = setInterval(() => {
      fetchOrganizations();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Ensure organizations is always an array
  const orgArray = Array.isArray(organizations) ? organizations : [];
  const filteredOrganizations = orgArray.filter(org =>
    org.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // No need to fetch again, just filter client-side
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
          {filteredOrganizations.map((org) => (
            <div key={org._id} className="p-4 bg-white rounded shadow-md text-black">
              <h2 className="text-xl font-bold">{org.name}</h2>
              <p>{org.description}</p>
              <p className="font-semibold">{org.location}</p>
              <Button className="mt-2">Contact</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Organizations;