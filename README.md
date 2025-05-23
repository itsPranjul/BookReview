# 📚 BookReview – Backend

A Node.js + Express backend API for a Book Review platform where users can register, login, search books, and leave reviews.

---

## 🚀 Features

- ✅ User Registration & Login (JWT)
- ✅ Add / Update / Delete Book Reviews
- ✅ Search books by title or author
- ✅ One review per user per book
- ✅ RESTful API structure

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Others**: dotenv, bcryptjs, cors

---

## 📁 Folder Structure

```
BookReview/
├── controllers/       # Route logic
├── middleware/        # JWT auth middleware
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── .env               # Environment variables
├── .gitignore
├── server.js          # Entry point
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/itsPranjul/BookReview.git
cd BookReview
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the server

```bash
npm start
```

---

## 📮 API Endpoints

### 🔐 Auth

```
POST   /api/auth/register       → Register a user
POST   /api/auth/login          → Login and get JWT token
```

### 📘 Books

```
POST   /api/books/addBook       → Add a new book (protected)
GET    /api/books/allBooks      → Fetch all books
GET    /api/books/:id           → Fetch a book by ID
```

### ✍️ Reviews

```
POST   /api/reviews/addReview/:id      → Add review for a book (protected)
PUT    /api/reviews/updateReview/:id   → Update a review (protected)
DELETE /api/reviews/deleteReview/:id   → Delete a review (protected)
```

### 🔍 Search

```
GET    /api/search/:query       → Search books by title or author
```

---

## 🔐 Authorization Format

All protected routes require a Bearer token:

```
Authorization: Bearer <your_token>
```

---

## 👤 Author

Made by [@itsPranjul](https://github.com/itsPranjul)

