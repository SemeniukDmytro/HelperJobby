import React, {FC} from 'react';
import './SkillContainer.scss';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SkillContainerProps {
    skillName: string
    removeSkill: () => void
}

const SkillContainer: FC<SkillContainerProps> = ({skillName, removeSkill}) => (

    <div className={"skill-container"}>
        <div className={"skill-name"}>
            {skillName}
        </div>
        <button className={"remove-skill-button"} onClick={removeSkill}>
            <FontAwesomeIcon icon={faTrashCan}/>
        </button>
    </div>
);

export default SkillContainer;
