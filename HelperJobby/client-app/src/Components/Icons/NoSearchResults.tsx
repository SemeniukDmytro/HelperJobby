import type {SVGProps} from "react";
import * as React from "react";

const SvgNoSearchResults = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13em"
        height="10em"
        viewBox="0 0 70 50"
        {...props}
    >
        <defs>
            <image
                id="NoSearchResults_svg__a"
                width={70}
                height={50}
            />
        </defs>
        <use x={0} y={0} href="#NoSearchResults_svg__a"/>
    </svg>
);
export default SvgNoSearchResults;