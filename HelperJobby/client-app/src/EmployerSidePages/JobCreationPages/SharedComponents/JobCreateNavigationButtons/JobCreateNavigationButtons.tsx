import React, {FC, FormEvent} from 'react';
import './JobCreateNavigationButtons.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";

interface JobCreateNavigationButtonsProps {
    backButtonOnClick: () => void;
    nextPageButtonClick: (e : FormEvent) => void;
}

const JobCreateNavigationButtons: FC<JobCreateNavigationButtonsProps> = ({
                                                                             backButtonOnClick,
                                                                             nextPageButtonClick
                                                                         }) => (
    <div className="crj-buttons-fb mt2rem">
        <button className={"light-button-with-margin"} type={"button"} onClick={backButtonOnClick}>
            <FontAwesomeIcon className={"svg125rem mr05rem"} icon={faArrowLeftLong}/>
            <span>Back</span>
        </button>
        <button className={"blue-button"} type={"submit"} onClick={nextPageButtonClick}>
            <span className={"mr05rem"}>Continue</span>
            <FontAwesomeIcon className={"svg125rem"} icon={faArrowRightLong}/>
        </button>
    </div>
);

export default JobCreateNavigationButtons;
