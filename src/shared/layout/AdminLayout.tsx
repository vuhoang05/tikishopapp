
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-100">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default AdminLayout;