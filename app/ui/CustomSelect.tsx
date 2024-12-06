'use client';

import React, { useState } from 'react';
import styles from './CustomSelect.module.css'; // Import your CSS styles
import { availableLanguageTags, AvailableLanguageTag, languageTag } from "@/paraglide/runtime"
import { usePathname, useRouter } from "@/lib/i18n"
import { Route } from "next"
import CountryFlag from 'react-country-flag';

const options = [
  { value: 'apple', label: 'Apple', image: '/flags/united.svg' },
  { value: 'banana', label: 'Banana', image: '/flags/united.svg' },
  { value: 'cherry', label: 'Cherry', image: '/flags/united.svg' },
];

const CustomSelect = () => {
    const pathname = usePathname() as Route
	const router = useRouter()
    
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: React.SetStateAction<{ value: string; label: string; image: string; }>) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect}>
      <div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
        <img src={selectedValue.image} alt={selectedValue.label} className={styles.selectedImage} />
        <span>{selectedValue.label}</span>
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              <img src={option.image} alt={option.label} className={styles.optionImage} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;