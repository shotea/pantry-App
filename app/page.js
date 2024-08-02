'use client';
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Modal, Typography, Button, Stack, TextField, Switch } from '@mui/material';
import { collection, query, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';


export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch inventory from Firestore
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  // Add a new item to inventory
  const addItem = async (item) => {
    if (!item.trim()) {
      setAlert({ type: 'error', message: 'Please enter an item name.' });
      return;
    }
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
    setItemName('');
    handleClose();
    setAlert({ type: 'success', message: `${item} added to inventory.` });
  };

  // Remove an item from inventory
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
    setAlert({ type: 'success', message: `${item} removed from inventory.` });
  };

  // Increase the quantity of an item
  const increaseQuantity = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    }
    
    await updateInventory();
  };

  // Decrease the quantity of an item
  const decreaseQuantity = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    
    await updateInventory();
  };

  // Fetch inventory when component mounts
  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle search functionality
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle between dark mode and light mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        color: darkMode ? '#e0e0e0' : '#333333',
        position: 'relative',
        py: 6,
        px: { xs: 2, sm: 4, md: 6 },
        transition: 'background-color 0.3s, color 0.3s',
        bgcolor: darkMode ? '#333333' : '#FFA07A' // Adjust background color based on mode
      }}
    >
      <Box maxWidth="lg" mx="auto">
        <Typography variant="h2" color="primary" align="center" mb={4}>
          Inventory Management
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" mb={6}>
          Keep track of your items with ease
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={4}>
          <Typography variant="body1" color="text.secondary" mr={2}>
            Dark Mode
          </Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Stack>

        {alert && (
          <Box 
            mb={4} 
            p={2} 
            bgcolor={alert.type === 'error' ? '#f8d7da' : '#d4edda'}
            borderRadius={2}
            boxShadow={3}
          >
            <Typography color={alert.type === 'error' ? '#721c24' : '#155724'}>
              {alert.message}
            </Typography>
          </Box>
        )}

        <Box 
          bgcolor={darkMode ? '#1e1e1e' : '#ffffff'}
          borderRadius={4} 
          boxShadow={3} 
          overflow="hidden" 
          mb={4}
          transition="background-color 0.3s"
        >
          <Box p={3} bgcolor="primary.main" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" color="white">
              Inventory Items
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={handleOpen}
              startIcon={<span>+</span>}
            >
              Add New Item
            </Button>
          </Box>

          <Box p={3} borderBottom="1px solid" borderColor={darkMode ? '#424242' : '#e0e0e0'} mb={2}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                style: {
                  color: darkMode ? '#e0e0e0' : '#333333',
                  backgroundColor: darkMode ? '#333333' : '#ffffff',
                  borderColor: darkMode ? '#424242' : '#e0e0e0',
                }
              }}
            />
          </Box>

          <Box p={3} maxHeight={400} overflow="auto">
            {filteredInventory.length === 0 ? (
              <Typography color="text.secondary" align="center">
                No items found. Add some!
              </Typography>
            ) : (
              <Stack spacing={2}>
                {filteredInventory.map(({name, quantity}) => (
                  <Box 
                    key={name} 
                    p={2}
                    borderRadius={2}
                    bgcolor={darkMode ? '#333333' : '#f5f5f5'}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    transition="background-color 0.3s"
                  >
                    <Box>
                      <Typography variant="h6">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Quantity: {quantity}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button 
                        variant="contained"
                        color="primary"
                        onClick={() => increaseQuantity(name)}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          minWidth: 32,
                          height: 32,
                          fontSize: 16,
                          '&:hover': {
                            backgroundColor: darkMode ? '#1565c0' : '#1976d2',
                          }
                        }}
                      >
                        +
                      </Button>
                      <Button 
                        variant="contained"
                        color="error"
                        onClick={() => decreaseQuantity(name)}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          minWidth: 32,
                          height: 32,
                          fontSize: 16,
                          '&:hover': {
                            backgroundColor: darkMode ? '#c62828' : '#d32f2f',
                          }
                        }}
                      >
                        -
                      </Button>
                      <Button 
                        variant="contained"
                        color="error"
                        onClick={() => removeItem(name)}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          minWidth: 32,
                          height: 32,
                          fontSize: 16,
                          '&:hover': {
                            backgroundColor: darkMode ? '#c62828' : '#d32f2f',
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: darkMode ? '#424242' : '#ffffff',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            transition: 'background-color 0.3s',
          }}
        >
          <Typography variant="h5" mb={3}>Add Item</Typography>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
              InputProps={{
                style: {
                  color: darkMode ? '#e0e0e0' : '#333333',
                  backgroundColor: darkMode ? '#CD5C5C' : '#ffffff'
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => addItem(itemName)}
              fullWidth
            >
              Add
            </Button>
          </Stack>
        </Box> 
      </Modal>
    </Box>
  );
}
