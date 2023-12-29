import React, {FC, useRef} from 'react';
import {useHomePage} from "../../hooks/useHomePage";
import "./JobDetailScrollWindow.scss";

interface JobDetailsScrollWindowProps {}

const JobDetailsScrollWindow: FC<JobDetailsScrollWindowProps> = () => {
    
    const {
        mainContentRef,
        setFullHeaderGridTemplate,
        setShortHeaderGridTemplate} = useHomePage();
    
    const jobDetailsScrollWindowRef = useRef<HTMLDivElement | null>(null);
    function focusOnInnerContent() {
        if (mainContentRef) {
            const mainContentY = mainContentRef.current!.getBoundingClientRect().top + window.scrollY;
            window.scrollTo(0, mainContentY);
        }

        const scrollTop = jobDetailsScrollWindowRef.current?.scrollTop;
        if (scrollTop! >= 15){
            setFullHeaderGridTemplate(0);
            setShortHeaderGridTemplate(1);
        }
        else {
            setFullHeaderGridTemplate(1);
            setShortHeaderGridTemplate(0);
        }
    }
    
    return (
        <div className={"job-details-scroll-window"} onScroll={focusOnInnerContent} ref={jobDetailsScrollWindowRef}>
            <div className={"job-details-container"}>
                <div className={"job-details-header"}>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                    <span>dsadsadasds</span>
                </div>
            </div>
        </div>

    )
};

export default JobDetailsScrollWindow;
