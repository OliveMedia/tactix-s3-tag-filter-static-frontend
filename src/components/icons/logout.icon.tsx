import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: string;
}

const HomeIcon: FC<IconProps> = ({ color, size = "26" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_828_1466)">
        <mask
          id="mask0_828_1466"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="26"
          height="26"
        >
          <path d="M26 0H0V26H26V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_828_1466)">
          <path
            d="M18.4245 18.304L23.7285 13M23.7285 13L18.4245 7.69599M23.7285 13H10.9992M10.9992 3.45207H9.72636C8.59639 3.32537 7.45237 3.44389 6.37236 3.79954C5.77378 4.10514 5.28697 4.59195 4.98136 5.19054C4.62575 6.27056 4.50724 7.41454 4.63391 8.54452V17.4554C4.50724 18.5854 4.62575 19.7294 4.98136 20.8095C5.28697 21.408 5.77378 21.8948 6.37236 22.2005C7.45237 22.5561 8.59639 22.6746 9.72636 22.5479H10.9992"
            stroke="#A3A8B1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_828_1466">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HomeIcon;
