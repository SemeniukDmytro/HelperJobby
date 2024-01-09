import React, {FC, useEffect, useState} from 'react';
import './SearchResults.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import JobTypes from "../../../enums/JobTypes";
import HomePageMainContentWrap from "../../HomePage/PageComponents/HomePageMainContentWrap/HomePageMainContentWrap";
import JobSearchBar from "../../HomePage/PageComponents/JobSearchBar/JobSearchBar";

interface SearchResultsProps {
}

const SearchResults: FC<SearchResultsProps> = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [start, setStart] = useState(0);  
    const [isRemote, setIsRemote] = useState("");
    const [pay, setPay] = useState(0);
    const [jobType, setJobType] = useState<JobTypes>(0);
    const [language, setLanguage] = useState("");

    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    
    useEffect(() => {
        const queryParam = searchParams.get("q");
        if (!queryParam){
            navigate('/');
            return;
        }
        setQuery(queryParam);
        const startParam = searchParams.get("start");
        const isRemoteParam = searchParams.get("isRemote");
        const payParam = searchParams.get("pay");
        const jobTypeParam = searchParams.get("jobType");
        const languageParam = searchParams.get("language");
        
    }, []);

    
    return (
        <HomePageMainContentWrap>
            <JobSearchBar jobInitial={searchParams.get("q")!} locationInitial={searchParams.get("location") || ""}/>
        </HomePageMainContentWrap>
    )
};

export default SearchResults;
