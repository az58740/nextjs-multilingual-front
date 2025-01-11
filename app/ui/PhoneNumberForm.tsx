// components/PhoneNumberForm.tsx
import React, { useState } from 'react';
import Select from 'react-select';
import { countries } from '../lib/countries';
import * as m from "@/paraglide/messages.js";
import { languageTag } from "@/paraglide/runtime.js"
import { systemDefault } from '../lib/theme';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';

type CountryOption = {
    code: string;
    label: string;
    flag: string;
    dialCode: string;
};

const PhoneNumberForm: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleCountryChange = (country: CountryOption | null) => {
        setSelectedCountry(country);
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedCountry && phoneNumber) {
            alert(`Dialing ${selectedCountry.dialCode}${phoneNumber}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 relative">
            <Select
                    id="country"
                    className="rounded-md border border-gray-200 py-[9px] text-sm outline-none"                    options={countries.map(country => ({
                        ...country,
                        value: country.dialCode // Use dial code as the value
                    }))}
                    getOptionLabel={(option) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={option.flag}
                                alt={`${option.label} flag`}
                                style={{ width: '20px', marginRight: '8px' }}
                            />
                          ({option.dialCode})
                        </div>
                    )}
                    onChange={handleCountryChange}
                    placeholder="country"
                />
              <input
                className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg}
                  ${systemDefault.text}
                `}
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
              <PhoneIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] 
                w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${systemDefault.inputIcon}
              `}/>
            </div>
        </form>
    );
};

export default PhoneNumberForm;