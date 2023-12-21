import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UserAPI = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

const FormSchema = z.object({
  id: z
    .number()
    .min(1, "Did you forget it? 😠")
    .max(100, "Do you really remember 🥴"),
  name: z.string().min(3, "Isn't it too short 🤦‍♀️").max(20, "Who named you 🤷‍♂️"),
  email: z.string().email("I don't trust your mail 🤪"),
  comapanyName: z
    .string()
    .min(3, "How is it going 🤑")
    .max(40, "Profit must be big, Not Name 😇"),
});

type FormScheme = z.infer<typeof FormSchema>;

const DefaultValues = () => {
  const id = useId();

  const { register, handleSubmit, formState } = useForm<FormScheme>({
    resolver: zodResolver(FormSchema),
    defaultValues: async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/3/",
        );
        const data = (await response.json()) as UserAPI;
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          comapanyName: data.company.name,
        };
      } catch (e) {
        return {
          id: 0,
          name: "",
          email: "",
          comapanyName: "",
        };
      }
    },
  });

  const onSubmit = (data: FormScheme) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Hook Form Dafault Values
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[400px] flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        {/* ID, Name, Email, Website and Company Name */}
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-id`}>User ID:</label>
          <input
            type="text"
            {...register("id")}
            id={`${id}-id`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            readOnly
          />
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-name`}>User Name:</label>
          <input
            type="text"
            {...register("name")}
            id={`${id}-name`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {formState.errors.name && (
            <p className="text-red-500">{formState.errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-email`}>User Email:</label>
          <input
            type="email"
            {...register("email")}
            id={`${id}-email`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {formState.errors.email && (
            <p className="text-red-500">{formState.errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-company`}>Company Name:</label>
          <input
            type="text"
            {...register("comapanyName")}
            id={`${id}-company`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {formState.errors.comapanyName && (
            <p className="text-red-500">
              {formState.errors.comapanyName.message}
            </p>
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

export default DefaultValues;
