import React, {Dispatch, FC, SetStateAction} from 'react';
import './ProvideRequiredDataLink.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";

interface ProvideRequiredDataLinkProps {
    linkLabel: string;
    setShowEditDataWindow: Dispatch<SetStateAction<boolean>>;
}

const ProvideRequiredDataLink: FC<ProvideRequiredDataLinkProps> = ({
                                                                       linkLabel,
                                                                       setShowEditDataWindow
                                                                   }) =>
    (
        <div className={"flex-row mb05rem"}>
            <span className={"bold-navigation-link"} onClick={() => setShowEditDataWindow(true)}>
                <span>{linkLabel}</span>
                <FontAwesomeIcon className={"svg1rem ml05rem"} icon={faPen}/>
            </span>
        </div>

    );

export default ProvideRequiredDataLink;
