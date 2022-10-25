import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { db } from '../../firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { doc, deleteDoc } from "firebase/firestore";
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import './App.css';
const q = query(collection(db, 'plaque'), orderBy('timestamp', 'desc'));
function App() {
    const [todos, setTodos] = useState([]);
    const [name, setName] = useState('');
   
    const [price, setPrice] = useState('');
    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [name]);
    const addTodo = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'plaque'), {
            name: name,
            
            price: price,
       
            timestamp: serverTimestamp()
        })
        setName('')
    };
    return (
        <div className="App mt-10">
            <h4 className='h4 text-center my-5'> Plaque List</h4>
            <form className='flex flex-row justify-between m-3'>
                <TextField id="outlined-basic" label="name" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={name}
                    onChange={e => setName(e.target.value)} />
              
                <TextField id="outlined-basic" label="price" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={price}
                    onChange={e => setPrice(e.target.value)} />
               
                <Button variant="contained" color="primary" onClick={addTodo}  >Add</Button>
            </form>
            <ul>
                {todos.map(item => <List className="todo__list">
                    <ListItem key={item.id}>
                      
                        <ListItemText primary={item.item.name}/>
                      
                        <ListItemText secondary={item.item.price} />
                     
                    </ListItem>
                    <DeleteIcon fontSize="large" style={{ opacity: 0.7 }} onClick={() => { deleteDoc(doc(db, 'plaque', item.id)) }} />
                </List>)}
            </ul>
        </div>
    );
}
export default App;