import React, {FC, useContext, useEffect} from 'react';
import {useAuth} from "../../Hooks/useAuth";


interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
    const {authUser, setAuthUser} = useAuth();  
    useEffect(() => {
        if (authUser) {
            setAuthUser((prevAuthUser) => ({
                ...prevAuthUser!,
                user: { ...prevAuthUser!.user, email: "glibas@gmail.com" },
            }));
        }
    },[])
    
    
    return (
  <div>
      {authUser?.user.email}
  </div>
)
};

export default HomePage;
