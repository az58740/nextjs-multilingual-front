"use client";

import { lusitana, vazir } from "@/app/ui/fonts";
import {
  UserIcon,
  PhoneIcon,
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  H2Icon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { useFormState } from "react-dom";
import { createUserWithCredentials } from "@/app/lib/actions";
import { systemDefault } from "../lib/theme";
import { useRouter } from "@/lib/i18n";
import * as m from "@/paraglide/messages.js";
import { languageTag } from "@/paraglide/runtime.js";
import { countries } from "../lib/countries";
import { useState } from "react";
import Select from "react-select";

export default function LoginForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(
    createUserWithCredentials,
    initialState
  );

  // State to manage form fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // State to manage active tab
  const [activeTab, setActiveTab] = useState<"username" | "email" | "phone">(
    "username"
  );
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");

  const handleCountryChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedCountryCode(selectedOption.value); // selectedOption.value is the dialCode
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form data validation
    if (password !== confirmPassword) {
      //return dispatch({ errors: { confirmPassword: ['Passwords do not match'] } });
    }

    // Prepare FormData for submission
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("username", username);
    formData.set("phoneNumber", selectedCountryCode + phoneNumber);
    formData.set("password", password);

    // Dispatch the formData (which is now a FormData instance)
    dispatch(formData);
  };

  const renderError = (field: string) => {
    // Ensure state.errors is defined
    const errors = state.errors || {}; // Fallback to an empty object if errors is undefined

    return (
      errors[field] && (
        <div className="mt-2 text-sm text-red-500">
          {errors[field].map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )
    );
  };

  return (
    <div
      className={`flex-1 rounded-lg ${systemDefault.container} px-6 pb-4 pt-0`}
    >
      <h2
        className={`${vazir.className} mb-3 pt-4 text-[14px] ${systemDefault.title}`}
      >
        {m.CreateAccountPageMessage()}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="w-full">
          {/* Name Input */}
          <div>
            <label
              className={`mb-1 mt-3 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
              htmlFor="name"
            >
              {m.Name()}
            </label>
            <input
              className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}`}
              id="name"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
            {renderError("name")}
          </div>
          <div>
            <label
              className={`mb-1 mt-3 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
              htmlFor="username"
            >
              {m.UserName()}
            </label>

            <p
              className={`pt-0 mb-3 block text-xs font-medium text-gray-900 ${systemDefault.text}`}
            >
              {m.UserNameDescription()}
            </p>

            <div className="flex space-x-2 w-full">
              {" "}
              {/* Increased space between items */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="email"
                  name="username"
                  value="email"
                  defaultChecked
                  className="mr-2"
                  aria-label="Email" // Added for better accessibility
                />
                <label htmlFor="email" className="text-xs text-gray-700">
                  {" "}
                  {/* Adjusted font size */}
                  {m.EmailButton()}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="phone"
                  name="username"
                  value="phone"
                  className="mr-2"
                  aria-label="Phone" // Added for better accessibility
                />
                <label htmlFor="phone" className="text-xs text-gray-700">
                  {m.PhoneButton()}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="special-username"
                  name="username"
                  value="special-username"
                  className="mr-2"
                  aria-label="Special Username" // Added for better accessibility
                />
                <label
                  htmlFor="special-username"
                  className="text-xs text-gray-700"
                >
                  {m.SpecialButton()}
                </label>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-between items-center space-x-2 mb-1 mt-1">
              <button
                type="button"
                className={`text-sm font-medium ${
                  activeTab === "email"
                    ? "text-blue-600 border-b-2 border-blue-600 shadow-lg"
                    : "text-gray-500 border-b-2 border-gray-600"
                } transition-all transform hover:scale-105 hover:shadow-md`}
                onClick={() => setActiveTab("email")}
              >
                {m.EmailButton()}
              </button>
              <button
                type="button"
                className={`text-sm font-medium ${
                  activeTab === "phone"
                    ? "text-blue-600 border-b-2 border-blue-600 shadow-lg"
                    : "text-gray-500 border-b-2 border-gray-600"
                } transition-all transform hover:scale-105 hover:shadow-md`}
                onClick={() => setActiveTab("phone")}
              >
                {m.PhoneButton()}
              </button>
              <button
                type="button"
                className={`text-sm font-medium ${
                  activeTab === "username"
                    ? "text-blue-600 border-b-2 border-blue-600 shadow-lg"
                    : "text-gray-500 border-b-2 border-gray-600"
                } transition-all transform hover:scale-105 hover:shadow-md`}
                onClick={() => setActiveTab("username")}
              >
                {m.SpecialButton()}
              </button>
            </div>

            {/* Conditional Rendering of Input Fields */}
            {activeTab === "username" && (
              <div>
                <label
                  htmlFor="specialusername"
                  className={`mb-1 mt-3 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
                >
                  {m.SpecialUserName()}
                </label>
                <input
                  className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}`}
                  id="specialusername"
                  type="text"
                  name="specialusername"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your special username"
                />
                {renderError("specialusername")}
              </div>
            )}

            {activeTab === "email" && (
              <div>
                <label
                  htmlFor="email"
                  className={`mb-1 mt-3 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
                >
                  {m.Email()}
                </label>
                <input
                  className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}`}
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
                {renderError("email")}
              </div>
            )}

            {activeTab === "phone" && (
              <div>
                <label
                  htmlFor="phone"
                  className={`mb-1 mt-3 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
                >
                  {m.Phone()}
                </label>
                <div className="flex items-center space-x-2 relative">
                  <Select
                    id="countrycode"
                    name="countrycode"
                    className={`rounded-md border w-full text-sm outline-none ${systemDefault.bg} ${systemDefault.text}`}
                    options={countries.map((country) => ({
                      ...country,
                      value: country.dialCode, // Use dial code as the value
                    }))}
                    getOptionLabel={(option: {
                      value: string;
                      code: string;
                      label: string;
                      flag: string;
                      dialCode: string;
                    }) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={option.flag}
                          alt={`${option.label} flag`}
                          style={{ width: "15px", marginRight: "8px" }}
                        />
                        {option.label} ({option.dialCode})
                      </div>
                    )}
                    onChange={handleCountryChange}
                    placeholder="Country"
                    isSearchable
                    filterOption={(candidate, input) => {
                      // Custom filtering logic: check if the input matches part of the country label
                      return candidate.data.label
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  />
                <input
  className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}`}
  id="phone"
  type="tel"
  name="phone"
  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} // Only allow numbers
  value={phoneNumber}  // Bind the value to state
  placeholder="Enter phone number"
/>
                </div>
                {renderError("phone")}
              </div>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="mt-2">
          <label
            htmlFor="password"
            className={`mt-3 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
          >
            {m.Password()}
          </label>
          <div className="relative">
            <input
              className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}`}
              id="password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              minLength={6}
            />
            <KeyIcon
              className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 ${systemDefault.inputIcon}`}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-2">
          <label
            htmlFor="confirm-password"
            className={`mb-2 block text-sm font-medium ${systemDefault.text}`}
          >
            {m.ConfirmPassword()}
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}`}
                aria-describedby="confirm-password-error"
              />
              <KeyIcon
                className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 ${systemDefault.inputIcon}`}
              />
            </div>
          </div>
        </div>

        {/* Password mismatch message */}
        {state.message && (
          <div
            className={`
                   flex items-end space-x-1
                   ${
                     state.message == "Passwords are different." ? "h-4" : "h-8"
                   } 
                   `}
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon
              className={`
                   ${
                     state.message == "Passwords are different."
                       ? "h-5"
                       : "h-10"
                   } 
                   w-5 text-red-500
                 `}
            />
            <p className="text-sm text-red-500">{state.message}</p>
          </div>
        )}

        <CreateAccountButton />
      </form>
      <ReturnToLoginPageButton />
    </div>
  );
}

function CreateAccountButton() {
  return (
    <Button className="mt-2 gap-5 w-full">
      <span>{m.CreateAccount()}</span>
      {languageTag() === "en" ? (
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      ) : (
        <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
      )}
    </Button>
  );
}

function ReturnToLoginPageButton() {
  const { replace } = useRouter();

  return (
    <Button className="mt-2 gap-5 w-full" onClick={() => replace("/login")}>
      {languageTag() === "en" ? (
        <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
      ) : (
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      )}
      <span>{m.ComeBacke()}</span>
    </Button>
  );
}
