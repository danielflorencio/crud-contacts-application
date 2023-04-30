import { useState, useEffect } from 'react'
import { Contact } from './types/Contact';
// import './App.css'
import ContactList from './components/contactList';
import AddContactForm from './components/addContactForm';
import axios from 'axios';
import Sidebar from './components/sidebar/sidebar';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  const [contacts, setContacts] = useState<Contact[]>();

  const fetchData = async () => {
    axios.get('http://localhost:3344/contacts', {
      headers: {
        authorization: 'Basic ZGFuaWVsOiQzbmg0'
      }
  }).then((response) => {
    // console.log('data being received by the axios request: ', response.data.data)  
    const formatedData = response.data.data.map((response: any) => {
      return {age: response.age, name: response.name, id: response.id, email: response.email}
    })
    console.log('formatedData: ', formatedData)
    setContacts(formatedData)
  })
  }

  useEffect(() => {
    fetchData()
  }, [])


  const createNewContact = async (age: number, name: string, email: string) => {
    const response = await fetch('http://localhost:3344/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZGFuaWVsOiQzbmg0'
      },
      body: JSON.stringify({
        email: email,
        age: age, 
        name: name
      })
    });

    if (response.ok) {
      console.log('response.ok:', response.ok)
      fetchData();
    } else {
      console.log('There was an error. See the response: ', response)
    }
  }

  // const [renderedComponent, setRenderedComponent] = useState([<ContactList contacts={contacts} fetchData={fetchData}></ContactList>, <AddContactForm createNewContact={createNewContact}></AddContactForm>]);
  // const [renderedComponentId, setRenderedComponentId] = useState<number>(0);

  return (
      <Sidebar>
        <Routes>
          <Route path='' element={<ContactList contacts={contacts} fetchData={fetchData}></ContactList>}></Route>
          <Route path='new-contact' element={<AddContactForm createNewContact={createNewContact}></AddContactForm>}></Route>
        </Routes>

      </Sidebar>
  )
}

export default App