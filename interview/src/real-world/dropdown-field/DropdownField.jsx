import { useState } from "react";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "200px" }}>
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
        {selected || "Select an option"} ▼
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
                background: "#fff",
              }}
              onMouseEnter={(e) => e.target.style.background = "#f0f0f0"}
              onMouseLeave={(e) => e.target.style.background = "#fff"}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div style={{ padding: "50px" }}>
      <h2>Simple Dropdown</h2>
      <Dropdown options={options} onSelect={(option) => alert(`Selected: ${option}`)} />
    </div>
  );
};

export default App;
