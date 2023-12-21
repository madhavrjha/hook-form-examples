import { useId } from "react";
import { useForm } from "react-hook-form";

type FormType = {
  name: string;
  email: string;
  channel: string;
};

const HookFormValidation = () => {
  const id = useId();

  const { register, formState, handleSubmit } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Hook Form Validation
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[400px] flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-name`}>Enter Name:</label>
          <input
            type="text"
            {...register("name", {
              required: { value: true, message: "What would I call You? 😢" },
              minLength: { value: 3, message: "Isn't it too small 🤦‍♂️" },
              maxLength: { value: 20, message: "Isn't it too big 🤦‍♂️" },
              validate: {
                noAdmin: (value) =>
                  !value.includes("admin") || "You can't use Admin 😅",
                noCriminal: (value) =>
                  value !== "boss" || "This was a name of criminal 🐱‍👓",
              },
            })}
            id={`${id}-name`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {formState.errors.name && (
            <p className="text-red-500">{formState.errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-email`}>Enter Email:</label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "Email doesn't seem correct.",
              },
            })}
            id={`${id}-email`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {formState.errors.email && (
            <p className="text-red-500">{formState.errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-channel`}>Enter Channel:</label>
          <input
            type="text"
            {...register("channel", {
              required: { value: true, message: "We Actually needed this 🙏" },
            })}
            id={`${id}-channel`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {formState.errors.channel && (
            <p className="text-red-500">{formState.errors.channel.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <button
            type="submit"
            className="rounded bg-teal-700 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HookFormValidation;
