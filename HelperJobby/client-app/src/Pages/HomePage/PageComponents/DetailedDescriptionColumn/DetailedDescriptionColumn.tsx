import React, {FC, useEffect, useState} from 'react';
import './DetailedDescriptionColumn.scss';
import JobDescriptionHeader from "../JobDescriptionHeader/JobDescriptionHeader";
import JobDetailsScrollWindow from "../JobDetailsScrollWindow/JobDetailsScrollWindow";

interface DetailedDescriptionColumnProps {}

const DetailedDescriptionColumn: FC<DetailedDescriptionColumnProps> = () => {

    const [stickyHeight, setStickyHeight] = useState(361.2);

    useEffect(() => {
        updateStickyHeight();
        const handleScroll = () => {
            updateStickyHeight();
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [stickyHeight]);

    const updateStickyHeight = () => {
        let newHeight = 361.2 + window.scrollY;
        if (newHeight > 698){
            setStickyHeight(698)
        }
        else{
            setStickyHeight(newHeight);
        }
    };
    
    return (
    <div className={"detailed-description-column"}>
        <div style={{height : `${stickyHeight}px`}} className={"detailed-description-sticky"}>
            <div className={"detailed-description-content-box"}>
                <JobDescriptionHeader></JobDescriptionHeader>
                <JobDetailsScrollWindow></JobDetailsScrollWindow>
            </div>
        </div>
    </div>
)
};

export default DetailedDescriptionColumn;
