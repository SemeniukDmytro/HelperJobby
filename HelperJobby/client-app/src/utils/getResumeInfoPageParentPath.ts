export function getResumeInfoPageParentPath(currentPath : string) : string {
    if (currentPath.includes("/preview")){
        return "/build/preview";
    }
    else if (currentPath.includes("/resume")){
        return "/resume";
    }
    else {
        return "/build";
    }
}