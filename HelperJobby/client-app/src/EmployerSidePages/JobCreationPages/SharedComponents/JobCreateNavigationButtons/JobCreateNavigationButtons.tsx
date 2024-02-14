import React, {FC, FormEvent} from 'react';
import './JobCreateNavigationButtons.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";

interface JobCreateNavigationButtonsProps {
    backButtonOnClick: () => void;
    nextPageButtonClick: (e: FormEvent) => void;
    requestInProgress: boolean;
}

const JobCreateNavigationButtons: FC<JobCreateNavigationButtonsProps> = ({
                                                                             backButtonOnClick,
                                                                             nextPageButtonClick,
                                                                             requestInProgress
                                                                         }) => (
    <div className="crj-buttons-fb mt2rem">
        <button className={"light-button-with-margin"} type={"button"} onClick={backButtonOnClick}>
            <FontAwesomeIcon className={"svg125rem mr05rem"} icon={faArrowLeftLong}/>
            <span>Back</span>
        </button>
        <button
            className={"blue-button min-8chr-arrow-btn-width"} 
            type={"submit"}
            disabled={requestInProgress}
            onClick={nextPageButtonClick}>
            {requestInProgress ? <WhiteLoadingSpinner/>
                :
                <>
                    <span>Continue</span>
                    <FontAwesomeIcon className={'svg1rem ml05rem'} icon={faArrowRightLong}/>
                </>
            }
        </button>
    </div>
);

export default JobCreateNavigationButtons;
