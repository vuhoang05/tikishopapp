
import BookForm from "../../pages/admin/BookForm";
import Header from "../components/Header";
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-100">
                <BookForm/>
            </main>
        </div>
    )
}

export default AdminLayout;