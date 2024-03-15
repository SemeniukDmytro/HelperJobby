import React, {FC, useEffect, useRef, useState} from 'react';
import './AddSkillComponent.scss';
import NavigateBackHeader from "../../../../Components/NavigateBackHeader/NavigateBackHeader";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import {SkillService} from "../../../../services/skillService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {useNavigate} from "react-router-dom";
import {CreateSkillDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateSkillDTO";
import {ResumeService} from "../../../../services/resumeService";
import {CreateResumeDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateResumeDTO";
import {JobSeekerDTO} from "../../../../DTOs/accountDTOs/JobSeekerDTO";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";

interface AddSkillComponentProps {
}

const AddSkillComponent: FC<AddSkillComponentProps> = () => {
    const [skill, setSkill] = useState("");
    const skillInputRef = useRef<HTMLInputElement>(null);
    const [validateSkill, setValidateSkill] = useState(false);
    const [savingProcess, setSavingProcess] = useState(false);
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const [previousPagePath, setPreviousPagePath] = useState("");
    const navigate = useNavigate();
    const skillService = new SkillService();
    const resumeService = new ResumeService();

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("/preview")) {
            setPreviousPagePath("/build/preview")
        } else if (currentPath.includes("/resume")) {
            setPreviousPagePath("/resume")
        }
    }, []);

    function navigateBack() {
        navigate(previousPagePath);
    }

    async function addSkill(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (!skill) {
            setValidateSkill(true);
            skillInputRef.current?.focus();
            return;
        }
        if (jobSeeker?.resume) {
            await addSkillToExistingResume();
        } else {
            await createResume();
        }
        navigateBack()
    }

    console.log(jobSeeker)
    async function addSkillToExistingResume() {
        try {
            setSavingProcess(true);
            const createdSkill: CreateSkillDTO = {name: skill};
            const retrievedSkill = await skillService.addSkill(jobSeeker!.resume!.id, createdSkill);
            const updatedResume = {...jobSeeker?.resume!};
            updatedResume.skills.push(retrievedSkill);
            setJobSeeker((prev) => {
                if (prev) {
                    const updatedJobSeeker: JobSeekerDTO = {
                        ...prev,
                        resume: updatedResume
                    }
                    return updatedJobSeeker;
                }
                return prev;
            });
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setSavingProcess(false);
        }
    }

    async function createResume() {
        try {
            setSavingProcess(true);
            const createdSkill: CreateSkillDTO = {name: skill};
            const createdResume: CreateResumeDTO = {
                educations: [],
                workExperiences: [],
                skills: [createdSkill]
            }
            const retrievedResume = await resumeService.postResume(createdResume);
            setJobSeeker((prev) => {
                if (prev) {
                    const updatedJobSeeker: JobSeekerDTO = {
                        ...prev,
                        resume: retrievedResume
                    }
                    return updatedJobSeeker;
                }
                return prev;
            });


        } catch (err) {
            logErrorInfo(err)
        } finally {
            setSavingProcess(false);
        }
    }

    return (
            <div className={"page-with-centered-content-layout"}>
                <NavigateBackHeader onBackButtonClick={navigateBack}></NavigateBackHeader>
                <form className={"form-layout"}>
                    {savingProcess && <div className={"request-in-process-surface"}></div>}
                    <div className={"edit-contact-form-header"}>
                        <span>Add skill</span>
                    </div>
                    <CustomInputField
                        fieldLabel={"Skill name"}
                        isRequired={true}
                        inputFieldValue={skill}
                        setInputFieldValue={setSkill}
                        executeValidation={validateSkill}
                        setExecuteValidation={setValidateSkill}
                        inputRef={skillInputRef}
                    />
                    <div>
                        <button
                            className={"blue-button min-save-button-size"}
                            onClick={addSkill}
                            disabled={savingProcess}
                        >
                            {savingProcess ?
                                <WhiteLoadingSpinner/>
                                :
                                <span>Save</span>
                            }
                        </button>
                    </div>
                </form>

            </div>
    )
}

export default AddSkillComponent;
