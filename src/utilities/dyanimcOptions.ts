import { GradeSchema } from "../types/types";

export const getGrades = (data: GradeSchema) => {
  return Object.keys(data);
};

export const getClasses = (data: GradeSchema, grade: string) => {
  if (grade in data) {
    return Object.keys(data[grade]);
  } else {
    return [];
  }
};

export const getStudents = (
  data: GradeSchema,
  grade: string,
  _class: string,
) => {
  if (grade in data) {
    const myClass = data[grade];
    if (_class in myClass) {
      return myClass[_class];
    }
    return [];
  }
  return [];
};
