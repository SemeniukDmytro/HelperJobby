import React, {FC, useEffect, useState} from 'react';
import './OrganizationUsersComponent.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {OrganizationService} from "../../../../services/organizationService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import AddOrganizationUserDialog from "../AddOrganizationUserDialog/AddOrganizationUserDialog";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";

interface OrganizationUsersComponentProps {
}

const OrganizationUsersComponent: FC<OrganizationUsersComponentProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const organizationService = new OrganizationService();
    const [loading, setLoading] = useState(true);
    const [showAddOrganizationUserDialog, setShowAddOrganizationUserDialog] = useState(false);

    useEffect(() => {
        loadOrganizationEmployees()
    }, []);

    async function loadOrganizationEmployees() {
        try {
            setLoading(true);
            const retrievedOrganization = await organizationService.getOrganizationById(employer!.organizationId);
            setEmployer(prev => {
                return prev && {
                    ...prev,
                    organization: retrievedOrganization
                }
            })

        } catch (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false);
        }
    }

    return (
        loading ? <LoadingPage/> :
            <>
                <AddOrganizationUserDialog
                    showDialog={showAddOrganizationUserDialog}
                    setShowDialog={setShowAddOrganizationUserDialog}/>
                <div className={"light-grey-page-background"}>
                    <div className={"employers-centralized-page-layout"}>
                        <div className={"emp-pages-header mt1rem mb1rem"}>
                            <div>
                                <span className={"small-title mb0"}>Users</span>
                                <span
                                    className={"organization-owner light-dark-small-text"}>Organization owner {employer?.email}</span>
                            </div>
                            <button className={"blue-button"} onClick={() => setShowAddOrganizationUserDialog(true)}>
                                <FontAwesomeIcon className={"svg1rem mr05rem"} icon={faCirclePlus}/>
                                Add users
                            </button>
                        </div>
                        <div>
                            <div className={"flex-row organization-user-table-header"}>
                                <div className={"employee-email-box semi-dark-default-text bold-text"}>
                                    Users
                                </div>
                                <div className={"employee-access-box semi-dark-default-text bold-text"}>
                                    Access
                                </div>
                            </div>
                        </div>
                        {employer?.organization.employeeEmails.map((ee, index) => (
                            <div key={index}>
                                <div className={"flex-row employee-info"}>
                                    <div className={"employee-email-box"}>
                                        <span className={"dark-default-text"}>{ee.email}</span>
                                    </div>
                                    <div className={"employee-access-box"}>
                                        <span
                                            className={"dark-default-text"}>{ee.email == employer?.email ? "Owner" : "Hiring manager"}</span>
                                    </div>
                                </div>
                                <div className={"content-separation-line"}></div>
                            </div>
                        ))}


                    </div>
                </div>
            </>
    )
}

export default OrganizationUsersComponent;
