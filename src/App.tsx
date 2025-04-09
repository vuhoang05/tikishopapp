
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './shared/components/Footer'
import Header from './shared/components/Header'
import CustomerLayout from './shared/layout/CustomerLayout'
import Home from './pages/customer/Home'
import Login from './pages/customer/Login'

function App() {


  return (
    <BrowserRouter>
        <Routes>
          {/* Customer */}
          <Route path='/' element={<CustomerLayout/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
          </Route>
          {/* Guest */}
          {/* <Route path='login' element={<Login />} /> */}
          {/* Admin */}
          {/* <Route path='admin' element={<AdminLayout />}>
            <Route index={true} element={<Dashboard />} />
            <Route path='category' element={<CategoryList />} />
          </Route> */}
        </Routes>
  </BrowserRouter>

  )
}

export default App
