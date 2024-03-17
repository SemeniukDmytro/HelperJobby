import React, {FC} from 'react';
import './NotFoundComponent.scss';
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import NoResults from "../../../../Components/Icons/NoResults";

interface NotFoundComponentProps {
}

const NotFoundComponent: FC<NotFoundComponentProps> = () => {

    const navigate = useNavigate();
    const {employer} = useEmployer()
    function navigateToHomePage() {
        if (employer){
            navigate(EmployerPagesPaths.JOB_POSTING);
        }
        else {
            navigate("/");
        }
    }

    return (
        <div className={"not-found-page-container"}>
            <NoResults/>
            <div style={{maxWidth : "480px"}}>
                <div className="form-title mb05rem">
                    Lost? Let’s get you back on track.
                </div>
                <span
                    className={"light-dark-default-text not-found-page-subtitle"}>
                    We can’t find the page you’re looking for. The page might have moved, or there could be a typo in the URL.
                </span>
                <button
                    onClick={navigateToHomePage}
                    className={"blue-button mt1rem"}>
                    Return to home
                    <FontAwesomeIcon
                        className={"svg1rem ml05rem"}
                        icon={faArrowRightLong}/>
                </button>
            </div>
        </div>
    )
};

export default NotFoundComponent;
