import React, {FC, useState} from 'react';
import './JobPostingComponent.scss';
import {useEmployer} from "../../../../hooks/useEmployer";

interface JobPostingComponentProps {}

const JobPostingComponent: FC<JobPostingComponentProps> = () => {
    const [loading, setLoading] = useState(true);
    
    const {fetchEmployer} = useEmployer();
    
    async function fetchPageInitialData(){
        await fetchEmployer();
        setLoading(false);
    }
    
    return (
        <div>
            
        </div>
    )
}

export default JobPostingComponent;
