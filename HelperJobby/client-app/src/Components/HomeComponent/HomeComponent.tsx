import React, {FC, useEffect, useRef, useState} from 'react';
import PublicHomePageHeader from "../PublicHomePageHeader/PublicHomePageHeader";
import "./HomeComponent.scss";
import JobSearchBar from "../JobSearchBar/JobSearchBar";
import JobSearchPromoContainer from "../JobSearchPromoContainer/JobSearchPromoContainer";
import ShortJobDescriptionBlock from "../ShortJobDescriptionBlock/ShortJobDescriptionBlock";
import {useHomePage} from "../../hooks/useHomePage";
import JobDescriptionHeader from "../JobDescriptionHeader/JobDescriptionHeader";
import JobDetailsScrollWindow from "../JobDetailsScrollWindow/JobDetailsScrollWindow";
import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";
import {RecommendationService} from "../../services/recommendationService";
import {useAuth} from "../../hooks/useAuth";


interface HomeComponentProps {}

const HomeComponent: FC<HomeComponentProps> = () => {

    const [stickyHeight, setStickyHeight] = useState(361.2);
    const mainContentRef = useRef<HTMLDivElement | null>(null);
    const {setMainContentRef} = useHomePage();
    const [recommendedJobs, setRecommendedJobs] = useState<JobDTO[]>([]);
    const recommendationService = new RecommendationService();
    const [loading, setLoading] = useState(true);
    const {authUser} = useAuth();
    console.log(JSON.stringify(`We are looking for Warehouse Associate to join our team to help serve our large customer base.

What we offer:

The opportunity to work with the best equipment and team in the industry while starting your HVAC career;
Opportunities for mentorship to kick-start your career in HVAC;
Training opportunities to further develop your technical skills.
He/she will either:

Running stock to technicians in the field and picking up inventory
Stock and inventory control, including pricing, stocking and cleanliness
Order and follow-up on parts
Obtain quotes on building and tool repairs
Pick, pack and ship network parts to other locations (may include physical delivery as well)
Assist Purchaser as required
Education/Experience/Skills

Valid drivers license, with clean driving record
Able to perform physical work (bending, lifting, carrying, climbing ladders/stairs, loading/unloading) parts up to 50 pounds in weight
Experience in warehousing, ordering and receiving (asset)
Strong interpersonal and customer relations skills
Strong computer literacy, with previous administrative and accounting experience
Proven ability to effectively manage time and organize and complete tasks.
Benefits

We expect a lot from our employees. That's why we're committed to providing them with industry-leading benefits and compensation that help them get better at their job, while providing for their families, which include:

Competitive compensation
Excellent benefits package
Group RRSP
Opportunity for growth
Does this sound like the job for you? If you have the qualifications above, we want to hear from you!

Please let us know of any accommodations required in preparation of your visit.

We are an equal opportunity employer

Please note that this position requires a Criminal Background Check be completed for potential candidates - paid by employer. This check must be satisfactory in order for an employment offer to be extended unconditionally.

Job Type: Full-time

Licence/Certification:

Driving Licence (required)
Work Location: In person`))

    const updateStickyHeight = () => {
        let newHeight = 361.2 + window.scrollY;
        if (newHeight > 698){
            setStickyHeight(698)
        }
        else{
            setStickyHeight(newHeight);
        }
    };
    
    useEffect(() => {
        updateStickyHeight();
        const handleScroll = () => {
            updateStickyHeight();
        };
        window.addEventListener('scroll', handleScroll); 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [stickyHeight]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([handleMainContentRef(), loadRecommendationJobs()]);
            setLoading(false);
        };

        fetchData();
    }, []);
    const handleMainContentRef = () => {
        setMainContentRef(mainContentRef);
    };
    
    async function loadRecommendationJobs(){
        const retrievedJobs = await recommendationService.getRandomJobs();
        setRecommendedJobs(retrievedJobs);
    }

    return (
        loading ? (
            <div>Loading...</div>
            ) : 
        (
            <div className={"job-search-layout"}>
            <PublicHomePageHeader></PublicHomePageHeader>
            <div className={"header-and-main-content-separator"}></div>
            <div className={"main-content"}  ref={mainContentRef}>
                <JobSearchBar/>
                <JobSearchPromoContainer/>
                <div className={"search-results-container"}>
                    <nav className={"search-results-navbar"}>
                        <button className={"tab-container"}>
                            <span className={"tab-name"}>Job feed</span>
                            <div className={"search-underline"}></div>
                        </button>
                        <button className={"tab-container"}>
                            <span className={"tab-name"}>New results for recent searches</span>
                        </button>
                    </nav>
                    <div className={"jobs-container"}>
                        <div className={"short-job-descriptions-column"}>
                            <div className={"title-container"}>
                                <span>Jobs based on your activity on indeed</span>
                            </div>
                            {recommendedJobs.map((job, index) => (
                                <ShortJobDescriptionBlock key={index} job={job}></ShortJobDescriptionBlock>
                            ))}
                        </div>
                        <div className={"detailed-description-column"}>
                            <div style={{height : `${stickyHeight}px`}} className={"detailed-description-sticky"}>
                                <div className={"detailed-description-content-box"}>    
                                    <JobDescriptionHeader></JobDescriptionHeader>
                                    <JobDetailsScrollWindow></JobDetailsScrollWindow>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        )
    )
};

export default HomeComponent;
