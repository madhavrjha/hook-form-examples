import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    old: z.string().min(8).max(20),
    new: z.string().min(8).max(20),
    confirm: z.string(),
  })
  .refine((schema) => schema.new === schema.confirm, {
    message: "Password not Matched",
    path: ["confirm"],
  });

type FormSchema = z.infer<typeof FormSchema>;

const ResetPassword = () => {
  const id = useId();

  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormSchema>({
    defaultValues: {
      old: "",
      new: "",
      confirm: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      await fetch("https://kutamasecondary.co.za");
    } catch (e) {
      console.log("cors issue");
    }
    console.log(data);
    reset();
  };

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Reset Password (Refine Validation)
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[400px] flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-old-password`}>Old Password:</label>
          <input
            type="password"
            {...register("old")}
            id={`${id}-old-password`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {errors.old && <p className="text-red-500">{errors.old.message}</p>}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-new-password`}>New Password:</label>
          <input
            type="password"
            {...register("new")}
            id={`${id}-new-password`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {errors.new && <p className="text-red-500">{errors.new.message}</p>}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-confirm-password`}>Confirm Password:</label>
          <input
            type="password"
            {...register("confirm")}
            id={`${id}-confirm-password`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {errors.confirm && (
            <p className="text-red-500">{errors.confirm.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="rounded bg-teal-700 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-800 disabled:opacity-40"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
