# Image Selling Platform

This is a full-stack image-selling platform built using **Next.js** and **Node.js** with **MongoDB** as the database. It allows users to browse, purchase, and download images in different aspect ratios at different prices. The platform includes separate panels for users and admins, secure authentication, and seamless payment processing via **Razorpay**. **ImageKit** is used for efficient image storage and optimization.

## Features

### User Panel
- User authentication and account management.
- Browse and search for images.
- Purchase images with different aspect ratios and pricing.
- Secure payment processing using **Razorpay**.
- View purchase history and manage downloads.

### Admin Panel
- Admin authentication and dashboard.
- Upload, manage, and categorize images.
- Set different prices for various aspect ratios.
- Monitor sales and user activities.

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS (ShadCN UI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **Payments:** Razorpay
- **Image Storage:** ImageKit

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **MongoDB** (Local or Atlas)

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/image-selling-platform.git
   cd image-selling-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=mongodb+srv://your_mongodb_url
   NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/your_imagekit_id
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

## Deployment
To deploy the application, you can use platforms like **Vercel** (for frontend) and **Railway/Render** (for backend) with proper environment variables configured.

## Contributing
Feel free to contribute by opening an issue or submitting a pull request.

## Contact
For queries or support, reach out at **abhinavshivkumar03@gmail.com**.





