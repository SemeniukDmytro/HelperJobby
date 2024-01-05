import React, {FC, useEffect, useState} from 'react';
import "./EditContactInfoForm.scss";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {faArrowLeftLong, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../../hooks/useAuth";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import EditFormField from "../EditFormField/EditFormField";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";

interface EditContactInfoFormProps {}

const EditContactInfoForm: FC<EditContactInfoFormProps> = () => {
    const {authUser} = useAuth();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(true);
    const jobSeekerService = new JobSeekerAccountService;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (jobSeeker === null){
                    setLoading(true);
                    const jobSeeker = await jobSeekerService.getCurrentJobSeekerAllInfo();
                    setJobSeeker(jobSeeker);
                    setFirstName(jobSeeker.firstName);
                    setLastName(jobSeeker.lastName);
                    setPhoneNumber(jobSeeker.phoneNumber);
                }
            }
            catch (error){
                if (error instanceof ServerError){
                    logErrorInfo(error);
                }
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    
    return (
        loading ? <span>Loading...</span> :
        <PageWrapWithHeader>
          <div className={"edit-contact-layout"}>
              <div className={"back-button-header"}>
                  <button className={"back-button"}>
                      <FontAwesomeIcon icon={faArrowLeftLong}/>
                  </button>
              </div>
              <div className={"edit-form-layout"}>
                  <div className={"edit-contact-form-header"}>
                      <span>Contact information</span>
                  </div>
                  <form className={"edit-info-form"}>
                      <EditFormField fieldLabel={"First name"} isRequired={true} inputFieldValue={firstName} setInputFieldValue={setFirstName}/>
                      <EditFormField fieldLabel={"Last name"} isRequired={true} inputFieldValue={lastName} setInputFieldValue={setLastName}/>
                      <EditFormField fieldLabel={"Phone"} isRequired={false} inputFieldValue={phoneNumber} setInputFieldValue={setPhoneNumber}/>
                  </form>
                  <div className={"edit-email-layout"}>
                      <div className={"edit-email-label"}>
                          Email
                      </div>
                      <div className={"change-email-box"}>
                          <div className={"current-email"}>
                              {authUser?.user.email}
                          </div>
                          <a className={"change-email-link"}>
                              <span className={"edit-link"}>Edit</span>
                              <FontAwesomeIcon icon={faArrowRight} />
                          </a>
                      </div>
                  </div>
                  <div className={"edit-location-layout"}>
                      <div className={"edit-location-label"}>
                          Location
                      </div>
                      <div className={"edit-location-subtitle"}>
                          This helps match you with nearby jobs.
                      </div>
                  </div>
              </div>
          </div>
        </PageWrapWithHeader>
)
};

export default EditContactInfoForm;
