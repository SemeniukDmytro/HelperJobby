import * as React from "react";
import type { SVGProps } from "react";
const SvgWage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14em"
    height="12em"
    viewBox="0 0 50 60"
    {...props}
  >
    <defs>
      <image
        id="Wages_svg__a"
        width={60}
        height={50}
      />
    </defs>
    <use x={0} y={10} href="#Wages_svg__a" />
  </svg>
);
export default SvgWage;