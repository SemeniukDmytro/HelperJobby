import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditScheduleDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {schedulesStringValues} from "../../../../../AppConstData/JobEnumsToStringsArrays";
import JobFeature from "../../../../../EmployersSideComponents/JobFeature/JobFeature";
import {scheduleStringToEnumMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {addSchedule} from "../../../../../utils/manageJobFeatureSelect";
import {handleJobFeaturesListAppearance} from "../../../../../utils/handleJobFeaturesListHeight";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";

interface EditScheduleDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditScheduleDialog: FC<EditScheduleDialogProps> = ({
                                                             showDialog, 
                                                             setShowDialog
                                                         }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [selectedSchedule, setSelectedSchedule] = useState(incompleteJob?.schedule || []);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [scheduleBoxHeight, setScheduleBoxHeight] = useState("78px");
    const scheduleListRef = useRef<HTMLUListElement>(null);
    const [showFullScheduleList, setShowFullScheduleList] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setSelectedSchedule(incompleteJob?.schedule || []);
            setShowFullScheduleList(false);
            setScheduleBoxHeight("78px");
        }
    }, [showDialog]);

    async function editIncompleteJobSchedule() {
        try {
            setRequestInProgress(true)
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                schedule : selectedSchedule
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedIncompleteJob);
            setIncompleteJob(retrievedIncompleteJob);
            setShowDialog(false);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }


    return (
        <EditJobPostDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            requestInProgress={requestInProgress}
            executeJobEditing={editIncompleteJobSchedule}>
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
        </EditJobPostDialog>
    )
}

export default EditScheduleDialog;
