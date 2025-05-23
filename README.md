# 🏹 Projukti Hunt

A platform to discover, showcase, and upvote Bangladeshi tech products. Built with modern web technologies to provide a seamless user experience.

---

## 🌍 Live Demo

🔗 **Live Site**: [https://projuktihunt.vercel.app](#)

---

## 🚀 Technologies Used

### **Full-Stack Framework**

- Next.js

### **Frontend**

- React
- Tailwind CSS
- DaisyUi
- Shadchan

### **Backend**

- Node.js
- Express.js (via Next.js API routes)
- MongoDB

### **Authentication**

- Firebase
- JWT

### **Other Libraries**

- Axios
- Pusher
- React Query
- SweetAlert2
- Lucide React

---

## ✨ Features

✔ **Responsive Design** – Fully responsive for mobile, tablet, and desktop views.  
✔ **Real-Time Updates** – Pusher integration for real-time vote updates.  
✔ **Product Discovery** – Browse and upvote top Bangladeshi tech products.  
✔ **Role-Based Access** – Conditional rendering for authenticated users.  
✔ **Dynamic Sorting** – Products sorted by votes in real-time.  
✔ **Launch a Product** – Authenticated users can submit their products.  
✔ **Skeleton Loading** – Smooth loading experience with skeleton components.  
✔ **Secure Authentication** – Firebase-based authentication ensures safe access.  
✔ **Environment Variables** – Sensitive keys stored securely.  
✔ **Advanced Search & Filters** – Filter products by categories and timeframes.

---

## 📦 Dependencies

```json
{
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "lucide-react": "^0.471.1",
  "pusher-js": "^8.0.1",
  "react": "^19.0.0-rc.1",
  "react-dom": "^19.0.0-rc.1",
  "react-hot-toast": "^2.5.1",
  "react-query": "^5.64.1",
  "sweetalert2": "^11.15.10",
  "tailwindcss": "^3.3.0"
}
```

## ⚙️ Installation & Setup Guide

Follow these steps to set up and run Projukti Hunt locally on your machine.

### Prerequisites

Ensure you have the following installed before proceeding:

- Node.js (Recommended: Latest LTS version)
- npm (Node Package Manager) or yarn
- Git (for cloning the repository)

### Step-by-Step Installation

**1️⃣ Clone the Repository**
Open your terminal and run the following command:

```sh
git clone https://github.com/Durjoy96/projukti-hunt.git
```

**2️⃣ Install Dependencies**
Navigate to the project directory and install the required npm packages:

```sh
npm install
```

**3️⃣ Set Up Environment Variables**
Create a .env file in the root directory and add the following keys:

```sh
NEXT_PUBLIC_apiKey=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_projectId=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_appId=YOUR_FIREBASE_APP_ID
NEXT_PUBLIC_measurementId=YOUR_FIREBASE_MEASUREMENT_ID
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
IMGBB_API_KEY=YOUR_IMGBB_API_KEY
NEXT_PUBLIC_PUSHER_APP_ID=YOUR_PUSHER_APP_ID
NEXT_PUBLIC_PUSHER_KEY=YOUR_PUSHER_KEY
PUSHER_SECRET=YOUR_PUSHER_SECRET
NEXT_PUBLIC_PUSHER_CLUSTER=YOUR_PUSHER_CLUSTER
CRON_SECRET=YOUR_CRON_SECRET
JWT_SECRET=YOUR_JWT_SECRET
```

**4️⃣ Start the Development Server**
Run the following command to start the development server:

```sh
npm run dev
```

The application will be available at http://localhost:3000/.

## 🛠️ Troubleshooting

If the frontend does not start, ensure you have installed Node.js and npm.
Check that you have set up your .env variables correctly.
If Firebase authentication does not work, make sure API keys and Firestore rules are properly configured.

## 📜 License

This project is licensed under the MIT License.
