import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: string;
}

const PlusIcon: FC<IconProps> = ({ color, size = "26" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 2.4375V23.5625"
        stroke="#A3A8B1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.4375 13H23.5625"
        stroke="#A3A8B1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
