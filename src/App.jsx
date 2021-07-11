import CreateUserForm from './CreateUserForm';

import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <CreateUserForm onSubmit={console.table} />
    </div>
  );
}

export default App;
