

const Home = () => {

  return (
    <div>


      {/* Hero Section */}
      <div className="container text-center my-5">
        <h1 className="display-4">Welcome to MyApp</h1>
        <p className="lead">
          Your one-stop solution for managing your projects efficiently.
        </p>
        <a href="#services" className="btn btn-primary btn-lg">
          Get Started
        </a>
      </div>

      {/* Sections */}
      <div id="about" className="container my-5">
        <h2>About Us</h2>
        <p>
          MyApp is designed to help you organize your tasks and achieve your
          goals seamlessly. We provide the best tools for project management.
        </p>
      </div>

      <div id="services" className="container my-5">
        <h2>Our Services</h2>
        <ul>
          <li>Project Management</li>
          <li>Task Automation</li>
          <li>Team Collaboration</li>
        </ul>
      </div>

      <div id="contact" className="container my-5">
        <h2>Contact Us</h2>
        <p>Email: support@myapp.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>
    </div>
  );
};

export default Home;
