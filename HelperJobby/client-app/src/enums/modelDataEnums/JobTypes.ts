enum JobTypes {
    FullTime = 1,
    PartTime = 1 << 1,
    Permanent = 1 << 2,
    FixedTermContract = 1 << 3,
    Casual = 1 << 4,
    Seasonal = 1 << 5,
    Freelance = 1 << 6,
    Apprenticeship = 1 << 7,
    InternshipCoop = 1 << 8,
    Contract = 1 << 9
}

export default JobTypes;