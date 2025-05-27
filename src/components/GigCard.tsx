import React, { useState } from 'react';
import { FaThumbsDown, FaHeart } from 'react-icons/fa';

interface CardData {
  avatar: string;
  name: string;
  posts: number;
  bio: string;
  joinDate: string;
}

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-full mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden relative text-white">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="text-gray-500 hover:text-gray-300">
          <FaThumbsDown />
        </button>
        <button 
          className={`${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-300`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <FaHeart />
        </button>
      </div>
      <div className="flex">
        <div className="w-1/6 bg-gray-700 p-4 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-600 overflow-hidden mb-2">
            <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-white font-bold text-center">{data.name.toUpperCase()}</h2>
          <p className="text-gray-400 text-sm">{data.posts} Gigs</p>
        </div>
        <div className="w-5/6 p-4">
          <h3 className="font-bold text-lg mb-2">Description</h3>
          <p className="text-gray-300 mb-4">{data.bio}</p>
          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-blue-400 hover:underline">250$ spent</a>
            <span className="text-gray-500">Joined: {data.joinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
