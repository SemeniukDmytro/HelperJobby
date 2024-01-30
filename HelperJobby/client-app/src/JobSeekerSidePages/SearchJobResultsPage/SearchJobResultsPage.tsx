import React, {FC} from 'react';
import SearchResults from "./PageComponents/SearchResults/SearchResults";
import {JobQueryParamsProvider} from "../../contexts/JobQueryParamsContext";

interface SearchResultsPageProps {
}

const SearchJobResultsPage: FC<SearchResultsPageProps> = () => (
    <JobQueryParamsProvider>
        <SearchResults/>
    </JobQueryParamsProvider>

);

export default SearchJobResultsPage;
