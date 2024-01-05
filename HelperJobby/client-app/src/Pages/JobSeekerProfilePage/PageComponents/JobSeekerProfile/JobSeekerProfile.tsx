import React, {FC, useEffect, useState} from 'react';
import "./JobSeekerProfile.scss";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {useAuth} from "../../../../hooks/useAuth";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobSeekerAccountDTO} from "../../../../DTOs/accountDTOs/JobSeekerAccountDTO";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faEnvelope, faFileLines, faLocationDot, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

interface JobSeekerProfileProps {}

const JobSeekerProfile: FC<JobSeekerProfileProps> = () => {
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {authUser} = useAuth();
    const jobSeekerService = new JobSeekerAccountService();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (jobSeeker === null){
                    setLoading(true);
                    const jobSeeker = await getJobSeekerAccount();
                    setJobSeeker(jobSeeker);
                    setLoading(false);
                }
            }
            catch (error){
                if (error instanceof ServerError){
                    logErrorInfo(error);
                }
            }
        } 
        fetchData();
    }, []);

    function checkJobSeekerAddressInfo() {
        return !!(
            jobSeeker?.address.city
        );
    }
    async function getJobSeekerAccount() : Promise<JobSeekerAccountDTO> {
        return  await jobSeekerService.getCurrentJobSeekerAllInfo();
    }

    function navigateToEditContactPage() {
        navigate("/edit-contact")
    }

    return (
        loading ? (<span>Loading...</span>) :
        <PageWrapWithHeader>
            <div className={"profile-info-layout"}>
                <div className={"profile-info-container"}>
                    <div className={"profile-header-info"}>
                        {!jobSeeker?.firstName || !jobSeeker.lastName ?  
                            (<a className={"job-seeker-add-name"} onClick={navigateToEditContactPage}>
                                Add name 
                            </a>)
                            :
                            (<div className={"job-seeker-full-name"}>
                                <span>{jobSeeker?.firstName} {jobSeeker?.lastName}</span>
                            </div>)
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
                                {!checkJobSeekerAddressInfo() ? 
                                    (<span className={"job-seeker-info-underline"}>Add location</span>)
                                    :
                                    (<>
                                        <span>{jobSeeker?.address.city},&nbsp;</span>
                                        {jobSeeker?.address.postalCode && <span>{jobSeeker.address.postalCode},&nbsp;</span>}
                                        {jobSeeker?.address.country && <span>{jobSeeker.address.country}</span>}
                                    </>)
                                }
                            </div>
                        </button>
                        <div className={"change-info-button-arrow"}>
                            <FontAwesomeIcon icon={faAngleRight} />
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
                                <button className={"add-resume-button last-button-of-type"}>
                                    Build a HelperJobby Resume
                                </button>
                            </div>)
                            :
                            (
                                <div className={"resume-container"}>
                                    
                                    <div className={"resume-container-info"}>
                                        <div className={"resume-icon"}>
                                            <FontAwesomeIcon icon={faFileLines} />
                                        </div>
                                        <span>HelperJobby Resume</span>
                                    </div>
                                    <div className={"change-info-button-arrow right-margin-remove"}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </div>                                
                            )
                        }
                    </div>
                </div>
            </div>
        </PageWrapWithHeader>
    )
}

export default JobSeekerProfile;
