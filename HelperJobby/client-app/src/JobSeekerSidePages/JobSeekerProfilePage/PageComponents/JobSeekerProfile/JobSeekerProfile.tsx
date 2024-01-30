import React, {FC, useEffect, useState} from 'react';
import "./JobSeekerProfile.scss";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {useAuth} from "../../../../hooks/useAuth";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faEnvelope, faFileLines, faLocationDot, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";

interface JobSeekerProfileProps {}

const JobSeekerProfile: FC<JobSeekerProfileProps> = () => {
    const {jobSeeker, setJobSeeker, fetchJobSeeker} = useJobSeeker();
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            if (loading) {
                navigate("/");
            }
        }, 10000);
        fetchComponentInitialData();
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    
    async function fetchComponentInitialData(){
        await fetchJobSeeker();
        setLoading(false);
    }

    function isAddressInfoProvided() {
        return !!jobSeeker?.address?.city;
    }

    function navigateToEditContactPage() {
        navigate("/edit/contact")
    }

    function navigateToResumeBuild() {
        navigate("/build/name")
    }

    function navigateToResume() {
        navigate("/resume");
    }

    return (
        <PageWrapWithHeader>
            {loading ? (<LoadingPage/>) :
            <div className={"profile-info-layout"}>
                <div className={"profile-info-container"}>
                    <div className={"profile-header-info"}>
                        {(jobSeeker?.firstName && jobSeeker.lastName) ?
                            (<div className={"job-seeker-full-name"}>
                                <span>{jobSeeker?.firstName} {jobSeeker?.lastName}</span>
                            </div>)
                                :
                            (<a className={"job-seeker-add-name"} onClick={navigateToEditContactPage}>
                                Add name 
                            </a>)
                        }
                        <div className={"job-seeker-avatar"}>
                            {!jobSeeker?.firstName || !jobSeeker.lastName ? 
                                (<FontAwesomeIcon icon={faUser} />)
                                :
                                (<span>{jobSeeker.firstName[0]}{jobSeeker.lastName[0]}</span>)
                            }
                        </div>
                    </div>
                    <div className={"change-job-seeker-info-section"}>
                        <button className={"change-job-seeker-info-button"} onClick={navigateToEditContactPage}>
                            <div className={"job-seeker-info-line"}>
                                <FontAwesomeIcon className={"start-of-line-icon"} icon={faEnvelope} />
                                <span>{authUser?.user.email}</span>
                            </div>
                            <div className={"job-seeker-info-line"}>
                                <FontAwesomeIcon className={"start-of-line-icon"} icon={faPhone} />
                                {!jobSeeker?.phoneNumber ?
                                    (<span className={"job-seeker-info-underline"}>Add phone number</span>)
                                    :
                                    (<span className={"numeric-info"}>{jobSeeker.phoneNumber}</span>)
                                }
                            </div>
                            <div className={"job-seeker-info-line last-of-type"}>
                                <FontAwesomeIcon className={"start-of-line-icon"} icon={faLocationDot} />
                                {!isAddressInfoProvided() ? 
                                    (<span className={"job-seeker-info-underline"}>Add location</span>)
                                    :
                                    (<>
                                        {jobSeeker?.address?.city && <span>{jobSeeker?.address?.city},&nbsp;</span>}
                                        {jobSeeker?.address?.postalCode && <span>{jobSeeker.address.postalCode},&nbsp;</span>}
                                        {jobSeeker?.address?.country && <span>{jobSeeker.address.country}</span>}
                                    </>)
                                }
                            </div>
                        </button>
                        <div className={"change-info-button-arrow"}>
                            <FontAwesomeIcon className={"svg1rem"} icon={faAngleRight} />
                        </div>
                    </div>
                    <div className={"resume-section"}>
                        <div className={"resume-section-header"}>
                            Resume
                        </div>
                        {!jobSeeker?.resume ?
                            (<div className={"add-resume-buttons-box"}>
                                <button className={"add-resume-button"}>
                                    Upload Resume
                                </button>
                                <button className={"add-resume-button last-button-of-type"} onClick={navigateToResumeBuild}>
                                    Build a HelperJobby Resume
                                </button>
                            </div>)
                            :
                            (
                                <div className={"resume-container"} onClick={navigateToResume}>
                                    <div className={"resume-container-info"}>
                                        <div className={"resume-icon"}>
                                            <FontAwesomeIcon className={"resume-icon"} icon={faFileLines} />
                                        </div>
                                        <span>HelperJobby Resume</span>
                                    </div>
                                    <div className={"change-info-button-arrow right-margin-remove"}>
                                        <FontAwesomeIcon className={"svg1rem"} icon={faAngleRight} />
                                    </div>
                                </div>                                
                            )
                        }
                    </div>
                </div>
            </div>
            }
        </PageWrapWithHeader>
    )
}

export default JobSeekerProfile;
