import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import eciLogo from './assets/Election_Commission_of_India_Logo.svg.png';
import VotingPage from './components/VotingPage';

const validVoters = [
  { voterId: 'YCV0164822', name: 'Guru' },
  { voterId: 'ABC1234567', name: 'Vijay' },
  { voterId: 'DEF1234567', name: 'Suriya' }
];

const Login = ({ onLogin }) => {

  const [voterId, setVoterId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = validVoters.find(
      (v) => v.voterId === voterId && v.name.toLowerCase() === name.toLowerCase()
    );
    
    if (user) {
      onLogin(user);
      navigate('/dashboard'); 
    } else {
      setError('Invalid Voter ID or Name. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h4 className="text-2xl font-bold mb-4 text-center text-gray-800">ELECTION COMMISSION OF INDIA</h4>
        <div className="flex justify-center mb-4">
          <img src={eciLogo} alt="Election Commission of India" className="h-24 w-auto object-contain" />
        </div>
        <h5 className="text-xl font-bold mb-6 text-center text-gray-800">Login</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Voter ID (e.g.,ABC1234567)</label>
            <input 
              type="text" 
              value={voterId} 
              onChange={(e) => setVoterId(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Voter ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Name"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Login to Vote
          </button>
        </form>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full border-t-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Welcome, {user.name}!</h2>
        <p className="text-gray-600 mb-6">
          Your Voter ID is <strong className="text-gray-900">{user.voterId}</strong>. You have been successfully authenticated and are now authorized to participate in the election polling.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/vote')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            Proceed to Vote
          </button>
          <button 
            onClick={onLogout} 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setCurrentUser} />} />
        <Route path="/dashboard" element={<Dashboard user={currentUser} onLogout={() => setCurrentUser(null)} />} />
        <Route path="/vote" element={currentUser ? <VotingPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;