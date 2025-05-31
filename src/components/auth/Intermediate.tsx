import { Image } from "@nextui-org/react";
import React, { useState } from "react";

function Intermediate() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!selectedImage) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] px-4 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-12 text-center">Join as a client or freelancer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div
          id="client"
          className={`border-2 ${
            selectedImage === 1 ? "border-blue-500 shadow-lg" : "border-gray-200"
          } rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden`}
          onClick={() => handleImageClick(1)}
        >
          <div className="h-48 overflow-hidden">
            <Image
              isZoomed={selectedImage === 1}
              src="https://www.lystloc.com/blog/wp-content/uploads/2023/07/How-To-Prepare-Effectively-For-A-Client-Sales-Meetings.webp"
              alt="Client hiring for a project"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg text-center">I'm a client, hiring for a project</h3>
            <p className="text-gray-600 text-sm mt-2 text-center">Find talented professionals for your project needs</p>
          </div>
        </div>

        <div
          id="freelancer"
          className={`border-2 ${
            selectedImage === 2 ? "border-blue-500 shadow-lg" : "border-gray-200"
          } rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden`}
          onClick={() => handleImageClick(2)}
        >
          <div className="h-48 overflow-hidden">
            <Image
              isZoomed={selectedImage === 2}
              src="https://www.billdu.com/wp-content/uploads/2021/06/Billdu_Freelance-advice-Top-12-tips-for-freelancers.png"
              alt="Freelancer looking for work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg text-center">I'm a freelancer, looking for work</h3>
            <p className="text-gray-600 text-sm mt-2 text-center">Find exciting opportunities to showcase your skills</p>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full max-w-md">
        <a
          href={selectedImage === 1 ? "/RegisterClient" : selectedImage === 2 ? "/signup" : "#"}
          className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white ${
            !selectedImage ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          onClick={handleButtonClick}
        >
          {selectedImage === 1 ? "Continue as a client" : selectedImage === 2 ? "Continue as a freelancer" : "Select an option to continue"}
        </a>
      </div>
    </div>
  );
}

export default Intermediate;
