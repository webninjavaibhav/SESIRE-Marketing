import { RegisterForm } from "@/components/local";
import { FORM_TEXT, SIGNUP_HEADING } from "@/constants";

export default function Page() {
  return (
    <div className="flex justify-center mt-10 p-5">
      <div className="flex flex-col gap-10 sm:w-[90%] md:w-[50%] lg:w-[50%] xl:w-[50%]">
        <div className="text-center">
          <h1 className="text-xl text-white">{SIGNUP_HEADING}</h1>
          <p className="text-[#bdbfc9] mt-2">{FORM_TEXT}</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
