# Wema Hotel Management System

A full-stack hotel management system built with Flask (Python) backend and React.js frontend, featuring room booking, user authentication, and administrative functionality.

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: React.js
- **Database**: SQLAlchemy ORM
- **Routing**: React Router
- **Authentication**: Flask-JWT-Extended (assumed)
- **API**: RESTful API endpoints

## Project Structure

```
Wema_Hotel/
├── servers/
│   ├── app.py                 # Main Flask application
│   ├── models.py              # Database models
│   ├── routes/                # API route handlers
│   │   ├── auth.py           # Authentication routes
│   │   ├── rooms.py          # Room management routes
│   │   └── bookings.py       # Booking management routes
│   ├── config.py             # Configuration settings
│   ├── requirements.txt      # Python dependencies
│   └── instance/
│       └── database.db       # SQLite database file
├── client/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   └── App.js           # Main React application
│   ├── public/              # Static assets
│   ├── package.json         # Node.js dependencies
│   └── package-lock.json
└── README.md               # This documentation
```

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- **Python 3.8+** - Download from [python.org](https://python.org)
- **Node.js 16+** and **npm** - Download from [nodejs.org](https://nodejs.org)
- **Git** - For version control
- **Code Editor** - VS Code, PyCharm, or your preferred IDE

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sophie-Muchiri12/Wema_Hotel.git
   cd Wema_Hotel
   ```

2. **Create and activate a virtual environment**
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   cd servers
   pip install -r requirements.txt
   ```
   or
   
   ```bash
   pip install flask flask-sqlalchemy flask-migrate flask-cors pymysql python-dotenv
   ```
5. **Environment Configuration**
   Create a `.env` file in the `backend/` directory:
   ```env
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=sqlite:///instance/database.db
   JWT_SECRET_KEY=your-jwt-secret-key
   ```

6. **Initialize the database**
   ```bash
   python -c "from app import app, db; app.app_context().push(); db.create_all()"
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../client
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the `frontend/` directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_ENVIRONMENT=development
   ```

## How to Run the Project

### Start the Backend Server

1. **Activate virtual environment** (if not already active)
   ```bash
   cd backend
   # Windows: venv\Scripts\activate
   # macOS/Linux: source venv/bin/activate
   ```

2. **Run the Flask application**
   ```bash
   python app.py
   # or
   flask run
   ```

3. **Expected Output**
   ```
   * Running on http://127.0.0.1:5000
   * Debug mode: on
   * Restarting with stat
   * Debugger is active!
   ```

### Start the Frontend Application

1. **In a new terminal, navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Start the React development server**
   ```bash
   npm start
   ```

3. **Expected Output**
   ```
   Compiled successfully!
   
   You can now view wema-hotel in the browser.
   
   Local:            http://localhost:3000
   On Your Network:  http://192.168.1.xxx:3000
   ```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Documentation**: http://localhost:5000/api/docs (if Swagger is implemented)

### Expected Features

- **User Registration/Login**: Create accounts and authenticate users
- **Room Browsing**: View available rooms with details and pricing
- **Booking System**: Make, view, and manage room reservations
- **Admin Panel**: Manage rooms, bookings, and user accounts
- **Responsive UI**: Mobile-friendly interface

## Key Functions and Components Documentation

### 1. User Authentication System (`backend/routes/auth.py`)

**Purpose**: Handles user registration, login, logout, and JWT token management for secure access to the hotel booking system.

**Key Functions**:

#### `register_user()`
- **What it does**: Creates new user accounts with validation and password hashing
- **Inputs**: 
  ```json
  {
    "username": "string (required, 3-50 chars)",
    "email": "string (required, valid email format)",
    "password": "string (required, min 6 chars)",
    "full_name": "string (optional)",
    "phone": "string (optional)"
  }
  ```
- **Output**: 
  ```json
  {
    "message": "User registered successfully",
    "user_id": 123,
    "access_token": "jwt-token-string"
  }
  ```
- **Edge Cases**: 
  - Duplicate email/username returns 400 error
  - Invalid email format returns validation error
  - Weak passwords are rejected

#### `login_user()`
- **What it does**: Authenticates users and provides JWT access tokens
- **Inputs**:
  ```json
  {
    "email": "user@example.com",
    "password": "user-password"
  }
  ```
- **Output**:
  ```json
  {
    "access_token": "jwt-token-string",
    "user": {
      "id": 123,
      "username": "john_doe",
      "email": "user@example.com",
      "role": "customer"
    }
  }
  ```
- **Edge Cases**:
  - Invalid credentials return 401 unauthorized
  - Inactive accounts are rejected
  - Rate limiting after multiple failed attempts

### 2. Room Booking Component (`frontend/src/components/BookingForm.js`)

**Purpose**: Handles the core booking functionality, allowing users to select dates, room types, and complete reservations with real-time availability checking.

**Key Functions**:

#### `handleBookingSubmission()`
- **What it does**: Processes room booking requests with date validation and conflict checking
- **Inputs (Props)**:
  ```javascript
  {
    selectedRoom: {
      id: number,
      name: string,
      price: number,
      capacity: number
    },
    checkInDate: Date,
    checkOutDate: Date,
    guestCount: number,
    specialRequests: string
  }
  ```
- **Output**: 
  ```javascript
  // Success Response
  {
    bookingId: "BK-2024-001",
    confirmationNumber: "CONF123456",
    totalAmount: 450.00,
    status: "confirmed"
  }
  
  // Error Response
  {
    error: "Room not available for selected dates",
    availableDates: ["2024-07-15", "2024-07-16"]
  }
  ```
- **Edge Cases**:
  - Check-in date cannot be in the past
  - Check-out must be after check-in
  - Guest count cannot exceed room capacity
  - Handles room availability conflicts
  - Validates payment information before confirmation

#### `calculateTotalCost()`
- **What it does**: Computes booking costs including taxes, fees, and discounts
- **Inputs**:
  ```javascript
  {
    roomPrice: 150.00,
    numberOfNights: 3,
    guestCount: 2,
    discountCode: "SUMMER2024" // optional
  }
  ```
- **Output**:
  ```javascript
  {
    subtotal: 450.00,
    taxAmount: 67.50,
    serviceFee: 25.00,
    discountAmount: -45.00,
    totalAmount: 497.50,
    breakdown: {
      roomCost: 450.00,
      taxes: 67.50,
      fees: 25.00,
      discount: -45.00
    }
  }
  ```
- **Edge Cases**:
  - Invalid discount codes are ignored
  - Minimum stay requirements are enforced
  - Peak season pricing adjustments
  - Group booking discounts for 4+ guests

## API Endpoints Reference

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile (requires JWT)

### Room Management Endpoints
- `GET /api/rooms` - Get all available rooms
- `GET /api/rooms/:id` - Get specific room details
- `GET /api/rooms/search` - Search rooms by criteria

### Booking Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## Troubleshooting Tips

### Common Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'flask'`
**Solution**: Ensure virtual environment is activated and dependencies are installed:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**Issue**: Database connection errors
**Solution**: 
1. Check if `instance/` directory exists in backend folder
2. Recreate database: `python -c "from app import app, db; app.app_context().push(); db.create_all()"`

**Issue**: CORS errors when frontend calls backend
**Solution**: Ensure Flask-CORS is installed and configured in `app.py`:
```python
from flask_cors import CORS
CORS(app, origins=['http://localhost:3000'])
```

### Common Frontend Issues

**Issue**: `npm start` fails with dependency errors
**Solution**: Clear npm cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Issue**: API calls returning 404 errors
**Solution**: 
1. Verify backend server is running on port 5000
2. Check `REACT_APP_API_BASE_URL` in `.env` file
3. Ensure API endpoints match backend routes

**Issue**: React Router not working after page refresh
**Solution**: Configure development server in `package.json`:
```json
{
  "scripts": {
    "start": "react-scripts start --history-api-fallback"
  }
}
```

### Development Tips

1. **Enable Debug Mode**: Set `FLASK_ENV=development` in backend `.env` for detailed error messages
2. **API Testing**: Use tools like Postman or curl to test backend endpoints independently
3. **Browser DevTools**: Use Network tab to monitor API calls and responses
4. **Database Inspection**: Use SQLite browser tools to inspect database contents during development
