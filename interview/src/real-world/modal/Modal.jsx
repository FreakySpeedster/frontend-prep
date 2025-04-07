import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        width: "33%",
        position: "relative"
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "gray",
            border: "none",
            background: "none",
            fontSize: "20px",
            cursor: "pointer"
          }}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};


// Usage
// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       minHeight: "100vh"
//     }}>
//       <button 
//         onClick={() => setIsModalOpen(true)} 
//         style={{
//           padding: "8px 16px",
//           backgroundColor: "#3B82F6",
//           color: "white",
//           borderRadius: "4px",
//           border: "none",
//           cursor: "pointer"
//         }}
//       >
//         Open Modal
//       </button>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Simple Modal</h2>
//         <p>This is a simple modal component.</p>
//       </Modal>
//     </div>
//   );
// };

export default Modal;
