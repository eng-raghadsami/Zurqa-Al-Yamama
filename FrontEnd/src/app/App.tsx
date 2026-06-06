import { RouterProvider } from "react-router-dom";
import { router } from "@core/routing";

export default function App() {
  return <RouterProvider router={router} />;
}
