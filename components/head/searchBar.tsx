import { useState, useEffect, ChangeEvent } from "react";
import { ILaunch } from "../../pages";

export interface LaunchProps {
  launch: ILaunch;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const searchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);

  // useEffect(() => {
  //   const results = searchResults.filter((missionName) =>
  //     missionName.toLowerCase().includes(query)
  //   );
  //   setSearchResults(results);
  // }, [query]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };
  
  return (
    <div className="searchBar">
      <input
        value={query}
        type="text"
        onChange={handleChange}
        placeholder="Search 🚀"
      />
      {/* <button type="submit">🚀</button> */}
      {/* <input type="text" value={search} placeholder="Search 🚀" /> */}
    </div>
  );
};

export default searchBar;
