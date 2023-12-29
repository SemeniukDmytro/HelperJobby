import {useContext} from "react";
import HomePageContext from "../context/HomePageContext";

export function useHomePage(){
    return useContext(HomePageContext);
}