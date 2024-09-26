import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: string;
}

const VideoCallIcon: FC<IconProps> = ({ color, size = "26" }) => {
  return (
    <svg
      width="26"
      height="19"
      viewBox="0 0 26 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M1.95 18.5C1.43 18.5 0.975 18.3312 0.585 17.9937C0.195 17.6562 0 17.2625 0 16.8125V2.1875C0 1.7375 0.195 1.34375 0.585 1.00625C0.975 0.66875 1.43 0.5 1.95 0.5H18.85C19.37 0.5 19.825 0.66875 20.215 1.00625C20.605 1.34375 20.8 1.7375 20.8 2.1875V8.23438L26 3.73438V15.2656L20.8 10.7656V16.8125C20.8 17.2625 20.605 17.6562 20.215 17.9937C19.825 18.3312 19.37 18.5 18.85 18.5H1.95Z"
        fill="#E5E5E5"
      />
    </svg>
  );
};

export default VideoCallIcon;
