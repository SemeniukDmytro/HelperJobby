import React, {FC, ReactNode, useEffect, useRef} from 'react';
import './HomePageMainContentWrap.scss';
import {useHomePage} from "../../../../hooks/useHomePage";
import useQueryParams from "../../../../hooks/useQueryParams";

interface HomePageMainContentWrapProps {
    children: ReactNode
}

const HomePageMainContentWrap: FC<HomePageMainContentWrapProps> = ({children}: { children: ReactNode }) => {
    const mainContentRef = useRef<HTMLDivElement | null>(null);
    const {setMainContentReferenceForHome} = useHomePage();
    const {setMainContentRefForSearch} = useQueryParams();


    useEffect(() => {
        setMainContentReferenceForHome(mainContentRef);
        setMainContentRefForSearch(mainContentRef);
    }, []);

    return (
        <>
            <div className={"content-separation-margin"}></div>
            <div className={"main-content"} ref={mainContentRef}>
                {children}
            </div>
        </>
    )
};

export default HomePageMainContentWrap;
