import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import './JobPostingComponent.scss';
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import PageTitleWithImage from "../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import PeopleInAnOffice from "../../../../Components/Icons/PeopleInAnOffice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRightLong, faBriefcase, faCircleExclamation,
    faLocationDot,
    faMagnifyingGlass,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {JobPostingMethods} from "../../../../enums/utilityEnums/JobPostingMethods";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import JobDraftShortInfo from "../JobDraftShortInfo/JobDraftShortInfo";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../services/incompleteJobService";

interface JobPostingComponentProps {
}

const JobPostingComponent: FC<JobPostingComponentProps> = () => {
    const [jobPostingMethod, setJobPostingMethod] = useState<JobPostingMethods>(JobPostingMethods.fromDrafts);
    const {employer, setEmployer} = useEmployer();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [jobDrafts, setJobDrafts] = useState<IncompleteJobDTO[]>([]);
    const [jobTitleSearch, setJobTitleSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const incompleteJobService = new IncompleteJobService();
    const [selectedJobDraftId, setSelectedJobDraftId] = useState<number | null>(null);
    const [invalidDraftSelected, setInvalidDraftSelected] = useState(false);

    useEffect(() => {
        if (!employer?.hasPostedFirstJob) {
            navigate(EmployerPagesPaths.ADD_JOB_BASICS)
        }
        loadPageInitialData()
    }, []);

    async function loadPageInitialData() {
        try {
            setLoading(true);
            if (employer?.incompleteJobs && employer?.incompleteJobs.length !== 0) {
                setJobDrafts(employer.incompleteJobs)
                return;
            }
            const employerIncompleteJobs = await incompleteJobService.getEmployerIncompleteJobTitles(employer!.id);
            setEmployer(prev => {
                return prev && {
                    ...prev,
                    incompleteJobs: employerIncompleteJobs
                }
            });
            setJobDrafts(employerIncompleteJobs);
        } catch (err) {
            logErrorInfo(err);
        } finally {
            setLoading(false);
        }
    }

    function handleFromDraftPostClick() {
        setJobPostingMethod(JobPostingMethods.fromDrafts);
        setInvalidDraftSelected(false);
    }

    function handleNewTemplateClick() {
        setJobPostingMethod(JobPostingMethods.newTemplate);
    }

    function handleCreateJobClick(e: FormEvent) {
        e.preventDefault();
        if (jobPostingMethod === JobPostingMethods.newTemplate) {
            navigate(EmployerPagesPaths.ADD_JOB_BASICS);
        } else if (selectedJobDraftId) {
            navigate(`${EmployerPagesPaths.REVIEW_JOB_PAGE}/${selectedJobDraftId}`);
        } else {
            setInvalidDraftSelected(true);
        }
    }

    function onJobTitleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setJobTitleSearch(e.target.value);
        const sortedJobDrafts = employer!.incompleteJobs.filter(jd => jd.jobTitle.toLowerCase().includes(e.target.value.toLowerCase())
            && jd.location.toLowerCase().includes(locationSearch.toLowerCase()));
        setJobDrafts(sortedJobDrafts);
    }

    function eraseJobTitle() {
        setJobTitleSearch("");
    }

    function eraseLocation() {
        setLocationSearch("");
    }

    function onJobLocationSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setLocationSearch(e.target.value);
        const sortedJobDrafts = employer!.incompleteJobs.filter(jd => jd.location.toLowerCase().includes(e.target.value.toLowerCase())
            && jd.jobTitle.toLowerCase().includes(jobTitleSearch.toLowerCase()));
        setJobDrafts(sortedJobDrafts);
    }

    function onJobDraftSelect(id: number) {
        if (id === selectedJobDraftId){
            setSelectedJobDraftId(null);
            setInvalidDraftSelected(true);
            return;
        }
        setSelectedJobDraftId(id);
        setInvalidDraftSelected(false);
    }

    return (
        loading ? <LoadingPage/> :
            <div className={"employers-centralized-page-layout"}>
                <PageTitleWithImage imageElement={<PeopleInAnOffice/>} title={"Create a job post"}/>
                <div className={"emp-form-fb"}>
                    <form className={"emp-form"}>
                        <div className={"small-title horizontal-title"}>
                            <span>How would you like to post your job?</span>
                            <span className={"error-text"}>&nbsp;*</span>
                        </div>
                        <div className={"radio-input-info mb05rem"} onClick={handleFromDraftPostClick}>
                            <input
                                type={"radio"}
                                className={"custom-radio-input"}
                                checked={jobPostingMethod === JobPostingMethods.fromDrafts}
                                onChange={handleFromDraftPostClick}
                            >
                            </input>
                            <div className={"flex-column"}>
                                <span className={"semi-dark-default-text"}>Use a previous job drafts</span>
                                <span
                                    className={"grey-small-text"}>Proceed your job creation from early filled draft.</span>
                            </div>
                        </div>
                        <div className={"radio-input-info"} onClick={handleNewTemplateClick}>
                            <input
                                type={"radio"}
                                className={"custom-radio-input"}
                                checked={jobPostingMethod === JobPostingMethods.newTemplate}
                                onChange={handleNewTemplateClick}
                            >
                            </input>
                            <div className={"flex-column"}>
                                <span className={"semi-dark-default-text"}>Create a new post</span>
                                <span className={"grey-small-text"}>We'll offer smart tips along the way.</span>
                            </div>
                        </div>
                        {jobPostingMethod === JobPostingMethods.fromDrafts &&
                            <div className={"previous-drafts-container mt1rem"}>
                                {loading ? <LoadingPage/> :
                                    <>
                                        <div className={"previous-drafts-header"}>
                                            {invalidDraftSelected &&
                                                <div className={"error-box mt0 mb05rem"}>
                                                    <FontAwesomeIcon className={`error-text error-svg`}
                                                                     icon={faCircleExclamation}/>
                                                    <span className={"error-text"}>Make a selection or choose another option above.</span>
                                                </div>
                                            }
                                            <div className={`field-input-container mb05rem`}>
                                                <div className={`border-lining`}>
                                                </div>
                                                <div className={"flex-row ai-center jc-center"}>
                                                    <FontAwesomeIcon className={"ml1rem grey-default-text svg1rem"}
                                                                     icon={faMagnifyingGlass}/>
                                                </div>
                                                <input
                                                    className={`field-input`}
                                                    value={jobTitleSearch}
                                                    type={"text"}
                                                    onChange={onJobTitleSearchChange}
                                                    placeholder={"Search by job title"}
                                                />
                                                {jobTitleSearch.length !== 0 &&
                                                    <div className={"input-button-box"} onClick={eraseLocation}>
                                                        <button type={"button"} className={"input-field-button"}>
                                                            <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                                                        </button>
                                                    </div>}
                                            </div>
                                            <div className={`field-input-container mb1rem`}>
                                                <div className={`border-lining`}>
                                                </div>
                                                <div className={"flex-row ai-center jc-center"}>
                                                    <FontAwesomeIcon className={"ml1rem grey-default-text svg1rem"}
                                                                     icon={faLocationDot}/>
                                                </div>
                                                <input
                                                    className={`field-input`}
                                                    value={locationSearch}
                                                    type={"text"}
                                                    onChange={onJobLocationSearchChange}
                                                    placeholder={"Search by job title"}
                                                />
                                                {jobTitleSearch.length !== 0 &&
                                                    <div className={"input-button-box"} onClick={eraseJobTitle}>
                                                        <button type={"button"} className={"input-field-button"}>
                                                            <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                                                        </button>
                                                    </div>}
                                            </div>
                                            <div className={"grey-small-text bold-text flex-row ai-center"}>
                                                <FontAwesomeIcon className={"icon-right-margin"} icon={faBriefcase}/>
                                                {jobDrafts.length} {jobDrafts.length === 1 ? "result" : "results"}
                                            </div>
                                        </div>
                                        <div className={"content-separation-line"}/>
                                        {
                                            jobDrafts.map((jd, index) => (
                                                <JobDraftShortInfo
                                                    onJobDraftSelect={() => onJobDraftSelect(jd.id)}
                                                    incompleteJob={jd}
                                                    isSelected={jd.id === selectedJobDraftId}
                                                    key={index}/>
                                            ))
                                        }</>
                                }
                            </div>}
                        <button
                            className={"blue-button br-corner-button mt2rem"}
                            onClick={handleCreateJobClick}
                        >
                            Continue
                            <FontAwesomeIcon className={"svg125rem ml05rem"} icon={faArrowRightLong}/>
                        </button>
                    </form>
                </div>
            </div>
    )
}

export default JobPostingComponent;
