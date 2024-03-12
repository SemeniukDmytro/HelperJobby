import * as React from "react";
import type { SVGProps } from "react";
const SvgMessaging = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15em"
    height="12em"
    viewBox="0 0 50 30"
    {...props}
  >
    <defs>
      <image
        id="messaging_svg__a"
        width={50}
        height={30}
      />
    </defs>
    <use x={0} y={0} href="#messaging_svg__a" />
  </svg>
);
export default SvgMessaging;