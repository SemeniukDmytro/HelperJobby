import React, { FC } from 'react';
import './JobApplyContactInfoComponent.scss';
import JobApplyJobInfoWrap from "../../../SharedComponents/JobApplyJobInfoWrap/JobApplyJobInfoWrap";

interface JobApplyContactInfoComponentProps {}

const JobApplyContactInfoComponent: FC<JobApplyContactInfoComponentProps> = () => (
  <JobApplyJobInfoWrap>
      <div>
          Contact info
      </div>
  </JobApplyJobInfoWrap>
);

export default JobApplyContactInfoComponent;
