import * as React from "react";
import type { SVGProps } from "react";
const SvgReview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14em"
    height="12em"
    viewBox="0 0 70 70"
    {...props}
  >
    <defs>
      <image
        id="Review_svg__a"
        width={70}
        height={60}
      />
    </defs>
    <use x={0} y={10} href="#Review_svg__a" />
  </svg>
);
export default SvgReview;