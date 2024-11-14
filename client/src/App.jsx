import { useState } from 'react';
import ContactTable from './components/ContactTable.jsx';
import ContactForm from './components/ContactForm.jsx';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleFormSubmit = () => {
    setShowForm(false);
    setRefresh(!refresh);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  }

  return (
    <div>
      {!showForm && (
        <>
          <div className="top">
            <h2>Contact List</h2>
            <div className="add-btn">
              <button onClick={() => setShowForm(true)}>Add Contact</button>
            </div>
          </div>
          <ContactTable key={refresh} />
        </>
      )}

      {showForm && <ContactForm onFormSubmit={handleFormSubmit} onFormCancel={handleFormCancel}/>}
    </div>
  );
}

export default App;
