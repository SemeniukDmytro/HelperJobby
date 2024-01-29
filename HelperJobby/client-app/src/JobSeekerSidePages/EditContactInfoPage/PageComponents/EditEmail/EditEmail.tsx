import React, { FC } from 'react';
import './EditEmail.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

interface EditEmailProps {}

const EditEmail: FC<EditEmailProps> = () => {
    const {authUser} = useAuth();
    const navigate = useNavigate();

    function navigateToChangeEmailPage() {
        navigate("/account/change-email")
    }

    return(
    <div className={"edit-email-layout"}>
        <div className={"edit-email-label"}>
            Email
        </div>
        <div className={"change-email-box"}>
            <div className={"current-email"}>
                {authUser?.user.email}
            </div>
            <a className={"change-email-link"} onClick={navigateToChangeEmailPage}>
                <span className={"edit-link"}>Edit</span>
                <FontAwesomeIcon className={"small-svg"} icon={faArrowRight}/>
            </a>
        </div>
    </div>
)};

export default EditEmail;