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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import NoSearchResults from "../../../../Components/Icons/NoSearchResults";

interface ResumeSearchResultsProps {
}

const ResumeSearchResults: FC<ResumeSearchResultsProps> = () => {
    const [matchingResumes, setMatchingResumes] = useState<ResumeDTO[]>([]);
    const [hasMoreResumes, setHasMoreResumes] = useState(false);
    const [searchParams] = useSearchParams();
    const jobQueryParam = searchParams.get("q");
    const startParam = searchParams.get("start");
    const [jobQuery, setJobQuery] = useState(jobQueryParam || "")
    const [start, setStart] = useState(0);
    const navigate = useNavigate();
    const [resumeLoadingProcess, setResumeLoadingProcess] = useState(true);
    const searchService = new SearchService();

    useEffect(() => {
        if (!jobQueryParam || (startParam && isNanAfterIntParse(startParam))) {
            navigate(EmployerPagesPaths.RESUMES)
            setResumeLoadingProcess(false);
            return;
        }
        setJobQuery(jobQueryParam);
        setStart(startParam ? parseInt(startParam) : 0);

    }, []);

    useEffect(() => {
        getMatchingResumes();
    }, [jobQueryParam, startParam]);

    async function getMatchingResumes() {
        try {
            setResumeLoadingProcess(true);
            const retrievedResumes = await searchService.searchResumes(jobQuery!, start);
            setMatchingResumes(retrievedResumes.resumes);
            setHasMoreResumes(retrievedResumes.hasMore);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setResumeLoadingProcess(false);
        }
    }

    function changeStart(changedStart: number) {
        setStart(changedStart);
        navigate(`${EmployerPagesPaths.RESUMES}?q=${jobQuery}&start=${changedStart}`);
    }

    function goToNextPageWithResults() {
        changeStart(start + 10)
    }

    function goToPreviousPageWithResults() {
        changeStart(start - 10)
    }

    console.log(matchingResumes)

    return (
        resumeLoadingProcess ? <LoadingPage/> :
            <>
                {
                    matchingResumes.length === 0 ?
                        jobQueryParam ?
                            <div className={"no-search-results-container"}>
                                <NoSearchResults/>
                                <div className={"no-search-explanation-message flex-column"}>
                                        <span className={"dark-default-text mb1rem"}>
                                            The search <b>{searchParams.get("q")!} {searchParams.get("location") ?
                                            `in ${searchParams.get("location")}` : ""}</b> did not match any resumes.
                                        </span>
                                    <b className={"dark-default-text"}>Search suggestions:</b>
                                    <ul>
                                        <li className={"dark-default-text"}>
                                            Try more general keywords
                                        </li>
                                        <li className={"dark-default-text"}>
                                            Check your spelling
                                        </li>
                                        <li className={"dark-default-text"}>
                                            Replace abbreviations with the entire word
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <></>
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
                            {
                                matchingResumes.map((resume, index) => (
                                    <ResumeSearchInfoBlock resume={resume} key={index}/>
                                ))

                            }
                        </div>
                }
                <div className={"pages-navigation-container"}>
                    {start !== 0 && <button
                        className={"navigation-button previous-button"}
                        onClick={goToPreviousPageWithResults}
                    >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </button>}
                    {hasMoreResumes &&
                        <button className={"navigation-button"} onClick={goToNextPageWithResults}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </button>}
                </div>
            </>


    )
}

export default ResumeSearchResults;
