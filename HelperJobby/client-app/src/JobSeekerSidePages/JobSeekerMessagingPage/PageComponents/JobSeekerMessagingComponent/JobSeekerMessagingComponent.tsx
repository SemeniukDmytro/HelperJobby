import React, {FC, useState} from 'react';
import './JobSeekerMessagingComponent.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import JobSeekerConversation from "../JobSeekerConversation/JobSeekerConversation";

interface JobSeekerMessagingComponentProps {
}

const JobSeekerMessagingComponent: FC<JobSeekerMessagingComponentProps> = () => {
    const [loading, setLoading] = useState(true);


    return (

        <div className={"js-msg-page-layout"}>
            <PageWrapWithHeader>

                <div className={"js-msg-page-background"}>
                    <div className={"js-inbox-fb"}>
                        <div className="js-inbox-header">
                            Messages
                        </div>
                        <div className={"content-separation-line"}/>
                        <div className="js-inbox-conversations-list-box">
                        </div>
                    </div>
                    <JobSeekerConversation/>
                </div>
            </PageWrapWithHeader>
        </div>
    )
}

export default JobSeekerMessagingComponent;
