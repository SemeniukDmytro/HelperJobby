import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import './JobPreviewDialog.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import useCurrentEmployerJob from "../../../../../hooks/useCurrentEmployerJob";
import JobPreview from "../../../../../Components/Icons/JobPreview";
import {useEmployer} from "../../../../../hooks/useEmployer";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {
    benefitsEnumToStringMap,
    jobLocationTypesEnumToStringMap,
    jobTypesEnumToStringMap, schedulesEnumToStringMap
} from "../../../../../utils/convertLogic/enumToStringConverter";
import {JobLocationTypes} from "../../../../../enums/modelDataEnums/JobLocationTypes";
import {formatJobSalaryDisplay} from "../../../../../utils/convertLogic/formatJobSalaryDisplay";

interface JobPreviewDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

const JobPreviewDialog: FC<JobPreviewDialogProps> = ({
                                                         showDialog,
                                                         setShowDialog
                                                     }) => {
    const {currentJob} = useCurrentEmployerJob();
    const {employer} = useEmployer();

    function closeDialog() {
        setShowDialog(false);
    }

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


    return (
        !showDialog ? null :
            <div className={"dialog-window"}>
                <div className={"dialog-content-container job-post-dialog"}>
                    <div className={"dialog-header-box"}>
                        <div className={'pr-j-dialog-header-content flex-row ai-center'}>
                            <JobPreview/>
                            <div className={"flex-column"}>
                                <span
                                    className={"semi-dark-default-text bold-text"}>This is a preview of what people may see</span>
                                <span className={"semi-dark-default-text"}>Your job post may look slightly different when it goes live.</span>
                            </div>
                        </div>
                        <div style={{alignSelf: "flex-start"}}>
                            <button className={"small-interaction-button"} onClick={closeDialog}>
                                <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                            </button>
                        </div>
                    </div>
                    <div className={"content-separation-line"}/>
                    <div className={"dialog-main-content"}>
                        <div className={"j-pr-content-container"}>
                            <div className={"j-pr-header-container flex-column"}>
                                <span className={"small-title mb0"}>{currentJob?.jobTitle}</span>
                                <span
                                    className={"grey-small-text mb05rem"}>{employer?.organization.name} - {currentJob?.location}</span>
                                <div className={"flex-row"}>
                                    <button className={"blue-button mr1rem"}
                                            disabled={true}
                                    >
                                        Apply now
                                    </button>
                                    <button className={"light-neutral-button-with-icon"}
                                            disabled={true}>
                                        <FontAwesomeIcon className={"svg1rem"} icon={faHeart}/>
                                    </button>
                                </div>
                            </div>
                            <div className={"content-separation-line"}/>
                            <div className={"j-pr-full-info-container"}>
                                <span className={"light-dark-default-text flex-column"}>
                                    <span className={"mb1rem"}>{currentJob?.description}</span>
                                    {(currentJob?.jobType && currentJob.jobType.length !== 0) &&
                                        <div className={"flex-row mb1rem"}>
                                            <span>Job type:&nbsp;</span>
                                            {
                                                currentJob.jobType.map((jt, index) => (
                                                    <>
                                                        <span key={index}>{jobTypesEnumToStringMap(jt)}</span>
                                                        {index != currentJob.jobType!.length - 1 &&
                                                            <span>,&nbsp;</span>}
                                                    </>
                                                ))
                                            }
                                        </div>
                                    }
                                    {currentJob?.salary &&
                                        <div className={"flex-row mb1rem"}>
                                            <span>Salary:&nbsp;</span>
                                            <span>{formatJobSalaryDisplay(currentJob)}</span>
                                        </div>
                                    }
                                    {(currentJob?.schedule && currentJob.schedule.length !== 0) &&
                                        <>
                                            <span className={"ml0"}>Schedule:</span>
                                            <ul className={"j-pr-features-list"}>
                                                {
                                                    currentJob.schedule.map((sch, index) => (
                                                        <li key={index}>{schedulesEnumToStringMap(sch)}</li>
                                                    ))
                                                }
                                            </ul>
                                        </>
                                    }
                                    {(currentJob?.benefits && currentJob.benefits.length !== 0) &&
                                        <>
                                            <span className={"ml0"}>Benefits:</span>
                                            <ul className={"j-pr-features-list"}>
                                                {
                                                    currentJob.benefits.map((b, index) => (
                                                        <li key={index}>{benefitsEnumToStringMap(b)}</li>
                                                    ))
                                                }
                                            </ul>
                                        </>
                                    }
                                    <span
                                        className={"mb1rem"}>Work Location : {jobLocationTypesEnumToStringMap(currentJob?.jobLocationType || JobLocationTypes.InPerson)}</span>
                                    
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={"content-separation-line"}/>
                    <div className={"dialog-buttons jc-center ai-center"}>
                        <button className={"light-button-with-margin"} onClick={closeDialog}>
                            Close dialog
                        </button>
                    </div>
                </div>
                <div className={"background-overlay"} onClick={closeDialog}>

                </div>
            </div>
    )
}

export default JobPreviewDialog;
