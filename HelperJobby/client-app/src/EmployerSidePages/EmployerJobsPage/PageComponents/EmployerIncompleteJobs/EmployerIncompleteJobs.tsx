import React, {FC, useEffect, useState} from 'react';
import './EmployerIncompleteJobs.scss';
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import SearchWithinEmployerIncompleteJobs
    from "../SearchWithinEmployerIncompleteJobs/SearchWithinEmployerIncompleteJobs";
import ShortIncompleteJobInfoForEmployer from "../ShortIncompleteJobInfoForEmployer/ShortIncompleteJobInfoForEmployer";
import DialogWindow from "../../../../Components/DialogWindow/DialogWindow";
import {useNavigate} from "react-router-dom";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";

interface EmployerIncompleteJobsProps {
}

const EmployerIncompleteJobs: FC<EmployerIncompleteJobsProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [jobSearchResults, setJobSearchResults] = useState<IncompleteJobDTO[]>([]);
    const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
    const [filteringInProcess, setFilteringInProcess] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showDeleteRangeDialog, setShowDeleteRangeDialog] = useState(false);
    const [deleteDialogTitle, setDeleteDialogTitle] = useState("");
    const [deleteDialogMainText, setDeleteDialogMainText] = useState("");
    const navigate = useNavigate();
    const incompleteJobService = new IncompleteJobService();
    const [jobInDialog, setJobInDialog] = useState<IncompleteJobDTO>();
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        if (employer?.incompleteJobs) {
            setJobSearchResults(employer.incompleteJobs)
        }
    }, [employer?.jobs]);

    function toggleSelectAllJobs() {
        if (employer && employer.incompleteJobs) {
            const allJobIds = employer.incompleteJobs.map(job => job.id);
            const areAllJobsSelected = allJobIds.length === selectedJobIds.length;

            if (areAllJobsSelected) {
                setSelectedJobIds([]);
            } else {
                setSelectedJobIds(allJobIds);
            }
        }
    }

    function deselectAllJobs() {
        setSelectedJobIds([]);
    }

    function handleUpdateClick(){
        navigate(`${EmployerPagesPaths.REVIEW_JOB_PAGE}/${selectedJobIds[0]}`);
    }

    function handleDeleteSingleIncompleteJobClick(job : IncompleteJobDTO){
        setShowDeleteDialog(true);
        setDeleteDialogTitle("Delete your job draft?");
        setDeleteDialogMainText(`Are you sure you want to delete your ${job.jobTitle} in ${job.location} job post draft?`)
        setJobInDialog(job);
    }

    function handleDeleteIncompleteJobRangeClick() {
        setShowDeleteRangeDialog(true);
        setDeleteDialogTitle("Delete selected job draftss?");
        setDeleteDialogMainText(`Are you sure you want to delete your selected job post drafts?`)
    }

    async function deleteSingleIncompleteJob(jobId : number) {
        try {
            setRequestInProgress(true);
            await incompleteJobService.deleteIncompleteJob(jobId);
            setEmployer(prev => {
                return  prev && {
                    ...prev,
                    incompleteJobs: prev.incompleteJobs.filter(j => j.id != jobId)
                }
            })
            setJobSearchResults(prev => {
                return prev.filter(j => j.id != jobId)
            })
            setSelectedJobIds(prev => {
                return prev.filter(j => j != jobId)
            })
            setShowDeleteDialog(false);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }

    async function deleteIncompleteJobRange(){
        try {
            setRequestInProgress(true);
            await incompleteJobService.deleteIncompleteJobRange(selectedJobIds);
            setEmployer(prev => {
                return  prev && {
                    ...prev,
                    incompleteJobs : prev.incompleteJobs.filter(j => !selectedJobIds.includes(j.id))
                }
            })
            setJobSearchResults(prev => {
                return prev.filter(j => !selectedJobIds.includes(j.id));
            })
            setSelectedJobIds([]);
            setShowDeleteRangeDialog(false);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }

    return (
        <>
            <DialogWindow showDialog={showDeleteDialog}
                          setShowDialog={setShowDeleteDialog}
                          titleText={deleteDialogTitle}
                          mainText={deleteDialogMainText}
                          firstButtonText={"No"}
                          secondButtonText={"Yes, delete it"}
                          positiveDialog={true}
                          secondButtonOnClick={() => deleteSingleIncompleteJob(jobInDialog!.id)}
                          requestInProgress={requestInProgress}
            />
            <DialogWindow showDialog={showDeleteRangeDialog}
                          setShowDialog={setShowDeleteRangeDialog}
                          titleText={deleteDialogTitle}
                          mainText={deleteDialogMainText}
                          firstButtonText={"No"}
                          secondButtonText={"Yes, delete them"}
                          positiveDialog={true}
                          secondButtonOnClick={() => deleteIncompleteJobRange()}
                          requestInProgress={requestInProgress}
            />
            {selectedJobIds.length !== 0 ?
                (
                    <div className={"emp-row-cont-1pad ai-center mb1rem"}>
                            <div className={"flex-row"}>
                                <div className={"checkbox-container"}>
                                    <input className={"select-all-checkbox"} type={"checkbox"}
                                           checked={employer?.incompleteJobs.length == selectedJobIds.length}
                                           onChange={toggleSelectAllJobs}/>
                                </div>
                                <div className={"flex-row ai-center"}>
                                    <div className={"dark-small-text bold-text"}>
                                        {selectedJobIds.length} {selectedJobIds.length > 1 ? "jobs" : "job"} selected
                                        -
                                        <span onClick={deselectAllJobs}
                                              className={"bold-navigation-link"}>&nbsp;deselect all</span>
                                    </div>
                                </div>
                            </div>
                        {selectedJobIds.length == 1 ?
                            <div className={"flex-row"}>
                                <button className={"blue-button mr1rem"} onClick={handleUpdateClick}>
                                    Update
                                </button>
                                <button
                                    className={"red-button"}
                                    onClick={() => handleDeleteSingleIncompleteJobClick(employer!.incompleteJobs.find(j => j.id == selectedJobIds[0])!)}>
                                    Delete
                                </button>
                            </div>
                            :
                            <div>
                                <button className={"red-button"} onClick={handleDeleteIncompleteJobRangeClick}>
                                    Delete all
                                </button>
                            </div>
                        }
                    </div>
                )
                :
                (
                    <SearchWithinEmployerIncompleteJobs jobSearchResults={jobSearchResults}
                                                        filteringInProgress={filteringInProcess}
                                                        setJobSearchResults={setJobSearchResults}
                                                        setFilteringInProcess={setFilteringInProcess}/>
                )
            }
            {!filteringInProcess ?
                jobSearchResults.map((job, index) => (
                    <ShortIncompleteJobInfoForEmployer job={job}
                                                       selectedJobIds={selectedJobIds}
                                                       setSelectedJobIds={setSelectedJobIds}
                                                       isAllSelected={selectedJobIds.length === employer!.incompleteJobs.length}
                                                       onDeleteClick={() => handleDeleteSingleIncompleteJobClick(job)}
                                                       key={index}
                    />
                ))
                :
                <LoadingPage/>
            }
        </>
    )
}


export default EmployerIncompleteJobs;
