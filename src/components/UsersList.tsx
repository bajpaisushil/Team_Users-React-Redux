import React, { useState } from "react";
import User from "./User";
import { setUsers, toggleSelect } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

interface UserProps {
  id: any;
    avatar: string;
    first_name: string;
    last_name: string;
    gender: string;
    domain: string;
    available: boolean;
    selected: boolean;
    onSelect: () => void;
  }

interface UsersListProps {
  users: UserProps[];
  usersPerPage: number;
}

const UsersList: React.FC<UsersListProps> = ({ users, usersPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });
  const dispatch=useDispatch();
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Filter users based on the search query and selected filters
  const filteredUsers = users
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) =>
      selectedFilters.domain ? user.domain === selectedFilters.domain : true
    )
    .filter((user) =>
      selectedFilters.gender ? user.gender === selectedFilters.gender : true
    )
    .filter((user) =>
      selectedFilters.availability !== ""
        ? user.available.toString() === selectedFilters.availability
        : true
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }
  
  const handleSelect = (index: number) => {
    const updatedUsers = [...users];  // Create a copy of the users array
    updatedUsers[index].selected = !updatedUsers[index].selected;  // Toggle the selected property for the clicked user

    updatedUsers[index].onSelect = () => handleSelect(index);
    // Dispatch action to update the selected users in the Redux store
    dispatch(setUsers(updatedUsers.map(({ onSelect, ...user }) => user)));
    dispatch(toggleSelect(index));
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value, 10);
    if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to the first page when a filter changes
  };

  return (
    <div className="my-4 flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded m-auto"
      />
      <div className="flex flex-col lg:flex-row gap-[1rem]">
        {/* Domain filter */}
        <select
          value={selectedFilters.domain}
          onChange={(e) => handleFilterChange("domain", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Domains</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Management">Management</option>
          <option value="IT">IT</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Business Development">Business Development</option>
          {/* Add more options as needed */}
        </select>

        {/* Gender filter */}
        <select
          value={selectedFilters.gender}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          {/* Add more options as needed */}
        </select>

        {/* Availability filter */}
        <select
          value={selectedFilters.availability}
          onChange={(e) => handleFilterChange("availability", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Availability</option>
          <option value="false">Available</option>
          <option value="true">Not Available</option>
        </select>
      </div>
      <div className="flex flex-wrap bg-white p-4 justify-center items-center">
        {(!searchQuery) && currentUsers.map((user, index) => (
          <User
            key={index}
            first_name={user.first_name}
            last_name={user.last_name}
            gender={user.gender}
            avatar={user.avatar}
            domain={user.domain}
            available={user.available}
            selected={user.selected}
            onSelect={()=> handleSelect(index)}
          />
        ))}
        {(searchQuery || selectedFilters.domain || selectedFilters.availability || selectedFilters.gender) && filteredUsers.map((user, index) => (
          <User
            key={index}
            first_name={user.first_name}
            last_name={user.last_name}
            gender={user.gender}
            avatar={user.avatar}
            domain={user.domain}
            available={user.available}
            selected={user.selected}
            onSelect={()=> handleSelect}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mb-4 max-w-[20rem] m-auto">

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <input
          type="text"
          value={currentPage}
          onChange={handleInputChange}
          className="text-center w-16 mx-4 border-2 border-gray-500 rounded-lg p-[5px]"
        />
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
