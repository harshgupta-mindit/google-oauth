// Profile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      console.log("===============BEFORE");
      const response = await axios.get('http://localhost:4002/profile', { withCredentials: true });
      setProfile(response.data);
      console.log("===============", response);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4002/logout');
      // Redirect or perform any other action after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {profile ? (
        <div>
          <h1>Welcome, {profile.displayName}</h1>
          <p>Email: {profile.emails[0].value}</p>
          <img src={profile.photos[0].value} alt="Profile" />

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
