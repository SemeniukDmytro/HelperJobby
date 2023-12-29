import React, {FC} from "react";
import {EmailProvider} from "../../context/EmailContext";
import {AccountTypeProvider} from "../../context/AccountTypeContext";
import HomeComponent from "../../Components/HomeComponent/HomeComponent";
import {HomePageContextProvider} from "../../context/HomePageContext";

interface HomePageProps{

}

const HomePage: FC<HomePageProps> = () => {

    return(
        <HomePageContextProvider>
            <HomeComponent/>
        </HomePageContextProvider>
    )
}

export default HomePage;