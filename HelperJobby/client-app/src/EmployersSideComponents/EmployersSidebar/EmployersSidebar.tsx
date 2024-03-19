import React, {FC, useRef, useState} from 'react';
import './EmployersSidebar.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBriefcase,
    faChevronRight,
    faPlus,
    faUser,
    faUserGroup,
    faUserPlus,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";
import employerPagesPaths from "../../AppRoutes/Paths/EmployerPagesPaths";

interface EmployersSidebarProps {
}

const EmployersSidebar: FC<EmployersSidebarProps> = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showCreateOptions, setShowCreateOptions] = useState(false);
    const navigate = useNavigate();

    function handleNavBarSizeButtonClick() {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            setIsHovered(false);
        }
    }

    function handleNavBarHover() {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(true);
        }, 500);
    }

    function handleNavMouseLeave() {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 500);
    }

    function handleShowCreateOptionsMouseEnter() {
        if (isHovered || isExpanded) {
            setShowCreateOptions(true);
            return;
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setShowCreateOptions(true);
        }, 500);

    }

    function handelShowCreateOptionsMouseLeave() {
        setShowCreateOptions(false);
    }

    function navigateToJobPostingPage() {
        navigate(employerPagesPaths.JOB_POSTING);
    }

    function navigateToJobsPage() {
        navigate(employerPagesPaths.JOBS);
    }

    function navigateToCandidatesPage() {
        navigate(employerPagesPaths.CANDIDATES);
    }

    function navigateToResumeSearchPage() {
        navigate(employerPagesPaths.RESUMES)
    }

    function navigateToInterviewsPage() {
        navigate(employerPagesPaths.EMPLOYER_INTERVIEWS)
    }

    function navigateToCreateUsersPage() {
        navigate(employerPagesPaths.USERS)
    }

    return (
        <>
            <nav
                className={"employer-pages-navigation"}
                onMouseEnter={handleNavBarHover}
                onMouseLeave={handleNavMouseLeave}
            >
                <div
                    className="nav-bar-layout"
                    style={{width: `${isExpanded ? "12.25rem" : " 3.5rem"}`}}
                >
                    <div className={"nav-bar-container"}
                         style={{width: `${(isExpanded || isHovered) ? "12.25rem" : " 3.5rem"}`}}
                    >
                        <div className="nav-bar-button-container">
                            <button className={"nav-bar-size-button"} onClick={handleNavBarSizeButtonClick}>
                                {isExpanded ?
                                    <div className="nav-icon-container">
                                        <FontAwesomeIcon className={"svg125rem"} icon={faXmark}/>
                                    </div>
                                    :
                                    <div className="nav-icon-container">
                                        <FontAwesomeIcon className={"svg1rem"} icon={faBars}/>
                                    </div>
                                }
                                {(isHovered || isExpanded) &&
                                    <div className="nav-link-text">
                                        {isExpanded ? "Collapse" : "Expand"}
                                    </div>
                                }
                            </button>
                        </div>
                        <ul className="nav-buttons-list">
                            <li className={"nav-list-component"}
                                onMouseEnter={handleShowCreateOptionsMouseEnter}
                                onMouseLeave={handelShowCreateOptionsMouseLeave}>
                                <div className={"nav-bar-button-container"}>
                                    <div
                                        className={"white-nav-link-container"}
                                    >
                                        <a className={"nav-link"}>
                                            <div className="nav-icon-container">
                                                <FontAwesomeIcon className={"svg1rem semi-dark-small-text"}
                                                                 icon={faPlus}/>
                                            </div>
                                            {(isHovered || isExpanded) &&
                                                <div className="nav-link-text dark-nav-link-text">
                                                    Create new
                                                </div>
                                            }
                                        </a>
                                        {(isHovered || isExpanded) &&
                                            <div className={"nav-icon-container"}>
                                                <FontAwesomeIcon className={"svg075rem mr05rem semi-dark-default-text"}
                                                                 icon={faChevronRight}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {showCreateOptions && <div className={"create-new-option-container"}>
                                    <div className={"create-new-options-layout"}>
                                        <div className={"create-new-options-text"}>
                                            <ul className={"nav-buttons-list"}>
                                                <li className={"nav-list-component"} onClick={navigateToJobPostingPage}>
                                                    <div className={"nav-bar-button-container"}>
                                                        <div className={"nav-link-container"}>
                                                            <a className={"nav-link"}>
                                                                <div
                                                                    className="nav-icon-container green-icon-container">
                                                                    <FontAwesomeIcon className={"svg1rem"}
                                                                                     icon={faBriefcase}/>
                                                                </div>
                                                                <div className="nav-link-text">
                                                                    Job
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className={"nav-list-component"}
                                                    onClick={navigateToCreateUsersPage}>
                                                    <div className={"nav-bar-button-container"}>
                                                        <div className={"nav-link-container"}>
                                                            <a className={"nav-link"}>
                                                                <div className="nav-icon-container pink-icon-container">
                                                                    <FontAwesomeIcon className={"svg1rem"}
                                                                                     icon={faUser}/>
                                                                </div>
                                                                <div className="nav-link-text">
                                                                    User
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>}
                            </li>
                            <li className={"nav-list-component"}
                                onClick={navigateToJobsPage}
                            >
                                <div className={"nav-bar-button-container"}>
                                    <div className={"nav-link-container"}>
                                        <a className={"nav-link"}>
                                            <div className="nav-icon-container">
                                                <FontAwesomeIcon className={"svg1rem"} icon={faBriefcase}/>
                                            </div>
                                            {(isHovered || isExpanded) &&
                                                <div className="nav-link-text">
                                                    Jobs
                                                </div>
                                            }
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className={"nav-list-component"}
                                onClick={navigateToCandidatesPage}>
                                <div className={"nav-bar-button-container"}>
                                    <div className={"nav-link-container"}>
                                        <a className={"nav-link"}>
                                            <div className="nav-icon-container">
                                                <FontAwesomeIcon className={"svg1rem"} icon={faUserGroup}/>
                                            </div>
                                            {(isHovered || isExpanded) &&
                                                <div className="nav-link-text">
                                                    Candidates
                                                </div>
                                            }
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className={"nav-list-component"} onClick={navigateToResumeSearchPage}>
                                <div className={"nav-bar-button-container"}>
                                    <div className={"nav-link-container"}>
                                        <a className={"nav-link"}>
                                            <div className="nav-icon-container">
                                                <FontAwesomeIcon className={"svg1rem"} icon={faUserPlus}/>
                                            </div>
                                            {(isHovered || isExpanded) &&
                                                <div className="nav-link-text">
                                                    Search resumes
                                                </div>
                                            }
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className={"nav-list-component"}
                                onClick={navigateToInterviewsPage}
                            >
                                <div className={"nav-bar-button-container"}>
                                    <div className={"nav-link-container"}>
                                        <a className={"nav-link"}>
                                            <div className="nav-icon-container">
                                                <FontAwesomeIcon className={"svg1rem"} icon={faCalendar}/>
                                            </div>
                                            {(isHovered || isExpanded) &&
                                                <div className="nav-link-text">
                                                    Interviews
                                                </div>
                                            }
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default EmployersSidebar;
