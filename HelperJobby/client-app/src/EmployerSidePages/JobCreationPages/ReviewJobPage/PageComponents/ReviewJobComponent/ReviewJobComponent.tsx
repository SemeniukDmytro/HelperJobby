import React, {FC, useEffect, useState} from 'react';
import './ReviewJobComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import SvgReview from "../../../../../Components/Icons/Review";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {useNavigate, useParams} from "react-router-dom";
import {
    useJobLoaderForSettingCurrentIncompleteJob
} from "../../../../../hooks/useJobLoaderForSettingCurrentIncompleteJob";
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
import EditJobTitleDialog from "../EditJobTitleDialog/EditJobTitleDialog";
import EditNumberOfOpeningsDialog from "../EditNumberOfOpeningsDialog/EditNumberOfOpeningsDialog";
import EditLanguageAndCountryDialog from "../EditLanguageAndCountryDialog/EditLanguageAndCountryDialog";
import EditJobLocationDialog from "../EditJobLocationDialog/EditJobLocationDialog";
import employerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import EditJobTypeDialog from "../EditJobTypeDialog/EditJobTypeDialog";
import EditJobSalaryDialog from "../EditJobSalaryDialog/EditJobSalaryDialog";


interface ReviewJobComponentProps {}

const ReviewJobComponent: FC<ReviewJobComponentProps> = () => {
    const [jobPostMissingInformation, setJobPostMissingInfo] = useState(true);
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const {jobId} = useParams<{jobId : string}>();
    const {fetchJobAndSetJobCreation} =  useJobLoaderForSettingCurrentIncompleteJob(jobId ? parseInt(jobId) : 0, incompleteJob, setIncompleteJob);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [showEditJobTitleDialog, setShowEditJobTitleDialog] = useState(false);
    const [showEditNumberOfOpeningsDialog, setShowEditNumberOfOpeningsDialog] = useState(false);
    const [showEditLanguageAndCountryDialog, setShowEditLanguageAndCountryDialog] = useState(false);    
    const [showEditLocationDialog, setShowEditLocationDialog] = useState(false);
    const [showEditJobTypeDialog, setShowEditJobTypeDialog] = useState(false);
    const [showEditScheduleDialog, setShowEditScheduleDialog] = useState(false);
    const [showEditSalaryDialog, setShowEditSalaryDialog] = useState(false);
    const [showEditBenefitsDialog, setShowEditBenefitsDialog] = useState(false);
    const [showEditJobDescriptionDialog, setShowEditJobDescriptionDialog] = useState(false);
    const [showEditApplicationMethodDialog, setShowEditApplicationMethodDialog] = useState(false);
    const [showEditContactInfoDialog, setShowEditContactInfoDialog] = useState(false);
    
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

    function goToPreviousPage() {
        navigate(`${employerPagesPaths.DESCRIPTION_AND_APPLICATION_DETAILS}/${jobId}`);
    }

    function confirmJobCreation() {
        
    }

    return (
        loading ? <LoadingPage/> :
            <>
                <EditJobTitleDialog showEditJobTitleDialog={showEditJobTitleDialog}
                                    setShowEditJobTitleDialog={setShowEditJobTitleDialog}/>
                <EditNumberOfOpeningsDialog showDialog={showEditNumberOfOpeningsDialog}
                                            setShowDialog={setShowEditNumberOfOpeningsDialog}/>
                <EditLanguageAndCountryDialog showDialog={showEditLanguageAndCountryDialog}
                                              setShowDialog={setShowEditLanguageAndCountryDialog}/>
                <EditJobLocationDialog showDialog={showEditLocationDialog}
                                       setShowDialog={setShowEditLocationDialog}/>
                <EditJobTypeDialog showDialog={showEditJobTypeDialog}
                                   setShowDialog={setShowEditJobTypeDialog}/>
                <EditJobSalaryDialog showDialog={showEditSalaryDialog}
                                     setShowDialog={setShowEditSalaryDialog}/>
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
                                                To improve this post, add information that’s important to people
                                                applying.
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
                                    onEditClick={() => setShowEditJobTitleDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Number of openings"}
                                    fieldValue={incompleteJob!.numberOfOpenings.toString()}
                                    onEditClick={() => setShowEditNumberOfOpeningsDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Country and language"}
                                    fieldValue={`${incompleteJob!.locationCountry} ${incompleteJob!.language}`}
                                    onEditClick={() => setShowEditLanguageAndCountryDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Location"}
                                    fieldValue={incompleteJob!.location}
                                    onEditClick={() => setShowEditLocationDialog(true)}
                                />
                                <MultipleRowsReviewBlock
                                    fieldLabel={"Job type"}
                                    onEditClick={() => setShowEditJobTypeDialog(true)}
                                >
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
                                    onEditClick={() => setShowEditScheduleDialog(true)}
                                >
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
                                    onEditClick={() => setShowEditSalaryDialog(true)}
                                />
                                <MultipleRowsReviewBlock
                                    fieldLabel={"Benefits"}
                                    onEditClick={()=> setShowEditBenefitsDialog(true)}
                                >
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
                                    onEditClick={() => setShowEditJobDescriptionDialog(true)}
                                />
                            </div>

                            <div className={"content-separation-line mt2rem mb15rem"}></div>
                            <span className={"small-title mb1rem mt1rem"}>Settings</span>
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Application method"}
                                fieldValue={`Email ${incompleteJob?.contactPhoneNumber ? "and phone number" : ""}`}
                                onEditClick={() => setShowEditApplicationMethodDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Require resume"}
                                fieldValue={resumeRequirementOptionsMapData.find(r => r.enumValue == incompleteJob!.resumeRequired)?.stringValue || resumeRequirementOptionsMapData[0].stringValue}
                                onEditClick={() => setShowEditApplicationMethodDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Candidates contact you (e-mail)"}
                                fieldValue={incompleteJob!.contactEmail || ""}
                                onEditClick={() => setShowEditContactInfoDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Candidates contact you (phone number)"}
                                fieldValue={incompleteJob!.contactPhoneNumber || ""}
                                onEditClick={() => setShowEditContactInfoDialog(true)}
                            />
                            <JobCreateNavigationButtons
                                backButtonOnClick={goToPreviousPage}
                                nextPageButtonClick={confirmJobCreation}
                                requestInProgress={requestInProgress}
                            />
                        </form>
                    </div>
                </div>
        </>
    )
}

export default ReviewJobComponent;
