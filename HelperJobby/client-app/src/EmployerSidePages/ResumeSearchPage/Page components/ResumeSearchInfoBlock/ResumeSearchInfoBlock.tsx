import React, { FC } from 'react';
import './ResumeSearchInfoBlock.scss';
import {ResumeDTO} from "../../../../DTOs/resumeRelatedDTOs/ResumeDTO";

interface ResumeSearchInfoBlockProps {
    resume : ResumeDTO
}

const ResumeSearchInfoBlock: FC<ResumeSearchInfoBlockProps> = ({
    resume
                                                               }
) => (
  <div className="ResumeSearchInfoBlock">
      {resume.skills[0].name}
  </div>
);

export default ResumeSearchInfoBlock;
