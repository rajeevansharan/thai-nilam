# ThaiNilam | Backend System

This backend system is designed to provide a robust API for the ThaiNilam digital magazine platform. It handles user authentication, magazine management, and secure file storage.

## 🚀 Recommended Technology Stack

We recommend the following stack for a high-performance, modern backend:

- **Runtime**: Node.js (with TypeScript)
- **Web Framework**: Express.js
- **ORM**: Prisma (excellent for type-safe database access)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **File Storage**: Cloudinary or AWS S3 (for PDFs and high-res cover images)

## 🛠️ Main Features to Implement

### 1. User Authentication & Authorization

- **Sign-up/Login API**: Secure login using JWT.
- **Role Management**: Distinct permissions for `Admin` (upload/manage) and `Subscriber` (view/download).
- **Password Security**: Hashing with bcrypt.

### 2. Magazine Issue Management (Admin)

- **Issue Upload API**: Endpoint for uploading PDF files and cover images.
- **Metadata Management**: Store Year, Month, Title, and Description in the database.
- **Link Generation**: Provide secure private URLs for magazine files.

### 3. Subscription & Content Access

- **Issue Unlock Logic**: Verify if a user is a premium subscriber before allowing access to specific PDFs.
- **User Library**: Retrieve all issues "unlocked" by a specific user.

## 📁 Suggested Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  isPremium Boolean  @default(false)
  issues    Issue[]  @relation("UserIssues")
}

model Issue {
  id          String   @id @default(uuid())
  title       String
  description String
  month       String
  year        String
  pdfUrl      String
  imageUrl    String
  owners      User[]   @relation("UserIssues")
  createdAt   DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

## 🚀 Getting Started

1.  **Initialize**: `npm init -y` and install dependencies (`express`, `prisma`, `jsonwebtoken`, `bcrypt`).
2.  **Database**: Setup a PostgreSQL database and run `npx prisma init`.
3.  **Controllers**: Create folders for logic (`controllers/`, `routes/`, `middleware/`).
4.  **Connect**: Link the frontend API calls to this backend.

---

**Senior Backend Suggestion**: To handle PDF security, avoid exposing public URLs directly. Use **Signed URLs** from S3 or Cloudinary so files can only be accessed by authenticated users with a valid token.
