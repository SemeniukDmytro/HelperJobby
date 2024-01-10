import React, {FC, useEffect, useState} from 'react';
import './SearchResults.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import HomePageMainContentWrap from "../../../HomePage/PageComponents/HomePageMainContentWrap/HomePageMainContentWrap";
import QueryParameter from "../QueryParameter/QueryParameter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {JobQueryParams} from "../../../../enums/JobQueryParams";
import useQueryParams from "../../../../hooks/useQueryParams";
import JobSearchBar from "../../../../Components/JobSearchBar/JobSearchBar";
import createRequestURI from "../../../../utils/getJobSearchRequestURI";
import {JobTypesMapData} from "../../../../AppConstData/JobTypesMapData";
import {mostSpokenLanguages} from "../../../../AppConstData/Languages";
import JobTypes from "../../../../enums/JobTypes";
import {SearchService} from "../../../../services/searchService";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";

interface SearchResultsProps {
}

const SearchResults: FC<SearchResultsProps> = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const searchService = new SearchService();
    
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
    setLanguage} = useQueryParams();
    
    const [showPayOptions, setShowPayOptions] = useState(false);
    const [showJobTypeOptions, setShowJobTypeOptions] = useState(false);
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    
    
    useEffect(() => {
        const queryParam = searchParams.get("q");
        if (!queryParam || queryParam.length == 0) {
            navigate('/');
            return;
        }

        setQuery(queryParam);

        const queryParams = {
            location: searchParams.get("location") ?? "",
            start: parseInt(searchParams.get("start") ?? "0", 10),
            isRemote: searchParams.get("isRemote") === "true",
            pay: parseFloat(searchParams.get("pay") ?? "0"),
            jobType: parseInt(searchParams.get("jobType") ?? "0", 10),
            language: searchParams.get("language") ?? "",
        };
        
        if (!(queryParams.jobType in JobTypes)){
            queryParams.jobType = 0;
        }
        
        setJobLocation(queryParams.location);
        setStart(queryParams.start);
        setIsRemote(queryParams.isRemote);
        setPay(queryParams.pay);
        setJobType(queryParams.jobType);
        setLanguage(queryParams.language);
        const fetchData =  async () => {
           try {
              const response = await searchService.searchJobs(queryParam, queryParams.location, queryParams.start, queryParams.isRemote,
                  queryParams.pay, queryParams.jobType, queryParams.language);
              console.log(response);
           } 
           catch (e){
               if (e instanceof ServerError){
                   logErrorInfo(e);
               }
           }
        }
         fetchData();
        
        
    }, []);




    function remoteOptionHandler() {
        setIsRemote(!isRemote);
        const requestUri = createRequestURI(query, jobLocation, start, !isRemote, pay, jobType, language);
    }
    
    function selectPay(selectedPay : number){
        setPay(selectedPay);
        const requestUri = createRequestURI(query, jobLocation, start, isRemote, selectedPay, jobType, language);
        navigate(requestUri);
    }
    
    function selectJobType(selectedJobType : JobTypes){
        setJobType(selectedJobType);
        const requestUri = createRequestURI(query, jobLocation, start, isRemote, pay, selectedJobType, language);
        navigate(requestUri);
    }
    
    function selectLanguage(selectedLanguage : string){
        setLanguage(selectedLanguage);
        const requestUri = createRequestURI(query, jobLocation, start, isRemote, pay, jobType, selectedLanguage);
        navigate(requestUri);
    }
    

    function handlePayClick(){
        if (pay == 0){
            setShowPayOptions(!showPayOptions);
        }
        else{
            setPay(0);
            reloadSearchResults();
        }
    }

    function handleJobTypeClick(){
        if (jobType == 0){
            setShowJobTypeOptions(!showJobTypeOptions);
        }
        else{
            setJobType(0);
            reloadSearchResults();
        }
    }

    function handleLanguageClick(){
        if (!language){
            setShowLanguageOptions(!showLanguageOptions);
        }
        else {
            setLanguage("")
            reloadSearchResults();
        }
    }
    
    function navigateToSearchResultsPage(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setStart(0);
        setIsRemote(false);
        setPay(0);
        setJobType(0);
        setLanguage("");
        const requestURI = createRequestURI(query, jobLocation, 0, false, 0, 0, "");
        navigate(requestURI);
    }

    function reloadSearchResults() {
        const requestURI = createRequestURI(query, jobLocation, start, isRemote, pay, jobType, language);
        navigate(requestURI);
    }

    return (
        <HomePageMainContentWrap>
            <JobSearchBar jobInitial={searchParams.get("q")!} locationInitial={searchParams.get("location") || ""} findJobsClick={navigateToSearchResultsPage}/>
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
        </HomePageMainContentWrap>
    )
};

export default SearchResults;
