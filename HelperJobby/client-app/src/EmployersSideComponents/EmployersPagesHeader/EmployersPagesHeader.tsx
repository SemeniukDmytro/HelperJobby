import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EmployersPagesHeader.scss';
import {useAuth} from "../../hooks/useAuth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faArrowUpRightFromSquare,
    faChevronDown,
    faGear, faMagnifyingGlass,
    faMessage,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {useEmployer} from "../../hooks/useEmployer";
import {useSignOut} from "../../hooks/useSignOut";
import {useNavigate} from "react-router-dom";

interface EmployersPagesHeaderProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const EmployersPagesHeader: FC<EmployersPagesHeaderProps> = ({loading, setLoading}) => {
    const {authUser, setAuthUser} = useAuth();
    const {employer, fetchEmployer} = useEmployer();
    const moreOptionsButtonRef = useRef<HTMLButtonElement>(null);
    const moreOptionsWindow = useRef<HTMLDivElement>(null);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const {signOut} = useSignOut(setAuthUser);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployerInfo();

        function handleClickOutside(event: MouseEvent) {
            if (moreOptionsWindow.current && !moreOptionsWindow.current.contains(event.target as Node) &&
                moreOptionsButtonRef.current && !moreOptionsButtonRef.current.contains(event.target as Node)) {
                setShowMoreOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleShowMoreOptionsClick() {
        setShowMoreOptions(!showMoreOptions);
    }

    async function fetchEmployerInfo() {
        await fetchEmployer();
        setLoading(false);
    }

    function navigateToAccountSettingPage() {
        setShowMoreOptions(false);
        navigate("/settings")
    }

    return (
        <div className={"emh-layout"}>
            <div className="emh-fb">
                <div className="emh-logo-block">
                    HelperJobby
                </div>
                {!loading && <div className="emh-right-side">
                    <button className="neutral-transparent-button">
                        <FontAwesomeIcon className={"svg1rem icon-right-margin"} icon={faMessage}/>
                        <span>Messages</span>
                    </button>
                    <div className="emh-separator">

                    </div>
                    <div className="emh-email-block mr1rem">
                        <button
                            className={"neutral-transparent-button"}
                            ref={moreOptionsButtonRef}
                            onClick={handleShowMoreOptionsClick}
                        >
                            <FontAwesomeIcon className={"svg075rem mr05rem"} icon={faUser}/>
                            <span className={"mr05rem emh-user-email"}>{authUser?.user.email}</span>
                            <FontAwesomeIcon className={"svg05rem"} icon={faChevronDown}/>
                        </button>
                        <div className="emh-more-options-bar">
                            {showMoreOptions && <div className="emh-more-options-block" ref={moreOptionsWindow}>
                                <div className={"emh-option-container"}>
                                    <span
                                        className={"dark-default-text bold-text emh-employer-name"}
                                    >{employer?.organization.name || "No account name"} </span>
                                </div>
                                <div className={"emh-option-container"}>
                                    <button className={"emh-option"}>
                                        <FontAwesomeIcon className={"icon-right-margin svg1rem"} icon={faGear}/>
                                        <span>Employer settings</span>
                                    </button>
                                </div>
                                <div className={"emh-option-container"}>
                                    <button className={"emh-option"}>
                                        <FontAwesomeIcon className={"icon-right-margin svg1rem"} icon={faUser}/>
                                        <span>Users</span>
                                    </button>
                                </div>
                                <div className={"content-separation-line mb075rem mt075rem"}></div>
                                <div className={"emh-option-container"}>
                                    <span className={"dark-default-text bold-text"}>{authUser?.user.email} </span>
                                </div>
                                <div className={"emh-option-container"}>
                                    <button className={"emh-option"} onClick={navigateToAccountSettingPage}>
                                        <FontAwesomeIcon className={"icon-right-margin svg1rem"} icon={faGear}/>
                                        <span>Account settings</span>
                                    </button>
                                </div>
                                <div className={"emh-option-container"} onClick={() => setShowMoreOptions(false)}>
                                    <a className={"emh-option"}
                                       target={"_blank"}
                                       href={"/"}
                                    >
                                        <div className={"emh-option-with-multiple-icons"}>
                                            <div className={"emh-option-children-fb"}>
                                                <FontAwesomeIcon
                                                    className={"icon-right-margin svg1rem"}
                                                    icon={faMagnifyingGlass} />
                                                <span>HelperJobby for job seekers</span>
                                            </div>
                                            <div className={"emh-option-children-fb"}>
                                                <FontAwesomeIcon
                                                    className={"svg1rem"}
                                                    icon={faArrowUpRightFromSquare}
                                                />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className={"emh-option-container"}>
                                    <button className={"emh-option"} onClick={signOut}>
                                        <FontAwesomeIcon
                                            className={"icon-right-margin svg1rem"}
                                            icon={faArrowRightFromBracket}
                                        />
                                        <span>Sign out</span>
                                    </button>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default EmployersPagesHeader;
