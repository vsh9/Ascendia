# Authentication Documentation

## Overview

The system uses JWT token-based authentication with:

- Access tokens (30 minute expiry) for API requests
- Refresh tokens (1 day expiry) to obtain new access tokens
- No cookies - tokens must be stored and managed by the frontend

## Authentication Flow

1. User registers via `/register`
2. User logs in via `/login` to get access + refresh tokens
3. Frontend stores tokens securely (not in cookies)
4. Access token is included in API requests via Authorization header
5. When access token expires, frontend uses refresh token to get new access token

## API Endpoints

### Registration

**Endpoint**: `POST /register`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response**:

```json
{
  "message": "User registered successfully",
  "id": 1,
  "email": "user@example.com"
}
```

### Login

**Endpoint**: `POST /login`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response**:

```json
{
  "refresh": "eyJhbGci...", // Valid for 1 day
  "access": "eyJhbGci...", // Valid for 30 minutes
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Token Refresh

**Endpoint**: `POST /api/token/refresh/`

**Request Body**:

```json
{
  "refresh": "eyJhbGci..."
}
```

**Response**:

```json
{
  "access": "eyJhbGci..." // New access token
}
```

## Frontend Implementation

1. Store tokens in memory or secure storage (localStorage/sessionStorage)
2. Add access token to requests:

```javascript
headers: {
  'Authorization': `Bearer ${accessToken}`
}
```

3. Implement token refresh logic before access token expires
4. Handle 401 errors by redirecting to login
