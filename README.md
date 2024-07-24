# Role based auth for MERN Apps

## Features
- Role-based auth
- Mailer for password reset
- File upload
- Minimal styling

## Server setup

1. env file with following variables
   - PORT
   - MONGO_URL
   - JWT_SECRET
   - SENDGRID_API_KEY
   - FROM_EMAIL
   - CLIENT_URL
   - NODE_ENV

## Client setup

1. env file with following variables
   - VITE_BASE_URL
   - VITE_ASSETS_URL

## Items to fix

### Server

- Check generateToken.js cookie settings in production

### Client

- Fix error component
