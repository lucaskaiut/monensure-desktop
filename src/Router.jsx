import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bills } from "./pages/Bills";
import { Categories } from "./pages/Categories";
import { Sidebar } from './components/Sidebar'

export function Router () {
    return (
        <BrowserRouter>
            {/* <Sidebar /> */}
            <Routes>
                <Route path="/" element={<Bills />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </BrowserRouter>
    );
}