import React, { FC } from 'react';
import './EditEmail.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../../../hooks/useAuth";

interface EditEmailProps {}

const EditEmail: FC<EditEmailProps> = () => {
    const {authUser} = useAuth();
    return(
    <div className={"edit-email-layout"}>
        <div className={"edit-email-label"}>
            Email
        </div>
        <div className={"change-email-box"}>
            <div className={"current-email"}>
                {authUser?.user.email}
            </div>
            <a className={"change-email-link"}>
                <span className={"edit-link"}>Edit</span>
                <FontAwesomeIcon icon={faArrowRight}/>
            </a>
        </div>
    </div>
)};

export default EditEmail;
