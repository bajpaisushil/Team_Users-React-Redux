// Team.tsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { clearTeam } from "../redux/slices/teamSlice";


interface TeamMember {
  id: any;
  avatar: string;
  first_name: string;
  last_name: string;
  gender: string;
  domain: string;
  available: boolean;
}

const Team: React.FC = () => {
  // Get the team data from the Redux store
  const nav=useNavigate();
  const dispatch=useDispatch();
  const team = useSelector((state: any) => state.team.team);
  // Function to clear the team
  const handleClearTeam = () => {
    // Dispatch action to clear the team in the Redux store
    dispatch(clearTeam());
  };

  return (
    <div className="my-4 flex flex-col justify-center items-center">
      <p className="text-xl border-2 bg-gray-200 hover:bg-gray-400 p-1 outline-2 outline-double absolute left-[2rem] top-4 cursor-pointer" onClick={()=> nav(-1)}>Back</p>
      <h2 className="text-2xl text-green-500 underline font-bold mb-2">Team Details</h2>
      <button
          onClick={handleClearTeam}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 my-4 px-2 rounded"
        >
          Clear Team
        </button>
      <div className="flex flex-wrap bg-white p-4 justify-center items-center">
        {team.map((teamMember: TeamMember) => (
          <div
            key={teamMember.id}
            className="bg-blue-200 border-2 w-[15rem] lg:w-[20rem] justify-center items-center rounded-[1rem] text-left p-[1rem] m-[1rem]"
          >
            <img
              src={teamMember.avatar}
              alt={teamMember.avatar}
              className="rounded-full w-[8rem] mx-auto mb-[1rem]"
            />
            <p className="text-[1rem] font-bold">
              Name: {teamMember.first_name + " " + teamMember.last_name}
            </p>
            <p className="text-[1rem] font-bold">Gender: {teamMember.gender}</p>
            <p className="text-[1rem] font-bold">Domain: {teamMember.domain}</p>
            <p className="text-[1rem] font-bold">
              Availability: {teamMember.available ? "No" : "Yes"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
