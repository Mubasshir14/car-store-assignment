# Car Store Application

A comprehensive Express.js application built with TypeScript to manage a car store. The app integrates MongoDB using Mongoose for database management and ensures robust data validation with `zod` and Mongoose schema validation. This project demonstrates best practices in building scalable, type-safe, and maintainable web applications.

---

## Features

- **TypeScript Support**: Fully typed application for better development experience and maintainability.
- **Express.js**: Backend framework to handle routes and API logic.
- **MongoDB with Mongoose**: NoSQL database for efficient storage and retrieval of car details.
- **Validation with Zod and Mongoose**: Ensures data integrity by validating input and database schemas.
- **Environment Configuration**: Uses `dotenv` for environment variables.
- **Development Tools**: Integrated ESLint and Prettier for linting and code formatting.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (Local or Atlas connection)

---

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/car-store.git
   cd car-store
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of the project and configure the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/carstore
   ```

4. **Run in Development Mode**

   Start the application in development mode:

   ```bash
   npm run start:dev
   ```

5. **Build and Run in Production Mode**

   Build the application:

   ```bash
   npm run build
   ```

   Start the production server:

   ```bash
   npm run start:prod
   ```

6. **Lint and Format Code**

   - Lint code:

     ```bash
     npm run lint
     ```

   - Automatically fix lint errors:

     ```bash
     npm run lint:fix
     ```

   - Format code:
     ```bash
     npm run format
     ```

---

## Folder Structure

```plaintext
car-store/
├── src/
│   ├── models/       # Mongoose schemas and models
│   ├── routes/       # Express routes
│   ├── controllers/  # Request handlers
│   ├── utils/        # Utility functions
│   ├── server.ts     # Entry point of the application
├── dist/             # Compiled JavaScript files
├── .env              # Environment variables
├── .eslintrc.js      # ESLint configuration
├── .prettierrc       # Prettier configuration
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation
```

---

## API Endpoints

### **Cars**

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| GET    | `/api/cars`     | Retrieve all cars      |
| GET    | `/api/cars/:id` | Retrieve a car by ID   |
| POST   | `/api/cars`     | Add a new car          |
| PUT    | `/api/cars/:id` | Update an existing car |
| DELETE | `/api/cars/:id` | Delete a car by ID     |

---

## Development Tools

- **TypeScript**: For type-safe development.
- **ESLint**: To maintain code quality.
- **Prettier**: To enforce consistent code style.
- **ts-node-dev**: For live reloading during development.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

.