import React, {FC, useEffect, useState} from 'react';
import './ReviewJobComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import SvgReview from "../../../../../Components/Icons/Review";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeftLong,
    faArrowRightLong,
    faCircleExclamation,
    faPlus,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
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
import EditJobTitleDialog from "../EditJobTitleDialog/EditJobTitleDialog";
import EditNumberOfOpeningsDialog from "../EditNumberOfOpeningsDialog/EditNumberOfOpeningsDialog";
import EditLanguageAndCountryDialog from "../EditLanguageAndCountryDialog/EditLanguageAndCountryDialog";
import EditJobLocationDialog from "../EditJobLocationDialog/EditJobLocationDialog";
import employerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import EditJobTypeDialog from "../EditJobTypeDialog/EditJobTypeDialog";
import EditJobSalaryDialog from "../EditJobSalaryDialog/EditJobSalaryDialog";
import EditScheduleDialog from "../EditScheduleDialog/EditScheduleDialog";
import EditBenefitsDialog from "../EditBenefitsDialog/EditBenefitsDialog";
import EditDescriptionDialog from "../EditDescriptionDialog/EditDescriptionDialog";
import EditApplicationMethodDialog from "../EditApplicationMethodDialog/EditApplicationMethodDialog";
import EditResumeRequirementsDialog from "../EditResumeRequirementsDialog/EditResumeRequirementsDialog";
import EditContactEmailDialog from "../EditContactEmailDialog/EditContactEmailDialog";
import EditContactPhoneDialog from "../EditContactPhoneDialog/EditContactPhoneDialog";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import ProvideRequiredDataLink from "../../../../../Components/ProvideRequiredDataLink/ProvideRequiredDataLink";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {JobService} from "../../../../../services/jobService";
import {JobProperties} from "../../../../../enums/utilityEnums/JobProperties";
import AddJobMissingInfoDialog from "../AddJobMissingInfoDialog/AddJobMissingInfoDialog";


interface ReviewJobComponentProps {
}

const ReviewJobComponent: FC<ReviewJobComponentProps> = () => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const {jobId} = useParams<{ jobId: string }>();
    const {fetchJobAndSetJobCreation} = useJobLoaderForSettingCurrentIncompleteJob(jobId ? parseInt(jobId) : 0, incompleteJob, setIncompleteJob);
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
    const [showEditResumeRequirementsDialog, setShowEditResumeRequirementsDialog] = useState(false);
    const [showEditContactEmailDialog, setShowEditContactEmailDialog] = useState(false);
    const [showEditContactPhoneDialog, setShowEditContactPhoneDialog] = useState(false);
    const [isHighlightedFooter, setIsHighlightedFooter] = useState(true);
    const [requiredInfoMissing, setRequiredInfoMissing] = useState(false);
    const [additionalInfoIsMissing, setAdditionalInfoIsMissing] = useState(false);
    const [missingJobProperties, setMissingJobProperties] = useState<JobProperties[]>([]);
    const [showAddMissingInfoDialog, setShowAddMissingInfoDialog] = useState(false);
    const jobService = new JobService();

    useEffect(() => {
        const handleScroll = () => {
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
            setIsHighlightedFooter(!atBottom);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchInitialPageData()
    }, []);

    useEffect(() => {
        if (incompleteJob) {
            checkIfJobInfoIsMissing();
            setLoading(false);
        }
    }, [incompleteJob, showAddMissingInfoDialog]);
    
    async function fetchInitialPageData() {
        await fetchJobAndSetJobCreation();
    }

    function goToPreviousPage() {
        navigate(`${employerPagesPaths.DESCRIPTION_AND_APPLICATION_DETAILS}/${jobId}`);
    }

    async function confirmJobCreation() {
        checkIfRequiredInfoMissing();
        try {
            setRequestInProgress(true);
            await jobService.createJob(incompleteJob!.id);
            navigate(`${employerPagesPaths.JOB_POSTING}`)
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }
    
    
    
    function checkIfJobInfoIsMissing() {
        if (showAddMissingInfoDialog){
            return;
        }
        setMissingJobProperties([]);
        checkIfRequiredInfoMissing();
        checkIfAdditionalInfoIsMissing();
    }
    function checkIfRequiredInfoMissing(){
        let tempMissingProperties : JobProperties[] = [];
        setRequiredInfoMissing(false);
        if (!incompleteJob?.jobTitle){
            tempMissingProperties.push(JobProperties.jobTitle);
            setRequiredInfoMissing(true);
        }
        if (!incompleteJob?.jobType || incompleteJob.jobType.length == 0){
            tempMissingProperties.push(JobProperties.jobType);
            setRequiredInfoMissing(true);
        }
        if (!incompleteJob?.description){
            tempMissingProperties.push(JobProperties.jobDescription);
            setRequiredInfoMissing(true);
        }
        if (!incompleteJob?.contactEmail){
            tempMissingProperties.push(JobProperties.contactEmail);
            setRequiredInfoMissing(true);
        }
        if (!incompleteJob?.numberOfOpenings){
            tempMissingProperties.push(JobProperties.numberOfOpenings);
            setRequiredInfoMissing(true);
        }
        if (!incompleteJob?.jobLocationType){
            tempMissingProperties.push(JobProperties.jobLocation);
            setRequiredInfoMissing(true);
        }
        setMissingJobProperties(prev => [...prev, ...tempMissingProperties]);
    }
    function checkIfAdditionalInfoIsMissing(){
        let tempMissingProperties : JobProperties[] = [];
        setAdditionalInfoIsMissing(false);
        if (!incompleteJob?.salary){
            tempMissingProperties.push(JobProperties.jobSalary);
            setAdditionalInfoIsMissing(true);
        }
        if (!incompleteJob?.schedule || incompleteJob.schedule.length == 0){
            tempMissingProperties.push(JobProperties.schedule);
            setAdditionalInfoIsMissing(true);
        }
        if (!incompleteJob?.benefits || incompleteJob.benefits.length == 0){
            tempMissingProperties.push(JobProperties.benefits);
            setAdditionalInfoIsMissing(true);
        }
        setMissingJobProperties(prev => [...prev, ...tempMissingProperties]);
    }

    return (
        loading ? <LoadingPage/> :
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
                                            <div className={"dark-small-text bold-text"}>
                                                Job post has missing information
                                            </div>
                                            <div className={"dark-small-text"}>
                                                To improve this post, add information that’s important to people
                                                applying.
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"bold-navigation-link"} onClick={() => setShowAddMissingInfoDialog(true)}>
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
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditJobTitleDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Number of openings"}
                                    fieldValue={incompleteJob!.numberOfOpenings.toString()}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditNumberOfOpeningsDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Country and language"}
                                    fieldValue={`${incompleteJob!.locationCountry} ${incompleteJob!.language}`}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditLanguageAndCountryDialog(true)}
                                />
                                <JobReviewJobInfoBlock
                                    jobInfoLabel={"Location"}
                                    fieldValue={incompleteJob!.location}
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditLocationDialog(true)}
                                />
                                <MultipleRowsReviewBlock
                                    fieldLabel={"Job type"}
                                    onEditClick={() => setShowEditJobTypeDialog(true)}
                                    isFieldRequired={true}
                                    childCount={incompleteJob?.jobType?.length || 0}
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
                                    isFieldRequired={false}
                                    childCount={incompleteJob?.schedule?.length || 0}
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
                                    isFieldRequired={false}
                                />
                                <MultipleRowsReviewBlock
                                    fieldLabel={"Benefits"}
                                    onEditClick={() => setShowEditBenefitsDialog(true)}
                                    isFieldRequired={false}
                                    childCount={incompleteJob?.benefits?.length || 0}
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
                                    isFieldRequired={true}
                                    onEditClick={() => setShowEditJobDescriptionDialog(true)}
                                />
                            </div>

                            <div className={"content-separation-line mt2rem mb15rem"}></div>
                            <span className={"small-title mb1rem mt1rem"}>Settings</span>
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Application method"}
                                fieldValue={`Email ${incompleteJob?.contactPhoneNumber ? "and phone number" : ""}`}
                                isFieldRequired={true}
                                onEditClick={() => setShowEditApplicationMethodDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Require resume"}
                                isFieldRequired={false}
                                fieldValue={resumeRequirementOptionsMapData.find(r => r.enumValue == incompleteJob!.resumeRequired)?.stringValue || resumeRequirementOptionsMapData[0].stringValue}
                                onEditClick={() => setShowEditResumeRequirementsDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                jobInfoLabel={"Candidates contact you (e-mail)"}
                                isFieldRequired={true}
                                fieldValue={incompleteJob!.contactEmail || ""}
                                onEditClick={() => setShowEditContactEmailDialog(true)}
                            />
                            <JobReviewJobInfoBlock
                                isFieldRequired={false}
                                jobInfoLabel={"Candidates contact you (phone number)"}
                                fieldValue={incompleteJob!.contactPhoneNumber || "No"}
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
                                        <div className={"dark-small-text bold-text"}>
                                            There are items above that need your attention to continue.
                                        </div>
                                        <div className={"flex-column"}>
                                            <div className={"mb05rem"}></div>
                                            {!incompleteJob?.jobTitle &&
                                                <ProvideRequiredDataLink linkLabel={"Job title"}
                                                                         setShowEditDataWindow={setShowEditJobTitleDialog}/>}
                                            {!incompleteJob?.description &&
                                                <ProvideRequiredDataLink linkLabel={"Job description"}
                                                                         setShowEditDataWindow={setShowEditJobDescriptionDialog}/>}
                                            {!incompleteJob?.numberOfOpenings &&
                                                <ProvideRequiredDataLink linkLabel={"Number of people needed"}
                                                                         setShowEditDataWindow={setShowEditNumberOfOpeningsDialog}/>}

                                            {!incompleteJob?.location &&
                                                <ProvideRequiredDataLink linkLabel={"Location"}
                                                                         setShowEditDataWindow={setShowEditLocationDialog}/>}

                                            {(!incompleteJob?.jobType || incompleteJob.jobType.length === 0)  &&
                                                <ProvideRequiredDataLink linkLabel={"Job type"}
                                                                         setShowEditDataWindow={setShowEditJobTypeDialog}/>}

                                            {!incompleteJob?.contactEmail &&
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
                        <div className={"rj-footer-disclaimer mb1rem dark-default-text"}>
                            <span>By selecting <b>Confirm</b>, you agree that this job post reflects your requirements, and agree 
                                it will be posted and applications will be processed.</span>
                        </div>
                        <div className={"rj-footer-buttons"}>
                            <button className={"light-button-with-margin"} onClick={goToPreviousPage}>
                                <FontAwesomeIcon className={'svg1rem mr05rem'} icon={faArrowLeftLong}/>
                                <span>Back</span>
                            </button>
                            <button className={"blue-button min-7chr-arrow-btn-width"}
                                    disabled={requestInProgress}
                                    onClick={confirmJobCreation }
                            >
                                {requestInProgress ? <WhiteLoadingSpinner/>
                                    :
                                    <>
                                        <span>Confirm</span>
                                        <FontAwesomeIcon className={'svg1rem ml05rem'} icon={faArrowRightLong}/>
                                    </>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default ReviewJobComponent;
