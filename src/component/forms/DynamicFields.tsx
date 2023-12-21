import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  schoolName: z.string().min(3).max(100),
  schoolEmail: z.string().email(),
  contactPerson: z
    .object({
      name: z.string().min(3),
      email: z.string().email(),
      phone: z.string().min(7),
    })
    .array()
    .nonempty(),
  schoolAddress: z.string().min(10).max(100),
});

type FormSchema = z.infer<typeof FormSchema>;

const DynamicFields = () => {
  const id = useId();

  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    control,
  } = useForm<FormSchema>({
    defaultValues: {
      schoolName: "",
      schoolEmail: "",
      schoolAddress: "",
      contactPerson: [{ name: "", email: "", phone: "" }],
    },
    resolver: zodResolver(FormSchema),
  });

  const { fields, append, remove } = useFieldArray<FormSchema>({
    control,
    name: "contactPerson",
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };
  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Dynamic Fields
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-school-name`}>School Name</label>
            <input
              type="text"
              {...register("schoolName")}
              id={`${id}-school-name`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {errors.schoolName && (
              <p className="text-red-500">{errors.schoolName.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
            <label htmlFor={`${id}-school-email`}>School Email</label>
            <input
              type="email"
              {...register("schoolEmail")}
              id={`${id}-school-email`}
              className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
            />
            {errors.schoolEmail && (
              <p className="text-red-500">{errors.schoolEmail.message}</p>
            )}
          </div>
        </div>

        {fields.map((field, index) => (
          <div key={field.id}>
            <h2 className="text-base font-bold text-teal-600">
              Contact Person {index > 0 ? index + 1 : null}
              {index > 0 ? (
                <button
                  type="button"
                  className="ms-2 rounded border border-red-300 px-1.5 py-0.5 text-xs  font-normal text-red-500 "
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              ) : null}
            </h2>

            <div className="rounded md:grid md:grid-cols-3 md:gap-4">
              <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
                <label htmlFor={`${id}-name-${index}`}>Name</label>
                <input
                  type="text"
                  {...register(`contactPerson.${index}.name`)}
                  id={`${id}-name-${index}`}
                  className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
                />
                {errors.contactPerson && errors.contactPerson[index] && (
                  <p className="text-red-500">
                    {errors.contactPerson[index]?.name?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
                <label htmlFor={`${id}-email-${index}`}>Email</label>
                <input
                  type="email"
                  {...register(`contactPerson.${index}.email`)}
                  id={`${id}-email-${index}`}
                  className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
                />
                {errors.contactPerson && errors.contactPerson[index] && (
                  <p className="text-red-500">
                    {errors.contactPerson[index]?.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
                <label htmlFor={`${id}-phone-${index}`}>Phone</label>
                <input
                  type="tel"
                  {...register(`contactPerson.${index}.phone`)}
                  id={`${id}-phone-${index}`}
                  className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
                />
                {errors.contactPerson && errors.contactPerson[index] && (
                  <p className="text-red-500">
                    {errors.contactPerson[index]?.phone?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ email: "", name: "", phone: "" })}
          className="self-start rounded bg-teal-500 px-2 py-1 text-xs text-white transition-colors hover:bg-teal-600 disabled:opacity-40"
        >
          Add Contact
        </button>

        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-school-address`}>School Address</label>
          <textarea
            id={`${id}-school-address`}
            {...register("schoolAddress")}
            className="min-h-[50px] w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          ></textarea>
          {errors.schoolAddress && (
            <p className="text-red-500">{errors.schoolAddress.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <button
            type="submit"
            className="rounded bg-teal-700 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-800 disabled:opacity-40"
            disabled={!isDirty || isSubmitting}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicFields;
