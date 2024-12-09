# VillaBnB Project

The VillaBnB project is a full-stack application designed for booking and favoriting villas. It integrates backend and frontend development to provide users with a seamless experience in managing their villa bookings.


### Project Goals

The primary objective of the VillaBnB project is to create a functional application that allows users to browse, book, and favorite villas efficiently.

Technologies Used

Backend: Flask, python

Frontend: React.js

Database: SQLALCHEMY

Routing: React Router


Features

## Backend Development

The backend development includes the following functionalities:

### Database Design and Development

A database schema supports functionalities for villas, guests, bookings, and favorites.


#### Backend Routes

Routes handle functionalities such as villa listing retrieval, guest sign-ups, booking creation, 
favoriting villas, and viewing user-specific bookings and favorites.

Secure handling of requests with appropriate validations and error messages.

#### Models

Models represent core entities, ensuring proper relationships between them.

Models define how data is stored and retrieved for key entities (villas, guests, bookings, and favorites).

Controllers manage business logic, such as booking a villa and retrieving user-specific data.

#### Database Integration

Database migrations ensure the correct setup, and seeded test data is provided for development.
Frontend Development


#### Backend-to-Frontend

Within the services folder contains the frontend routes that make API calls to the backend consists of:  
authService.js - responsible for guest sign up logic

bookingService.js - responsible for booking and retrieving bookings fro the backend

favoriteService.js - responsible for adding favorite villas and retrieving favorite villas from the backend

listingService.js - responsible for retrieving all  available villas

guestlisting.js - manages all booking and favorites for individual guests


#### The frontend development includes the following functionalities:

##### Frontend Components

Key components built in React include villa listing cards, booking forms, and guest signup forms.

Each component handles user inputs and makes API requests to the backend.

Frontend Routing

Frontend routing implemented using React Router enables navigation between pages like the homepage, villa listings, and user-specific views.

Routes are integrated with the backend for a seamless user experience.
Frontend-Backend Connectivity

Communication between the frontend and backend is managed to ensure smooth data flow through API calls.

Logic is built for sending and receiving data, such as booking details and villa listings.
User Interface and Experience

A clean and responsive user interface is designed for usability across various devices.
Form validation and feedback mechanisms are included for user actions, ensuring errors are handled gracefully.