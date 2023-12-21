import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .refine(
      async (value) => {
        try {
          const response = await fetch("http://localhost:3000/username");
          const data = (await response.json()) as string[];
          return !data.includes(value);
        } catch (e) {
          return false;
        }
      },
      { message: "This username is taken" },
    ),
  email: z
    .string()
    .email()
    .refine(
      async (value) => {
        try {
          const response = await fetch("http://localhost:3000/email");
          const data = (await response.json()) as string[];
          return !data.includes(value);
        } catch (e) {
          return false;
        }
      },
      { message: "This email is taken" },
    ),
  password: z.string().min(8).max(20),
});

type FormSchema = z.infer<typeof FormSchema>;

const SignUp = () => {
  const id = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormSchema>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Sign Up Form (Async Validation)
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[400px] flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-username`}>Username</label>
          <input
            type="text"
            {...register("username")}
            id={`${id}-username`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            type="email"
            {...register("email")}
            id={`${id}-email`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-password`}>Password</label>
          <input
            type="password"
            {...register("password")}
            id={`${id}-password`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
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

export default SignUp;
