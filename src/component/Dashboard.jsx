import React, { useState, useEffect } from "react";
import axios from "axios";

const LikedUsersList = ({ likedUsers, handleDislike }) => {
  return (
    <div>
      <h2>Liked Users:</h2>
      <ul>
        {likedUsers.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleDislike(user._id)}>Dislike</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting by field
  const handleSort = (field) => {
    if (field === sortedField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedField(field);
      setSortOrder("asc");
    }
  };

  // Like a user
  const handleLike = async (userId) => {
    try {
      await axios.post(`http://localhost:3001/api/users/${userId}/like`);
      const userToUpdate = users.find((user) => user._id === userId);
      if (userToUpdate) {
        setLikedUsers([...likedUsers, userToUpdate]);
      }
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error liking user:", error);
    }
  };

  // Dislike a user
  const handleDislike = async (userId) => {
    try {
      await axios.post(`http://localhost:3001/api/users/${userId}/dislike`);
      setLikedUsers(likedUsers.filter((user) => user._id !== userId));
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error disliking user:", error);
    }
  };

  // Filter and sort the user list based on search term and sorting options
  const filteredUsers = users.filter(
    (user) =>
      !likedUsers.map((user) => user._id).includes(user._id) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNumber.includes(searchTerm))
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const aValue = a[sortedField];
    const bValue = b[sortedField];

    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <LikedUsersList likedUsers={likedUsers} handleDislike={handleDislike} />

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or mobile number"
          className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleSort("name")}
        >
          Sort by Name
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleSort("email")}
        >
          Sort by Email
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleSort("mobileNumber")}
        >
          Sort by Mobile
        </button>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Mobile Number</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.mobileNumber}</td>
              <td className="border px-4 py-2">
                {!likedUsers.map((user) => user._id).includes(user._id) ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleLike(user._id)}
                  >
                    Like
                  </button>
                ) : null}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDislike(user._id)}
                >
                  Dislike
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(sortedUsers.length / usersPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  className={`${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } px-4 py-2 rounded`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
