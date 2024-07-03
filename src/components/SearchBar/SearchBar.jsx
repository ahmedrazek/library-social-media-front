import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchResults, searchResults }) => {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState("users");
  const [allData, setAllData] = useState([]); // Store all fetched data here
  const [showResults, setShowResults] = useState(false); // Control the visibility of the result list
  const navigate = useNavigate();

  const fetchData = () => {
    const endpoint =
      searchType === "users"
        ? "http://localhost:9000/users"
        : "http://localhost:9000/books";

    axios
      .get(endpoint)
      .then((res) => {
        const items = res.data.data || res.data.Data;

        if (Array.isArray(items)) {
          const formattedData = items.map((item) => ({
            id: item._id,
            name: searchType === "users" ? item.name : item.title,
            type: searchType === "users" ? "user" : "book",
          }));
          setAllData(formattedData);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchType]);

  const handleChange = (value) => {
    setInput(value);

    if (value.trim() === "") {
      setShowResults(false);
      setSearchResults([]);
    } else {
      const filteredData = allData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredData);
      setShowResults(true);
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleItemClick = (item) => {
    if (item.type === "user") {
      navigate(`/user/profile/${item.id}`);
    } else if (item.type === "book") {
      navigate(`/user/details/${item.id}`);
    } else {
      navigate("/noresult");
    }
    setSearchResults([]);
    setShowResults(false);
    setInput("");
  };

  return (
    <div className="search-bar-container flex flex-col min-w-[200px] px-10 items-center justify-center">
      <div className="flex  bg-secondary rounded-full divide-x divide-primary">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="bg-secondary text-green-700 border-none rounded-l-full"
        >
          <option value="users">Users</option>
          <option value="books">Books</option>
        </select>
        <div className="input-wrapper bg-secondary rounded-r-full h-[2.5rem] px-6 text-center my-auto flex items-center">
          <FaSearch id="search-icon" className="text-primary" />
          <input
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search"
            className="bg-transparent w-full h-full text-[1.25rem] border-none rounded-full  focus:outline-none focus:border-none text-primary"
          />
        </div>
      </div>

      {showResults && (
        <div className="results-list absolute w-full bg-secondary flex flex-col shadow-sm rounded-sm top-24 cursor-pointer max-h-64 overflow-y-scroll z-50">
          {Array.isArray(searchResults) &&
            searchResults.map((result, id) => (
              <div
                key={id}
                className="p-2 border-b border-gray-300 hover:bg-white"
                onClick={() => handleItemClick(result)}
              >
                {result.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
