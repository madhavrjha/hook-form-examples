import { NavLink, Routes, Route } from "react-router-dom";
import { CgEditBlackPoint } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import formList from "./data/formList";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
        <aside
          className={`absolute min-h-screen w-[250px] bg-teal-800 p-4 md:relative md:block ${
            showMenu ? "" : "hidden"
          }`}
        >
          <h1 className="text-md mb-2 text-left font-bold text-teal-50">
            React Hook Form
          </h1>
          {formList.map((form) => (
            <NavLink
              key={form.id}
              to={form.url}
              className={({ isActive }) => {
                const commonClasses =
                  "flex items-center gap-2 pb-1 pl-1 text-sm text-teal-100 transition-colors hover:text-teal-200";
                return isActive
                  ? `${commonClasses} font-semibold`
                  : commonClasses;
              }}
            >
              <CgEditBlackPoint className="min-w-[0.875rem]" /> {form.title}
            </NavLink>
          ))}
        </aside>
        <main>
          <header className="flex items-baseline justify-between bg-teal-700 p-2 md:hidden">
            <h1 className="text-md text-left font-bold text-teal-50">
              React Hook Form
            </h1>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer rounded bg-teal-700 px-3 py-2 text-teal-50 transition-colors hover:bg-teal-800 active:bg-teal-900 md:hidden"
            >
              {showMenu ? <MdClose /> : <FiMenu />}
            </button>
          </header>

          <Routes>
            {formList.map((form) => (
              <Route key={form.id} path={form.url} element={form.element} />
            ))}
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
