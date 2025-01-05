import { useContext, useState } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!credentials.email || !credentials.password) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await API.post('/login', credentials);

            const userData = response.data.user; // Supposons que le backend renvoie un objet utilisateur
            const authToken = response.data.access_token
       

            // Appeler la fonction login avec les données et le token
            login(userData, authToken);
            navigate('/dashboard'); 
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{
                    height: 'calc(100vh - 80px)', // Adapter la hauteur en fonction de la Navbar
                    marginTop: '-20px',
                    backgroundColor: '#f8f9fa',
                }}
            >
                <div className="card p-5 shadow-sm" style={{ maxWidth: '600px', width: '90%' }}>
                    <h2 className="mb-4 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="form-control"
                                onChange={handleChange}
                                value={credentials.email}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={credentials.password}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

