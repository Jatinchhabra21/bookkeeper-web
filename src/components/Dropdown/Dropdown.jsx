import React, { useRef, useState } from 'react';
import './dropdown.css';

export default function Dropdown(props) {
  const optionContainerRef = useRef();
  const selectedOptionRef = useRef();
  const [toggleOptionContainer, setToggleOptionContainer] = useState(false);
  const options = [
    'monochrome',
    'monochrome dark',
    'monochrome light',
    'analogic',
    'complement',
    'analogic complement',
    'triad',
    'quad',
  ];
  let currentSelectedOption = '';

  function selectSchemeMode() {
    optionContainerRef.current.style.visibility = toggleOptionContainer
      ? 'visible'
      : 'hidden';
    const selectedMode = selectedOptionRef?.dataset?.value;
    const optionContainerChildren = Array.from(
      optionContainerRef.current.children
    );
    currentSelectedOption = optionContainerChildren.filter(
      (childElement) => childElement.dataset.value === selectedMode
    )[0];
    setToggleOptionContainer((prevVal) => !prevVal);
  }

  function selectOption(event) {
    selectedOptionRef.current.innerText =
      event.target.innerText.split('\n').length > 1
        ? selectedOptionRef.current.innerText
        : event.target.innerText;
    selectedOptionRef.current.dataset.value = event.target.dataset.value
      ? event.target.dataset.value
      : selectedOptionRef.current.dataset.value;
    currentSelectedOption = event.target;
  }

  return (
    <div
      id="scheme-mode"
      className="mode-select-box"
      name="scheme-mode"
      onClick={selectSchemeMode}
    >
      <div
        className="selected-option"
        id="selected-option"
        data-value="monochrome"
        ref={selectedOptionRef}
      >
        monochrome
      </div>
      <div
        className="option-container"
        id="option-container"
        onClick={selectOption}
        ref={optionContainerRef}
      >
        {options.map((val, i) => {
          return (
            <div key={i} data-value={val} className="option">
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
}
