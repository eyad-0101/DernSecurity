# Next.js + Clerk Authentication Dashboard

![Project Banner](https://via.placeholder.com/1200x400.png?text=Next.js+%2B+Clerk+Authentication+Dashboard)  

A modern and responsive web application built with **Next.js** and **Clerk** for authentication. This project demonstrates how to implement role-based access control (RBAC) and dynamic navigation based on user roles (admin or user).

---

## ✨ Features

- **Role-Based Access Control (RBAC)**:
  - Admins are redirected to the `/admin` dashboard.
  - Regular users are redirected to the `/user` dashboard.

- **Dynamic Navigation**:
  - The navigation bar dynamically updates based on the user's role.
  - Admin button redirects to the appropriate dashboard (`/admin` or `/user`).

- **Authentication**:
  - Seamless authentication using **Clerk**.
  - Protected routes based on user roles.

- **Responsive Design**:
  - Built with **Tailwind CSS** for a modern and responsive UI.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nextjs-clerk-dashboard.git
   cd nextjs-clerk-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   - Create a `.env.local` file in the root directory.
   - Add your Clerk credentials:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**:  
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ Usage

### Role-Based Navigation

#### Admin Users:

- Log in as an admin to access the `/admin` dashboard.
- The navigation bar will display an "Admin Dashboard" button.

#### Regular Users:

- Log in as a regular user to access the `/user` dashboard.
- The navigation bar will display a "User Dashboard" button.

### Authentication

- Sign up or log in using the Clerk authentication modal.
- Users are automatically redirected to their respective dashboards based on their role.

---

## 📂 Project Structure

```
nextjs-clerk-dashboard/
├── app/
│   ├── layout.js          # Root layout (Server Component)
│   ├── ClientWrapper.jsx  # Client-side logic for role-based redirects
├── components/
│   ├── Nav.jsx            # Navigation bar (Client Component)
├── styles/
│   ├── globals.css        # Global styles
├── .env.local             # Environment variables
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

---

## 🛡️ Role-Based Access Control (RBAC)

### Admin Role:

- Admins have access to the `/admin` dashboard.
- Admins can view and manage all user data.

### User Role:

- Regular users have access to the `/user` dashboard.
- Users can view their personal data.

---

## 🎨 Styling

This project uses **Tailwind CSS** for styling. You can customize the design by editing the `tailwind.config.js` file.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

- **Clerk** for authentication.
- **Next.js** for the framework.
- **Tailwind CSS** for styling.

---

## 📧 Contact

For questions or feedback, feel free to reach out:

- **Your Name** - eyadw9313@gmail.com
- **GitHub** - [eyad0101](https://github.com/eyad0101)

Made with ❤️ by **Eyad Wael**
