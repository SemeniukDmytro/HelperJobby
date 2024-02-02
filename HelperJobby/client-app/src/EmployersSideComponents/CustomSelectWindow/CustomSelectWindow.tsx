import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './CustomSelectWindow.scss';
import useSelectWindowPosition from "../../hooks/useSelectWindowPosition";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

interface CustomSelectWindowProps {
    fieldLabel: string;
    selectedValue: string;
    setSelectedValue: Dispatch<SetStateAction<string>>;
    optionsArr: string[];
}

const CustomSelectWindow: FC<CustomSelectWindowProps> = ({
                                                             fieldLabel,
                                                             selectedValue,
                                                             setSelectedValue,
                                                             optionsArr
                                                         }) => {

    const [showOptions, setShowOptions] = useState(false);
    const selectWindowRef = useRef<HTMLDivElement>(null);
    const selectedValueButtonRef = useRef<HTMLButtonElement>(null);
    const getSelectWindowPosition = useSelectWindowPosition(selectedValueButtonRef, selectWindowRef, setShowOptions);

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
                className={"jloc-types-window"}
                ref={selectWindowRef}
                style={{
                    width : selectedValueButtonRef.current?.getBoundingClientRect().width
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
                            <span className="dark-default-text unset-line-height mb025rem">
                                {option}
                            </span>
                        </div>
                    </div>
                ))}
            </div>}
            <div className={"edit-form-field"}>
                <div className={`field-label`}>
                    <span>{fieldLabel}</span>
                </div>
                <div className={`field-input-container`}>
                    <div className={`border-lining`}/>
                    <button
                        className={"field-select field-select-button"}
                        type={"button"}
                        onClick={handleLocationTypesClick}
                        ref={selectedValueButtonRef}
                    >
                        <span>{selectedValue}</span>
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
