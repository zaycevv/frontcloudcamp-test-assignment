import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/app.scss";
import { Main } from "./pages/Main";
import { CreateForm } from "./pages/CreateForm";
import { ErrorPage } from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: <CreateForm />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
