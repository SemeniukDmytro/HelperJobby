import type {SVGProps} from "react";
import * as React from "react";

const SvgNoCandidates = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15em"
        height="10em"
        viewBox="0 0 70 50"
        {...props}
    >
        <defs>
            <image
                id="NoCandidates_svg__a"
                width={70}
                height={50}
            />
        </defs>
        <use x={0} y={0} href="#NoCandidates_svg__a"/>
    </svg>
);
export default SvgNoCandidates;