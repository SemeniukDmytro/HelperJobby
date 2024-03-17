import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './DescriptionInputWindow.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBold, faCircleExclamation, faListUl} from "@fortawesome/free-solid-svg-icons";
import {faItalic} from "@fortawesome/free-solid-svg-icons/faItalic";
import {isValidDescription} from "../../utils/validationLogic/isValidDescription";

interface DescriptionInputWindowProps {
    jobDescription : string,
    setJobDescription: Dispatch<SetStateAction<string>>;
    descriptionInputRef: React.RefObject<HTMLInputElement>;
    descriptionError : string;
    setDescriptionError : Dispatch<SetStateAction<string>>;
    isInvalidDescription : boolean;
    setIsInvalidDescription : Dispatch<SetStateAction<boolean>>;
}

const DescriptionInputWindow: FC<DescriptionInputWindowProps> = ({
    jobDescription,
    setJobDescription,
    descriptionInputRef,
    setDescriptionError,
    descriptionError,
    isInvalidDescription,
    setIsInvalidDescription
                                                                 }
) => {
    const [isBoldText, setIsBoldText] = useState(false);
    const [isItalicText, setIsItalicText] = useState(false);
    const [isUnorderedList, setIsUnorderedList] = useState(false);

    useEffect(() => {
        const descriptionInput = descriptionInputRef.current;
        if (descriptionInput) {
            descriptionInput.addEventListener('keyup', checkTextFormatting);
            descriptionInput.addEventListener('click', checkTextFormatting);

            checkTextFormatting();
        }

        return () => {
            if (descriptionInput) {
                descriptionInput.removeEventListener('keyup', checkTextFormatting);
                descriptionInput.removeEventListener('click', checkTextFormatting);
            }
        };
    }, []);

    const checkTextFormatting = () => {
        const isBold = document.queryCommandState('bold');
        setIsBoldText(isBold);
        const isItalic = document.queryCommandState('italic');
        setIsItalicText(isItalic);
        const isInUnorderedList = document.queryCommandState('insertUnorderedList');
        setIsUnorderedList(isInUnorderedList);
    };

    function changeDescriptionValue(event: React.FormEvent<HTMLDivElement>) {
        isValidDescription(event.currentTarget.innerHTML, setDescriptionError, setIsInvalidDescription);
        setJobDescription(event.currentTarget.innerHTML);
    }

    function applyFormat(command: string) {
        switch (command){
            case "bold":
                setIsBoldText(!isBoldText);
                break;
            case "italic":
                setIsItalicText(!isItalicText);
                break;
            case "insertUnorderedList" :
                setIsUnorderedList(!isUnorderedList);
                break;
                
        }
        document.execCommand(command, false);
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const allowedShortcuts = ['x', 'c', 'v', 'a', 'z', 'y', 'i', 'b'];

        if ((e.ctrlKey || e.metaKey) && !allowedShortcuts.includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
    };

    return (
        <div className={"description-container"}>
            <div
                className={`small-title horizontal-title ${isInvalidDescription ? "error-text" : ""}`}
                style={{marginBottom: "0.25rem"}}
            >
                <span>Job description</span>
                <span className={"error-text"}>&nbsp;*</span>
            </div>
            <div style={{position: "relative", marginTop: "0.5rem"}}>
                <div className={"format-panel-container"}>
                    <button
                        type={"button"}
                        onClick={() => applyFormat('bold')}
                        className={`text-styling-option-container left-styling-option ${isBoldText ? "text-styling-option-selected" : ""}`}>
                        <FontAwesomeIcon className={"dark-default-text svg1rem"} icon={faBold}/>
                    </button>
                    <button
                        type={"button"}
                        onClick={() => applyFormat('italic')}
                        className={`text-styling-option-container ${isItalicText ? "text-styling-option-selected" : ""}`}>
                        <FontAwesomeIcon className={"dark-default-text svg1rem"} icon={faItalic}/>
                    </button>
                    <button
                        type={"button"}
                        onClick={() => applyFormat('insertUnorderedList')}
                        className={`text-styling-option-container ${isUnorderedList ? "text-styling-option-selected" : ""}`}>
                        <FontAwesomeIcon className={"dark-default-text svg1rem"} icon={faListUl}/>
                    </button>
                </div>
                <div
                    role={"textbox"}
                    contentEditable={true}
                    ref={descriptionInputRef}
                    className={`description-input description-input-with-format-panel ${isInvalidDescription ? "red-field-focus" : ""}`}
                    onInput={changeDescriptionValue}
                    onBlur={() => isValidDescription(jobDescription, setDescriptionError, setIsInvalidDescription)}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                >
                </div>
                <div className={`description-focused ${isInvalidDescription ? "red-field-focus" : ""}`}></div>
            </div>
            {isInvalidDescription &&
                <div className={"error-box"}>
                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                    <span className={"error-text"}>{descriptionError}</span>
                </div>
            }
        </div>
    )
}

export default DescriptionInputWindow;
