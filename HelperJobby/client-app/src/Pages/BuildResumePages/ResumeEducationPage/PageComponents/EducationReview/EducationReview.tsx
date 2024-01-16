import React, { FC } from 'react';
import './EducationReview.scss';
import {EducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/EducationDTO";

interface EducationReviewProps {
    education : EducationDTO;
}

const EducationReview: FC<EducationReviewProps> = () => (
  <div className="EducationReview">
    EducationReview Component
  </div>
);

export default EducationReview;
