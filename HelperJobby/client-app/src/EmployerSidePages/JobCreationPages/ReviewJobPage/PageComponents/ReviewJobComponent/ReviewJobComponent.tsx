import React, {FC, useEffect, useState} from 'react';
import './ReviewJobComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import SvgReview from "../../../../../Components/Icons/Review";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlus, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {useNavigate, useParams} from "react-router-dom";
import {
    useJobLoaderForSettingCurrentIncompleteJob
} from "../../../../../hooks/useJobLoaderForSettingCurrentIncompleteJob";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import JobReviewJobInfoBlock from "../JobReviewJobInfoBlock/JobReviewJobInfoBlock";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import MultipleRowsReviewBlock from "../MultipleRowsReviewBlock/MultipleRowsReviewBlock";
import {
    benefitsEnumToStringMap,
    jobTypesEnumToStringMap,
    schedulesEnumToStringMap
} from "../../../../../utils/convertLogic/enumToStringConverter";
import {formatJobSalaryDisplay} from "../../../../../utils/convertLogic/formatJobSalaryDisplay";
import {resumeRequirementOptionsMapData} from "../../../../../AppConstData/ResumeRequirements";
import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";

interface ReviewJobComponentProps {}

const ReviewJobComponent: FC<ReviewJobComponentProps> = () => {
    const [jobPostMissingInformation, setJobPostMissingInfo] = useState(true);
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const {jobId} = useParams<{jobId : string}>();
    const {fetchJobAndSetJobCreation} =  useJobLoaderForSettingCurrentIncompleteJob(jobId ? parseInt(jobId) : 0, incompleteJob, setIncompleteJob);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    
    
    useEffect(() => {
        fetchInitialPageData()
    }, []);

    useEffect(() => {
        if (incompleteJob){
            setLoading(false);
        }
    }, [incompleteJob]);

    async function fetchInitialPageData(){
        await fetchJobAndSetJobCreation();
    }


    function editJobTitle() {
        
    }

    function editNumberOfOpenings() {
        
    }

    function editCountryAndLanguage() {
        
    }

    function editLocation() {
        
    }

    function editSelectedJobTypes() {
        
    }

    function editSelectedSchedules() {
        
    }

    function editSalary() {
        
    }

    function editSelectedBenefits() {
        
    }

    function editJobDescription() {
        
    }

    function editApplicationMethod() {
        
    }

    function editContactEmail() {
        
    }

    function editContactPhone() {
        
    }

    function goToPreviousPage() {
        
    }

    function confirmJobCreation() {
        
    }

    return (
        loading ? <LoadingPage/> :
        <div className={"employers-centralized-page-layout"}>
            <PageTitleWithImage imageElement={<SvgReview/>} title={"Review"}/>
            <div className={'emp-form-fb'}>
                <form className={"emp-form"}>
                    {jobPostMissingInformation &&
                        <div className={"info-notify-container orange-notify-container"}>
                            <div className={"horizontal-title mt05rem mb05rem"}>
                                <div className={"warning-pop-up-icon mr1rem"}>
                                    <FontAwesomeIcon icon={faTriangleExclamation}/>
                                </div>
                                <div className={"ntf-msg-with-ttl-container"}>
                                    <div className={"dark-small-text bold-text"}>
                                        Job post has missing information
                                    </div>
                                    <div className={"dark-small-text"}>
                                        To improve this post, add information that’s important to people applying.
                                    </div>
                                </div>
                            </div>
                            <div className={"bold-navigation-link"}>
                                <FontAwesomeIcon className={"svg1rem icon-right-margin"} icon={faPlus}/>
                                <span>Add info</span>
                            </div>
                        </div>
                    }
                    <div className={"jr-jd-container"}>
                        <span className={"small-title mb1rem mt1rem"}>Job details</span>
                        <JobReviewJobInfoBlock
                            jobInfoLabel={"Job title"}
                            fieldValue={incompleteJob!.jobTitle}
                            onEditClick={editJobTitle}
                        />
                        <JobReviewJobInfoBlock
                            jobInfoLabel={"Number of openings"}
                            fieldValue={incompleteJob!.numberOfOpenings.toString()}
                            onEditClick={editNumberOfOpenings}
                        />
                        <JobReviewJobInfoBlock 
                            jobInfoLabel={"Country and language"}
                            fieldValue={`${incompleteJob!.locationCountry} ${incompleteJob!.language}`}
                            onEditClick={editCountryAndLanguage}
                        />
                        <JobReviewJobInfoBlock 
                            jobInfoLabel={"Location"}
                            fieldValue={incompleteJob!.location}
                            onEditClick={editLocation}
                        />
                        <MultipleRowsReviewBlock 
                            fieldLabel={"Job type"}
                            onEditClick={editSelectedJobTypes}>
                            {(incompleteJob?.jobType && incompleteJob.jobType.length != 0) ?
                                (incompleteJob.jobType.map((jt, index) => (
                                    <div key={index}>{jobTypesEnumToStringMap(jt)}</div>
                                )))
                                :
                                (<>
                                </>)
                            }
                        </MultipleRowsReviewBlock>
                        <MultipleRowsReviewBlock 
                            fieldLabel={"Schedule"}
                            onEditClick={editSelectedSchedules}>
                            {(incompleteJob?.schedule && incompleteJob.schedule.length != 0) ?
                                (incompleteJob.schedule.map((s, index) => (
                                    <div key={index}>{schedulesEnumToStringMap(s)}</div>
                                )))
                                :
                                (<>
                                </>)
                            }
                        </MultipleRowsReviewBlock>
                        <JobReviewJobInfoBlock
                            jobInfoLabel={"Pay"}
                            fieldValue={formatJobSalaryDisplay(incompleteJob!)}
                            onEditClick={editSalary}
                        />
                        <MultipleRowsReviewBlock
                            fieldLabel={"Benefits"}
                            onEditClick={editSelectedBenefits}>
                            {(incompleteJob?.benefits && incompleteJob.benefits.length != 0) ?
                                (incompleteJob.benefits.map((b, index) => (
                                    <div key={index}>{benefitsEnumToStringMap(b)}</div>
                                )))
                                :
                                (<>
                                </>)
                            }
                        </MultipleRowsReviewBlock>
                        <JobReviewJobInfoBlock
                            jobInfoLabel={"Job description"}
                            fieldValue={incompleteJob!.description || ""}
                            onEditClick={editJobDescription}
                        />
                    </div>

                    <div className={"content-separation-line mt2rem mb15rem"}></div>
                    <span className={"small-title mb1rem mt1rem"}>Settings</span>
                    <JobReviewJobInfoBlock
                        jobInfoLabel={"Application method"}
                        fieldValue={`Email ${incompleteJob?.contactPhoneNumber ? "and phone number" : ""}`}
                        onEditClick={editApplicationMethod}
                    />
                    <JobReviewJobInfoBlock
                        jobInfoLabel={"Require resume"}
                        fieldValue={resumeRequirementOptionsMapData.find(r => r.enumValue == incompleteJob!.resumeRequired)?.stringValue || resumeRequirementOptionsMapData[0].stringValue}
                        onEditClick={editApplicationMethod}
                    />
                    <JobReviewJobInfoBlock
                        jobInfoLabel={"Candidates contact you (e-mail)"}
                        fieldValue={incompleteJob!.contactEmail || ""}
                        onEditClick={editContactEmail}
                    />
                    <JobReviewJobInfoBlock
                        jobInfoLabel={"Candidates contact you (phone number)"}
                        fieldValue={incompleteJob!.contactPhoneNumber || ""}
                        onEditClick={editContactPhone}
                    />
                    <JobCreateNavigationButtons
                        backButtonOnClick={goToPreviousPage}
                        nextPageButtonClick={confirmJobCreation}
                        requestInProgress={requestInProgress}/>
                </form>
            </div>
        </div>
    )
}

export default ReviewJobComponent;
