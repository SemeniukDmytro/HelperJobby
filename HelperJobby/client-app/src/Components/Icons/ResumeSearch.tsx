import * as React from "react";
import type { SVGProps } from "react";
const SvgResumeSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20em"
    height="20em"
    viewBox="0 0 50 40"
    {...props}
  >
    <defs>
      <image
        id="ResumeSearch_svg__a"
        width={50}
        height={40}
      />
    </defs>
    <use x={0} y={0} href="#ResumeSearch_svg__a" />
  </svg>
);
export default SvgResumeSearch;