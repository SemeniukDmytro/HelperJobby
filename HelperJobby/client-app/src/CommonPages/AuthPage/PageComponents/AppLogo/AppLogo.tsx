import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import "./AppLogo.scss";

interface AppLogoProps {
    children?: React.ReactNode;
}

const AppLogo: FC<AppLogoProps> = ({children}) => {
    const navigate = useNavigate();

    function GoToDefaultPage() {
        navigate('/');
    }

    return (
        <div className="form-page-background">
            <div className="passpage-container">
                <div className="logo-container" onClick={GoToDefaultPage}>
                    <span className="logo">HelperJobby</span>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AppLogo;