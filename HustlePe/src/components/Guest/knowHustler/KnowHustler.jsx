import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../Hustler/Header/findWork/SearchIcon"; // Adjust the import path as necessary

export default function KnowHustler() {
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
          Find the perfect freelance<br />
          Job for your Profile
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
        {/* About Us Section */}
        <section className="mb-16">
          <h2 className="text-6xl mt-[10%] ml-[12%]">
            About Us
          </h2>
          <div className="mt-6 ml-[12%]">
            <p className="text-lg">
              Hustler is a platform designed to bridge the gap between freelancers and clients. Whether you're a freelancer looking for your next gig or a client in need of skilled professionals, Hustler is here to help you connect and collaborate seamlessly.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-16">
          <h2 className="text-6xl mt-[10%] ml-[12%]">
            Our Mission
          </h2>
          <div className="mt-6 ml-[12%]">
            <p className="text-lg">
              Our mission is to create a thriving community where freelancers can showcase their skills and clients can find the perfect match for their projects. We believe in the power of collaboration and aim to provide a platform that fosters growth and success for everyone involved.
            </p>
          </div>
        </section>

        {/* Why Choose Hustler Section */}
        <section className="mb-16">
          <h2 className="text-6xl mt-[10%] ml-[12%]">
            Why Choose Hustler?
          </h2>
          <div className="mt-6 ml-[12%]">
            <ul className="list-disc text-lg">
              <li>Wide range of skilled freelancers</li>
              <li>Easy-to-use platform</li>
              <li>Secure payment options</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}