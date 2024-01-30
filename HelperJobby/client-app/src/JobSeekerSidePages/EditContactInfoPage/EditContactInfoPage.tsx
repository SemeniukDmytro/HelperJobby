import React, {FC} from 'react';
import EditContactInfoForm from "./PageComponents/EditContactInfoForm/EditContactInfoForm";


interface EditContactInfoPageProps {
}

const EditContactInfoPage: FC<EditContactInfoPageProps> = () => (
    <EditContactInfoForm/>
);

export default EditContactInfoPage;
