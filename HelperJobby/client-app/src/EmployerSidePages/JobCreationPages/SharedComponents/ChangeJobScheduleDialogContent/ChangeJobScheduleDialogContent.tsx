import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobScheduleDialogContent.scss';
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {schedulesStringValues} from "../../../../AppConstData/JobEnumsToStringsArrays";
import JobFeature from "../../../../EmployersSideComponents/JobFeature/JobFeature";
import {scheduleStringToEnumMap} from "../../../../utils/convertLogic/enumToStringConverter";
import {addSchedule} from "../../../../utils/manageJobFeatureSelect";
import {handleJobFeaturesListAppearance} from "../../../../utils/handleJobFeaturesListHeight";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import {JobService} from "../../../../services/jobService";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";

interface ChangeJobScheduleDialogContentProps {
    showDialog: boolean;
    setShowDialog?: Dispatch<SetStateAction<boolean>>;
    setRequestInProgress: Dispatch<SetStateAction<boolean>>;
    setEditFunction: Dispatch<SetStateAction<() => void>>;
}

const ChangeJobScheduleDialogContent: FC<ChangeJobScheduleDialogContentProps> = ({
                                                                                     showDialog,
                                                                                     setRequestInProgress,
                                                                                     setEditFunction,
                                                                                     setShowDialog
                                                                                 }) => {

    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [selectedSchedule, setSelectedSchedule] = useState(currentJob?.schedule || []);
    const [scheduleBoxHeight, setScheduleBoxHeight] = useState("78px");
    const scheduleListRef = useRef<HTMLUListElement>(null);
    const [showFullScheduleList, setShowFullScheduleList] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();

    useEffect(() => {
        if (showDialog) {
            setSelectedSchedule(currentJob?.schedule || []);
            setShowFullScheduleList(false);
            setScheduleBoxHeight("78px");
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editIncompleteJobSchedule)
    }, [selectedSchedule]);

    async function editIncompleteJobSchedule() {
        try {
            setRequestInProgress(true)

            if (jobCreationState == JobCreationStates.incompleteJob) {
                const updatedIncompleteJob: UpdatedIncompleteJobDTO = {
                    ...currentJob,
                    schedule: selectedSchedule
                }
                const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
                setCurrentJob(retrievedIncompleteJob);
            } else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    schedule: selectedSchedule
                };
                const retrievedJob = await jobService.putJob(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            setShowDialog && setShowDialog(false);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    return (
        <>
            <div className={"mb025rem"}>
                <span className={"small-title"}>Schedule</span>
            </div>
            <div
                className={"job-features-fb"}
                style={{
                    height: scheduleBoxHeight
                }}
            >
                <ul
                    className={"job-features-list"}
                    ref={scheduleListRef}
                >
                    {schedulesStringValues.map((schedule, index) => (
                        <JobFeature
                            key={index}
                            featureName={schedule}
                            isSelected={selectedSchedule.includes(scheduleStringToEnumMap(schedule)!)}
                            onClick={() => addSchedule(schedule, selectedSchedule, setSelectedSchedule)}
                        />
                    ))}
                </ul>
            </div>
            <div className={"mt05rem"}>
                   <span className={"bold-navigation-link"}
                         onClick={() => handleJobFeaturesListAppearance(showFullScheduleList,
                             setShowFullScheduleList, setScheduleBoxHeight, scheduleListRef)}>
                        <span>{`${showFullScheduleList ? "Show less" : "Show more"}`}</span>
                       {showFullScheduleList ?
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronUp}/>
                           :
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronDown}/>
                       }
                    </span>
            </div>
        </>
    )
}

export default ChangeJobScheduleDialogContent;
