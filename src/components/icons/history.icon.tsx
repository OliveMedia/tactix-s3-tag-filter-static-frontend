import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: string;
}

const HistoryIcon: FC<IconProps> = ({ color, size = "26" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_828_1422)">
        <mask
          id="mask0_828_1422"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="26"
          height="26"
        >
          <path d="M26 0H0V26H26V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_828_1422)">
          <path
            d="M2.60012 22.5842L6.48346 19.581H24.7001V3.89998H2.60012V22.5842ZM1.30012 25.233V2.59998H26.0001V20.881H6.92748L1.30012 25.233Z"
            fill="#A3A8B1"
          />
          <path
            d="M14.3012 6.50012H13.0012V16.9001H14.3012V6.50012Z"
            fill="#A3A8B1"
          />
          <path
            d="M10.4012 7.97693H9.10124V16.1318H10.4012V7.97693Z"
            fill="#A3A8B1"
          />
          <path
            d="M18.2012 7.97693H16.9012V16.1318H18.2012V7.97693Z"
            fill="#A3A8B1"
          />
          <path
            d="M6.50124 10.1038H5.20124V14.0038H6.50124V10.1038Z"
            fill="#A3A8B1"
          />
          <path
            d="M22.1012 10.1038H20.8012V14.0038H22.1012V10.1038Z"
            fill="#A3A8B1"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_828_1422">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HistoryIcon;
