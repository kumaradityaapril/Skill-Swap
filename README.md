# SkillSwap – A Peer-to-Peer Learning Hub

SkillSwap is a full-stack web application designed to connect learners with mentors for skill exchange and knowledge sharing. It provides a platform for users to create skill posts, discover learning opportunities, book sessions, and engage in real-time communication.

## Technologies Used

**Frontend:**

*   React.js (JSX)
*   Vite
*   Tailwind CSS
*   React Router
*   Formik and Yup (Form Validation)
*   Axios (API Integration)

**Backend:**

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose (ODM)
*   JWT (Authentication)
*   bcrypt (Password Hashing)
*   Nodemailer (Email)
*   Twilio (SMS - Optional)
*   Multer or Cloudinary (File Uploads)
*   Socket.io (Real-Time Chat - Optional)
*   Jitsi Meet (Video Calls)

## Core Features

*   User Authentication (Login, Signup, Forgot/Reset Password)
*   User Roles (Learner, Mentor, Admin, Dual-role)
*   Skill Posts (Create, Edit, Delete, Feed)
*   Skill Discovery (Search, Filter)
*   Session Booking System
*   Video Calls via Jitsi
*   Rating & Review System
*   User Profiles
*   Admin Dashboard
*   Comments and Bookmarks
*   Dark Mode Toggle
*   Multi-step Forms
*   Notifications (Toasts, Email, SMS)
*   Progress Tracker UI
*   Responsive UI
*   Route Protection
*   Real-Time Chat (Optional)

## Setup Instructions

**Prerequisites:**

*   Node.js and npm/yarn installed
*   MongoDB instance running

**Clone the repository:**
```
bash
git clone <repository_url>
cd skillswap
```
**Frontend Setup:**

1.  Navigate to the `frontend` directory:
```
bash
    cd frontend
    
```
2.  Install dependencies:
```
bash
    npm install # or yarn install
    
```
3.  Create a `.env` file in the `frontend` directory and add your environment variables (e.g., API base URL):
```
env
    VITE_API_BASE_URL=<your_backend_api_url>
    # Add other frontend specific variables here
    
```
4.  Start the development server:
```
bash
    npm run dev # or yarn dev
    
```
**Backend Setup:**

1.  Navigate to the `backend` directory:
```
bash
    cd backend
    
```
2.  Install dependencies:
```
bash
    npm install # or yarn install
    
```
3.  Create a `.env` file in the `backend` directory and add your environment variables (e.g., MongoDB URI, JWT secret, Nodemailer credentials, Twilio credentials, Cloudinary credentials):
```
env
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    # Add other backend specific variables here (email, twilio, cloudinary etc.)
    
```
4.  Start the backend server:
```
bash
    npm start # or yarn start
    
```
The application should now be running with the frontend on the specified Vite port and the backend on the specified Express port.