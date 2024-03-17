import React, {FC} from 'react';
import "./RecentSearches.scss";
import RecentSearch from "../RecentSearch/RecentSearch";
import {useHomePage} from "../../../../hooks/contextHooks/useHomePage";

interface RecentSearchesProps {
    jobQueryInputRef: React.RefObject<HTMLInputElement>;
}

const RecentSearches: FC<RecentSearchesProps> = ({
    jobQueryInputRef
                                                 }) => {
    const {recentUserSearches} = useHomePage();
    
    
    return (
        <div className={"recent-searches-frame"}>
            <div className={"recent-searches-container"}>
                {recentUserSearches.length !== 0 ?
                    recentUserSearches.map((search, index) => (
                    <RecentSearch key={index} recentUserSearch={search}/>
                ))
                :
                    <div className={"no-search-results-container"}>
                        <b className={"small-title mb05rem"}>
                            No recent searches yet
                        </b>
                        <span className={"light-dark-small-text mb1rem"}>
                            After you run a search, your recent searches will live here.
                        </span>
                        <button
                            onClick={() => jobQueryInputRef.current?.focus()}
                            className={"light-button-with-margin"}> 
                            Start a search
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default RecentSearches;