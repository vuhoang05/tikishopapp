
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default CustomerLayout;