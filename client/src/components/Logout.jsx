import React from 'react';
import switchImage from '../logout.png';
import { logoutUser } from '../api/api'; 
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        onLogout(); 
        navigate('/'); 
      } else {
        console.error(response.message); 
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 p-4" onClick={handleLogout}>
      <img src={switchImage} alt="Switch" className="w-10 h-10 cursor-pointer" /> {/* Adjust size as needed */}
    </div>
  );
};

export default Logout;