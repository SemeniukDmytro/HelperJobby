import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobBenefitsDialogContent.scss';
import useCurrentEmployerJob from "../../../../hooks/useCurrentEmployerJob";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {benefitsStringValues} from "../../../../AppConstData/JobEnumsToStringsArrays";
import JobFeature from "../../../../EmployersSideComponents/JobFeature/JobFeature";
import {benefitStringToEnumMap} from "../../../../utils/convertLogic/enumToStringConverter";
import {addBenefit} from "../../../../utils/manageJobFeatureSelect";
import {handleJobFeaturesListAppearance} from "../../../../utils/handleJobFeaturesListHeight";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {JobService} from "../../../../services/jobService";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";

interface ChangeJobBenefitsDialogContentProps {
    showDialog: boolean;
    setShowDialog?: Dispatch<SetStateAction<boolean>>;
    setRequestInProgress: Dispatch<SetStateAction<boolean>>;
    setEditFunction: Dispatch<SetStateAction<() => void>>;
}

const ChangeJobBenefitsDialogContent: FC<ChangeJobBenefitsDialogContentProps> = ({
                                                                                     showDialog,
                                                                                     setRequestInProgress,
                                                                                     setEditFunction,
                                                                                     setShowDialog
                                                                                 }) => {

    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [selectedBenefits, setSelectedBenefits] = useState(currentJob?.benefits || []);
    const [benefitsBoxHeight, setBenefitsBoxHeight] = useState("78px");
    const benefitsListRef = useRef<HTMLUListElement>(null);
    const [showFullBenefitsList, setShowFullBenefitsList] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();

    useEffect(() => {
        if (showDialog) {
            setSelectedBenefits(currentJob?.benefits || []);
            setShowFullBenefitsList(false);
            setBenefitsBoxHeight("78px");
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editIncompleteJobBenefits)
    }, [selectedBenefits]);

    async function editIncompleteJobBenefits() {
        try {
            setRequestInProgress(true);

            if (jobCreationState == JobCreationStates.incompleteJob){
                const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                    ...currentJob,
                    benefits: selectedBenefits
                }
                const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
                setCurrentJob(retrievedIncompleteJob);
            }
            else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    benefits: selectedBenefits
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
            <div className={"small-title"}>
                Benefits
            </div>
            <div
                className={"job-features-fb"}
                style={{
                    height: benefitsBoxHeight
                }}
            >
                <ul
                    className={"job-features-list"}
                    ref={benefitsListRef}
                >
                    {benefitsStringValues.map((benefits, index) => (
                        <JobFeature
                            key={index}
                            featureName={benefits}
                            isSelected={selectedBenefits.includes(benefitStringToEnumMap(benefits)!)}
                            onClick={() => addBenefit(benefits, selectedBenefits, setSelectedBenefits)}
                        />
                    ))}
                </ul>
            </div>
            <div className={"mt05rem"}>
                   <span className={"bold-navigation-link"}
                         onClick={() => handleJobFeaturesListAppearance(showFullBenefitsList,
                             setShowFullBenefitsList, setBenefitsBoxHeight, benefitsListRef)}>
                        <span>{`${showFullBenefitsList ? "Show less" : "Show more"}`}</span>
                       {showFullBenefitsList ?
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronUp}/>
                           :
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronDown}/>
                       }
                    </span>
            </div>
        </>
    )
}

export default ChangeJobBenefitsDialogContent;
