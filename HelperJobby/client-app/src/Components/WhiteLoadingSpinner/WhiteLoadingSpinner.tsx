import React, {FC} from 'react';
import './WhiteLoadingSpinner.scss';
import {Oval} from "react-loader-spinner";

interface WhiteLoadingSpinnerProps {
}

const WhiteLoadingSpinner: FC<WhiteLoadingSpinnerProps> = () => (
    <Oval strokeWidth={5} color={"white"} secondaryColor={"white"} height={20} width={20}></Oval>
);

export default WhiteLoadingSpinner;
