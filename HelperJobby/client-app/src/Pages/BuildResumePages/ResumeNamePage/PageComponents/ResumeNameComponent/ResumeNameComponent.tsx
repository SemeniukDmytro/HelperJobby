import React, {FC, useEffect} from 'react';
import './ResumeNameComponent.scss';
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import useResumeBuild from "../../../../../hooks/useResumeBuild";

interface ResumeNameComponentProps {}

const ResumeNameComponent: FC<ResumeNameComponentProps> = () => {
    const {setProgressPercentage} = useResumeBuild()
    useEffect(() => {
        setProgressPercentage(20);
    }, []);
    
    return (
        <div>name</div>
    )
};

export default ResumeNameComponent;
