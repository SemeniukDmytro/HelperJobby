import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './AddJobMissingInfoDialog.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faArrowRightLong, faCircle, faXmark} from "@fortawesome/free-solid-svg-icons";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {JobProperties} from "../../../../../enums/utilityEnums/JobProperties";
import ChangeJobBenefitsDialogContent
    from "../../../SharedComponents/ChangeJobBenefitsDialogContent/ChangeJobBenefitsDialogContent";
import ChangeJobDescriptionDialogContent
    from "../../../SharedComponents/ChangeJobDescriptionDialogContent/ChangeJobDescriptionDialogContent";
import ChangeJobTitleDialogContent
    from "../../../SharedComponents/ChangeJobTitleDialogContent/ChangeJobTitleDialogContent";
import ChangeJobTypeDialogContent
    from "../../../SharedComponents/ChangeJobTypeDialogContent/ChangeJobTypeDialogContent";
import ChangeJobApplicationMethodDialogContent
    from "../../../SharedComponents/ChangeJobApplicationMethodDialogContent/ChangeJobApplicationMethodDialogContent";
import ChangeJobNumberOfOpeningsDialogContent
    from "../../../SharedComponents/ChangeJobNumberOfOpeningsDialogContent/ChangeJobNumberOfOpeningsDialogContent";
import ChangeJobLocationDialogContent
    from "../../../SharedComponents/ChangeJobLocationDialogContent/ChangeJobLocationDialogContent";
import ChangeJobSalaryDialogContent
    from "../../../SharedComponents/ChangeJobSalaryDialogContent/ChangeJobSalaryDialogContent";
import ChangeJobScheduleDialogContent
    from "../../../SharedComponents/ChangeJobScheduleDialogContent/ChangeJobScheduleDialogContent";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";

interface AddJobMissingInfoDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    missingJobProperties: JobProperties[];
}

const AddJobMissingInfoDialog: FC<AddJobMissingInfoDialogProps> = ({
                                                                       showDialog,
                                                                       setShowDialog,
                                                                       missingJobProperties
                                                                   }) => {
    const [currentPropertyDialog, setCurrentPropertyDialog] = useState(missingJobProperties[0]);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [editFunction, setEditFunction] = useState<() => void>(async () => {
    });
    const [showCurrentDialogContent, setShowCurrentDialogContent] = useState(true);

    useEffect(() => {
        if (!showCurrentDialogContent) {
            setCurrentStep(prevState => prevState + 1);
            setCurrentPropertyDialog(missingJobProperties[currentStep + 1]);
            setShowCurrentDialogContent(true);
        }
    }, [showCurrentDialogContent]);

    useEffect(() => {
        if (showDialog) {
            setCurrentStep(0);
            setCurrentPropertyDialog(missingJobProperties[0]);
        }
    }, [showDialog]);


    useEffect(() => {
        if (showDialog) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = '';
        }
    }, [showDialog]);

    function closeDialog() {
        setShowDialog(false);
    }

    async function proceedToNextForm() {
        try {
            editFunction();
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            if (currentStep == missingJobProperties.length - 1){
                setShowDialog(false);
            }
        }
    }

    function backToPreviousForm() {
        setCurrentStep(prevState => prevState - 1);
        setCurrentPropertyDialog(missingJobProperties[currentStep - 1]);
    }

    return (
        !showDialog ? null :
            <div className={"dialog-window"}>
                <div className={"dialog-content-container job-post-dialog"}>
                    <div className={"dialog-header-box"}>
                        <span className={"bold-text"}>Edit the job post</span>
                        <button className={"small-interaction-button"} onClick={closeDialog}>
                            <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                        </button>
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-main-content"}>
                        {currentPropertyDialog == JobProperties.jobTitle &&
                            <ChangeJobTitleDialogContent
                                showDialog={currentPropertyDialog === JobProperties.jobTitle}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />
                        }
                        {currentPropertyDialog == JobProperties.jobType &&
                            <ChangeJobTypeDialogContent
                                showDialog={currentPropertyDialog === JobProperties.jobType}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />}
                        {currentPropertyDialog == JobProperties.jobDescription &&
                            <ChangeJobDescriptionDialogContent
                                showDialog={currentPropertyDialog === JobProperties.jobDescription}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />
                        }
                        {currentPropertyDialog == JobProperties.contactEmail &&
                            <ChangeJobApplicationMethodDialogContent
                                showDialog={currentPropertyDialog === JobProperties.contactEmail}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />}
                        {currentPropertyDialog == JobProperties.numberOfOpenings &&
                            <ChangeJobNumberOfOpeningsDialogContent
                                showDialog={currentPropertyDialog === JobProperties.numberOfOpenings}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />}
                        {currentPropertyDialog == JobProperties.jobLocation &&
                            <ChangeJobLocationDialogContent
                                showDialog={currentPropertyDialog === JobProperties.jobLocation}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />}
                        {currentPropertyDialog == JobProperties.jobSalary &&
                            <ChangeJobSalaryDialogContent
                                showDialog={currentPropertyDialog === JobProperties.jobSalary}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />}
                        {currentPropertyDialog == JobProperties.schedule &&
                            <ChangeJobScheduleDialogContent
                                showDialog={currentPropertyDialog === JobProperties.schedule}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                                setShowDialog={setShowCurrentDialogContent}
                            />}
                        {currentPropertyDialog == JobProperties.benefits &&
                            <ChangeJobBenefitsDialogContent
                                showDialog={currentPropertyDialog === JobProperties.benefits}
                                setRequestInProgress={setRequestInProgress}
                                setEditFunction={setEditFunction}
                            />
                        }
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"add-m-inf-footer flex-row"}>
                        <div className={"add-m-inf-footer-block"}>
                            {currentStep != 0 &&
                                <button className={"light-button-with-margin"}
                                        onClick={backToPreviousForm}
                                >
                                    <FontAwesomeIcon className={'svg1rem mr05rem'} icon={faArrowLeftLong}/>
                                    <span>Back</span>
                                </button>}
                        </div>
                        <div className={"add-m-inf-footer-block jc-center"}>
                            {missingJobProperties.map((property, index) => (
                                <FontAwesomeIcon
                                    key={index}
                                    className={`page-step-indicator mr075rem
                                     ${property == currentPropertyDialog ? "current-page-step-indicator" : ""}`}
                                    icon={faCircle}
                                />
                            ))}
                        </div>
                        <div className={"add-m-inf-footer-block jc-end"}>
                            {currentStep != missingJobProperties.length - 1 ?
                                <button className={"blue-button min-8chr-arrow-btn-width"}
                                        disabled={requestInProgress}
                                        onClick={proceedToNextForm}
                                >
                                    {requestInProgress ? <WhiteLoadingSpinner/>
                                        :
                                        <>
                                            <span>Continue</span>
                                            <FontAwesomeIcon className={'svg1rem ml05rem'} icon={faArrowRightLong}/>
                                        </>
                                    }
                                </button>
                                :
                                <button className={"blue-button min-save-button-size"}
                                        disabled={requestInProgress}
                                        onClick={proceedToNextForm}
                                >
                                    {requestInProgress ? <WhiteLoadingSpinner/>
                                        :
                                        <>
                                            <span>Done</span>
                                        </>
                                    }
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className={"background-overlay"} onClick={closeDialog}>

                </div>
            </div>
    )
}

export default AddJobMissingInfoDialog;
