import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RootLayout from "./rootLayout/RootLayout.jsx";
import Resources from "./pages/Resources.jsx";
import Committees from "./pages/Committees.jsx";
import NotFound from "./pages/NotFound.jsx";
import Support from "./pages/Support.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="secretariat" element={<NotFound />} />
        <Route path="publications" element={<NotFound />} />
        <Route path="contact" element={<Contact />} />
        <Route path="resources" element={<Resources />} />
        <Route path="committees" element={<Committees />} />
        <Route path="support" element={<Support />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
