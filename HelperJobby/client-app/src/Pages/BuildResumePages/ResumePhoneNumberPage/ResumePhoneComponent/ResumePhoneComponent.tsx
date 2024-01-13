import React, {FC, useEffect} from 'react';
import './ResumePhoneComponent.scss';
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import useResumeBuild from "../../../../hooks/useResumeBuild";

interface ResumePhoneComponentProps {}

const ResumePhoneComponent: FC<ResumePhoneComponentProps> = () => {
    
    const {setProgressPercentage} = useResumeBuild()
    useEffect(() => {
        setProgressPercentage(40);
    }, []);

    return (
        <div>phone</div>
    )
}

export default ResumePhoneComponent;
