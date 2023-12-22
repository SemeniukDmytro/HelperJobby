import {useContext} from "react";
import EmailContext from "../context/EmailContext";

export function useEmail(){
    return useContext(EmailContext);
}