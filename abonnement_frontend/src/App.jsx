import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Abonnement from './pages/Abonnement';
import MOMOPay from './pages/MOMOPay';
import { AuthProvider } from './context/authContext';
import Quartiers from './pages/quartiers/Quartiers';
import './App.css'
import Depotoirs from './pages/depotoirs/Depotoirs';
import 'leaflet/dist/leaflet.css';
import DepotoirMap from './pages/DepotoirMap';


function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                {/* **Ajout du composant Navbar** */}
                <Navbar
                    brandName="Dechet.com"
                    links={[
                        { href: '/', label: 'Home' },
                        { href: '/contact', label: 'Contact' },
                        { href: '/abonnement', label: 'Abonnement' },
                        { href: '/depotoirsmap', label: 'Depotoirs' },

                    ]}
                    authLinks={{ login: '/login', register: '/register' }}
                />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/login"
                        element={<Login />} // **Ajout de la prop pour mise à jour de l'utilisateur**
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/abonnement"
                        element={
                            <PrivateRoute>
                                <Abonnement />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/momopay" element={<MOMOPay />} />
                    <Route path="/quartiers" element={<Quartiers />} />
                    <Route path="/depotoirs" element={<Depotoirs />} />
                    <Route path="/depotoirsmap" element={<DepotoirMap />} />

                    <Route path="/" element={<Home />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;

