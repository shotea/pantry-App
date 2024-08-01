'use client';
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Modal, Typography, Button, Stack, TextField } from '@mui/material';
import { collection, query, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

export default function Home() {
  // inventory management helper functions
  const [inventory, setInventory] = useState([]);
  // add and remove things, default value false
  const [open, setOpen] = useState(false);
  // to store the name of the item we type out
  const [itemName, setItemName] = useState('');
  
  // fetch the inventory from Firebase functions
  // 1 updating from Firebase, make it async, it won’t block out entire code while fetching
  const updateInventory = async () => {
    // equal to a function, snapshot in the collection by doing a query. so query collection and in it we put firestore and inventory
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    // for every element in snapshot, we want to add it to our inventory list, push an obj where name is the id of doc
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    // set inventory to inventory list
    setInventory(inventoryList);
    //console.log(inventoryList);
  };

  // Add or Remove Items:

  // add items
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item); // this gets a direct item reference
    // now we get a snapshot, gets doc by ref if it exists
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else { // if it exists we add 1, if it doesn't exist we set quantity to 1 and update inventory
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  // remove items
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item); // this gets a direct item reference
    // now we get a snapshot, gets doc by ref if it exists
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) { // if quantity == 1 we want to delete it
        await deleteDoc(docRef);
      } else { // if not == 1 we set docRef to be quantity where quantity is == to quantity - 1
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  // useEffect runs whenever code in here is in this case updateInventory, whenever in the array[] dependency changes, here’s nothing not so it runs once at beginning of page loads
  useEffect(() => {
    updateInventory();
  }, []); // The empty dependency array ensures this runs only once

  // Open and close modal functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // justifyContent="center" centers it horizontally, alignItems="center" centers it vertically
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      justifyContent="center"  
      alignItems="center"
      gap={2}
    >
      {/* Add items to inventory management system (prebuild modals just add them at the top, import it so everything compiles) */}
      <Modal open={open} onClose={handleClose}>
        {/* This will center the box on screen */}
        <Box 
          position="absolute" 
          top="50%" 
          left="50%" 
          width={400}
          //transform="translate(-50%, -50%)" this prebuild rop didnt work, so i used sx and directly beeing applied as styules instead of using prebuild props.
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography variant="h5">Add Item</Typography>
          {/* stack is like a box but orders eveythong in a stack hence name, direction stacks things horizontallyn space so its not swquished */}
          <Stack width="100%" direction="row" spacing={2}>
          {/* set the content of text to the statement we defined above */}
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />

            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}  
            >
              Add
            </Button>
          </Stack>
        </Box> 
      </Modal>
      <Button 
        variant="contained" 
        onClick={() => {
          handleOpen()
        }}
      > 
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box 
          width="800px" 
          height="100px" 
          bgcolor="#ADD8E6" 
          display="flex"
          alignItems="center" 
          justifyContent="center"
        >
          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>
      
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {inventory.map(({name, quantity}) => (
          <Box 
            key={name} 
            width="150px" 
            minHeight="150px"
            display="flex" 
            flexDirection="column" // Added this to stack items vertically
            alignItems="center" 
            justifyContent="center" 
            bgcolor="#f0f0f0" 
            padding="16px" // Changed from padding={5} to padding="16px"
          >
            <Typography variant="h3" color="#333" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color="#333" textAlign="center">
              {quantity}
            </Typography>
            <Button 
              variant="contained"
              onClick={() => removeItem(name)}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Stack>
      </Box>
    </Box> 
  )

}
