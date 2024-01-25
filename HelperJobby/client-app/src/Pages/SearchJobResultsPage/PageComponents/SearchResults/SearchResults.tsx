import React, {FC, useEffect, useState} from 'react';
import './SearchResults.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import HomePageMainContentWrap from "../../../HomePage/PageComponents/HomePageMainContentWrap/HomePageMainContentWrap";
import QueryParameter from "../QueryParameter/QueryParameter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faXmark} from "@fortawesome/free-solid-svg-icons";
import {JobQueryParams} from "../../../../enums/JobQueryParams";
import useQueryParams from "../../../../hooks/useQueryParams";
import JobSearchBar from "../../../../Components/JobSearchBar/JobSearchBar";
import {JobTypesMapData} from "../../../../AppConstData/JobTypesMapData";
import {mostSpokenLanguages} from "../../../../AppConstData/Languages";
import JobTypes from "../../../../enums/JobTypes";
import {SearchService} from "../../../../services/searchService";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import ShortJobDescriptionBlock
    from "../../../HomePage/PageComponents/ShortJobDescriptionBlock/ShortJobDescriptionBlock";
import DetailedDescriptionColumn
    from "../../../HomePage/PageComponents/DetailedDescriptionColumn/DetailedDescriptionColumn";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import getJobSearchRequestURI from "../../../../utils/getJobSearchRequestURI";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";

interface SearchResultsProps {
}

const SearchResults: FC<SearchResultsProps> = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const searchService = new SearchService();
    const [searchResults, setSearchResults] = useState<JobDTO[]>([]);
    const [hasMoreResults, setHasMoreResults] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobDTO | null>(null);
    const [isFullHeaderGridTemplate, setIsFullHeaderGridTemplate] = useState<number| null>(null);
    const [isShortHeaderGridTemplate, setIsShortHeaderGridTemplate] = useState<number| null>(null);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0);

    const {query,
    setQuery,
    jobLocation,
    setJobLocation,
    start,
    setStart,
    isRemote,
    setIsRemote,
    pay,
    setPay,
    jobType,
    setJobType,
    language,
    setLanguage,
    mainContentReferenceForSearch} = useQueryParams();
    
    const [showPayOptions, setShowPayOptions] = useState(false);
    const [showJobTypeOptions, setShowJobTypeOptions] = useState(false);
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    const queryParams = {
        query : searchParams.get("q") ?? "",
        location: searchParams.get("location") ?? "",
        start: parseInt(searchParams.get("start") ?? "0", 10),
        isRemote: searchParams.get("isRemote") === "true",
        pay: parseFloat(searchParams.get("pay") ?? "0"),
        jobType: parseInt(searchParams.get("jobType") ?? "0", 10),
        language: searchParams.get("language") ?? "",
    };
    
    
    useEffect(() => {
        const queryParam = searchParams.get("q");
        if (!queryParam || queryParam.length === 0) {
            navigate('/');
            return;
        }

        
        
        if (!(queryParams.jobType in JobTypes)){
            queryParams.jobType = 0;
        }
        setQuery(queryParam)
        setJobLocation(queryParams.location);
        setStart(queryParams.start);
        setIsRemote(queryParams.isRemote);
        setPay(queryParams.pay);
        setJobType(queryParams.jobType);
        setLanguage(queryParams.language);
        const fetchData =  async () => {
           try {
               setLoading(true);
               const response = await searchService.searchJobs(queryParam, queryParams.location, queryParams.start, queryParams.isRemote,
                   queryParams.pay, queryParams.jobType, queryParams.language);
               setSearchResults(response.jobs);
               if (response.jobs.length > 0){
                    setSelectedJob(response.jobs[0]);
               }
               setHasMoreResults(response.hasMore);
           } 
           catch (e){
               if (e instanceof ServerError){
                   logErrorInfo(e);
               }
           }
           finally {
               setLoading(false);
           }
        }
         fetchData();
        
    }, [searchParams]);



    function remoteOptionHandler() {
        console.log(!isRemote)
        const requestUri = getJobSearchRequestURI(queryParams.query, queryParams.location, queryParams.start, !isRemote, queryParams.pay
            , queryParams.jobType, queryParams.language);
        navigate(requestUri);
    }
    
    function selectPay(selectedPay : number){
        setPay(selectedPay);
        const requestUri = getJobSearchRequestURI(queryParams.query, queryParams.location, queryParams.start, queryParams.isRemote, selectedPay
            , queryParams.jobType, queryParams.language);
        navigate(requestUri);
    }
    
    function selectJobType(selectedJobType : JobTypes){
        setJobType(selectedJobType);
        const requestUri = getJobSearchRequestURI(queryParams.query, queryParams.location, queryParams.start, queryParams.isRemote, 
            queryParams.pay, selectedJobType, queryParams.language);
        navigate(requestUri);
    }
    
    function selectLanguage(selectedLanguage : string){
        setLanguage(selectedLanguage);
        const requestUri = getJobSearchRequestURI(queryParams.query, queryParams.location, queryParams.start, queryParams.isRemote, 
            queryParams.pay, queryParams.jobType, selectedLanguage);
        navigate(requestUri);
    }
    
    function changeStart(changedStart : number){
        setStart(changedStart);
        const requestUri = getJobSearchRequestURI(query, jobLocation, changedStart, isRemote, pay, jobType, language);
        navigate(requestUri);
    }
    

    function handlePayClick(){
        if (pay == 0){
            setShowPayOptions(!showPayOptions);
        }
        else{
            selectPay(0);
        }
    }

    function handleJobTypeClick(){
        if (jobType == 0){
            setShowJobTypeOptions(!showJobTypeOptions);
        }
        else{
            selectJobType(0);
        }
    }

    function handleLanguageClick(){
        if (!language){
            setShowLanguageOptions(!showLanguageOptions);
        }
        else {
            selectLanguage("");
        }
    }

    function goToNextPageWithResults() {
        changeStart(start + 10)
    }
    function goToPreviousPageWithResults() {
        changeStart(start - 10)

    }

    return (
        <HomePageMainContentWrap>
            <JobSearchBar jobInitial={searchParams.get("q")!} locationInitial={searchParams.get("location") || ""}/>
            <div className={"search-filters-containers"}>
                <button className={`query-param-box ${isRemote ? "selected-query-box" : ""}`} onClick={remoteOptionHandler}>
                    <span className={"param-name"}>
                        Remote
                    </span>
                    {isRemote && <FontAwesomeIcon className={"remove-query-param"} icon={faXmark} />}
                </button>
                <div className={"param-options-box"}>
                    <QueryParameter queryParam={JobQueryParams.Pay} isSelected={pay != 0}
                                    onClick={handlePayClick} setShowMoreOptions={setShowPayOptions}/>
                    {showPayOptions && <div className={"param-options-start"}>
                        <div className={"param-options-list"}>
                            <button className={"param-option"} onClick={() => selectPay(15)}>
                                $15.00+/hour
                            </button>
                            <button className={"param-option"} onClick={() => selectPay(25)}>
                                $25.00+/hour
                            </button>
                            <button className={"param-option"} onClick={() => selectPay(35)}>
                                $35.00+/hour
                            </button>
                            <button className={"param-option"} onClick={() => selectPay(45)}>
                                $45.00+/hour
                            </button>
                        </div>
                    </div>}
                </div>
                <div className={"param-options-box"}>
                    <QueryParameter queryParam={JobQueryParams.JobType} isSelected={jobType != 0}
                                    onClick={handleJobTypeClick} setShowMoreOptions={setShowJobTypeOptions}/>
                    {showJobTypeOptions && <div className={"param-options-start"}>
                        <div className={"param-options-list"}>
                            {JobTypesMapData.map((data, index) => (
                                <div className={"param-option"} key={index} onClick={() => selectJobType(data.enumValue)}>{data.stringValue}</div>
                            ))}
                        </div>
                    </div>}
                </div>
                <div className={"param-options-box"}>
                    <QueryParameter queryParam={JobQueryParams.Language} isSelected={language.length != 0}
                                    onClick={handleLanguageClick} setShowMoreOptions={setShowLanguageOptions}/>
                    {showLanguageOptions && <div className={"param-options-start"}>
                        <div className={"param-options-list"}>
                            {mostSpokenLanguages.map((language, index) => (
                                <div className={"param-option"} key={index} onClick={() => selectLanguage(language)}>{language}</div>
                            ))}
                        </div>
                    </div>}
                </div>
            </div>
            <div className={"filters-results-separator"}>
            </div>
            {loading ? <LoadingPage/> :
                (searchResults.length > 0 ?  (<div className={"jobs-container"}>
                    <div className={"job-descriptions"}>
                        <div className={"short-job-descriptions-column smaller-margin-before-navigation"}>
                            <div className={"title-container"}>
                                <span>{searchParams.get("q")} {searchParams.get("location") ? `in ${searchParams.get("location")}` : ""} jobs</span>
                            </div>
                            {searchResults.map((job, index) => (
                                <ShortJobDescriptionBlock key={index} job={job}
                                                          selectedJob={selectedJob}
                                                          setSelectedJob={setSelectedJob}></ShortJobDescriptionBlock>
                            ))}
                        </div>
                        <div className={"pages-navigation-container"}>
                            {start != 0 && <button className={"navigation-button previous-button"} onClick={goToPreviousPageWithResults}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>}
                            {hasMoreResults && <button className={"navigation-button"} onClick={goToNextPageWithResults}>   
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>}
                        </div>
                    </div>
                <DetailedDescriptionColumn selectedJob={selectedJob}
                                           isFullHeaderGridTemplate={isFullHeaderGridTemplate}
                                           setIsFullHeaderGridTemplate={setIsFullHeaderGridTemplate}
                                           isShortHeaderGridTemplate={isShortHeaderGridTemplate}
                                           setIsShortHeaderGridTemplate={setIsShortHeaderGridTemplate} 
                                           mainContentReference={mainContentReferenceForSearch} />
            </div>) : (<></>))}
        </HomePageMainContentWrap>
    )
};

export default SearchResults;
