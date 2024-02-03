export function checkMinimalSalary(salary: number, salaryRate: string): boolean {
    switch (salaryRate.toLowerCase()) {
        case "per hour":
            return salary > 16.65;
        case "per day":
            return salary > 100;
        case "per week":
            return salary > 494;
        case "per month":
            return salary > 2000;
        case "per year":
            return salary > 24000;
        default:
            return false;
    }
}
