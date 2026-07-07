# 🎥 YouTube Clone

A full-stack YouTube Clone built with the MERN Stack (MongoDB, Express.js, React.js, Node.js). Users can register, create their own channels, upload videos, search videos, and watch content through a clean and responsive interface.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### 📺 Channel
- Create Channel
- View My Channel
- Update Channel Details
- Channel Avatar

### 🎬 Videos
- Upload Videos
- Edit Video Details
- Delete Videos
- Watch Videos
- Video Thumbnails
- Video Description
- Video Views
- Search Videos

### 🎨 UI Features
- Fully Responsive Design
- Mobile Sidebar
- Desktop Sidebar
- Mobile Search
- Profile Dropdown
- Modern YouTube-like UI
- Loading States

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/kapil234/Youtube-clone.git
```

```
cd youtube-clone
```

---

## Install Frontend

```bash
cd Frontend
npm install
```

Start Frontend

```bash
npm run dev
```

---

## Install Backend

```bash
cd server
npm install
```

Start Backend

```bash
node server.js
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---