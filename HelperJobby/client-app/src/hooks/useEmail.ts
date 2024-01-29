import {useContext} from "react";
import EmailContext from "../contexts/EmailContext";

export function useEmail(){
    return useContext(EmailContext);
}