## Getting Started

### Inventory Management App
This Inventory Management App helps users keep track of their items effortlessly. The app allows users to add, search, update, and remove items in their inventory. Additionally, users can capture images using their PC camera and upload these images to Firebase Storage, enhancing the item tracking experience.
Features

## Inventory Management: 
Add, search, update, and remove items.
Under Development - Camera Integration: Capture item images using your PC camera.
Firebase Integration: Store item data and images in Firebase Firestore and Storage.
Dark Mode: Toggle between light and dark modes for better user experience.
Real-time Updates: Automatically update the inventory list in real-time.

## Getting Started
### Prerequisites

Node.js (version 14 or higher)
Firebase account

### Installation

### Clone the repository:
bashCopygit clone https://github.com/your-username/inventory-management-app.git
cd inventory-management-app

### Install dependencies:
bashCopynpm install

### Configure Firebase:
Create a firebase.js file in the src directory and add your Firebase configuration:
javascriptCopyimport { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // your firebase config
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

### Run the app:
bashCopynpm run dev

### Open your browser:
Navigate to http://localhost:3000 to see the app in action.

### Usage

Add Items:

Click on "Add New Item" button.
Enter the item name.
Capture an image using your PC camera.
Click "Add Item".


Search Items:

Use the search bar to filter items by name.


Update Item Quantity:

Use the "+" and "-" buttons to increase or decrease the item quantity.


Remove Items:

Use the "X" button to remove an item from the inventory.


Toggle Dark Mode:

Use the Dark Mode switch to toggle between light and dark modes.



### Skills Used

JavaScript
React
Next.js
Firebase Firestore
Firebase Storage
Material-UI
HTML5
CSS3
Camera API
Client-Side State Management

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

