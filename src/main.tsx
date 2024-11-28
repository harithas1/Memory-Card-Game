import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import Layout from "./pages/layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/signup.tsx";
import Level1 from "./level1.tsx";
import Level2 from "./level2.tsx";
import { ScoreProvider } from "./scoreProvide.tsx";
import Level3 from "./level3.tsx";
import Level4 from "./level4.tsx";
import Level5 from "./level5.tsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Level1 />,
      },
      { path: "/level1", element: <Level1 /> },
      { path: "/level2", element: <Level2 /> },
      { path: "/level3", element: <Level3 /> },
      { path: "/level4", element: <Level4 /> },
      { path: "/level5", element: <Level5 /> },
    ],
  },
  { path: "/signup", element: <Signup /> },
]);



createRoot(document.getElementById("root")!).render(
 
  <StrictMode>
    {/* <App /> */}

    <ScoreProvider>
      <RouterProvider router={router} />
    </ScoreProvider>
  </StrictMode>
);
