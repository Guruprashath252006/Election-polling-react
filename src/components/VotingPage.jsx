import React, { useState } from "react";

const candidatesData = [
  { id: 1, name: "Vennila Thayumanavan(NTK)", symbol:"symntk.jfif", image: "ntk.jfif" },
  { id: 2, name: "M. K. Stalin (DMK)", symbol: "symdmk.jfif", image: "dmk.jfif" },
  { id: 3, name: "Edappadi K (AIADMK)", symbol: "symaiadmk.jfif", image: "aiadmk.jfif" },
  { id: 4, name: "K. Annamalai (BJP)", symbol: "symbjp.jfif", image: "bjp.jfif" },
  { id: 5, name: "Vijay (TVK)", symbol: "symtvk.png", image: "tvk.jfif" },
  { id: 6, name: "Kamal Haasan (MNM)", symbol: "symmnm.png", image: "mnm.jfif" },
];

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const [votes, setVotes] = useState(() => {
  const initialVotes = {};
  candidatesData.forEach((c) => (initialVotes[c.id] = 0));
  return initialVotes;
});
    
  const handleVote = (id) => {
    if (hasVoted) return;

    const updatedVotes = {
      ...votes,
      [id]: (votes[id] || 0) + 1,
    };

    setVotes(updatedVotes);
    setSelectedCandidate(id);
    setHasVoted(true);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Vote Your Candidate</h1>

      
      <div className="w-full max-w-4xl flex flex-col gap-6 mx-auto">
        {candidatesData.map((candidate) => (
          <div
            key={candidate.id}
            className={`bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between border-4 transition-all duration-300 ${
              selectedCandidate === candidate.id
                ? "border-green-500 bg-green-50 shadow-green-200"
                : "border-transparent hover:shadow-xl hover:border-blue-200"
            }`}
          >
            <div className="flex items-center gap-6 w-full md:w-1/3 mb-4 md:mb-0">
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-gray-100"
              />
              <h2 className="text-xl font-bold text-gray-800">{candidate.name}</h2>
            </div>
            
            <div className="flex justify-center w-full md:w-1/3 mb-4 md:mb-0">
              <img
                src={candidate.symbol}
                alt={`${candidate.name} Symbol`}
                className="w-20 h-20 object-contain drop-shadow-md"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-end gap-6 w-full md:w-1/3">
              <p className="text-2xl font-extrabold text-blue-700 bg-blue-100 px-4 py-2 rounded-lg shadow-inner">
                {votes[candidate.id] || 0} <span className="text-sm font-medium text-blue-900 uppercase">Votes</span>
              </p>

              <div className="flex items-center gap-4 border-l-2 md:border-l border-gray-200 pl-0 md:pl-6 pt-4 md:pt-0">
                <input
                  type="checkbox"
                  checked={selectedCandidate === candidate.id}
                  onChange={() => handleVote(candidate.id)}
                  disabled={hasVoted}
                  className={`w-7 h-7 cursor-pointer accent-green-600 ${hasVoted ? "cursor-not-allowed opacity-50" : ""}`}
                />
                <button
                  onClick={() => handleVote(candidate.id)}
                  disabled={hasVoted}
                  className={`px-6 py-2 rounded-xl font-bold text-white shadow-md transition-all duration-200 ${
                    hasVoted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"
                  }`}
                >
                  {selectedCandidate === candidate.id ? "Voted ✅" : "Vote"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasVoted && (
        <p className="mt-6 text-green-600 font-semibold">
          ✅ You have voted!
        </p>
      )}
    </div>
    </>
  );
}