import React, {FC, useEffect, useState} from 'react';
import './SkillsComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {SkillDTO} from "../../../../../DTOs/resumeRelatedDTOs/SkillDTO";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import SkillContainer from "../SkillContainer/SkillContainer";
import {CreateSkillDTO} from "../../../../../DTOs/resumeRelatedDTOs/CreateSkillDTO";
import {SkillService} from "../../../../../services/skillService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {ResumeService} from "../../../../../services/resumeService";
import {CreateResumeDTO} from "../../../../../DTOs/resumeRelatedDTOs/CreateResumeDTO";
import {ServerError} from "../../../../../ErrorDTOs/ServerErrorDTO";
import {useNavigate} from "react-router-dom";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";

interface SkillsComponentProps {}

const SkillsComponent: FC<SkillsComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const skillService = new SkillService();
    const resumeService = new ResumeService();
    const navigate = useNavigate();
    
    const [currentSkill, setCurrentSkill] = useState("");
    const [skills, setSkills] = useState<CreateSkillDTO[]>([]);
    const [savingProcess, setSavingProcess] = useState(false);
    const [skillsRemoved, setSkillsRemoved] = useState(false);

    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 6);
        if (jobSeeker?.resume){
            setSkills(jobSeeker.resume.skills);
        }
    }, []);

    useEffect(() => {
        setSaveFunc(() => customSaveFunc);
    }, [skills]);

    function addSkill() {
        const skillToAdd : CreateSkillDTO = {
            name : currentSkill
        }
        setSkills((prevState) => {
            prevState.push(skillToAdd);
            return [...prevState];
        });
        setCurrentSkill("");
    }

    function removeSkill(indexToRemove: number) {
        setSkills((prevState) => {
            const updatedSkills = prevState.filter((_, index) => index !== indexToRemove);
            return updatedSkills;
        });
    }
    
    async function customSaveFunc(){
        await handleSkillsSaving("/my-profile")
    }
    
    async function saveSkills() {
       await handleSkillsSaving("/build/preview");   
    }
    
    async function handleSkillsSaving(nextPageUrl : string)
    {
        setSavingProcess(true);
        if (jobSeeker?.resume){
            await removeSkillsFromExistingResume();
        }
        else {
            await createNewResume();
        }
        navigate(nextPageUrl);
        
    }

    useEffect(() => {
        if (skillsRemoved){
            addNewSkillsResume();
        }
        
    }, [skillsRemoved]);

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
            if (err instanceof ServerError) {
                logErrorInfo(err)
            }
        } finally {
            setSavingProcess(false);
        }
    }

    async function addNewSkillsResume(){
        try {
            const retrievedSkills = await skillService.addSkillsToResume(jobSeeker!.resume!.id, skills);
            const updatedJobSeeker = jobSeeker;
            if (updatedJobSeeker?.resume){
                updatedJobSeeker.resume.skills = retrievedSkills;
            }
            setJobSeeker(updatedJobSeeker);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setSavingProcess(false);
            
        }
    }
    
    async function removeSkillsFromExistingResume(){
        try {
            await skillService.removeSkillsFromResume(jobSeeker!.resume!.id);
            setSkillsRemoved(true);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
        }
    }

    return (
        <>
            {savingProcess && <div className={"saving-in-progress-surface"}></div>}
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
                    setInputFieldValue={setCurrentSkill}/>
                <button className={"add-skill-button"} disabled={!currentSkill} onClick={addSkill}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className={"form-and-buttons-divider"} >
                <button className={"blue-button min-continue-button-size"} onClick={saveSkills}>
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
