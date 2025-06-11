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
        border: '1px solid rgba(16, 185, 129, 0.5)',
      },
      boxShadow: state.isFocused ? '0 0 0 1px rgba(16, 185, 129, 0.5)' : 'none',
      backdropFilter: 'blur(4px)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e2e8f0',
      fontSize: '14px',
      fontWeight: '500',
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
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
      maxHeight: '300px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
      color: state.isFocused ? '#e2e8f0' : '#cbd5e1',
      cursor: 'pointer',
      borderRadius: '0.375rem',
      margin: '2px 0',
      fontSize: '14px',
      fontWeight: state.isSelected ? '600' : '400',
      '&:hover': {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
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
    input: (provided) => ({
      ...provided,
      color: '#e2e8f0',
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