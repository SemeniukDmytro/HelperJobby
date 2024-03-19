import type {SVGProps} from "react";
import * as React from "react";

const SvgNoJobs = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15em"
        height="11em"
        viewBox="0 0 90 70"
        {...props}
    >
        <defs>
            <image
                id="NoJobs_svg__a"
                width={90}
                height={70}
            />
        </defs>
        <use x={0} y={0} href="#NoJobs_svg__a"/>
    </svg>
);
export default SvgNoJobs;