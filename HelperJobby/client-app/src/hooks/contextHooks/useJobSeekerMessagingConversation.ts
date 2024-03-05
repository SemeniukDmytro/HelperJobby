import {useContext} from "react";
import JobSeekerMessagingConversationContext from "../../contexts/JobSeekerMessaginConversationContext";

export function useJobSeekerMessagingConversation(){
    return useContext(JobSeekerMessagingConversationContext);
}