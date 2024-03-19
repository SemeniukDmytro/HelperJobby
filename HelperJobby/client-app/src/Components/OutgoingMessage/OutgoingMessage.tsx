import React, {FC} from 'react';
import './OutgoingMessage.scss';
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface OutgoingMessageProps {
    content: string;
}

const OutgoingMessage: FC<OutgoingMessageProps> = ({
                                                       content
                                                   }) => {

    return (
        <div className={"message-box"}>
            <div className={"sender-info-and-time-container"}>
                <div className={"dark-small-text bold-text"}>
                    Me
                </div>
                <div className={"circle-separator"}>
                    •
                </div>
                <div className={"grey-small-text bold-text"}>
                    <FontAwesomeIcon className={'svg075rem'} icon={faClock}/>
                </div>
            </div>
            <div className={"light-dark-small-text"}>
                {content}
            </div>
        </div>
    )
}

export default OutgoingMessage;
