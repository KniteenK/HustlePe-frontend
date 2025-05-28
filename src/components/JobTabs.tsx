import React, { useState } from 'react';

const JobTabs = () => {
  const [activeTab, setActiveTab] = useState('Most Recent');

  const tabs = ['Best Matches', 'Most Recent', 'Saved Jobs'];

  return (
    <div className="bg-gray-900 p-4">
      <h2 className="text-white text-xl mb-4">Jobs you might like</h2>
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <p className="text-gray-400 text-sm mt-4">
        Browse the most recent jobs that match your skills and profile description to the skills clients are looking for.
      </p>
    </div>
  );
};

export default JobTabs;