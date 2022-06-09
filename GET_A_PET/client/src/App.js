import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

/* COMPONENTS */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'

import Message from './components/layouts/Message'

/* PAGES */
import Home from './components/pages/Home'

import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'

import MyPets from './components/pages/Pet/MyPets'

import Profile from './components/pages/User/Profile'

/* CONTEXT */
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
        <Container>  
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/user/profile" element={<Profile/>}/>
            <Route path="/pet/mypets" element={<MyPets/>}/>
          </Routes>
          </Container>
        <Footer/>
      </UserProvider>
    </Router>
  )
}

export default App