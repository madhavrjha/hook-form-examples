import DefaultStructure from "../component/forms/DefaultStructure";
import DefaultValues from "../component/forms/DefaultValues";
import DynamicFields from "../component/forms/DynamicFields";
import DyanmicOptions from "../component/forms/DynamicOptions";
import HookFormValidation from "../component/forms/HookFormValidation";
import NestedObjAndArrays from "../component/forms/NestedObjAndArrays";
import OtherFields from "../component/forms/OtherFields";
import ResetPassword from "../component/forms/ResetPassword";
import SignUp from "../component/forms/SignUp";

export default [
  {
    id: 0,
    url: "/",
    title: "Deafult Structure",
    element: <DefaultStructure />,
  },
  {
    id: 1,
    url: "/hook-form-validation",
    title: "Hook Form Validation",
    element: <HookFormValidation />,
  },
  {
    id: 2,
    url: "/default-values",
    title: "Default Values From APIs",
    element: <DefaultValues />,
  },
  {
    id: 3,
    url: "/nested-obj-and-arrays",
    title: "Object, Array and Value as",
    element: <NestedObjAndArrays />,
  },
  {
    id: 4,
    url: "/reset-password",
    title: "Reset Password",
    element: <ResetPassword />,
  },
  {
    id: 5,
    url: "/sign-up",
    title: "Sign Up",
    element: <SignUp />,
  },
  {
    id: 6,
    url: "/dyanmic-options",
    title: "Dynamic Options",
    element: <DyanmicOptions />,
  },
  {
    id: 7,
    url: "/dyanmic-fields",
    title: "Dynamic Fields",
    element: <DynamicFields />,
  },
  {
    id: 8,
    url: "/other-fields",
    title: "Other Fields",
    element: <OtherFields />,
  },
];
