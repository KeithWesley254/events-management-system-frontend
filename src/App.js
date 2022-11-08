import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Hero from './pages/Hero';

function App() {
  return (
    <div className="overallTop">
        <main>
          <Routes>
            <Route exact='true' path='/' element={<Hero />}/>
            <Route exact='true' path='/login' element={<LoginForm />}/>
            <Route exact='true' path='/homepage' element={<Hero />}/>
          </Routes>
        </main>
    </div>
  );
}

export default App;
