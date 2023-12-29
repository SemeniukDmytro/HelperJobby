import {Dispatch, MutableRefObject, SetStateAction} from "react";

export interface HomePageContextProps{
    mainContentReference : MutableRefObject<HTMLDivElement | null> | null;
    setMainContentRef : Dispatch<SetStateAction<MutableRefObject<HTMLDivElement | null> | null>>;
    fullHeaderGridTemplate: number | null;
    setFullHeaderGridTemplate : Dispatch<SetStateAction<number | null>>;
    shortHeaderGridTemplate : number | null;
    setShortHeaderGridTemplate : Dispatch<SetStateAction<number | null>>;
}