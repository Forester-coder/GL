import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Dashboard = () => {
  const { user, subscriptions } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center">Dashboard</h1>
          {user ? (
            <div className="text-center">
              <h2 className="mt-4">Welcome, {user.name}!</h2>
              <p>Email: {user.email}</p>

              <h3 className="mt-4">Your Subscriptions</h3>
              {subscriptions.length > 0 ? (
                <ul className="list-group mt-3">
                  {subscriptions.map((sub) => (
                    <li key={sub.id} className="list-group-item">
                      <strong>Plan:</strong> {sub.subscription_plan.name} <br />
                      <strong>Start Date:</strong> {new Date(sub.start_date).toLocaleDateString()} <br />
                      <strong>End Date:</strong> {new Date(sub.end_date).toLocaleDateString()} <br />
                      <strong>Status:</strong> {sub.statuts}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3">You have no active subscriptions.</p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p>Loading user data...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
