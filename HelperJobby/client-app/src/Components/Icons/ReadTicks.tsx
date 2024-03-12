import * as React from "react";
import type { SVGProps } from "react";
const SvgReadTicks = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    fill="none"
    stroke="#2557a7"
    strokeWidth={0.5}
    viewBox="-2.5 -2.5 30 30"
    {...props}
  >
    <path
    fill="#2557a7"
      d="M5.03 11.47a.75.75 0 0 0-1.06 1.06zM8.5 16l-.53.53a.75.75 0 0 0 1.06 0zm8.53-7.47a.75.75 0 0 0-1.06-1.06zm-8 2.94a.75.75 0 0 0-1.06 1.06zM12.5 16l-.53.53a.75.75 0 0 0 1.06 0zm8.53-7.47a.75.75 0 0 0-1.06-1.06zm-17.06 4 4 4 1.06-1.06-4-4zm5.06 4 8-8-1.06-1.06-8 8zm-1.06-4 4 4 1.06-1.06-4-4zm5.06 4 8-8-1.06-1.06-8 8z"
    />
  </svg>
);
export default SvgReadTicks;
