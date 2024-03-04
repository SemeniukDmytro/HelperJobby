import React, {FC, useEffect, useState} from 'react';
import './EmployerCompleteJobs.scss';
import SearchWithinEmployerJobs from "../SearchWithinEmployerJobs/SearchWithinEmployerJobs";
import ShortJobInfoForEmployer from "../ShortJobInfoForEmployer/ShortJobInfoForEmployer";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {useNavigate} from "react-router-dom";
import DialogWindow from "../../../../Components/DialogWindow/DialogWindow";
import {JobService} from "../../../../services/jobService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";

interface EmployerCompleteJobsProps {
}

const EmployerCompleteJobs: FC<EmployerCompleteJobsProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [jobSearchResults, setJobSearchResults] = useState<JobDTO[]>([]);
    const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
    const [filteringInProcess, setFilteringInProcess] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showDeleteRangeDialog, setShowDeleteRangeDialog] = useState(false);
    const [deleteDialogTitle, setDeleteDialogTitle] = useState("");
    const [deleteDialogMainText, setDeleteDialogMainText] = useState("");
    const navigate = useNavigate();
    const jobService = new JobService();
    const [jobInDialog, setJobInDialog] = useState<JobDTO>();
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        if (employer?.jobs) {
            setJobSearchResults(employer.jobs)
        }
    }, [employer?.jobs]);

    function toggleSelectAllJobs() {
        if (employer && employer.jobs) {
            const allJobIds = employer.jobs.map(job => job.id);
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
        navigate(`${EmployerPagesPaths.EDIT_JOB}/${selectedJobIds[0]}`);
    }
    
    function handleDeleteSingleJobClick(job : JobDTO){
        setShowDeleteDialog(true);
        setDeleteDialogTitle("Delete your job?");
        setDeleteDialogMainText(`Are you sure you want to delete your ${job.jobTitle} in ${job.location} job post?`)
        setJobInDialog(job);
    }
    
    function handleDeleteJobRangeClick() {
        setShowDeleteRangeDialog(true);
        setDeleteDialogTitle("Delete selected jobs?");
        setDeleteDialogMainText(`Are you sure you want to delete your selected job posts?`)
    }
    
   async function deleteSingleJob(jobId : number) {
        try {
            setRequestInProgress(true);
            await jobService.deleteJob(jobId);
            setEmployer(prev => {
                return  prev && {
                    ...prev,
                    jobs : prev.jobs.filter(j => j.id != jobId)
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
    
    async function deleteJobRange(){
        try {
            setRequestInProgress(true);
            await jobService.deleteJobRange(selectedJobIds);
            setEmployer(prev => {
                return  prev && {
                    ...prev,
                    jobs : prev.jobs.filter(j => !selectedJobIds.includes(j.id))
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
                          secondButtonOnClick={() => deleteSingleJob(jobInDialog!.id)}
                          requestInProgress={requestInProgress}
            />
            <DialogWindow showDialog={showDeleteRangeDialog}
                          setShowDialog={setShowDeleteRangeDialog}
                          titleText={deleteDialogTitle}
                          mainText={deleteDialogMainText}
                          firstButtonText={"No"}
                          secondButtonText={"Yes, delete them"}
                          positiveDialog={true}
                          secondButtonOnClick={() => deleteJobRange()}
                          requestInProgress={requestInProgress}
            />
            
            {selectedJobIds.length !== 0 ?
                (
                    <div className={"emp-row-cont-1pad ai-center mb1rem"}>
                        <div className={"flex-row"}>
                            <div className={"checkbox-container"}>
                                <input className={"select-all-checkbox"} type={"checkbox"}
                                       checked={employer?.jobs.length == selectedJobIds.length}
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
                                    onClick={() => handleDeleteSingleJobClick(employer!.jobs.find(j => j.id == selectedJobIds[0])!)}>
                                    Delete
                                </button>
                            </div>
                        :
                            <div>
                                <button className={"red-button"} onClick={handleDeleteJobRangeClick}>
                                    Delete selected
                                </button>
                            </div>
                        }
                    </div>
                )
                :
                (
                    <SearchWithinEmployerJobs jobSearchResults={jobSearchResults}
                                              filteringInProgress={filteringInProcess}
                                              setJobSearchResults={setJobSearchResults}
                                              setFilteringInProcess={setFilteringInProcess}/>
                )
            }
            {!filteringInProcess ?
                jobSearchResults.map((job) => (
                    <ShortJobInfoForEmployer job={job}
                                             selectedJobIds={selectedJobIds}
                                             setSelectedJobIds={setSelectedJobIds}
                                             isAllSelected={selectedJobIds.length === employer!.jobs.length}
                                             onDeleteClick={() => handleDeleteSingleJobClick(job)}
                                             key={job.id}
                    />
                ))
                :
                <LoadingPage/>
            }
        </>
    )
}

export default EmployerCompleteJobs;
