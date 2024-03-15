import React, {FC, useEffect, useState} from 'react';
import './SkillsComponent.scss';
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import SkillContainer from "../SkillContainer/SkillContainer";
import {CreateSkillDTO} from "../../../../../DTOs/resumeRelatedDTOs/CreateSkillDTO";
import {SkillService} from "../../../../../services/skillService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {ResumeService} from "../../../../../services/resumeService";
import {CreateResumeDTO} from "../../../../../DTOs/resumeRelatedDTOs/CreateResumeDTO";
import {useLocation, useNavigate} from "react-router-dom";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import useResumeBuild from "../../../../../hooks/contextHooks/useResumeBuild";
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";

interface SkillsComponentProps {
}

const SkillsComponent: FC<SkillsComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const skillService = new SkillService();
    const resumeService = new ResumeService();
    const navigate = useNavigate();
    const location = useLocation();
    const {job} = useCurrentJobApplication();

    const [currentSkill, setCurrentSkill] = useState("");
    const [skills, setSkills] = useState<CreateSkillDTO[]>([]);
    const [savingProcess, setSavingProcess] = useState(false);

    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 6);
        if (jobSeeker?.resume) {
            setSkills(jobSeeker.resume.skills);
        }
    }, []);

    useEffect(() => {
        setSaveFunc(() => customSaveFunc);
    }, [skills]);

    function addSkill() {
        const skillToAdd: CreateSkillDTO = {
            name: currentSkill
        }
        setSkills((prevState) => {
            prevState.push(skillToAdd);
            return [...prevState];
        });
        setCurrentSkill("");
    }

    function removeSkill(indexToRemove: number) {
        setSkills((prevState) => {
            return prevState.filter((_, index) => index !== indexToRemove);
        });
    }

    async function customSaveFunc() {
        let nextPagePath = "/my-profile";
        if (location.pathname.includes("/apply-resume") && job){
            nextPagePath = `job-apply/${job.id}/resume`
        }
        await handleSkillsSaving(nextPagePath)
    }

    async function saveSkills() {
        let nextPagePath = "/build/preview";
        if (location.pathname.includes("/apply-resume") && job){
            nextPagePath = `/apply-resume/success`
        }
        await handleSkillsSaving(nextPagePath);
    }

    async function handleSkillsSaving(nextPageUrl: string) {
        setSavingProcess(true);
        if (jobSeeker?.resume) {
            await removeSkillsFromExistingResume();
            await addNewSkillsResume();
            navigate(nextPageUrl);
        } else {
            await createNewResume();
            navigate(nextPageUrl);
        }
    }

    async function createNewResume() {
        try {
            setSavingProcess(true);
            const createdResume: CreateResumeDTO = {
                educations: [],
                workExperiences: [],
                skills: skills
            }
            const retrievedResume = await resumeService.postResume(createdResume);
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker!.resume = retrievedResume;
            setJobSeeker(updatedJobSeeker);
        } catch (err) {
            logErrorInfo(err);
        } finally {
            setSavingProcess(false);
        }
    }

    async function addNewSkillsResume() {
        try {
            const retrievedSkills = await skillService.addSkillsToResume(jobSeeker!.resume!.id, skills);
            const updatedJobSeeker = jobSeeker;
            if (updatedJobSeeker?.resume) {
                updatedJobSeeker.resume.skills = retrievedSkills;
            }
            setJobSeeker(updatedJobSeeker);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setSavingProcess(false);

        }
    }

    async function removeSkillsFromExistingResume() {
        try {
            await skillService.removeSkillsFromResume(jobSeeker!.resume!.id);
        } catch (err) {
            logErrorInfo(err)
        }
    }

    return (
        <>
            {savingProcess && <div className={"request-in-process-surface"}></div>}
            <div className={"build-page-header subtitle-margin"}>What are some of your skills?</div>
            <div className={"build-page-subtitle"}>We recommend adding at least 6 skills</div>
            <div>
                {skills.length > 0 ?
                    (skills.map((skill, index) => (
                        <SkillContainer key={index} skillName={skill.name} removeSkill={() => removeSkill(index)}/>
                    )))
                    :
                    <div className={"no-resume-info-container"}>
                        Your skills will appear here
                    </div>
                }

            </div>
            <div className={"add-skills-separation-line"}/>
            <div className={"add-skill-container"}>
                <CustomInputField
                    fieldLabel={"Add skill"}
                    isRequired={false}
                    inputFieldValue={currentSkill}
                    setInputFieldValue={setCurrentSkill}
                />
                <button className={"add-skill-button"} disabled={!currentSkill} onClick={addSkill}>
                    <FontAwesomeIcon className={"svg125rem"} icon={faPlus}/>
                </button>
            </div>
            <div className={"form-and-buttons-divider"}>
                <button className={"blue-button min-8chr-btn-width"} onClick={saveSkills}>
                    {savingProcess ?
                        <WhiteLoadingSpinner/>
                        :
                        <span>Continue</span>
                    }
                </button>
            </div>
            <div className={"bottom-page-margin"}/>
        </>

    )
}

export default SkillsComponent;
