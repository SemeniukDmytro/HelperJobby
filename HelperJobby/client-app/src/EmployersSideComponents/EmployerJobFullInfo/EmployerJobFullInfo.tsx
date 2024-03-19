import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './EmployerJobFullInfo.scss';
import {JobProperties} from "../../enums/utilityEnums/JobProperties";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import AddJobMissingInfoDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/AddJobMissingInfoDialog/AddJobMissingInfoDialog";
import EditJobTitleDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditJobTitleDialog/EditJobTitleDialog";
import EditNumberOfOpeningsDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditNumberOfOpeningsDialog/EditNumberOfOpeningsDialog";
import EditLanguageAndCountryDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditLanguageAndCountryDialog/EditLanguageAndCountryDialog";
import EditJobLocationDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditJobLocationDialog/EditJobLocationDialog";
import EditJobTypeDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditJobTypeDialog/EditJobTypeDialog";
import EditScheduleDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditScheduleDialog/EditScheduleDialog";
import EditJobSalaryDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditJobSalaryDialog/EditJobSalaryDialog";
import EditBenefitsDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditBenefitsDialog/EditBenefitsDialog";
import EditDescriptionDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditDescriptionDialog/EditDescriptionDialog";
import EditApplicationMethodDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditApplicationMethodDialog/EditApplicationMethodDialog";
import EditResumeRequirementsDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditResumeRequirementsDialog/EditResumeRequirementsDialog";
import EditContactEmailDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditContactEmailDialog/EditContactEmailDialog";
import EditContactPhoneDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/EditContactPhoneDialog/EditContactPhoneDialog";
import JobPreviewDialog
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/JobPreviewDialog/JobPreviewDialog";
import PageTitleWithImage from "../PageTitleWithImage/PageTitleWithImage";
import SvgReview from "../../Components/Icons/Review";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeftLong,
    faArrowRightLong,
    faCircleExclamation,
    faEye,
    faPlus,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import JobReviewJobInfoBlock
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/JobReviewJobInfoBlock/JobReviewJobInfoBlock";
import MultipleRowsReviewBlock
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/MultipleRowsReviewBlock/MultipleRowsReviewBlock";
import {
    benefitsEnumToStringMap,
    jobTypesEnumToStringMap,
    schedulesEnumToStringMap
} from "../../utils/convertLogic/enumToStringConverter";
import {formatJobSalaryDisplay} from "../../utils/convertLogic/formatJobSalaryDisplay";
import {resumeRequirementOptionsMapData} from "../../AppConstData/ResumeRequirements";
import ProvideRequiredDataLink
    from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/PageComponents/ProvideRequiredDataLink/ProvideRequiredDataLink";
import WhiteLoadingSpinner from "../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";
import {IncompleteJobDTO} from "../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {checkIfRequiredJobInfoMissing} from "../../utils/validationLogic/checkIfRequiredJobInfoMissing";

interface EmployerJobFullInfoProps {
    job: JobDTO | IncompleteJobDTO;
    initialLoading: boolean;
    setInitialLoading: Dispatch<SetStateAction<boolean>>;
    requestInProgress: boolean;
    onBackButtonClick: () => void;
    onConfirmButtonClick: () => void;
    backButtonLabel: string;
    confirmButtonLabel: string;
}

const EmployerJobFullInfo: FC<EmployerJobFullInfoProps> = ({
                                                               job,
                                                               onBackButtonClick,
                                                               onConfirmButtonClick,
                                                               requestInProgress,
                                                               initialLoading,
                                                               setInitialLoading,
                                                               backButtonLabel,
                                                               confirmButtonLabel
                                                           }) => {
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
    const [showEditResumeRequirementsDialog, setShowEditResumeRequirementsDialog] = useState(false);
    const [showEditContactEmailDialog, setShowEditContactEmailDialog] = useState(false);
    const [showEditContactPhoneDialog, setShowEditContactPhoneDialog] = useState(false);
    const [isHighlightedFooter, setIsHighlightedFooter] = useState(true);
    const [requiredInfoMissing, setRequiredInfoMissing] = useState(false);
    const [additionalInfoIsMissing, setAdditionalInfoIsMissing] = useState(false);
    const [missingJobProperties, setMissingJobProperties] = useState<JobProperties[]>([]);
    const [showAddMissingInfoDialog, setShowAddMissingInfoDialog] = useState(false);
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
            setIsHighlightedFooter(!atBottom);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        if (job) {
            checkIfJobInfoIsMissing();
            setInitialLoading(false);
        }
    }, [job, showAddMissingInfoDialog]);


    async function confirmButtonClick() {
        let isRequiredInfoMissing = checkIfRequiredJobInfoMissing(job!, setMissingJobProperties);
        if (isRequiredInfoMissing) {
            setRequiredInfoMissing(true);
            return;
        }
        await onConfirmButtonClick();
    }


    function checkIfJobInfoIsMissing() {
        if (showAddMissingInfoDialog) {
            return;
        }
        setMissingJobProperties([]);
        setRequiredInfoMissing(false);
        setRequiredInfoMissing(checkIfRequiredJobInfoMissing(job, setMissingJobProperties));
        checkIfAdditionalInfoIsMissing();
    }

    function checkIfAdditionalInfoIsMissing() {
        let tempMissingProperties: JobProperties[] = [];
        setAdditionalInfoIsMissing(false);
        if (!job?.salary) {
            tempMissingProperties.push(JobProperties.jobSalary);
            setAdditionalInfoIsMissing(true);
        }
        if (!job?.schedule || job.schedule.length == 0) {
            tempMissingProperties.push(JobProperties.schedule);
            setAdditionalInfoIsMissing(true);
        }
        if (!job?.benefits || job.benefits.length == 0) {
            tempMissingProperties.push(JobProperties.benefits);
            setAdditionalInfoIsMissing(true);
        }
        setMissingJobProperties(prev => [...prev, ...tempMissingProperties]);
    }

    return (
        initialLoading ? <LoadingPage/> :
            <>
                <AddJobMissingInfoDialog
                    showDialog={showAddMissingInfoDialog}
                    setShowDialog={setShowAddMissingInfoDialog}
                    missingJobProperties={missingJobProperties}
                />
                <EditJobTitleDialog showDialog={showEditJobTitleDialog}
                                    setShowDialog={setShowEditJobTitleDialog}/>
                <EditNumberOfOpeningsDialog showDialog={showEditNumberOfOpeningsDialog}
                                            setShowDialog={setShowEditNumberOfOpeningsDialog}/>
                <EditLanguageAndCountryDialog showDialog={showEditLanguageAndCountryDialog}
                                              setShowDialog={setShowEditLanguageAndCountryDialog}/>
                <EditJobLocationDialog showDialog={showEditLocationDialog}
                                       setShowDialog={setShowEditLocationDialog}/>
                <EditJobTypeDialog showDialog={showEditJobTypeDialog}
                                   setShowDialog={setShowEditJobTypeDialog}/>
                <EditScheduleDialog showDialog={showEditScheduleDialog}
                                    setShowDialog={setShowEditScheduleDialog}/>
                <EditJobSalaryDialog showDialog={showEditSalaryDialog}
                                     setShowDialog={setShowEditSalaryDialog}/>
                <EditBenefitsDialog showDialog={showEditBenefitsDialog}
                                    setShowDialog={setShowEditBenefitsDialog}/>
                <EditDescriptionDialog showDialog={showEditJobDescriptionDialog}
                                       setShowDialog={setShowEditJobDescriptionDialog}/>
                <EditApplicationMethodDialog showDialog={showEditApplicationMethodDialog}
                                             setShowDialog={setShowEditApplicationMethodDialog}/>
                <EditResumeRequirementsDialog showDialog={showEditResumeRequirementsDialog}
                                              setShowDialog={setShowEditResumeRequirementsDialog}/>
                <EditContactEmailDialog showDialog={showEditContactEmailDialog}
                                        setShowDialog={setShowEditContactEmailDialog}/>
                <EditContactPhoneDialog showDialog={showEditContactPhoneDialog}
                                        setShowDialog={setShowEditContactPhoneDialog}/>
                <JobPreviewDialog showDialog={showPreviewDialog}
                                  setShowDialog={setShowPreviewDialog}/>
                <div className={"employers-centralized-page-layout"}>
                    <PageTitleWithImage imageElement={<SvgReview/>} title={"Review"}/>
                    <div className={'emp-form-fb'}>
                        <form className={"emp-form"}>
                            {(requiredInfoMissing || additionalInfoIsMissing) &&
                                <div className={"info-notify-container orange-notify-container"}>
                                    <div className={"horizontal-title mt05rem mb05rem"}>
                                        <div className={"warning-pop-up-icon mr1rem"}>
                                            <FontAwesomeIcon icon={faTriangleExclamation}/>
                                        </div>
                                        <div className={"ntf-msg-with-ttl-container"}>
                                            <div className={"semi-dark-small-text bold-text"}>
                                                Job post has missing information
                                            </div>
                                            <div className={"semi-dark-small-text"}>
                                                To improve this post, add information that’s important to people
                                                applying.
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"bold-navigation-link"}
                                         onClick={() => setShowAddMissingInfoDialog(true)}>
                                        <FontAwesomeIcon className={"svg1rem icon-right-margin"} icon={faPlus}/>
                                        <span>Add info</span>
                                    </div>
                                </div>
                            }
                            <div className={"jr-jd-container"}>
                                <span className={"small-title mb1rem mt1rem"}>Job details</span>
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Job title"}
                                    fieldValue={job.jobTitle}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditJobTitleDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Number of openings"}
                                    fieldValue={job.numberOfOpenings.toString()}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditNumberOfOpeningsDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Country and language"}
                                    fieldValue={`${job.locationCountry} ${job!.language}`}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditLanguageAndCountryDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Location"}
                                    fieldValue={job.location}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditLocationDialog(true)}
                                />
                                <MultipleRowsReviewBlock
                                    fieldLabel={"Job type"}
                                    onEditClick={() => setShowEditJobTypeDialog(true)}
                                    isFieldRequired={true}
                                    childCount={job?.jobType?.length || 0}
                                >
                                    {(job?.jobType && job.jobType.length != 0) ?
                                        (job.jobType.map((jt, index) => (
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
                                    isFieldRequired={false}
                                    childCount={job?.schedule?.length || 0}
                                >
                                    {(job?.schedule && job.schedule.length != 0) ?
                                        (job.schedule.map((s, index) => (
                                            <div key={index}>{schedulesEnumToStringMap(s)}</div>
                                        )))
                                        :
                                        (<>
                                        </>)
                                    }
                                </MultipleRowsReviewBlock>
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Pay"}
                                    fieldValue={formatJobSalaryDisplay(job)}
                                    onEditClick={() => setShowEditSalaryDialog(true)}
                                    isFieldRequired={false}
                                />
                                <MultipleRowsReviewBlock
                                    fieldLabel={"Benefits"}
                                    onEditClick={() => setShowEditBenefitsDialog(true)}
                                    isFieldRequired={false}
                                    childCount={job?.benefits?.length || 0}
                                >
                                    {(job?.benefits && job.benefits.length != 0) ?
                                        (job.benefits.map((b, index) => (
                                            <div key={index}>{benefitsEnumToStringMap(b)}</div>
                                        )))
                                        :
                                        (<>
                                        </>)
                                    }
                                </MultipleRowsReviewBlock>
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Job description"}
                                    fieldValue={job.description || ""}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditJobDescriptionDialog(true)}
                                />
                            </div>

                            <div className={"content-separation-line mt2rem mb15rem"}></div>
                            <span className={"small-title mb1rem mt1rem"}>Settings</span>
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Application method"}
                                fieldValue={`Email ${job?.contactPhoneNumber ? "and phone number" : ""}`}
                                isFieldRequired={true}
                                onEditClick={() => setShowEditApplicationMethodDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Require resume"}
                                isFieldRequired={false}
                                fieldValue={resumeRequirementOptionsMapData.find(r => r.enumValue == job!.resumeRequired)?.stringValue || resumeRequirementOptionsMapData[0].stringValue}
                                onEditClick={() => setShowEditResumeRequirementsDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Candidates contact you (e-mail)"}
                                isFieldRequired={true}
                                fieldValue={job.contactEmail || ""}
                                onEditClick={() => setShowEditContactEmailDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                isFieldRequired={false}
                                jobInfoLabel={"Candidates contact you (phone number)"}
                                fieldValue={job.contactPhoneNumber || "No"}
                                onEditClick={() => setShowEditContactPhoneDialog(true)}
                            />
                        </form>
                        {requiredInfoMissing &&
                            <div className={"info-notify-container red-notify-container mt1rem"}>
                                <div className={"horizontal-title mt05rem mb05rem"}>
                                    <div className={"message-pop-up-icon mr1rem"}>
                                        <FontAwesomeIcon icon={faCircleExclamation}/>
                                    </div>
                                    <div className={"ntf-msg-with-ttl-container"}>
                                        <div className={"semi-dark-small-text bold-text"}>
                                            There are items above that need your attention to continue.
                                        </div>
                                        <div className={"flex-column"}>
                                            <div className={"mb05rem"}></div>
                                            {!job?.jobTitle &&
                                                <ProvideRequiredDataLink linkLabel={"Job title"}
                                                                         setShowEditDataWindow={setShowEditJobTitleDialog}/>}
                                            {!job?.description &&
                                                <ProvideRequiredDataLink linkLabel={"Job description"}
                                                                         setShowEditDataWindow={setShowEditJobDescriptionDialog}/>}
                                            {!job?.numberOfOpenings &&
                                                <ProvideRequiredDataLink linkLabel={"Number of people needed"}
                                                                         setShowEditDataWindow={setShowEditNumberOfOpeningsDialog}/>}

                                            {!job?.location &&
                                                <ProvideRequiredDataLink linkLabel={"Location"}
                                                                         setShowEditDataWindow={setShowEditLocationDialog}/>}

                                            {(!job?.jobType || job.jobType.length === 0) &&
                                                <ProvideRequiredDataLink linkLabel={"Job type"}
                                                                         setShowEditDataWindow={setShowEditJobTypeDialog}/>}

                                            {!job?.contactEmail &&
                                                <ProvideRequiredDataLink linkLabel={"Application method"}
                                                                         setShowEditDataWindow={setShowEditApplicationMethodDialog}/>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={`${isHighlightedFooter ? "rj-highlighted-footer" : "default-footer"}`}>
                    <div className={"rj-footer-content-fb"}>
                        <div className={"rj-footer-disclaimer mb1rem semi-dark-default-text"}>
                            <span>By selecting <b>Confirm</b>, you agree that this job post reflects your requirements, and agree 
                                it will be posted and applications will be processed.</span>
                        </div>
                        <div className={"rj-footer-buttons"}>
                            <button className={"light-button-with-margin"} onClick={onBackButtonClick}>
                                <FontAwesomeIcon className={'svg1rem mr05rem'} icon={faArrowLeftLong}/>
                                <span>{backButtonLabel}</span>
                            </button>
                            <div className={"flex-row"}>
                                {(job?.description && job.jobTitle) &&
                                    <button className={"light-button-with-margin"}
                                            onClick={() => setShowPreviewDialog(true)}
                                            disabled={showPreviewDialog}>
                                        <span>Preview</span>
                                        <FontAwesomeIcon className={"ml05rem svg1rem"} icon={faEye}/>
                                    </button>
                                }
                                <button className={"blue-button min-7chr-arrow-btn-width"}
                                        disabled={requestInProgress}
                                        onClick={confirmButtonClick}
                                >
                                    {requestInProgress ? <WhiteLoadingSpinner/>
                                        :
                                        <>
                                            <span>{confirmButtonLabel}</span>
                                            <FontAwesomeIcon className={'svg1rem ml05rem'} icon={faArrowRightLong}/>
                                        </>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default EmployerJobFullInfo;
