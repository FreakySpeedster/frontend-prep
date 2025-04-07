import { useState } from "react";

const MultiSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option) // Remove if already selected
      : [...selectedOptions, option]; // Add new option

    setSelectedOptions(newSelection);
    onSelect(newSelection);
  };

  return (
    <div style={{ position: "relative", width: "250px" }}>
      <button
        onClick={toggleDropdown}
        style={{
          width: "100%",
          padding: "10px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select options"} ▼
      </button>

      {isOpen && (
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            margin: "5px 0 0",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            position: "absolute",
            width: "100%",
            zIndex: "1000",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: index !== options.length - 1 ? "1px solid #ddd" : "none",
                background: selectedOptions.includes(option) ? "#d1e7fd" : "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleSelect(option)}
                style={{ marginRight: "10px" }}
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <div style={{ padding: "50px" }}>
      <h2>Multi-Select Field</h2>
      <MultiSelect options={options} onSelect={(selected) => alert(`Selected: ${selected.join(", ")}`)} />
    </div>
  );
};

export default App;
