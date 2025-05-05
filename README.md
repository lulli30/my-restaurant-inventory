# Restaurant Inventory Management System

This is a full-stack **Restaurant Inventory Management System** developed for a client as part of a freelancing project. The system allows restaurant staff or admins to efficiently manage ingredients and inventory stock in real time using a user-friendly dashboard.

## Project Purpose

This system was developed to help a restaurant streamline its inventory process by:

- Tracking stock levels of ingredients
- Adding new stock entries
- Viewing real-time inventory data
- Connecting the frontend with a MySQL database via a custom backend API

## Tech Stack

**Frontend**:

- React JS (JSX)
- Tailwind CSS
- Vite

**Backend**:

- Node.js
- Express.js
- MySQL

**Database**:

- MySQL

## Features

- View all stock ingredients
- Add new stock items through a modal form
- Connects with a MySQL database
- Real-time updates after inserting new entries
- Clean UI with Tailwind CSS
- Navigation to and from dashboard

## How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/my-restaurant-inventory.git
cd my-restaurant-inventory
```

### 2. Setup MySQL Database

- Import your SQL schema (sample provided in `/backend/schema.sql` or manually create a `stock_ingredients` table).
- Configure database credentials in `backend/db.js`.

### 3. Run the Backend

```bash
cd backend
npm install
node server.js
```

### 4. Run the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Author

**John Andrew Borabo**
Freelance Web Developer & Computer Science Student
[johnandrewborabo44@gmail.com](mailto:johnandrewborabo44@gmail.com)
[Portfolio](https://lulli-dev.vercel.app) | [GitHub](https://github.com/lulli30)

---

## Note

This project was developed as a **freelancing project for a client** and showcases practical implementation of inventory features using a modern tech stack.
