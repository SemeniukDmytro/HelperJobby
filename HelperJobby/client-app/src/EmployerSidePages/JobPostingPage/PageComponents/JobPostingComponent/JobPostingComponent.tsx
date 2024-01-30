import React, {FC, useState} from 'react';
import './JobPostingComponent.scss';
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";

interface JobPostingComponentProps {
}

const JobPostingComponent: FC<JobPostingComponentProps> = () => {
    const [loading, setLoading] = useState(true);

    return (
        loading ? <LoadingPage/> :
            <div>

            </div>
    )
}

export default JobPostingComponent;
