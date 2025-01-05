
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ brandName, links, authLinks }) => {

  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{
        height: '100px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {brandName}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav">
            {user && token ? ( // **Vérification si l'utilisateur est connecté**
              <>
                <li className="nav-item">
                  <span className="navbar-text">{user.name}</span> {/* **Affichage du nom de l'utilisateur** */}
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-3" onClick={handleLogout}> {/* **Bouton de déconnexion** */}
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <a className="btn btn-success ms-3" href='/dashboard'> {/* **Bouton de dashboard** */}
                    Dashboard
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="btn btn-light" href={authLinks.login}>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-primary ms-3" href={authLinks.register}>
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

