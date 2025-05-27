import { Image } from '@nextui-org/react';
import React, { useState } from 'react';

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
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-2xl font-bold mb-10">Join as a client or freelancer</h1>
        <div className="flex flex-row space-x-10 mx-10">
          <div
            id="client"
            className={`border-4 ${selectedImage === 1 ? 'border-blue-500' : 'border-transparent'} rounded-lg`}
            onClick={() => handleImageClick(1)}
          >
            <Image
              isZoomed={selectedImage === 1}
              width={300}
              height={200}
              src="https://www.lystloc.com/blog/wp-content/uploads/2023/07/How-To-Prepare-Effectively-For-A-Client-Sales-Meetings.webp"
              alt="Image 1"
              className="m-5"
            />
            <p className="text-center mt-2">I’m a client, hiring for a project</p>
          </div>
          <div
            id="freelancer"
            className={`border-4 ${selectedImage === 2 ? 'border-blue-500' : 'border-transparent'} rounded-lg`}
            onClick={() => handleImageClick(2)}
          >
            <Image
              isZoomed={selectedImage === 2}
              width={300}
              height={200}
              src="https://www.billdu.com/wp-content/uploads/2021/06/Billdu_Freelance-advice-Top-12-tips-for-freelancers.png"
              alt="Image 2"
              className="m-5"
            />
            <p className="text-center mt-2">I’m a freelancer, looking for work</p>
          </div>
        </div>
        <div className="mt-11">
          <a
            href={selectedImage === 1 ? '/RegisterClient' : selectedImage === 2 ? '/signup' : '#'}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!selectedImage ? 'bg-gray-400' : 'bg-blue-500'} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            onClick={handleButtonClick}
          >
            {selectedImage === 1
              ? "I’m a client, hiring for a project"
              : selectedImage === 2
              ? "I’m a freelancer, looking for work"
              : "Select an option"}
          </a>
        </div>
      </div>
    </>
  );
}

export default Intermediate;