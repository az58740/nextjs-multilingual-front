"use client";

import { lusitana, vazir } from "@/app/ui/fonts";
import {
  UserIcon,
  PhoneIcon,
  AtSymbolIcon,
  EyeIcon,
  EyeDropperIcon,
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
import { AvailableLanguageTag, languageTag } from "@/paraglide/runtime.js";
import { countries } from "../lib/countries";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import Select from "react-select";
import clsx from "clsx";
import { string } from "zod";

const direction: Record<AvailableLanguageTag, "ltr" | "rtl"> = {
  en: "ltr",
  fa: "rtl",
  ar: "rtl",
};
const isRtl = direction[languageTag()];

// Define form state and actions
type FormState = {
  message: string | null;
  errors: Record<string, string[]>;
  successMessages: Record<string, string>; // Store success messages by field
};

type Action =
  | { type: "set_error"; field: string; message: string }
  | { type: "clear_error"; field: string }
  | { type: "set_success"; field: string; message: string }
  | { type: "clear_success"; field: string };

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "set_error":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: [action.message],
        },
      };

    case "clear_error":
      const newErrors = { ...state.errors };
      delete newErrors[action.field];
      return { ...state, errors: newErrors };

    case "set_success":
      return {
        ...state,
        successMessages: {
          ...state.successMessages,
          [action.field]: action.message,
        },
      };

    case "clear_success":
      const newSuccessMessages = { ...state.successMessages };
      delete newSuccessMessages[action.field];
      return { ...state, successMessages: newSuccessMessages };

    default:
      return state;
  }
};

export default function LoginForm() {
  const initialState: FormState = {
    message: null,
    errors: {},
    successMessages: {},
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  // State to manage form fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [specialusername, setSpecialusername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameType, setUsernameType] = useState<
    "email" | "phone" | "special-username"
  >("email"); // Track selected username type
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!isConfirmPasswordVisible);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    dispatch({
      type: "clear_error",
      field: "form",
    });

    // Validate if at least one of email, phoneNumber, or specialusername is provided
    if (email === "" && phoneNumber.length <= 3 && specialusername === "") {
      dispatch({
        type: "set_error",
        field: "form",
        message:
          "Please enter one of the following: email, phone number, or special username.",
      });
      return; // Stop further execution if validation fails
    }

    // Ensure password and confirmPassword match
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      dispatch({
        type: "set_error",
        field: "form",
        message:
          "Passwords do not match! Please enter both password and confirm password.",
      });
      return; // Stop further execution if validation fails
    }

    // Prepare FormData for submission
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phoneNumber", selectedCountryCode + phoneNumber);

    // Set username based on selected type
    let username = "";

    if (usernameType === "phone" && phoneNumber.length > 3) {
      username = selectedCountryCode + phoneNumber;
    } else if (usernameType === "email" && email !== "") {
      username = email;
    } else if (usernameType === "special-username" && specialusername !== "") {
      username = specialusername;
    } else {
      // If none of the conditions are met, set an error and stop execution
      dispatch({
        type: "set_error",
        field: "form",
        message:
          "Invalid username selection. Please provide a valid email, phone number, or special username.",
      });
      return;
    }

    formData.set("username", username);
    formData.set("password", password);
    formData.set("confirm-password", confirmPassword);

    try {
      const response = await createUserWithCredentials(initialState, formData);

      if (!response?.errors) {
        console.log("User created successfully!")
        // Handle successful creation
        dispatch({
          type: "set_error",
          field: "form",
          message: "User created successfully!",
        });
      } else {
        // Handle backend validation errors (display errors for specific fields)
        let errorMessage = "";
        const fieldErrors: string[] = [];

        // Check for and collect error messages, ensuring each field error is only added once
        if (response.errors.name)
          fieldErrors.push(`Name Error: ${response.errors.name}`+"\n");
        if (response.errors.email)
          fieldErrors.push(`Email Error: ${response.errors.email}`+"\n");
        if (response.errors.phone)
          fieldErrors.push(`Phone Number Error: ${response.errors.phone}`+"\n");
        if (response.errors.username)
          fieldErrors.push(`User Name Error: ${response.errors.username}`+"\n");
        if (response.errors.password)
          fieldErrors.push(`Password Error: ${response.errors.password}`+"\n");

        // Join all the error messages with a newline separator
        errorMessage = fieldErrors.join("\n");

        if (errorMessage) {
          dispatch({
            type: "set_error",
            field: "form",
            message: errorMessage,
          });
        }
      }
    } catch (error) {
      // Handle general error
      dispatch({
        type: "set_error",
        field: "form",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  // Handle country selection change
  const handleCountryChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedCountryCode(selectedOption.value);
    }
  };

  // Handle pasword  validation
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPassword(value);
    if (
      value.length >= 6 &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*]).{8,}$/.test(value)
    ) {
      dispatch({ type: "clear_error", field: "password" });
    } else {
      dispatch({
        type: "set_error",
        field: "password",
        message: "The password does not meet the minimum security requirements",
      });
    }
  };
  // Handle special username validation
  const handleSpecialUsernameChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setSpecialusername(value);
    setUserName(value);
    if (value.length >= 5 && /^[a-zA-Z0-9_]*$/.test(value)) {
      dispatch({ type: "clear_error", field: "specialusername" });
    } else {
      dispatch({
        type: "set_error",
        field: "specialusername",
        message:
          "Username must be at least 5 characters long and contain only letters, numbers, and underscores.",
      });
    }
  };
  // Handle email validation
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    if (
      value.length >= 5 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ) {
      dispatch({ type: "clear_error", field: "email" });
    } else {
      dispatch({
        type: "set_error",
        field: "email",
        message: "Invalid email format",
      });
    }
  };
  //Compare password with confirm-password
  const ComparePasswordAndConfirmPassword = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setConfirmPassword(value); // Update the confirm password state

    // Compare directly with the input value (instead of the state value)
    if (password !== value) {
      dispatch({
        type: "set_error",
        field: "confirm-password",
        message: "Passwords do not match.",
      });
    } else {
      dispatch({
        type: "clear_error",
        field: "confirm-password",
      });
    }
  };
  // Handle special username validation
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // Remove any non-digit characters
    const rawValue = e.target.value.replace(/[^0-9]/g, "");

    // If the raw value has 10 digits, it's a valid phone number
    if (rawValue.length === 10) {
      setPhoneNumber(rawValue); // Update the formatted phone number in the state
      dispatch({ type: "clear_error", field: "phone" }); // Clear any previous error
    } else {
      // If the raw value is not 10 digits, show an error message
      setPhoneNumber(rawValue); // Still update the state with the formatted value
      dispatch({
        type: "set_error",
        field: "phone",
        message: "Phone number must be exactly 10 digits.",
      });
    }
  };

  //Render Errore
  const renderError = (field: string) => {
    const errors = state.errors || {};
    return (
      errors[field] && (
        <div className="mt-2 text-sm text-red-500">
          {errors[field].map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )
    );
  };
  //Render Errore
  const renderSuccess = (field: string) => {
    const errors = state.errors || {};
    return (
      errors[field] && (
        <div className="mt-2 text-sm text-green-500">
          {errors[field].map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )
    );
  };

  // Set default country code
  useEffect(() => {
    if (countries && countries.length > 0) {
      setSelectedCountryCode(countries[0].dialCode); // Default to first country's dialCode
    }
  }, [countries]);

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={data.flag}
          alt={`${data.label} flag`}
          style={{ width: "15px", marginRight: "8px" }}
        />
        {data.label} ({data.dialCode})
      </div>
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
              value={name}
              placeholder="Enter your full name"
              required
            />
            {renderError("name")}
          </div>

          {/* Username Input */}
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
              <div className="flex items-center">
                <input
                  type="radio"
                  id="email"
                  name="username"
                  value="email"
                  checked={usernameType === "email"}
                  onChange={() => setUsernameType("email")}
                  className="mr-2"
                />
                <label htmlFor="email" className="text-xs text-gray-700">
                  {m.EmailButton()}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="phone"
                  name="username"
                  value="phone"
                  checked={usernameType === "phone"}
                  onChange={() => setUsernameType("phone")}
                  className="mr-2"
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
                  checked={usernameType === "special-username"}
                  onChange={() => {
                    setUsernameType("special-username");
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor="special-username"
                  className="text-xs text-gray-700"
                >
                  {m.SpecialButton()}
                </label>
              </div>
            </div>

            {/* Special Username Input */}
            {usernameType === "special-username" && (
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
                  onChange={handleSpecialUsernameChange}
                  value={specialusername}
                  placeholder="Enter unique username(e.g.Starry_Adventurer)"
                />
                {renderError("specialusername")}
              </div>
            )}

            {/* Email Input */}
            {usernameType === "email" && (
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
                  onChange={handleEmailChange}
                  value={email}
                  placeholder="Enter your email address"
                />
                {renderError("email")}
              </div>
            )}

            {/* Phone Input */}
            {usernameType === "phone" && (
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
                    value={countries.find(
                      (country) => country.dialCode === selectedCountryCode
                    )}
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
                    }) => `${option.label} (${option.dialCode})`} // Return a string for filtering and accessibility
                    components={{ Option: CustomOption }} // Use the custom option component for rendering
                    onChange={handleCountryChange}
                    placeholder="Country"
                    isSearchable
                    filterOption={(candidate, input) => {
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
                    maxLength={10}
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber} // Ensure the value is bound to the state
                    placeholder="Enter phone number"
                  />
                </div>
                {renderError("phone")}
              </div>
            )}
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
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handlePasswordChange}
                placeholder="Enter password"
                required
                minLength={6}
                className={clsx(
                  "peer block w-full rounded-md border border-gray-200 ${systemDefault.border} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}",
                  {
                    "bg-left-bottom": direction[languageTag()] === "ltr",
                    "bg-right-bottom": direction[languageTag()] === "rtl",
                  }
                )}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={clsx(
                  {
                    "absolute left-3": direction[languageTag()] === "rtl",
                    "absolute right-3": direction[languageTag()] === "ltr",
                  },
                  " top-1/2 -translate-y-1/2"
                )}
              >
                {isPasswordVisible ? (
                  <EyeDropperIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            {renderError("password")}
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
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  onChange={ComparePasswordAndConfirmPassword}
                  value={confirmPassword}
                  placeholder="Confirm password"
                  className={clsx(
                    "peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg} ${systemDefault.text}",
                    {
                      "bg-left-bottom": direction[languageTag()] === "ltr",
                      "bg-right-bottom": direction[languageTag()] === "rtl",
                    }
                  )}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={clsx(
                    {
                      "absolute left-3": direction[languageTag()] === "rtl",
                      "absolute right-3": direction[languageTag()] === "ltr",
                    },
                    " top-1/2 -translate-y-1/2"
                  )}
                >
                  {isConfirmPasswordVisible ? (
                    <EyeDropperIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
              {renderError("confirm-password")}
            </div>
          </div>
        </div>
        {/* Password mismatch message */}
        {state.message && (
          <div
            className={`flex items-end space-x-1 ${
              state.message == "Passwords are different." ? "h-4" : "h-8"
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className={`h-5 w-5 text-red-500`} />
            <p className="text-sm text-red-500">{state.message}</p>
          </div>
        )}
        {renderError("form")}
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
