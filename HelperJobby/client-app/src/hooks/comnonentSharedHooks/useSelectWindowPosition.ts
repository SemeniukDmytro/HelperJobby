import {Dispatch, RefObject, SetStateAction, useCallback, useEffect} from 'react';

const useSelectWindowPosition = (
    inputFieldRef: RefObject<HTMLElement>,
    selectWindowRef: RefObject<HTMLElement>,
    setShowResults: Dispatch<SetStateAction<boolean>>,
    includeWindowScroll: boolean
) => {

    const getSelectWindowPosition = useCallback(() => {
        if (!inputFieldRef.current || !selectWindowRef.current) {
            return;
        }

        const inputRect = inputFieldRef.current.getBoundingClientRect();
        selectWindowRef.current.style.left = `${inputRect.left}px`;

        const windowScrollY = includeWindowScroll ? window.scrollY : 0;
        const viewPortHeight = window.innerHeight;

        if (viewPortHeight - inputRect.bottom > selectWindowRef.current.clientHeight) {
            selectWindowRef.current.style.top = `${inputRect.bottom + windowScrollY + 3}px`;
        } else {
            selectWindowRef.current.style.top = `${inputRect.top + windowScrollY - selectWindowRef.current.clientHeight - 6}px`;
        }
    }, [inputFieldRef, selectWindowRef]);

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const clickedElement = e.target as HTMLElement;
            if (!inputFieldRef.current?.contains(clickedElement)) {
                setShowResults(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        getSelectWindowPosition();

        const handleResize = () => {
            getSelectWindowPosition();
        };

        window.addEventListener('scroll', getSelectWindowPosition);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', getSelectWindowPosition);
            window.removeEventListener('resize', handleResize);
        };
    }, [getSelectWindowPosition]);

    return getSelectWindowPosition;
};

export default useSelectWindowPosition;