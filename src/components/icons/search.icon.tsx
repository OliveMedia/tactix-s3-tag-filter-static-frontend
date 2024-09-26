import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: string;
  className?: string;
}

const SearchIcon: FC<IconProps> = ({ color, size = "19", className }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3466 12.2649L16.25 16.0124M14 8.42906C14 11.4206 11.4816 13.8457 8.375 13.8457C5.2684 13.8457 2.75 11.4206 2.75 8.42906C2.75 5.43751 5.2684 3.01239 8.375 3.01239C11.4816 3.01239 14 5.43751 14 8.42906Z"
        stroke="#8C8C8C"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
