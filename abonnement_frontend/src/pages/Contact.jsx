import  { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Simuler une requête pour envoyer le message
      // Remplacez cette partie par un appel à votre API
      setTimeout(() => {
        setSuccess('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err)
    }
  };

  return (
    <>
      {/* Page Contact */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: 'calc(100vh - 80px)', // Ajuste pour inclure la Navbar
          backgroundColor: '#f8f9fa',
        }}
      >
        <div className="card p-5 shadow-sm" style={{ maxWidth: '600px', width: '90%' }}>
          <h2 className="mb-4 text-center">Contact Us</h2>

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
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                rows="5"
                className="form-control"
                onChange={handleChange}
                value={formData.message}
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
