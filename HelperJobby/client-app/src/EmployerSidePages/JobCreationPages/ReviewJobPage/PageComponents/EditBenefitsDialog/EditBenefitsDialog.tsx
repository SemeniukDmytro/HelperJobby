import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditBenefitsDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {benefitsStringValues} from "../../../../../AppConstData/JobEnumsToStringsArrays";
import JobFeature from "../../../../../EmployersSideComponents/JobFeature/JobFeature";
import {benefitStringToEnumMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import {handleJobFeaturesListAppearance} from "../../../../../utils/handleJobFeaturesListHeight";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {addBenefit} from "../../../../../utils/manageJobFeatureSelect";

interface EditBenefitsDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditBenefitsDialog: FC<EditBenefitsDialogProps> = ({
                                                             showDialog,
                                                             setShowDialog
                                                         }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [selectedBenefits, setSelectedBenefits] = useState(incompleteJob?.benefits || []);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [benefitsBoxHeight, setBenefitsBoxHeight] = useState("78px");
    const benefitsListRef = useRef<HTMLUListElement>(null);
    const [showFullBenefitsList, setShowFullBenefitsList] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setSelectedBenefits(incompleteJob?.benefits || []);
            setShowFullBenefitsList(false);
            setBenefitsBoxHeight("78px");
        }
    }, [showDialog]);

    async function editIncompleteJobBenefits() {
        try {
            setRequestInProgress(true)
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                benefits : selectedBenefits
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
            executeJobEditing={editIncompleteJobBenefits}>
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
        </EditJobPostDialog>
    )
}

export default EditBenefitsDialog;
