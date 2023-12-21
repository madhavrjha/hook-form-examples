import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  photo: z.unknown().nullish(),
  gender: z.string().min(1),
  skills: z.string().array(),
});

type FormSchema = z.infer<typeof FormSchema>;

const OtherFields = () => {
  const id = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      photo: undefined,
      gender: "",
      skills: [],
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Other Fields
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[400px] flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-file`}>Select Photo</label>
          <input
            type="file"
            {...register("photo")}
            id={`${id}-file`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          {errors.photo && (
            <p className="text-red-500">{errors.photo.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-gender`}>Select Gender</label>
          <div>
            <input
              type="radio"
              id={`${id}-male`}
              value="male"
              {...register("gender")}
            />{" "}
            <label htmlFor={`${id}-male`}>Male</label>
          </div>
          <div>
            <input
              type="radio"
              id={`${id}-female`}
              value="female"
              {...register("gender")}
            />{" "}
            <label htmlFor={`${id}-female`}>Female</label>
          </div>
          <div>
            <input
              type="radio"
              id={`${id}-others`}
              value="others"
              {...register("gender")}
            />{" "}
            <label htmlFor={`${id}-others`}>Others</label>
          </div>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-skills`}>Select Skills</label>
          <div>
            <input
              type="checkbox"
              id={`${id}-html`}
              value="html"
              {...register("skills")}
            />{" "}
            <label htmlFor={`${id}-html`}>Html</label>
          </div>
          <div>
            <input
              type="checkbox"
              id={`${id}-css`}
              value="css"
              {...register("skills")}
            />{" "}
            <label htmlFor={`${id}-css`}>Css</label>
          </div>
          <div>
            <input
              type="checkbox"
              id={`${id}-javascript`}
              value="javascript"
              {...register("skills")}
            />{" "}
            <label htmlFor={`${id}-javascript`}>Javascript</label>
          </div>
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
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

export default OtherFields;
