import {createContext, ReactNode, useState} from "react";
import {EmployerContextProps} from "../contextTypes/EmployerContextProps";
import {EmployerAccountDTO} from "../DTOs/accountDTOs/EmployerAccountDTO";
import {EmployerAccountService} from "../services/employerAccountService";
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const EmployerContext = createContext<EmployerContextProps>({
    employer: null,
    setEmployer: () => {
    },
    fetchEmployer: () => {
    }
});

export function EmployerProvider({children}: { children: ReactNode }) {
    const [employer, setEmployer] = useState<EmployerAccountDTO | null>(null);
    const employerService = new EmployerAccountService();
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const fetchEmployer = async () => {
        try {
            if (!authUser) {
                navigate("/auth-page")
            }
            if (employer) {
                return;
            }

            const retrievedEmployer = await employerService.getCurrentUserAccount();
            setEmployer(retrievedEmployer);
        } catch (err) {
            if (window.location.pathname !== "/employers/setup-employer") {
                navigate("/employers/setup-employer")
            }
        }
    }

    return (
        <EmployerContext.Provider
            value={{
                employer,
                setEmployer,
                fetchEmployer
            }}
        >
            {
                children
            }
        </EmployerContext.Provider>
    )
}

export default EmployerContext;