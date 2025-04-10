import React, { useEffect, useState } from 'react';
import { getUser } from './api';
import Dashboard from './pages/Dashboard';
import LoginButton from './components/LoginButton';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(data => {
      if (data && data._id) setUser(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Invoice Reminder System</h1>
        {user ? <Dashboard user={user} /> : <LoginButton />}
      </div>
    </div>
  );
}

export default App;
