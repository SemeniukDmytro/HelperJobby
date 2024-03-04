import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './CustomSelectWindow.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import useSelectWindowPosition from "../../hooks/comnonentSharedHooks/useSelectWindowPosition";

interface CustomSelectWindowProps {
    fieldLabel: string;
    selectedValue: string;
    setSelectedValue: Dispatch<SetStateAction<string>>;
    optionsArr: string[];
    includeWindowScroll: boolean;
    innerLabel?: string;
    windowZIndex?: number;
}

const CustomSelectWindow: FC<CustomSelectWindowProps> = ({
                                                             fieldLabel,
                                                             selectedValue,
                                                             setSelectedValue,
                                                             optionsArr,
                                                             includeWindowScroll,
                                                             innerLabel,
                                                             windowZIndex
                                                         }) => {

    const [showOptions, setShowOptions] = useState(false);
    const selectWindowRef = useRef<HTMLDivElement>(null);
    const selectedValueButtonRef = useRef<HTMLButtonElement>(null);
    const getSelectWindowPosition = useSelectWindowPosition(selectedValueButtonRef, selectWindowRef, setShowOptions, includeWindowScroll);

    useEffect(() => {
        getSelectWindowPosition();
    }, [showOptions]);

    function handleLocationTypesClick() {
        setShowOptions(!showOptions);
    }


    function selectJobLocationTypeHandler(option: string) {
        setSelectedValue(option);
    }

    return (
        <>
            {showOptions && <div
                className={"select-window-container"}
                ref={selectWindowRef}
                style={{
                    width: selectedValueButtonRef.current?.getBoundingClientRect().width,
                    zIndex: windowZIndex
                }}

            >
                {optionsArr.map((option, index) => (
                    <div
                        key={index}
                        className={"select-option"}
                        onClick={() => selectJobLocationTypeHandler(option)}
                    >

                        <div className={"mr075rem ml05rem"}>
                            <FontAwesomeIcon
                                className={"svg075rem"}
                                style={{opacity: `${selectedValue === option ? "1" : "0"}`}}
                                icon={faCheck}
                            />
                        </div>
                        <div>
                            <span className="semi-dark-default-text unset-line-height mb025rem">
                                {option}
                            </span>
                        </div>
                    </div>
                ))}
            </div>}
            <div className={"edit-form-field"}>
                {fieldLabel.length != 0 && <div className={`field-label`}>
                    <span>{fieldLabel}</span>
                </div>}
                <div className={`field-input-container`}>
                    <div className={`border-lining`}/>
                    <button
                        className={"field-select field-select-button"}
                        type={"button"}
                        onClick={handleLocationTypesClick}
                        ref={selectedValueButtonRef}
                    >
                        <div className={"dark-default-text"}>
                            <b>{innerLabel}</b>
                            <span>{selectedValue}</span>
                        </div>
                        {showOptions ?
                            (<FontAwesomeIcon className={"svg1rem light-dark-svg"} icon={faChevronUp}/>)
                            :
                            (<FontAwesomeIcon className={"svg1rem light-dark-svg"} icon={faChevronDown}/>)
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default CustomSelectWindow;
