export default function getJobSearchRequestURI(query: string, jobLocation: string, start: number, isRemote: boolean, pay: number, jobType: number, language: string): string {
    const remoteParam = isRemote ? `&isRemote=${isRemote}` : "";
    const locationParam = jobLocation ? `&location=${jobLocation}` : "";
    const startParam = start === 0 ? "" : `&start=${start}`;
    const payParam = pay === 0 ? "" : `&pay=${pay}`;
    const jobTypeParam = jobType === 0 ? "" : `&jobType=${jobType}`;
    const languageParam = language ? `&language=${language}` : "";
    return `/jobs?q=${query}${locationParam}${remoteParam}${startParam}${payParam}${jobTypeParam}${languageParam}`;
}