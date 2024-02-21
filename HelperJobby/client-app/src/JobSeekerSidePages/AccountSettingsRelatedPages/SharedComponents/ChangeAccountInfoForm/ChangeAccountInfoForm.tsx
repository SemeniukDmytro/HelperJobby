import React, {FC, ReactNode} from 'react';
import './ChangeAccountInfoForm.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";

interface ChangeAccountInfoFormProps {
    children: ReactNode
}

const ChangeAccountInfoForm: FC<ChangeAccountInfoFormProps> = ({children}) => (
    <div className={"light-grey-page-background"}>
        <PageWrapWithHeader>
            <div className={"passpage-container"}>
                <div className={"passpage-form-layout"}>
                    <div className={"passpage-form-box"}>
                        {children}
                    </div>
                </div>
            </div>
        </PageWrapWithHeader>
    </div>
);

export default ChangeAccountInfoForm;
