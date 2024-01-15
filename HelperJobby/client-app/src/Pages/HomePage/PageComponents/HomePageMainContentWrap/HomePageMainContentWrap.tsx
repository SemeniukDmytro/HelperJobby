import React, {FC, ReactNode, useEffect, useRef} from 'react';
import './HomePageMainContentWrap.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {useHomePage} from "../../../../hooks/useHomePage";
import useQueryParams from "../../../../hooks/useQueryParams";

interface HomePageMainContentWrapProps {
    children: ReactNode
}

const HomePageMainContentWrap: FC<HomePageMainContentWrapProps> = ({children}: { children: ReactNode }) => {
    const mainContentRef = useRef<HTMLDivElement | null>(null);
    const {setMainContentReferenceForHome} = useHomePage();
    const {setMainContentRefForSearch} = useQueryParams();

    console.log("homecomp wrap")


    useEffect(() => {
        setMainContentReferenceForHome(mainContentRef);
        setMainContentRefForSearch(mainContentRef);
    }, []);
    
    return (
        <PageWrapWithHeader>
            <div className={"header-and-main-content-separator"}></div>
            <div className={"main-content"} ref={mainContentRef}>
                {children}
            </div>
        </PageWrapWithHeader>
    )
};

export default HomePageMainContentWrap;
