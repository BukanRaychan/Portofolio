import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import { WorksProvider } from "./context/works-context";

function App() {
  return (
    <WorksProvider>
      <Routes>
        <Route element={<IndexPage />} path="/" />
      </Routes>
    </WorksProvider>
  );
}

export default App;
