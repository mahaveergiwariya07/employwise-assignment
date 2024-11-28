import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import UserList from './components/UserList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
