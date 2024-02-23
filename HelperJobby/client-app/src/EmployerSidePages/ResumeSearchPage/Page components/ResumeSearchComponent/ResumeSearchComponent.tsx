import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import './ResumeSearchComponent.scss';
import {useNavigate, useSearchParams} from "react-router-dom"
import ResumeSearchResults from "../ResumeSearchResults/ResumeSearchResults";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import PageTitleWithImage from "../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import ResumeSearch from "../../../../Components/Icons/ResumeSearch";
import employerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";

interface ResumeSearchComponentProps {}

const ResumeSearchComponent: FC<ResumeSearchComponentProps> = () => {
    const [resumeQuery, setResumeQuery] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("q");
        if (query){
            setResumeQuery(query);
        }
    }, []);

    function findMatchingResults(e : FormEvent) {
        e.preventDefault();
        navigate(`${EmployerPagesPaths.RESUMES}?q=${resumeQuery}`)
    }

    function changeResumeQuery(e : ChangeEvent<HTMLInputElement>) {
        setResumeQuery(e.target.value)
    }

    const handleEnterKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigate(`${EmployerPagesPaths.RESUMES}?q=${resumeQuery}`)
        }
    };

    function navigateToJobPostingPage() {
        navigate(employerPagesPaths.JOB_POSTING);
    }

    return (
            <>
                <div className={"light-grey-page-background"}>
                    <div className={"emp-pages-layout"}>
                        <div className={"emp-pages-header mt1rem mb1rem"}>
                            <span className={"small-title mb0"}>Find candidates</span>
                            <button className={"blue-button"} onClick={navigateToJobPostingPage}>Post a job</button>
                        </div>
                        <div className={"search-block-layout"}>
                            <div className={"resume-search-block-box"}>
                                <form className={"search-block-form"}>
                                    <div className={`field-input-container mr05rem`} style={{flexGrow: "1"}}>
                                        <div className={`border-lining`}>
                                        </div>
                                        <div className={"jsb-input-label bold-text"}>What</div>
                                        <input
                                            className={`field-input jsb-input`}
                                            value={resumeQuery}
                                            type={"text"}
                                            onChange={changeResumeQuery}
                                            placeholder={"Job title, skills, or search syntax"}
                                            onKeyDown={handleEnterKeyPress}
                                        />
                                    </div>
                                    <button className={"blue-button"} onClick={findMatchingResults}>
                                        Find candidates
                                    </button>
    
                                </form>
                            </div>  
                        </div>
                        <ResumeSearchResults/>
                        {!searchParams.get("q") &&
                        <PageTitleWithImage imageElement={<ResumeSearch/>}
                                            title={"Find your future employees"}/>
                        }
                    </div>
                </div>
            </>
    )
}
export default ResumeSearchComponent;
