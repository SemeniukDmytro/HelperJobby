import React, {FC, useContext, useEffect, useState} from 'react';
import {UserService} from "../../services/userService";
import {UserDTO} from "../../DTOs/userRelatedDTOs/UserDTO";
import {useAuth} from "../../hooks/useAuth";


interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
    const {authUser, setAuthUser} = useAuth();  
    const userService = new UserService();
    const [user, setCurrentUser] = useState<UserDTO>();
    
    useEffect(() => {
        if (authUser) {
            setAuthUser((prevAuthUser) => ({
                ...prevAuthUser!,
                user: { ...prevAuthUser!.user, email: "glibas@gmail.com" },
            }));
        }
    },[])


    async function testMethod() {
        let user = await userService.getCurrentUser();
        setCurrentUser(user);
    }

    return (
          <div>
              {authUser?.user.email}
              <button onClick={testMethod}>
                Test
              </button>
              <span>{user?.email}</span>
          </div>
        
)
};

export default HomePage;
