import React, { memo } from "react";
import Select from "react-select";
import { languageOptions } from "../data/languageOptions.js";

const LanguagesDropdown = memo(({ onSelectChange, currValue }) => {

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#2d2d2d',
      border: '1px solid #3e3e3e',
      borderRadius: '6px',
      minHeight: '36px',
      '&:hover': {
        border: '1px solid #4a90e2',
      },
      boxShadow: state.isFocused ? '0 0 0 1px #4a90e2' : 'none',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e5e7eb',
      fontSize: '14px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '14px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2d2d2d',
      border: '1px solid #3e3e3e',
      borderRadius: '6px',
      zIndex: 50,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
      maxHeight: '300px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4a90e2' : 'transparent',
      color: state.isFocused ? '#ffffff' : '#e5e7eb',
      cursor: 'pointer',
      borderRadius: '4px',
      margin: '2px 0',
      fontSize: '14px',
      fontWeight: state.isSelected ? '600' : '400',
      '&:hover': {
        backgroundColor: '#4a90e2',
        color: '#ffffff',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#9ca3af',
      '&:hover': {
        color: '#e5e7eb',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    input: (provided) => ({
      ...provided,
      color: '#e5e7eb',
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