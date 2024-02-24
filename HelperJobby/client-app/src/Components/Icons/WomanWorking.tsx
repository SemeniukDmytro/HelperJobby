import * as React from "react";
import type { SVGProps } from "react";
const SvgWomanWorking = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20em"
    height="13em"
    viewBox="0 0 60 60"
    {...props}
  >
    <defs>
      <image
        id="WomanWorking_svg__a"
        width={60}
        height={50}
      />
    </defs>
    <use x={0} y={10} href="#WomanWorking_svg__a" />
  </svg>
);
export default SvgWomanWorking;