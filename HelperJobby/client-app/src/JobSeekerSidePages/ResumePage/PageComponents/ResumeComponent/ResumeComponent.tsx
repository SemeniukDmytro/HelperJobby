import React, {FC, useEffect, useRef, useState} from 'react';
import './ResumeComponent.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faEllipsisVertical, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import ResumeInfoComponent from "../../../../Components/ResumeInfoComponent/ResumeInfoComponent";
import {useNavigate, useSearchParams} from "react-router-dom";
import DialogWindow from "../../../../Components/DialogWindow/DialogWindow";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {ResumeService} from "../../../../services/resumeService";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";
import {useApplyResume} from "../../../../hooks/contextHooks/useApplyResume";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";

interface ResumeComponentProps {
}

const ResumeComponent: FC<ResumeComponentProps> = () => {
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [showDialogWindow, setShowDialogWindow] = useState(false);
    const [deleteProcess, setDeleteProcess] = useState(false);
    const moreOptionsRef = useRef<HTMLDivElement>(null);
    const moreOptionsButtonRef = useRef<HTMLButtonElement>(null);

    const resumeService = new ResumeService();
    const navigate = useNavigate();

    const dialogTitle = "Delete your HelperJobby Resume?";
    const dialogMainText = "This resume will no longer be available when you apply for jobs. This affects jobs you applied for previously.";
    const firstDialogButtonText = "Cancel";
    const secondDialogButtonText = "Delete";
    const isPositiveDialog = false;
    const [searchParams] = useSearchParams();
    const fromParam = searchParams.get("from");
    const jobIdParam = searchParams.get("jobId");
    const {jobId, setJobId} = useApplyResume();


    useEffect(() => {
        if (!jobId) {
            if (fromParam === "job-apply" && jobIdParam && !isNanAfterIntParse(jobIdParam)) {
                setJobId(parseInt(jobIdParam));
            }
        }

        if (!jobSeeker?.resume && ((!jobIdParam || isNanAfterIntParse(jobIdParam)) && !jobId)) {
            navigate("/my-profile");
        } else if (!jobSeeker?.resume && ((jobIdParam && !isNanAfterIntParse(jobIdParam)) || jobId)) {
            navigate(`/job-apply/${jobIdParam ? jobIdParam : jobId}/resume`);
        }
        const handleOutsideShowMoreOptionsClick = (event: MouseEvent) => {
            if (moreOptionsButtonRef.current && !moreOptionsButtonRef.current.contains(event.target as Node)) {
                setShowMoreOptions(false);
            }
        };
        document.addEventListener('click', handleOutsideShowMoreOptionsClick);
        return () => {
            document.removeEventListener('click', handleOutsideShowMoreOptionsClick);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (moreOptionsRef.current && moreOptionsButtonRef.current) {
                const moreOptionsRect = moreOptionsRef.current.getBoundingClientRect();
                const viewportWidth = window.innerWidth;

                if (moreOptionsRect.x + moreOptionsRect.width + 10 > viewportWidth) {
                    moreOptionsRef.current.style.left = 'auto';
                    moreOptionsRef.current.style.right = '0px';
                } else {
                    moreOptionsRef.current.style.right = 'auto';
                    moreOptionsRef.current.style.left = '0px';
                }
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [showMoreOptions]);

    function onBackButtonClick() {
        if (jobId) {
            navigate(`/job-apply/${jobId}/resume`);
            return;
        }
        navigate("/my-profile")
    }

    function handleMoreOptionsClick() {
        setShowMoreOptions(!showMoreOptions);
    }

    async function deleteResume() {
        try {
            setShowDialogWindow(false);
            setDeleteProcess(true);
            await resumeService.deleteResume(jobSeeker!.resume!.id);
            setJobSeeker((prev) => {
                return prev ? {...prev, resume: null} : null;
            })
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setDeleteProcess(false);
            if (jobId) {
                navigate(`/job-apply/${jobId}/resume`);
            } else {
                navigate("/my-profile")
            }
        }
    }

    return (
        <>
            <DialogWindow
                secondButtonOnClick={deleteResume}
                showDialog={showDialogWindow}
                setShowDialog={setShowDialogWindow}
                titleText={dialogTitle}
                mainText={dialogMainText}
                firstButtonText={firstDialogButtonText}
                secondButtonText={secondDialogButtonText}
                positiveDialog={isPositiveDialog}
                requestInProgress={deleteProcess}
            />
            {deleteProcess ?
                <LoadingPage/>
                :

                <div className={"page-with-centered-content-layout"}>
                    <div className={"resume-component-header"}>
                        <button className={"back-button"} onClick={onBackButtonClick}>
                            <FontAwesomeIcon className={"svg125rem"} icon={faArrowLeftLong}/>
                        </button>
                        <div className={"more-options-container"}>
                            <button
                                className={"small-interaction-button additional-button-size"}
                                onClick={handleMoreOptionsClick} ref={moreOptionsButtonRef}
                            >
                                <FontAwesomeIcon className={"svg125rem"} icon={faEllipsisVertical}/>
                            </button>
                            {showMoreOptions && <div className={"more-resume-options-bar"}>
                                <div className={"resume-options-container"} ref={moreOptionsRef}>
                                    <button
                                        className={"more-profile-option-button delete-button-color"}
                                        onClick={() => setShowDialogWindow(true)}
                                    >
                                        <FontAwesomeIcon
                                            className={"icon-right-margin svg125rem ml05rem"}
                                            icon={faTrashCan}
                                        />
                                        <span className={"additional-text-margin-for-big-icon"}>Delete</span>
                                    </button>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className={"form-layout"}>
                        <ResumeInfoComponent/>
                    </div>
                </div>
            }
        </>
    )
}

export default ResumeComponent;
