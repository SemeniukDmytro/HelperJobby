import React, {FC} from 'react';
import "./RecentSearches.scss";
import RecentSearch from "../RecentSearch/RecentSearch";
import {useHomePage} from "../../../../hooks/contextHooks/useHomePage";

interface RecentSearchesProps {
}

const RecentSearches: FC<RecentSearchesProps> = () => {
    const {recentUserSearches, setRecentUserSearches} = useHomePage();

    return (
        <div className={"recent-searches-frame"}>
            <div className={"recent-searches-container"}>
                {recentUserSearches.map((search, index) => (
                    <RecentSearch key={index} recentUserSearch={search}/>
                ))}
            </div>
        </div>
    )
}

export default RecentSearches;