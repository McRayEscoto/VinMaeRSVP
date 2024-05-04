'use client';

import { useState, useEffect } from 'react';
import LoginPage from '../admin_auth/page';

interface GuestData {
  clusterId: number;
  isAttending: boolean;
  guestnames: string[];
}

export default function Administrator() {
  const [guests, setGuests] = useState<GuestData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchGuests();
    }
  }, [isAuthenticated]);

  const fetchGuests = async () => {
    try {
      const response = await fetch('http://localhost:3000/api');
      const data = await response.json();
      setGuests(data.guests);
    } catch (err) {
      console.error('Error fetching guests:', err);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <h1>Admin</h1>
          {guests.map(guest => (
            <div key={guest.clusterId}>
              <h2>Cluster ID: {guest.clusterId}</h2>
              <ul>
                {guest.guestnames.map((guestname, index) => (
                  <li key={`${guest.clusterId}-${index}`}>{guestname}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}