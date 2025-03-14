import React from 'react';

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
  console.log(showLoginHandler);
  const firmName = localStorage.getItem('firmName') || 'Not Added';

  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div className="firmName">
        <h1>Firm: {firmName}</h1>
      </div>
      <div className="userAuth">
        {!showLogOut ? (
          <>
            <span onClick={showLoginHandler}>Login/</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logOutHandler}>LogOut</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
