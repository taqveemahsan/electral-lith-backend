# Node.js Express JWT Authentication API with Elasticsearch Integration

Welcome to the **Node.js Express JWT Authentication API** project! This application serves as a boilerplate for building secure, JWT-based authentication systems with Node.js and Express, leveraging Elasticsearch for data storage. This setup includes common patterns like structured response handling, a central context for Elasticsearch operations, and modular organization for scalability.

## Features

- **JWT Authentication**: Secure login and registration with JSON Web Tokens (JWT) for session management.
- **Express.js**: Organized MVC pattern for scalable route handling.
- **Elasticsearch Integration**: Robust data indexing and querying with Elasticsearch.
- **Auto-generated Unique IDs**: User IDs generated automatically using UUIDs.
- **Structured Response Handling**: Consistent success and error responses via a `ResponseHandler` class.
- **Configurable Settings**: Easy-to-configure environment variables.
- **Optimized REST API Structure**: Clean and standardized RESTful routes for efficient access.

## Project Structure

```
my-app/
├── config/
│   └── elasticsearch.js              # Elasticsearch configuration
├── context/
│   └── elasticsearchContext.js        # Main Elasticsearch context
├── src/
│   ├── common/                        # Common folder for shared utilities
│   │   ├── responseHandler.js         # Centralized response handling
│   │   ├── messagesEnum.js            # Enum for standardized messages
│   ├── models/
│   │   └── user.js                    # User model
│   ├── services/
│   │   └── userService.js             # Service for user operations
│   ├── controllers/
│   │   ├── authController.js          # Auth controller for registration and login
│   │   ├── userController.js          # User controller for user-related endpoints
│   │   └── secureController.js        # Protected controller for JWT-verified routes
│   ├── routes/
│   │   ├── authRoutes.js              # Routes for authentication
│   │   ├── userRoutes.js              # Routes for user API
│   │   └── secureRoutes.js            # Routes for protected resources
│   ├── middleware/
│   │   └── jwtMiddleware.js           # Middleware to verify JWT
│   └── app.js                         # Express app setup
├── .env                               # Environment variables
├── package.json
└── server.js                          # Entry point
```

## Prerequisites

- **Node.js** v14 or higher
- **Elasticsearch** instance (local or remote)
- **npm** package manager

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/ammagofficials/react-elastic-boilerplate.git
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables by creating a `.env` file:
   ```env
   PORT=3000
   ELASTICSEARCH_URL=https://your-elasticsearch-url:9200
   ELASTICSEARCH_USERNAME=your_username
   ELASTICSEARCH_PASSWORD=your_password
   JWT_SECRET=your_secret_key
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

## Usage

### Authentication Routes

- **Register** - `POST /api/auth/register`: Create a new account with unique credentials.
- **Login** - `POST /api/auth/login`: Authenticate and receive a JWT token for secure access.

### Secure Routes (JWT Protected)

- **Get Protected Data** - `GET /api/secure/protected`: Access a protected route with a valid JWT token.

### Elasticsearch-Powered User API

- **Create User** - Automatically registers users with a UUID.
- **Search User by ID** - Retrieve user details from Elasticsearch.
- **Delete User** - Remove user data from Elasticsearch.

## Code Highlights

### JWT Authentication

- **JWT Middleware**: `jwtMiddleware.js` ensures only authenticated users can access certain routes.
- **Auth Controller**: Handles user registration and login, issuing JWT tokens for secure sessions.

### Elasticsearch Context

- **Dynamic Model Naming**: Uses `constructor.name` to auto-generate indices based on model names.
- **CRUD Operations**: Centralized context for create, read, update, and delete operations with Elasticsearch.

### Centralized Response Handling

- **ResponseHandler**: Consistent success and error responses across the application.
- **Messages Enum**: Reusable messages in `messagesEnum.js` for standardizing responses.

## Contributing

Feel free to contribute by opening a pull request! For major changes, please open an issue to discuss your ideas.

## License

This project is open source and available under the [MIT License](LICENSE).

