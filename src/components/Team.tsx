// Team.tsx

import React from "react";
import { useSelector } from "react-redux";

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
  const team = useSelector((state: any) => state.team.team);

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">Team Details</h2>
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
