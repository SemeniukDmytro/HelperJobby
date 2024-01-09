import React, { FC } from 'react';
import SearchResults from "./PageComponents/SearchResults/SearchResults";
interface SearchResultsPageProps {}

const SearchJobResultsPage: FC<SearchResultsPageProps> = () => (
  <SearchResults/>
);

export default SearchJobResultsPage;
