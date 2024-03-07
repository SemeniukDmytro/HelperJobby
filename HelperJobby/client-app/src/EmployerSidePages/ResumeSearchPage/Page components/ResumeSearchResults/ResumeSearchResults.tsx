import React, {FC, useEffect, useState} from 'react';
import './ResumeSearchResults.scss';
import {ResumeDTO} from "../../../../DTOs/resumeRelatedDTOs/ResumeDTO";
import {useNavigate, useSearchParams} from "react-router-dom";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {SearchService} from "../../../../services/searchService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import ResumeSearchInfoBlock from "../ResumeSearchInfoBlock/ResumeSearchInfoBlock";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";

interface ResumeSearchResultsProps {}

const ResumeSearchResults: FC<ResumeSearchResultsProps> = () => {
    const [matchingResumes, setMatchingResumes] = useState<ResumeDTO[]>([]);
    const [hasMoreResumes, setHasMoreResumes] = useState(false);
    const [searchParams] = useSearchParams();
    const jobQuery = searchParams.get("q");
    const start = searchParams.get("start");
    const navigate = useNavigate();
    const [resumeLoadingProcess, setResumeLoadingProcess] = useState(true);
    const searchService = new SearchService();

    useEffect(() => {
        if (!jobQuery || (start && isNanAfterIntParse(start))){
            navigate(EmployerPagesPaths.RESUMES)
            setResumeLoadingProcess(false);
            return;
        }
        getMatchingResumes();
    }, [jobQuery, start]);
    
    async function getMatchingResumes(){
        try {
            setResumeLoadingProcess(true);
            const retrievedResumes = await searchService.searchResumes(jobQuery!, start ? parseInt(start) : 0);
            setMatchingResumes(retrievedResumes.resumes);
            setHasMoreResumes(retrievedResumes.hasMore);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setResumeLoadingProcess(false);
        }
    }
    
    return (
        resumeLoadingProcess ? <LoadingPage/> :
        matchingResumes.length == 0 ? <></>
            :
            <div className={"emp-main-info-container-with-pdng"}>
                <div className={"job-candidate-table-titles-container"}>
                    <div className={"candidate-credentials-container"}>
                        <span className={"bold-text semi-dark-default-text"}>Name</span>
                    </div>
                    <div className={"review-status-box"}>
                        <span className={"bold-text semi-dark-default-text"}>Job seeker email</span>
                    </div>
                    <div className="candidate-skills-container">
                        <span className="bold-text semi-dark-default-text">Skills</span>
                    </div>
                    <div className="candidate-qualifications-container">
                        <span className="bold-text semi-dark-default-text">Recent experience</span>
                    </div>
                    <div className="candidate-qualifications-container">
                        <span className="bold-text semi-dark-default-text">Educations</span>
                    </div>
                </div>
                {matchingResumes.map((resume, index) => (
                    <ResumeSearchInfoBlock resume={resume} key={index}/>
                ))}
            </div>

    )
}

export default ResumeSearchResults;
