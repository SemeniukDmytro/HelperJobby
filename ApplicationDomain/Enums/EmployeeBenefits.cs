namespace ApplicationDomain.Enums;

[Flags]
public enum EmployeeBenefits
{
    DentalCare = 1,
    ExtendedHealthCare = 1 << 1,
    LifeInsurance = 1 << 2,
    RRSPMatch = 1 << 3,
    PaidTimeOff = 1 << 4,
    OnSiteParking = 1 << 5,
    EmployeeAssistanceProgram = 1 << 6,
    VisionCare = 1 << 7,
    DisabilityInsurance = 1 << 8,
    CasualDress = 1 << 9,
    CompanyEvents = 1 << 10,
    StoreDiscount = 1 << 11,
    CompanyPension = 1 << 12,
    TuitionReimbursement = 1 << 13,
    WellnessProgram = 1 << 14,
    DiscountedOrFreeFood = 1 << 15,
    WorkFromHome = 1 << 16,
    ProfitSharing = 1 << 17,
    OnSiteGym = 1 << 18,
    EmployeeStockPurchasePlan = 1 << 19,
    RelocationAssistance = 1 << 20,
    CompanyCar = 1 << 21,
    StockOptions = 1 << 22,
    CommuterBenefits = 1 << 23,
    HousingAllowance = 1 << 24,
    AutomobileAllowance = 1 << 25,
    LanguageTrainingProvided = 1 << 26,
    OnSiteChildcare = 1 << 27,
    VRSP = 1 << 28,
    FlexibleSchedule = 1 << 29,
    Other = 1 << 30
}