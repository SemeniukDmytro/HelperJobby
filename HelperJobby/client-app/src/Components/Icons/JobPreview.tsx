import * as React from "react";
import type { SVGProps } from "react";
const SvgJobPreview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="5em"
    height="5em"
    viewBox="0 0 77 77"
    {...props}
  >
    <defs>
      <image
        id="JobPreview_svg__a"
        width={58}
        height={58}
      />
    </defs>
    <use x={0} y={10} href="#JobPreview_svg__a" />
  </svg>
);
export default SvgJobPreview;