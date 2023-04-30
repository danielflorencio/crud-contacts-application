// import './styles.css'
import { Contact } from "../../types/Contact";
import { Box, Button, Divider, Grid, Paper, Typography} from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';


type ContactItemProps = {
    contact: Contact,
    deleteContact: (contact: Contact) => Promise<void>,
    handleComponentModeChange: (contactToChange: Contact) => Promise<void>,
}

export default function ContactItem({contact, deleteContact, handleComponentModeChange}: ContactItemProps){
    
    console.log('data coming in to the ContactItem: ', contact)

    return(
        <Box component={Paper} elevation={3} sx={{gap: 3, display: 'flex', padding: '1rem', width: { sm: '100%', md: '600px'}}}>
            <Box sx={{width: '100%'}}>
                <Grid container>
                    <Grid item xs={3}><Typography sx={{fontWeight: 'bold'}}>Name: </Typography></Grid>
                    <Grid item xs={9}>{contact.name}</Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={3}><Typography sx={{fontWeight: 'bold'}}>Email: </Typography></Grid>
                    <Grid item xs={9}>{contact.email}</Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={3}><Typography sx={{fontWeight: 'bold'}}>Age: </Typography></Grid>
                    <Grid item xs={9}>{contact.age}</Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={3}><Typography sx={{fontWeight: 'bold'}}>Id: </Typography></Grid>
                    <Grid item xs={9}>{contact.id}</Grid>
                </Grid>
                <Divider sx={{marginTop: '1rem', marginBottom: '1rem'}}></Divider>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>

                <Button variant="outlined" onClick={() => handleComponentModeChange(contact)} color='primary' startIcon={<Edit/>}>
                    Edit
                </Button>
                <Button variant="outlined" onClick={async () => {await deleteContact(contact)}} color='error' startIcon={<DeleteForever/>}>
                    Delete
                </Button>
                </Box>
            </Box>
        </Box>                
    )
}


// return(
//     <>
//         {
//             componentMode === 'view' ? (
            
//             <div className='contact-item'>
//                 <div>Name: {contact.name}</div>
//                 <div>Age: {contact.age}</div>
//                 <div>Email: {contact.email}</div>
//                 <div>Id: {contact.id}</div>
//                 <div className='icons'>
//                     <div className='icon' onClick={() => handleComponentModeChange()}><AiOutlineEdit/></div>
//                     <div className='icon' onClick={async () => {await deleteContact(contact)}}><AiFillDelete/></div>
//                 </div>
//             </div>
            
//             ) : (
            
//             <div className='contact-item'>
//                 <div>Name: <input value={nameInputField} onChange={(e) => setNameInputField(e.target.value)}></input></div>
//                 <div>Age: <input type='number' value={ageInputField} onChange={(e) => setAgeInputField(e.target.valueAsNumber)}></input></div>
//                 <div>Email: <input value={email} onChange={(e) => setEmail(e.target.value)}></input></div>
//                 <div>Id: <input value={idInputField} onChange={(e) => setIdInputField(e.target.value)}></input></div>
//                 <div className='icons'>
//                     <div className='icon' onClick={() => handleComponentModeChange()}><AiOutlineCheck/></div>
//                     <div className='icon' onClick={() => deleteContact(contact)}><AiFillDelete/></div>
//                 </div>
//             </div>
            
//             )}            
//     </>
// )