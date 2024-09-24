
![](/client/src/assets/images/m3.png)
# CryptoMatrix  [demo video](https://youtu.be/MVNf__pef8o?si=wDUer_lO-jv90hC2)
CryptoMatrix is a web-based platform designed to manage cryptocurrency portfolios. It integrates with Bybit and CoinGecko APIs to fetch real-time data, track balances, and manage user API keys. It also includes features like authentication, email notifications, and a user-friendly frontend dashboard.

## Authors

- Godfrey Dekera - [GitHub](https://github.com/godfreydekew/)
- Felicity Essien - [GitHub](https://github.com/felabel)
##
## Access Live Application:   [cryptoMatrix.com](https://cryptomfrontend.onrender.com/)

![CryptoMatrix Logo](/client/src/assets/images/readme.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
CryptoMatrix empowers users to efficiently manage their cryptocurrency portfolios by integrating real-time data from Bybit and CoinGecko APIs. With features like user authentication, API key management, and email notifications, it provides a secure and user-friendly experience for both novice and experienced crypto traders.

## Features

- Secure user authentication and session management
- Seamless integration with Bybit and CoinGecko APIs
- Efficient API key management with usage tracking
- Real-time email notifications via Nodemailer
- Responsive and intuitive frontend dashboard
- Portfolio tracking and visualization

## Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose ORM
- Express , mongoose for session storage
- Bycrypt for authentication
- Bybit and CoinGecko APIs
- Nodemailer for email services
- OpenAI for chatbot
### Frontend
- React (with Vite)
- TypeScript
- Sass for styling
- React Query for data fetching
- React Router for navigation
- Chart.js for data visualization

### Deployment
- Render
## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/godfreydekew/cryptoMatrix.git
   cd cryptoMatrix
   ```

2. Backend setup:
   ```bash
   cd server
   npm install
   # Configure .env file (see below)
   ```

3. Frontend setup:
   ```bash
   cd client
   yarn install
   ```

### Environment Variables

Create a `.env` file in the `server` directory with the following:

```
MONGO_URI=your_mongodb_uri
OPEN_AI=your_open_ai_secret
BYBIT_API_KEY=your_bybit_api_key
BYBIT_API_SECRET=your_bybit_api_secret
COINGECKO_API_KEY=your_coingecko_api_key
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
```

## Usage

1. Start the backend:
   ```bash
   cd server
   npm start
   ```
   The server will start running on `http://localhost:4000`

2. Start the frontend:
   ```bash
   cd client
   yarn dev
   ```
   The client will start running on `http://localhost:3000`

3. Access the application by opening `http://localhost:3000` in your web browser


## CryptoMatrix Backend Documentation  [click here](https://godfreydekew.github.io/cryptoMatrix/)

All backend functions documentation including prototypes, parameters, and return values.

## Postman API Documentation  [click here](https://documenter.getpostman.com/view/25889133/2sAXqv6M6f)

Visit the link to see the request body and response for all endpoints.


### User Routes
- `POST /api/user/register`: Register a new user
- `POST /api/user/login`: User login
- `POST /api/user/logout`: User logout
- `POST /api/user/request-password-reset`: Request a password reset link
- `POST /api/user/reset-password`: Reset user's password
- `PUT /api/user/update-api`: Update Bybit API credentials (authenticated)
- `GET /api/user/api-keys`: Fetch user's API keys (authenticated)
- `GET /api/user/check-session`: Check if a user is logged in

### Bybit Routes (All authenticated)
- `GET /api/bybit/total_balance`: Get user's total balance in USD
- `GET /api/bybit/transactions`: Fetch user's transactions
- `GET /api/bybit/assets`: Fetch all assets with current prices

### CoinGecko Routes
- `GET /api/movers/top-movers`: Fetch top moving cryptocurrencies
- `GET /api/movers/crypto-news`: Fetch latest cryptocurrency news

### OpenAI Route
- `POST /api/openai/gpt`: Send a message to OpenAI and receive a response about cryptocurrency and blockchain

### Authentication
All routes under Bybit require user authentication. The OpenAI route is public but tailored for cryptocurrency-related queries.

### Error Handling
All endpoints return appropriate HTTP status codes and error messages in case of failures.

### Rate Limiting
Please note that some APIs (like Bybit and CoinGecko) may have rate limits. Ensure your application handles these appropriately.


## Testing

- Backend: Tests to be implemented (recommended: Jest)
- Frontend: Run `cd client && yarn test`

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact:

- Godfrey Dekera: [GitHub](https://github.com/godfreydekew/)
- Felicity Essien: [GitHub](https://github.com/felabel)

