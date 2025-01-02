import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification
  const [userName, setUserName] = useState(""); // Stocker le nom de l'utilisateur
  const navigate = useNavigate();

  // Vérifiez si l'utilisateur est connecté et récupérez son nom
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const name = sessionStorage.getItem("name");
    if (token) {
      setIsAuthenticated(true);
      setUserName(name); // Mettre à jour le nom de l'utilisateur
    }
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    sessionStorage.clear(); // Supprimer toutes les données stockées dans la session
    setIsAuthenticated(false); // Mettre à jour l'état
    setUserName(""); // Réinitialiser le nom
    navigate("/"); // Rediriger vers la page d'accueil
    window.location.reload(); // Recharger la page
  };

  return (
    <nav>
      <div className="nav__logo">
        <a href="/">
          StayHealthy
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 14.6667C17.4145 14.6667 18.771 14.1048 19.7712 13.1046C20.7714 12.1044 21.3333 10.7478 21.3333 9.33333C21.3333 7.91885 20.7714 6.56229 19.7712 5.5621C18.771 4.5619 17.4145 4 16 4C14.5855 4 13.229 4.5619 12.2288 5.5621C11.2286 6.56229 10.6667 7.91885 10.6667 9.33333C10.6667 10.7478 11.2286 12.1044 12.2288 13.1046C13.229 14.1048 14.5855 14.6667 16 14.6667ZM11.4933 17.2293L11.992 16.4973C13.2043 17.0482 14.5204 17.3332 15.852 17.3333H16.1493C17.2911 17.3331 18.4232 17.1235 19.4893 16.7147L19.84 17.2293C20.0027 17.4693 20.1667 17.936 20.276 18.5267C20.3827 19.096 20.412 19.636 20.392 19.9333C20.3842 20.0688 20.4023 20.2046 20.4453 20.3333H19.9413C19.7486 20.3336 19.5599 20.3887 19.3974 20.4924C19.235 20.5961 19.1054 20.744 19.024 20.9187L18.1027 22.892C18.0307 23.0464 17.9988 23.2165 18.01 23.3865C18.0212 23.5565 18.0751 23.721 18.1667 23.8646C18.2582 24.0083 18.3846 24.1266 18.5339 24.2085C18.6833 24.2904 18.851 24.3334 19.0213 24.3333H20.5333V22.3333H22.2V24.3333H23.6453C23.8157 24.3334 23.9833 24.2904 24.1327 24.2085C24.2821 24.1266 24.4084 24.0083 24.5 23.8646C24.5916 23.721 24.6455 23.5565 24.6566 23.3865C24.6678 23.2165 24.636 23.0464 24.564 22.892L23.644 20.9187C23.5624 20.7436 23.4324 20.5954 23.2694 20.4917C23.1064 20.388 22.9172 20.333 22.724 20.3333H22.3333C22.3624 20.2471 22.3803 20.1575 22.3867 20.0667C22.4213 19.5627 22.3707 18.8507 22.2427 18.16C22.1187 17.4907 21.8933 16.692 21.4933 16.104L21.428 16.008C21.4954 16.0028 21.563 16.0001 21.6307 16C22.4671 16 23.2953 16.1647 24.0681 16.4848C24.8409 16.8049 25.543 17.2741 26.1345 17.8655C26.7259 18.457 27.1951 19.1591 27.5152 19.9319C27.8353 20.7047 28 21.5329 28 22.3693V28H4V22.3693C4 19.0093 6.6 16.2573 9.89867 16.0173L9.84 16.104C9.052 17.2627 8.932 18.6987 9.02933 19.8507C9.06267 20.2467 9.12267 20.6373 9.20533 21.0053C8.87626 21.2978 8.65286 21.6906 8.56978 22.1229C8.48669 22.5552 8.54856 23.0028 8.7458 23.3964C8.94303 23.79 9.2646 24.1075 9.66065 24.2997C10.0567 24.4919 10.5051 24.548 10.9363 24.4594C11.3675 24.3708 11.7575 24.1425 12.0457 23.8097C12.3339 23.4769 12.5042 23.0584 12.5303 22.6189C12.5564 22.1795 12.4368 21.7437 12.19 21.3791C11.9432 21.0146 11.583 20.7417 11.1653 20.6027C11.0959 20.2997 11.0478 19.9923 11.0213 19.6827C10.9413 18.7413 11.0747 17.844 11.4933 17.2293Z"
              fill="#2287F6"
            />
          </svg>
        </a>
        <span>.</span>
      </div>
      <div className="nav__icon">
        <i className="fa fa-times fa fa-bars"></i>
      </div>
      <ul className="nav__links active">
        <li className="link">
          <a href="/">Home</a>
        </li>
        <li className="link">
          <a href="/">Appointments</a>
        </li>
        {!isAuthenticated ? (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <a href="/">{userName}</a>
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
