import { Box, Button, TextField, Typography } from '@mui/material';
import {FormEvent, useState} from 'react'
import { Send } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
// import './styles.css'

type AddContactFormProps = {
    createNewContact: (age: number, name: string, email: string) => void,
}

export default function AddContactForm({createNewContact}: AddContactFormProps){

    const navigate = useNavigate()
    
    const [nameInputField, setNameInputField] = useState('');
    const [ageInputField, setAgeInputField] = useState(0);
    const [emailInputField, setEmailInputField] = useState('');
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(ageInputField === 0 || nameInputField === '' || emailInputField === ''){
            alert('Please, fill all the fields correctly to create a new contact.')
        } else{
            createNewContact(ageInputField, nameInputField, emailInputField);
            setAgeInputField(0);
            setEmailInputField('');
            setNameInputField('');
            navigate('/');
        }
    } 

    return(
        <Box sx={{width: { sm: '100%', md: '600px'}, paddingTop: 2}}>
            <Typography variant='h4' sx={{marginBottom: '2.5rem'}}>Creating new Contact.</Typography>
            <form onSubmit={(e) => handleSubmit(e)} style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <TextField id="filled-basic" label="Name" variant="filled" type='text' value={nameInputField} onChange={(e) => setNameInputField(e.target.value)}/>
            <TextField id="filled-basic" label="Age" variant="filled" type='number'  value={ageInputField} onChange={(e) => setAgeInputField(Number(e.target.value))} />
            <TextField id="filled-basic" label="Email" variant="filled" type='text' value={emailInputField} onChange={(e) => setEmailInputField(e.target.value)}/>
            
            <Button variant="contained" endIcon={<Send />} type='submit'>
                Send
            </Button>
            </form>
        </Box>
    )
}