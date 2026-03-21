# Backend API

REST API built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express v5
- **Database**: MongoDB via Mongoose
- **Auth**: JWT + HTTP-only cookies
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Password Hashing**: bcryptjs

## Project Structure

```
backend/
├── config/
│   ├── cloudinary.config.js   # Cloudinary SDK setup
│   ├── db.config.js           # MongoDB connection
│   ├── multer.config.js       # Multer disk storage
│   └── nodemailer.config.js   # Nodemailer transporter
├── controllers/
│   ├── auth.controller.js     # Auth router (mounts handlers)
│   ├── login.controller.js
│   ├── register.controller.js
│   ├── users.controller.js
│   └── order.controller.js
├── middleware/
│   └── auth.middleware.js     # JWT verification
├── models/
│   ├── User.js
│   └── Order.js
├── utils/
│   ├── apiError.js            # Custom error class
│   ├── asyncHandler.js        # Async wrapper for route handlers
│   ├── cloudinary.js          # Upload helper
│   └── sendEmail.js
├── app.js                     # Express app setup
└── index.js                   # Server entry point
```

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdb
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Getting Started

```bash
npm install
npm start
```

Server runs on `http://localhost:5000` by default.

---

## API Reference

Base URL: `/api/v1`

### Auth Routes `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Register a new user |
| POST | `/login` | No | Login and receive JWT cookie |
| GET | `/allusers` | Yes | Get all users |
| PUT | `/update/:id` | No | Update user profile |
| DELETE | `/delete/:id` | No | Delete a user |

#### POST `/register`

Accepts `multipart/form-data`:

| Field | Type | Required |
|-------|------|----------|
| name | string | Yes |
| email | string | Yes |
| password | string | Yes |
| role | string | No (default: `user`) |
| avatar | file | No |

Roles: `user`, `admin`, `moderator`

#### POST `/login`

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

Returns user object and sets a `token` HTTP-only cookie (expires in 1 day).

---

### Order Routes `/api/v1/orders`

All routes require a valid JWT via `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new order |
| GET | `/` | Get all orders (admin) |
| GET | `/myorders` | Get logged-in user's orders |
| GET | `/:id` | Get order by ID |
| PUT | `/:id/status` | Update order status |
| DELETE | `/:id` | Delete an order |

#### POST `/`

```json
{
  "orderItems": [
    {
      "name": "Product Name",
      "qty": 2,
      "price": 49.99,
      "product": "<product_id>"
    }
  ],
  "totalPrice": 99.98
}
```

#### PUT `/:id/status`

```json
{
  "status": "shipped"
}
```

Order statuses: `pending`, `processing`, `shipped`, `delivered`, `cancelled`

Setting status to `delivered` automatically marks `isPaid` and `isDelivered` as `true`.

---

## Error Handling

All errors follow this response shape:

```json
{
  "success": false,
  "message": "Error description"
}
```

Errors are thrown using `ApiError(statusCode, message)` and caught globally by the Express error middleware in `app.js`.
