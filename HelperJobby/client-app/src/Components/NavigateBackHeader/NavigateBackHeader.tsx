import React, {FC} from 'react';
import './NavigateBackHeader.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";

interface NavigateBackHeaderProps {
    onBackButtonClick: () => void;
}

const NavigateBackHeader: FC<NavigateBackHeaderProps> = ({onBackButtonClick}) => (
    <div className={"back-button-header"}>
        <button className={"back-button"} onClick={onBackButtonClick}>
            <FontAwesomeIcon className={"svg125rem"} icon={faArrowLeftLong}/>
        </button>
    </div>
);

export default NavigateBackHeader;
