import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './pages/Hero';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  function setCurrentUser(currentUser) {
    setUser(currentUser);
    setLoggedIn(true);
  }

  function logOut() {
    setUser({});
    setLoggedIn(false);
    localStorage.token = '';
  }

  useEffect(() => {
    const token = localStorage.token;
    if (typeof token !== 'undefined' && token.length > 1
      && token !== 'undefined'
    ) {
      fetch('http://localhost:3000/auto_login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((r) => r.json())
        .then((user) => setCurrentUser(user));
    }('Please log in!');
  
  }, []);

  return (
    <div className="overallTop">
        <main>
          <Routes>
            <Route exact='true' path='/' element={<Hero />}/>
            <Route exact='true' path='/login' element={<Login setCurrentUser={setCurrentUser} />}/>
          </Routes>
        </main>
    </div>
  );
}

export default App;
