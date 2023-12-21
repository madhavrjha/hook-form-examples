import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useId } from "react";
import { GradeSchema } from "../../types/types";
import {
  getClasses,
  getGrades,
  getStudents,
} from "../../utilities/dyanimcOptions";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  grade: z.string().min(1),
  class: z.string().min(1),
  student: z.string().min(1),
});

type FormSchema = z.infer<typeof FormSchema>;

const DyanmicOptions = () => {
  const id = useId();

  const { data, isSuccess } = useQuery({
    queryKey: ["grade"],
    queryFn: async () => {
      return axios.get("http://localhost:3000/grade");
    },
  });
  let grade: GradeSchema = {};
  if (isSuccess) {
    grade = data.data as GradeSchema;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    watch,
    setValue,
  } = useForm<FormSchema>({
    defaultValues: { grade: "", class: "", student: "" },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Dyanmic Options From API
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[400px] flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-grade`}>Select Grade</label>
          <select
            id={`${id}-grade`}
            {...register("grade", {
              onChange: () => {
                setValue("class", "");
                setValue("student", "");
              },
            })}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          >
            <option value="">Select</option>
            {getGrades(grade).map((grade) => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
          {errors.grade && (
            <p className="text-red-500">{errors.grade.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-class`}>Select Class</label>
          <select
            id={`${id}-class`}
            {...register("class", {
              onChange: () => {
                setValue("student", "");
              },
            })}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          >
            <option value="">Select</option>
            {getClasses(grade, watch("grade")).map((_class) => (
              <option key={_class} value={_class}>
                Class {_class}
              </option>
            ))}
          </select>
          {errors.class && (
            <p className="text-red-500">{errors.class.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-student`}>Select Student</label>
          <select
            id={`${id}-student`}
            {...register("student")}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          >
            <option value="">Select</option>
            {getStudents(grade, watch("grade"), watch("class")).map(
              (student) => (
                <option key={student} value={student}>
                  {student}
                </option>
              ),
            )}
          </select>
          {errors.student && (
            <p className="text-red-500">{errors.student.message}</p>
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

export default DyanmicOptions;
