import { useId } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  personal: z.object({
    age: z.number().min(13).max(150),
    dateOfJoining: z.date().min(new Date("2010-01-01")).max(new Date()),
  }),
  social: z.object({
    facebook: z.string().url(),
    twitter: z.string().url(),
    github: z.string().url(),
  }),
  phones: string().length(10).array(),
});

type FormSchema = z.infer<typeof FormSchema>;

const NestedObjAndArrays = () => {
  const id = useId();

  const { register, handleSubmit, formState } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Number, Date, Object, Array
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="gap-4 md:grid md:grid-cols-3">
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-facebook`}>Facebook Link:</label>
            <input
              type="url"
              {...register("social.facebook")}
              id={`${id}-facebook`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {formState.errors.social && formState.errors.social.facebook && (
              <p className="text-red-500">
                {formState.errors.social.facebook.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-twitter`}>Twitter Link:</label>
            <input
              type="url"
              {...register("social.twitter")}
              id={`${id}-twitter`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {formState.errors.social && formState.errors.social.twitter && (
              <p className="text-red-500">
                {formState.errors.social.twitter.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-github`}>GitHub Link:</label>
            <input
              type="url"
              {...register("social.github")}
              id={`${id}-github`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {formState.errors.social && formState.errors.social.github && (
              <p className="text-red-500">
                {formState.errors.social.github.message}
              </p>
            )}
          </div>
        </div>
        <div className="gap-4 md:grid md:grid-cols-2">
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-phone-primary`}>Primary Phone:</label>
            <input
              type="tel"
              {...register("phones.0")}
              id={`${id}-phone-primary`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {formState.errors.phones && formState.errors.phones[0] && (
              <p className="text-red-500">
                {formState.errors.phones[0].message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-phone-alternate`}>Alternate Phone:</label>
            <input
              type="tel"
              {...register("phones.1")}
              id={`${id}-phone-alternate`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {formState.errors.phones && formState.errors.phones[1] && (
              <p className="text-red-500">
                {formState.errors.phones[1].message}
              </p>
            )}
          </div>
        </div>
        <div className="gap-4 md:grid md:grid-cols-2">
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-age`}>Age:</label>
            <input
              type="number"
              {...register("personal.age", { valueAsNumber: true })}
              id={`${id}-age`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {formState.errors.personal && formState.errors.personal.age && (
              <p className="text-red-500">
                {formState.errors.personal.age.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-date-of-joining`}>Date of Joining:</label>
            <input
              type="date"
              {...register("personal.dateOfJoining", { valueAsDate: true })}
              id={`${id}-date-of-joining`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {formState.errors.personal &&
              formState.errors.personal.dateOfJoining && (
                <p className="text-red-500">
                  {formState.errors.personal.dateOfJoining.message}
                </p>
              )}
          </div>
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

export default NestedObjAndArrays;
