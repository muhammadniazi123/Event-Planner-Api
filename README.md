# Event Planner API

A **Node.js + Express** RESTful API for managing users and events.  It provides basic authentication (registration & login) and endpoints for creating and querying events by name or date.

---

## ✨ Features

| Area                      | Details                                               |
| ------------------------- | ----------------------------------------------------- |
| **Authentication**        | Register & login with hashed passwords and JWT tokens |
| **Events**                | Create new events, fetch by **name** or **date**      |
| **Validation**            | All request bodies are validated with **Zod** schemas |
| **Database**              | MongoDB connection via **Mongoose**                   |
| **Error Handling**        | Centralised Express error‑handling middleware         |
| **Environment Variables** | Secrets loaded from a local `.env` file               |

---

## 📂 Project Structure

```
Event‑planner‑API/
├── controllers/
│   ├── eventcontroller.js        # Event CRUD logic
│   └── usercontroller.js         # Auth logic
├── middleware/
│   ├── error‑middleware.js       # Global error handler
│   └── validate_middleware.js    # Zod validation wrapper
├── router/
│   ├── authRouter.js             # /api/auth routes
│   └── eventRouter.js            # /api/event routes
├── schema/
│   ├── event_schema.js           # Event Mongoose schema
│   └── User_schema.js            # User Mongoose schema
├── utils/
│   └── DBconnect.js              # MongoDB connection helper
├── validator/
│   ├── auth_validator.js         # auth Zod schemas
│   └── event_validator.js        # event Zod schemas
├── .env                          # **Never commit this!**
├── server.js                     # Express entry point
└── package.json
```

---

## 🛠️ Tech Stack

* **Runtime:** Node.js (≥18)
* **Framework:** Express 4
* **Database:** MongoDB Atlas / local MongoDB
* **ODM:** Mongoose
* **Validation:** Zod
* **Auth:** JSON Web Tokens (JWT)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
$ git clone https://github.com/<your‑org>/event‑planner‑api.git
$ cd event‑planner‑api
```

### 2. Install dependencies

```bash
$ npm install
```

### 3. Create a `.env` file

```bash
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/eventdb"
JWT_SECRET="super_secret_key"
PORT=5000
```

> **Do NOT commit the `.env` file** – add it to `.gitignore`.

### 4. Run the server

#### Development (with *nodemon*)

```bash
$ npm run dev
```

#### Production

```bash
$ npm start
```

The API will be available at `http://localhost:5000/` by default.

---

## 🔌 API Reference

> Base URL: `/api`

### Auth Routes – `/auth`

| Method | Endpoint    | Body                                 | Description         |
| ------ | ----------- | ------------------------------------ | ------------------- |
| POST   | `/register` | `{ Name, Email, PhoneNO, Password }` | Register a new user |
| POST   | `/login`    | `{ Email, Password }`                | Obtain JWT token    |

Successful login/register returns:

```json
{
  "msg": "Login successfully",
  "userId": "<mongoId>",
  "Token": "<jwt>"
}
```

### Event Routes – `/event`

| Method | Endpoint           | Body / Query                                                 | Description                          |
| ------ | ------------------ | ------------------------------------------------------------ | ------------------------------------ |
| POST   | `/CreateEvent`     | `{ eventName, eventDate, eventAttendees, eventDiscription }` | Create a new event                   |
| GET    | `/findEventbyName` | `{ eventName }`                                              | Get single event by name             |
| GET    | `/findEventbyDate` | `{ eventDate }`                                              | Get **array** of events on that date |

Error responses follow the shape:

```json
{
  "message": "Validation Error",
  "extradetails": "eventName should be a string"
}
```

---

## 🧪 Testing the API

You can import the included **Postman Collection** (`docs/Event‑Planner.postman_collection.json`) or use cURL:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"Name":"Alice","Email":"alice@example.com","PhoneNO":"1234567890","Password":"password"}'
```

---

## 📑 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

* [Express](https://expressjs.com/) for the lightweight web server
* [Zod](https://github.com/colinhacks/zod) for elegant schema validation
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free tier DB hosting

Feel free to submit issues and PRs – contributions are welcome!
