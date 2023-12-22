import {Dispatch, SetStateAction} from "react";

export interface EmailContextProps {
    email: string
    setEmail: Dispatch<SetStateAction<string>>;
}