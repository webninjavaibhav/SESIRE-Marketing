"use client";

import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { ref as dbRef, set, push } from "firebase/database";
import { useRouter } from "next/navigation";

import { REGEX } from "@/constants";
import { FormDataInterface } from "@/types/entities";
import { storage, userDB } from "../../../../firebase";

const formIntialValues = {
  name: "",
  surname: "",
  email: "",
  uploadedFile: null,
};

export const useRegisterForm = () => {
  const router = useRouter();
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<
    Omit<FormDataInterface, "uploadedFile"> & { uploadedFile: String }
  >({
    name: "",
    email: "",
    uploadedFile: "",
  });
  const [formData, setFormData] = useState<FormDataInterface>(formIntialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target || {};
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFormData({ ...formData, uploadedFile: file });
    setFormErrors({
      ...formErrors,
      uploadedFile: "",
    });
  };

  const handleSendFormData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let hasErrors = false;
    const { name, surname, email, uploadedFile } = formData || {};
    if (!name || !email || !uploadedFile) {
      setFormErrors({
        name: !name ? "Name is required" : "",
        email: !email ? "Email is required" : "",
        uploadedFile: !uploadedFile ? "Please upload a file" : "",
      });
      hasErrors = true;
    }
    if (email && !email.match(REGEX.MAIL_FORMAT)) {
      setFormErrors({
        ...formErrors,
        email: "Email is invalid",
      });
      hasErrors = true;
    }

    // if errors just discard the form and show errors
    if (hasErrors) {
      return;
    }

    // store file and form data in firebase realtime db and storage
    if (uploadedFile !== null) {
      setDisableBtn(true);
      const postUserList = dbRef(userDB, "users");
      const newUser = push(postUserList);
      const promiseInstance = set(newUser, {
        name,
        surname,
        email,
      });
      const storageRef = ref(storage, `/documents/${uploadedFile?.name}`);
      uploadBytes(storageRef, uploadedFile);

      // Waiting to resolve all promises
      Promise.all([promiseInstance, uploadBytes(storageRef, uploadedFile)])
        .then((res) => {
          setFormData(formIntialValues);
          setDisableBtn(false);
          router.push("/success");
        })
        .catch((err) => {
          setDisableBtn(false);
          console.log(err);
        });
    }
  };
  return {
    formErrors,
    formData,
    disableBtn,
    handleFileChange,
    handleSendFormData,
    handleInputChange,
  };
};
