import { useEffect, useState } from 'react';
import Home from './pages/Home'
import API from './util/API';
import './App.css'
import Auth from './pages/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [contents, setContents] = useState();

  useEffect(() => {
    (async() => {
      const res = await API.validate();
      console.log(res);

      if (res.user) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    })();
  }, [])

  useEffect(() => {
    setContents(user ? <Home user={user} handleLogout={handleLogout} /> : <Auth handleLogin={handleLogin} handleRegister={handleRegister} />);
  }, [user]);

  async function handleLogout() {
    await API.logout();
    setUser(null);
  }

  async function handleLogin(info) {
    const res = await API.login(info);
    if (res.data) setUser(res.data);
    return;
  }

  async function handleRegister(info) {
    const res = await API.register(info);
    console.log(res);
    return;
  }

  return (
    <div className="App">
      <h1>Auth Testing</h1>

      { contents }
    </div>
  )
}

export default App
