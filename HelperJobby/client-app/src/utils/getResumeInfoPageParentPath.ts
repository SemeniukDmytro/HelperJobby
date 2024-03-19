export function getResumeInfoPageParentPath(currentPath: string): string {
    if (currentPath.includes("/preview")) {
        return "/build/preview";
    } else if (currentPath.includes("/apply-resume")) {
        return "/apply-resume";
    } else if (currentPath.includes("/resume")) {
        return "/resume";
    } else {
        return "/build;"
    }
}