import { useState, useEffect } from "react";

const AutocompleteSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cache, setCache] = useState({});
  const [showResults, setShowResults] = useState(false);

  const fetchResults = async () => {
    if (cache[inputValue]) {
      setSearchResults(cache[inputValue]);
    } else {
      const results = await fetch(
        `https://dummyjson.com/recipes/search?q=${inputValue}`
      );
      const formattedResults = await results.json();
      setSearchResults(formattedResults.recipes);
      setCache((prev) => ({ ...prev, [inputValue]: formattedResults.recipes }));
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults();
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onInputChange} onFocus={setShowResults(true)} onBlur={setShowResults(false)}/>
      <div style={{ display: "flex", flexDirection: "column" }} />
      {searchResults.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default AutocompleteSearch;
