import * as React from "react";
import type { SVGProps } from "react";
const SvgPeopleInAnOffice = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17em"
    height="12em"
    viewBox="0 0 80 50"
    {...props}
  >
    <defs>
      <image
        id="PeopleInAnOffice_svg__a"
        width={80}
        height={40}
      />
    </defs>
    <use x={0} y={13.5} href="#PeopleInAnOffice_svg__a" />
  </svg>
);
export default SvgPeopleInAnOffice;