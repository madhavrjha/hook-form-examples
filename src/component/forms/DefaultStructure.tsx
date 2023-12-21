import { useId } from "react";

const DefaultStructure = () => {
  const id = useId();

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center text-lg font-bold text-teal-700">
        Your Title Here
      </h1>
      <form
        noValidate
        className="mx-auto flex max-w-[400px] flex-col gap-3 rounded border border-teal-200 p-4 shadow-md"
      >
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <label htmlFor={`${id}-example`}>Example Field</label>
          <input
            type="text"
            id={`${id}-example`}
            className="w-full rounded-sm border border-teal-500 px-2 py-1 font-serif outline-none transition-colors focus:border-teal-800"
          />
          <p className="text-red-500">Example Error</p>
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-teal-700">
          <button
            type="submit"
            className="rounded bg-teal-700 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-800 disabled:opacity-40"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DefaultStructure;
