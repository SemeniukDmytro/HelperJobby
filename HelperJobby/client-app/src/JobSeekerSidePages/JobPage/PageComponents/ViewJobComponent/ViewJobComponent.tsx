import React, {FC, useEffect, useState} from 'react';
import './ViewJobComponent.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {useNavigate, useParams} from "react-router-dom";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobService} from "../../../../services/jobService";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import JobFullInfoComponent from "../JobFullInfoComponent/JobFullInfoComponent";
import SearchBarForJobPage from "../SearchBarForJobPage/SearchBarForJobPage";

interface JobComponentProps {}

const ViewJobComponent: FC<JobComponentProps> = () => {
    const [job, setJob] = useState<JobDTO | null>(null);
    const { jid} = useParams<{ jid: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const jobService = new JobService();
    
    useEffect(() => {
        if (!jid){
            navigate("*");
            return;
        }
        fetchJob();
        
    }, []);
    
    
    async function fetchJob(){
        try {
            setLoading(true);
            const jobId = Number.parseInt(jid!);
            const retrievedJob = await jobService.getJobById(jobId);
            setJob(retrievedJob);
        }
        catch (err){
            logErrorInfo(err)
            navigate("*")
        }
        finally {
            setLoading(false);
        }
    }
    
    
    return (
        <PageWrapWithHeader>
            <div className={"job-page-layout"}>
                <SearchBarForJobPage/>
                {loading ? <LoadingPage/> : 
                <JobFullInfoComponent job={job!}/>}
            </div>
        </PageWrapWithHeader>
    )
    
    
}

export default ViewJobComponent;
