import React from "react";

const SvgComponent = (props: {
  width: string;
  height: string;
  d: string;
  opacity?: string;
  fill?: string;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <svg
      className={props.className}
      style={props.style}
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path opacity={props.opacity} d={props.d} fill={props.fill} />
    </svg>
  );
};

export const SvgSearch = () => {
  return (
    <SvgComponent
      width="32"
      height="32"
      d="M7.91602 15.4502C7.91602 19.1328 10.9043 22.1299 14.5869 22.1299C16.0107 22.1299 17.3203 21.6816 18.4014 20.917L22.4092 24.9248C22.6113 25.127 22.8838 25.2236 23.165 25.2236C23.7803 25.2236 24.2109 24.7666 24.2109 24.1689C24.2109 23.8789 24.1055 23.6152 23.9209 23.4219L19.9395 19.4229C20.7744 18.3154 21.2666 16.9443 21.2666 15.4502C21.2666 11.7676 18.2783 8.77051 14.5869 8.77051C10.9043 8.77051 7.91602 11.7676 7.91602 15.4502ZM9.44531 15.4502C9.44531 12.6113 11.748 10.3086 14.5869 10.3086C17.4346 10.3086 19.7285 12.6113 19.7285 15.4502C19.7285 18.2891 17.4346 20.5918 14.5869 20.5918C11.748 20.5918 9.44531 18.2891 9.44531 15.4502Z"
      opacity="0.34"
      fill="black"
    />
  );
};
