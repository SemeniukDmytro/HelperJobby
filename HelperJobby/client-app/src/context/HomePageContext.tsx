import {createContext, MutableRefObject, ReactNode, useState} from "react";
import {HomePageContextProps} from "../contextTypes/HomePageContextProps";

const HomePageContext = createContext<HomePageContextProps>(
    {
        mainContentRef : null,
        setMainContentRef : () => {},
        fullHeaderGridTemplate : null,
        setFullHeaderGridTemplate : () => {},
        shortHeaderGridTemplate : null,
        setShortHeaderGridTemplate : () => {}
    }); 

export function HomePageContextProvider({ children } : {children: ReactNode}){
    const [mainContentRef, setMainContentRef] = useState<MutableRefObject<HTMLDivElement | null> | null>(null);
    const [fullHeaderGridTemplate, setFullHeaderGridTemplate] = useState<number | null>(null);
    const [shortHeaderGridTemplate, setShortHeaderGridTemplate] = useState<number | null>(null);
    return(
        <HomePageContext.Provider
            value={{
                mainContentRef,
                setMainContentRef,
                fullHeaderGridTemplate,
                setFullHeaderGridTemplate,
                shortHeaderGridTemplate,
                setShortHeaderGridTemplate
            }}>
            {children}
        </HomePageContext.Provider>
    )
}

export default HomePageContext;