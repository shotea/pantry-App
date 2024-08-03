## Getting Started

### Inventory Management App
This Inventory Management App helps users keep track of their items effortlessly. The app allows users to add, search, update, and remove items in their inventory. Additionally, users can capture images using their PC camera and upload these images to Firebase Storage, enhancing the item tracking experience.
Features

Inventory Management: Add, search, update, and remove items.
Camera Integration: Capture item images using your PC camera.
Firebase Integration: Store item data and images in Firebase Firestore and Storage.
Dark Mode: Toggle between light and dark modes for better user experience.
Real-time Updates: Automatically update the inventory list in real-time.

Getting Started
Prerequisites

Node.js (version 14 or higher)
Firebase account

Installation

Clone the repository:
bashCopygit clone https://github.com/your-username/inventory-management-app.git
cd inventory-management-app

Install dependencies:
bashCopynpm install

Configure Firebase:
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

Run the app:
bashCopynpm run dev

Open your browser:
Navigate to http://localhost:3000 to see the app in action.

Usage

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



Skills Used

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

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
