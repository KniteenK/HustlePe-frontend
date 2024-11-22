import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../Hustler/Header/findWork/SearchIcon"; // Adjust the import path as necessary

export default function KnowOrganisations() {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchGigs();
    }, 5000); // Fetch gigs every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [searchInput]);

  const fetchGigs = async () => {
    // Your fetch logic here
    console.log("Fetching gigs with search input:", searchInput);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && searchInput.trim() !== "") {
      await fetchGigs();
      setSearchInput("");
    }
  };

  return (
    <div className="min-h-screen bg-green-950 text-white">
      {/* Header Section */}
      <header className="py-12">
        <h1 className="text-6xl font-bold ml-[12%] mt-[10%]">
          Find perfect organisations<br />
          you are looking for
        </h1>
      </header>
      <div className="mt-[2%] ml-[12%]">
        <Input
          classNames={{
            base: "w-[50%] h-10", 
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search about questions you have"
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* Main Content */}
      <main className="container px-6 py-12">
        {/* Proposed Solution Section */}
        <section className="mb-16">
          <h2 className="text-6xl mt-[10%] ml-[12%]">
            Proposed Solution
          </h2>
          <div className="mt-6 ml-[12%]">
            <p className="text-lg">
              By focusing on India’s freelance market, we provide tools and opportunities to help freelancers compete globally.
            </p>
          </div>
        </section>

        {/* Organisations Feature Section */}
        <section className="mb-16">
          <h2 className="text-6xl mt-[10%] ml-[12%]">
            Organisations Feature
          </h2>
          <div className="mt-6 ml-[12%]">
            <p className="text-lg">
              High-rated freelancers can create teams and invite others, forming small business units. New freelancers gain experience by collaborating within these teams, benefitting from mentorship and bypassing early challenges.
            </p>
          </div>
        </section>

        {/* AI-Enabled Insights Section */}
        <section className="mb-16">
          <h2 className="text-6xl mt-[10%] ml-[12%]">
            AI-Enabled Insights
          </h2>
          <div className="mt-6 ml-[12%]">
            <p className="text-lg">
              Advanced search and analytics capabilities, powered by AI, allow for personalized recommendations and data-driven decision-making for both freelancers and employers.
            </p>
          </div>
        </section>

        {/* Multiple Payment Methods Section */}
        <section className="mb-16">
          <h2 className="text-6xl mt-[10%] ml-[12%]">
            Multiple Payment Methods
          </h2>
          <div className="mt-6 ml-[12%]">
            <p className="text-lg">
              Secure payment options including escrow accounts and milestone payments ensure transparent and fair financial transactions.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}