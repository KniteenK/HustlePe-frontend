import { Chip, Input } from "@nextui-org/react";
import React from 'react';
import { SearchIcon } from "./SearchIcon.jsx";

const initialFruits = [];

function FindWork() {
  const [fruits, setFruits] = React.useState(initialFruits);
  const [searchInput, setSearchInput] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchInput.trim() !== "") {
      if (!fruits.includes(searchInput.trim())) {
        setFruits([...fruits, searchInput.trim()]);
      }
      setSearchInput("");
    }
  };

  const handleClose = (fruitToRemove) => {
    setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
    if (fruits.length === 1) {
      setFruits(initialFruits);
    }
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
            placeholder="Search for Job titles, companiens, skills or category"
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex gap-2 mt-4">
          {fruits.map((fruit, index) => (
            <Chip key={index} onClose={() => handleClose(fruit)} variant="flat">
              {fruit}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindWork;