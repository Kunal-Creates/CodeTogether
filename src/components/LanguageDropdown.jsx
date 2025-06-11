import React, { memo } from "react";
import Select from "react-select";
import { languageOptions } from "../data/languageOptions.js";

const LanguagesDropdown = memo(({ onSelectChange, currValue }) => {

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(51, 65, 85, 0.5)',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      borderRadius: '0.5rem',
      minHeight: '42px',
      '&:hover': {
        border: '1px solid rgba(99, 102, 241, 0.5)',
      },
      boxShadow: state.isFocused ? '0 0 0 1px rgba(99, 102, 241, 0.5)' : 'none',
      backdropFilter: 'blur(4px)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e2e8f0',
      fontSize: '14px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#94a3b8',
      fontSize: '14px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      borderRadius: '0.5rem',
      backdropFilter: 'blur(8px)',
      zIndex: 50,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
      color: state.isFocused ? '#e2e8f0' : '#cbd5e1',
      cursor: 'pointer',
      borderRadius: '0.375rem',
      margin: '2px 0',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        color: '#e2e8f0',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#94a3b8',
      '&:hover': {
        color: '#e2e8f0',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <Select
      aria-label="Language Dropdown"
      placeholder="Select a language..."
      styles={customStyles}
      options={languageOptions}
      value={currValue ? currValue : null}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
      isSearchable={true}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
});

export default LanguagesDropdown;