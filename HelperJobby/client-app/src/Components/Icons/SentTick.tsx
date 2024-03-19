import type {SVGProps} from "react";
import * as React from "react";

const SvgSentTick = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        fill="none"
        viewBox="0 -0.5 25 25"
        {...props}
    >
        <path
            stroke="#767676"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="m5.5 12.5 4.667 4.5L19.5 8"
        />
    </svg>
);

export default SvgSentTick;
