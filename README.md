# HR & Payroll Management System

A complete, production-ready HR & Payroll Management System built with React, TypeScript, and Supabase. Designed for real-world company operations with comprehensive employee lifecycle management.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ✨ Features

### 👥 Employee Management
- Complete employee records with personal & employment details
- Auto-generated employee codes
- Department & role management
- Bank details & identity documents
- Salary structure setup

### ⏰ Attendance Tracking
- Daily check-in/check-out system
- Automatic work hours calculation
- Attendance status (Present, Late, Half-day, Absent, On Leave)
- Monthly attendance reports
- Real-time tracking

### 📝 Leave Management
- Multiple leave types (Casual, Sick, Paid, Unpaid, etc.)
- Leave request workflow
- Approval/rejection system
- Leave balance tracking
- Calendar integration

### 💰 Payroll Processing
- Comprehensive salary calculations
- Allowances & deductions support
- Monthly payroll processing
- Automatic salary calculations
- Payslip generation
- Gross & net salary computation

### 🔐 Role-Based Access
- **Admin** - Full system control
- **HR** - Employee & leave management
- **Employee** - Self-service portal

### 📊 Dashboards
- Real-time analytics
- Quick actions
- Recent activities
- Key metrics at a glance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hr-payroll-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Copy .env.example to .env
cp .env.example .env

# Add your Supabase credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to `http://localhost:5173`

## 📖 Documentation

- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Complete system documentation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step setup instructions

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Supabase** - PostgreSQL database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates
- **Built-in authentication** - Secure login

## 🎯 Core Modules

| Module | Description | Status |
|--------|-------------|--------|
| **Employee Management** | CRUD operations, documents, salary structure | ✅ Complete |
| **Attendance** | Check-in/out, work hours, status tracking | ✅ Complete |
| **Leave Management** | Apply, approve, track leaves | ✅ Complete |
| **Payroll** | Salary calculation, processing, payslips | ✅ Complete |
| **Documents** | Upload/download employee documents | ⚠️ URLs only |
| **Notifications** | System alerts and announcements | 🚧 Basic |
| **Analytics** | Reports and insights | 🚧 Planned |
| **PDF Generation** | Payslip PDFs | 🚧 Planned |

## 👤 User Roles

### Admin Dashboard
- View all employees
- Process payroll
- Approve leaves
- Manage settings
- View analytics

### HR Dashboard
- Employee management
- Mark attendance
- Approve leaves
- View reports

### Employee Portal
- Check-in/out
- Apply for leaves
- View payslips
- Update profile

## 📊 Database Schema

13 tables with complete relationships:
- `user_profiles` - User roles
- `employees` - Employee records
- `departments` - Company departments
- `job_roles` - Job positions
- `attendance` - Daily attendance
- `leaves` - Leave requests
- `leave_types` - Leave categories
- `payroll` - Monthly payroll
- `salary_components` - Allowances/deductions
- `documents` - Employee files
- `notifications` - System alerts
- `holidays` - Company holidays
- `settings` - Configuration

## 🔒 Security

- ✅ Row Level Security (RLS) on all tables
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ Secure password handling
- ✅ Session management

## 🎨 Screenshots

### Login
Clean, professional login interface with role-based authentication

### Admin Dashboard
Comprehensive overview with stats, quick actions, and recent activities

### Employee Portal
Self-service portal for attendance, leaves, and payslips

### Payroll Management
Intuitive payroll processing with automatic calculations

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
```

## 📦 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/               # Utilities
│   ├── supabase.ts
│   └── database.types.ts
├── pages/             # Page components
│   ├── admin/        # Admin pages
│   ├── hr/           # HR pages
│   ├── employee/     # Employee pages
│   └── Login.tsx
└── App.tsx           # Main app
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🧪 Testing

### Test Credentials

**Admin:**
- Email: `admin@company.com`
- Password: `password123`

**HR:**
- Email: `hr@company.com`
- Password: `password123`

**Employee:**
- Email: `employee@company.com`
- Password: `password123`

## 📝 TODO / Roadmap

- [ ] PDF payslip generation
- [ ] Email notifications
- [ ] Advanced analytics & charts
- [ ] Document file upload
- [ ] Bulk operations
- [ ] Data export (Excel/CSV)
- [ ] Mobile responsive improvements
- [ ] Performance reviews
- [ ] Expense management
- [ ] Shift management

## 🤝 Contributing

This is a proprietary system. For internal contributions, follow the standard pull request process.

## 📄 License

Proprietary - Internal Company Use Only

## 💬 Support

For issues or questions:
1. Check documentation in `PROJECT_OVERVIEW.md`
2. Review `SETUP_GUIDE.md`
3. Contact development team

## 🙏 Acknowledgments

Built with:
- React Team for React
- Supabase Team for the amazing BaaS platform
- Tailwind Labs for Tailwind CSS
- Lucide for beautiful icons

---

**Made with ❤️ for efficient HR management**

### Quick Links
- [Detailed Documentation](./PROJECT_OVERVIEW.md)
- [Setup Instructions](./SETUP_GUIDE.md)
- [Supabase Dashboard](https://app.supabase.com)
