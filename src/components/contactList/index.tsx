import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { Contact } from "../../types/Contact"
import ContactItem from "../contactItem"
import { FormEvent, useState } from "react"
import { Send, CancelOutlined } from "@mui/icons-material"

type ContactListProps = {
    contacts: Contact[] | undefined,
    fetchData: () => Promise<void>
}

export default function ContactList({contacts, fetchData}: ContactListProps){

    console.log('contacts being received on ContactList: ', contacts)

    const [componentMode, setComponentMode] = useState<'view' | 'edit'>('view');

    const [nameInputField, setNameInputField] = useState<string>('');
    const [ageInputField, setAgeInputField] = useState<number>(0);
    const [emailInputField, setEmailInputField] = useState<string>('');
    const [contactOnEditId, setContactOnEditId] = useState('');

    const editContact = async (contact: Contact) => {
        try {
            const response = await fetch(`http://localhost:3344/contacts/${contact.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ZGFuaWVsOiQzbmg0'
              },
              body: JSON.stringify({name: contact.name, email: contact.email, age: contact.age}),
            });
            console.log('response on EditContact: ', response)
            if(response.ok){
                console.log('response.ok.')
                await fetchData();
            }
          } catch (error) {
            console.error(error);
            alert("couldn't update the contact");
          }
    }

    const handleComponentModeChange = async (contactToChange: Contact) => {
        if(componentMode === 'view'){
            setComponentMode('edit');
            setContactOnEditId(contactToChange.id);
            setAgeInputField(contactToChange.age);
            setEmailInputField(contactToChange.email);
            setNameInputField(contactToChange.name);
        } else{
            setComponentMode('view');
        }
    }

    const deleteContact = async (contact: Contact) => {
        try {
            const response = await fetch(`http://localhost:3344/contacts/${contact.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ZGFuaWVsOiQzbmg0'
              },
              body: JSON.stringify({name: contact.name, email: contact.email, age: contact.age}),
            });
            if(response.ok){
                await fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(ageInputField === 0 || nameInputField === '' || emailInputField === ''){
            alert('Please, fill all the fields correctly to create a new contact.')
        } else{
            editContact({id: contactOnEditId, age: ageInputField, name: nameInputField, email: emailInputField});
            setContactOnEditId('');
            setAgeInputField(0);
            setEmailInputField('');
            setNameInputField('');
            setComponentMode('view');
        }
    } 

    return(
        <Grid container sx={{gap: 3}}>
            {
                componentMode === 'view' ? (
                    contacts ? (
                        contacts.map((contact, index) => 
                        <ContactItem key={index} contact={contact} deleteContact={deleteContact} handleComponentModeChange={handleComponentModeChange}/>
                    )
                    ) : (
                        <></>
                    )
                ) : (
                    <Box sx={{width: { xs: '100%', md: '600px'}}}>
                        <Typography variant='h4' sx={{marginBottom: '2.5rem'}}>Editing a contact.</Typography>
                        <form onSubmit={(e) => handleSubmit(e)} style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                        <TextField id="filled-basic" label="Name" variant="filled" type='text' value={nameInputField} onChange={(e) => setNameInputField(e.target.value)}/>
                        <TextField id="filled-basic" label="Age" variant="filled" type='number'  value={ageInputField} onChange={(e) => setAgeInputField(Number(e.target.value))} />
                        <TextField id="filled-basic" label="Email" variant="filled" type='text' value={emailInputField} onChange={(e) => setEmailInputField(e.target.value)}/>       
                        <Button variant="outlined" onClick={() => {setComponentMode('view')}} color='error' endIcon={<CancelOutlined/>}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<Send />} type='submit'>
                            Finish editing
                        </Button>
                        </form>
                    </Box>
                )
            }
        </Grid>
    )
}