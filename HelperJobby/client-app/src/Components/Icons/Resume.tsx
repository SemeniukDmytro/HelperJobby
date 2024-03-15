import * as React from "react";
import type { SVGProps } from "react";
const SvgResume = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15em"
    height="12em"
    viewBox="0 0 75 50"
    {...props}
  >
    <defs>
      <image
        id="Resume_svg__a"
        width={75}
        height={50}
      />
    </defs>
    <use x={0} y={0} href="#Resume_svg__a" />
  </svg>
);
export default SvgResume;