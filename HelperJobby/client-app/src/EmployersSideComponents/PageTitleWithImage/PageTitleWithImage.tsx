import React, {FC, ReactElement} from 'react';
import './PageTitleWithImage.scss';

interface PageTitleWithImageProps {
    imageElement: ReactElement;
    title: string;
}

const PageTitleWithImage: FC<PageTitleWithImageProps> = ({
                                                             imageElement,
                                                             title
                                                         }) => (
    <div className={"ems-title-with-img-fb mb2rem"}>
        <div className={"ems-title-fb"}>
            <span className={"semi-dark-default-text ems-title"}>{title}</span>
        </div>
        <div className={"ems-image-fb"}>
            {imageElement}
        </div>
    </div>
);

export default PageTitleWithImage;
