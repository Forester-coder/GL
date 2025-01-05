import { useState } from 'react';
import API from '../services/api';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/register', formData);
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: 'calc(100vh - 80px)', // Ajuste pour inclure la Navbar
          backgroundColor: '#f8f9fa',
        }}
      >
        <div className="card p-5 shadow-sm" style={{ maxWidth: '600px', width: '90%' }}>
          <h2 className="mb-4 text-center">Register</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="form-control"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

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
                value={formData.email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="form-control"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="Confirm your password"
                className="form-control"
                onChange={handleChange}
                value={formData.password_confirmation}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

