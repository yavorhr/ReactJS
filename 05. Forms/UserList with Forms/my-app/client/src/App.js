
import './App.css';

import { Header } from './components/common/Header.js';
import Footer from './components/common/Footer.js';
import { UserList } from './components/users/user-list/UserList.js';

function App() {
  return (
    
    <div className="App">
      <Header />

      <UserList />

      <Footer />

    </div>
  );
}

export default App;
