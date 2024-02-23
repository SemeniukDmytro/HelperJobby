import {Dispatch, RefObject, SetStateAction} from "react";

export function handleJobFeaturesListAppearance(showFullFeaturesList : boolean,
                                                setShowFullFeaturesList: Dispatch<SetStateAction<boolean>>,
                                                setListBoxHeight : Dispatch<SetStateAction<string>>,
                                                featuresListRef :  RefObject<HTMLUListElement>) {
    if (showFullFeaturesList){
        setShowFullFeaturesList(false);
        setListBoxHeight("78px");
    }
    else {
        setShowFullFeaturesList(true);
        const benefitsListRefBoundingRect = featuresListRef.current?.getBoundingClientRect();
        setListBoxHeight(`${benefitsListRefBoundingRect?.height}px`)
    }
}