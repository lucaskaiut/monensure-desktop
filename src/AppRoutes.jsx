import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Bills } from "./pages/Bills";
import { Categories } from "./pages/Categories";

export function AppRoutes () {
    return (
        <div className="flex flex-col w-full">
            <Header />
            <Routes>
                <Route path="/bills" element={<Bills />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </div>
    );
}