"use client";

import { ImAttachment } from "react-icons/im";

import {
  EMAIL_LABEL,
  ENVIAR_BTN,
  NAME_LABEL,
  SIGN_UP_FORM_THANKS_TEXT,
  SURNAME_LABEL,
  TOGGLE_LABEL,
} from "@/constants";
import { useRegisterForm } from "./hooks/useRegisterForm";

export const RegisterForm = () => {
  const {
    formErrors,
    formData,
    disableBtn,
    handleFileChange,
    handleSendFormData,
    handleInputChange,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSendFormData}>
      {/* name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[#bdbfc9]">
          {NAME_LABEL}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          className="bg-[#10132e] border h-[40px] text-[#bdbfc9]"
          onChange={handleInputChange}
        />
        {formErrors.name && <p className="text-[#e81a2e]">{formErrors.name}</p>}
      </div>

      {/* surname */}
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="surname" className="text-[#bdbfc9]">
          {SURNAME_LABEL}
        </label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          className="bg-[#10132e] border h-[40px] text-[#bdbfc9]"
          onChange={handleInputChange}
        />
        {formErrors.surname && (
          <p className="text-[#e81a2e]">{formErrors.surname}</p>
        )}
      </div>

      {/* email */}
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="name" className="text-[#bdbfc9]">
          {EMAIL_LABEL}
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          className="bg-[#10132e] border h-[40px] text-[#bdbfc9]"
          onChange={handleInputChange}
        />
        {formErrors.email && (
          <p className="text-[#e81a2e]">{formErrors.email}</p>
        )}
      </div>

      {/* notification toggle */}
      <div className="flex justify-between items-center mt-10">
        <p className="text-md text-[#bdbfc9]">{TOGGLE_LABEL}</p>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>

      <p className="text-[#bdbfc9] mt-20">
        {formData.name
          ? SIGN_UP_FORM_THANKS_TEXT.replace("<name>", formData.name)
          : SIGN_UP_FORM_THANKS_TEXT}
      </p>
      <div className="bg-[#9e93ad] h-0.5 mt-20"></div>
      <div className="flex items-center justify-end gap-5 mt-10">
        {formData?.uploadedFile && (
          <p className="text-white">{formData?.uploadedFile?.name as string}</p>
        )}
        {formErrors.uploadedFile && (
          <p className="text-[#e81a2e]">{formErrors.uploadedFile}</p>
        )}
        <input
          type="file"
          id="icon-button-file"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="icon-button-file">
          <ImAttachment size={40} color={"#794bbf"} />
        </label>
        <button
          type="submit"
          disabled={disableBtn}
          className={`${
            !disableBtn ? "bg-[#794bbf]" : "bg-[#d3dbd5] pointer-evetns-none"
          } w-28 h-12 rounded-full`}
        >
          {ENVIAR_BTN}
        </button>
      </div>
    </form>
  );
};
