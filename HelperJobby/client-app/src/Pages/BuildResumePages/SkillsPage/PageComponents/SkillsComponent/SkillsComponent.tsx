import React, {FC, useEffect} from 'react';
import './SkillsComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";

interface SkillsComponentProps {}

const SkillsComponent: FC<SkillsComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();

    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 6)
    }, []);
    
    return (
        <div>
            
        </div>
    )
}

export default SkillsComponent;
