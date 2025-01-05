import { useContext } from 'react';


import { AuthContext } from '../context/authContext';



const Dashboard = () => {
  const { user} = useContext(AuthContext);



  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center">Dashboard</h1>
          {user ? (
            <div className="text-center">
              <h2 className="mt-4">Welcome, {user.name}!</h2>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <div className="text-center">
              <p>Loading user data...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="text-center mt-4">
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


