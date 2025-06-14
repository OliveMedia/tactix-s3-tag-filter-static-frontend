import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: string;
}

const CalendarIcon: FC<IconProps> = ({ color, size = "16" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M14.667 1.5H12.5V0.5C12.5 0.2235 12.2765 0 12 0C11.7235 0 11.5 0.2235 11.5 0.5V1.5H8.5V0.5C8.5 0.2235 8.276 0 8 0C7.724 0 7.5 0.2235 7.5 0.5V1.5H4.5V0.5C4.5 0.2235 4.276 0 4 0C3.724 0 3.5 0.2235 3.5 0.5V1.5H1.3335C0.597 1.5 0 2.0965 0 2.833V14.6665C0 15.403 0.597 16 1.3335 16H14.667C15.4035 16 16 15.403 16 14.6665V2.833C16 2.0965 15.4035 1.5 14.667 1.5ZM15 14.6665C15 14.8505 14.8505 15 14.667 15H1.3335C1.1495 15 1 14.8505 1 14.6665V2.833C1 2.6495 1.1495 2.5 1.3335 2.5H3.5V3.5C3.5 3.7765 3.724 4 4 4C4.276 4 4.5 3.7765 4.5 3.5V2.5H7.5V3.5C7.5 3.7765 7.724 4 8 4C8.276 4 8.5 3.7765 8.5 3.5V2.5H11.5V3.5C11.5 3.7765 11.7235 4 12 4C12.2765 4 12.5 3.7765 12.5 3.5V2.5H14.667C14.8505 2.5 15 2.6495 15 2.833V14.6665Z"
        fill="#D7DADF"
      />
      <path d="M5.5 6H3.5V7.5H5.5V6Z" fill="#D7DADF" />
      <path d="M5.5 8.5H3.5V10H5.5V8.5Z" fill="#D7DADF" />
      <path d="M5.5 11H3.5V12.5H5.5V11Z" fill="#D7DADF" />
      <path d="M9 11H7V12.5H9V11Z" fill="#D7DADF" />
      <path d="M9 8.5H7V10H9V8.5Z" fill="#D7DADF" />
      <path d="M9 6H7V7.5H9V6Z" fill="#D7DADF" />
      <path d="M12.5 11H10.5V12.5H12.5V11Z" fill="#D7DADF" />
      <path d="M12.5 8.5H10.5V10H12.5V8.5Z" fill="#D7DADF" />
      <path d="M12.5 6H10.5V7.5H12.5V6Z" fill="#D7DADF" />
    </svg>
  );
};

export default CalendarIcon;
