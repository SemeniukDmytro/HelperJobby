import type {SVGProps} from "react";
import * as React from "react";

const SvgNoSavedJobs = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13em"
        height="10em"
        viewBox="0 0 70 70"
        {...props}
    >
        <defs>
            <image
                id="NoSavedJobs_svg__a"
                width={70}
                height={70}
            />
        </defs>
        <use x={0} y={0} href="#NoSavedJobs_svg__a"/>
    </svg>
);
export default SvgNoSavedJobs;