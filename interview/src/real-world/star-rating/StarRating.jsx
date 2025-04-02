import { useState } from "react";

const STAR_RATING = [
  { id: 1, iconFilled: false },
  { id: 2, iconFilled: false },
  { id: 3, iconFilled: false },
  { id: 4, iconFilled: false },
  { id: 5, iconFilled: false },
];

export default function StarRating() {
  const [iconList, setIconList] = useState(STAR_RATING);
  const handleStarClick = (id) => {
      setIconList((prev) => {
        return prev.map((item, index) => {
          return index+1 <= id ? {...item, iconFilled: true} : {...item, iconFilled: false}
        })
      })
  };
  const StarIcon = ({ starIconFilled, handleStarClick }) => {
    return (
      <svg 
        onClick={handleStarClick}
        xmlns="http://www.w3.org/2000/svg"
        className={`star-icon ${starIconFilled ? "star-icon-filled" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    );
  };
  return (
    <div>
      {iconList.map((icon) => (
        <span key={icon.id}>
          <StarIcon starIconFilled={icon.iconFilled} handleStarClick={() => handleStarClick(icon.id)} />
        </span>
      ))}
    </div>
  );
}
