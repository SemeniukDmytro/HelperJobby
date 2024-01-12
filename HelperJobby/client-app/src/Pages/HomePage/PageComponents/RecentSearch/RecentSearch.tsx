import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import "./RecentSearch.scss"
import {RecentUserSearchDTO} from "../../../../DTOs/userRelatedDTOs/RecentUserSearchDTO";
import {useHomePage} from "../../../../hooks/useHomePage";
import {UserService} from "../../../../services/userService";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";

interface RecentSearchProps {
    recentUserSearch: RecentUserSearchDTO;
}

const RecentSearch: FC<RecentSearchProps> = (props) => {
    const location = props.recentUserSearch.location.toLowerCase() == "remote" ? "Remote" : `in ${props.recentUserSearch.location}`;

    const {recentUserSearches, setRecentUserSearches} = useHomePage();

    const userService = new UserService();

    async function deleteRecentUserSearch() {
        try {
            await userService.deleteUserRecentSearch(props.recentUserSearch.id);
            setRecentUserSearches((prevSearches) =>
                prevSearches.filter(
                    (search) => search.id !== props.recentUserSearch.id
                )
            );
        } catch (error) {
            if (error instanceof ServerError) {
                logErrorInfo(error);
            }
        }
    }

    return (
        <div className={"recent-search-box"}>
            <div className={"search-info"}>
                <div className={"query-info"}>
                    {props.recentUserSearch.query}
                </div>
                {props.recentUserSearch.location && <div className={"location-info"}>
                    {location}
                </div>}
            </div>
            <button className={"delete-search-button"} onClick={deleteRecentUserSearch}>
                <FontAwesomeIcon className={"delete-search-svg"} icon={faXmark}/>
            </button>
        </div>
    )
};

export default RecentSearch;
