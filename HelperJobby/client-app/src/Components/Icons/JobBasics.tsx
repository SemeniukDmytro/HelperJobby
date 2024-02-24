import * as React from "react";
import type { SVGProps } from "react";
const SvgJobBasics = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14em"
    height="12em"
    viewBox="0 0 60 50"
    {...props}
  >
    <defs>
      <image
        id="JobBasics_svg__a"
        width={60}
        height={50}
      />
    </defs>
    <use x={0} y={5} href="#JobBasics_svg__a" />
  </svg>
);
export default SvgJobBasics;