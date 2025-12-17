# HR & Payroll Management System - Project Overview

## 🎯 Project Description

A comprehensive, production-ready HR & Payroll Management System built with **React + TypeScript + Supabase (PostgreSQL)**. This system is designed for real-world company operations, providing complete employee lifecycle management, attendance tracking, leave management, and payroll processing.

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** as build tool

### Backend & Database
- **Supabase** (PostgreSQL database)
- **Row Level Security (RLS)** for data protection
- **Real-time subscriptions** capability
- **Built-in authentication**

## 👥 User Roles & Access Control

### 1. Admin
- Full system control
- Add/edit employees
- Set salary structures
- Approve/reject leaves
- Process monthly payroll
- View all reports and analytics
- Manage departments, roles, and settings

### 2. HR
- View all employees
- Mark attendance
- Approve/reject leave requests
- View employee records
- Onboard new employees

### 3. Employee
- Check-in/check-out for attendance
- Apply for leaves
- View leave history
- Download salary slips
- View personal profile
- Check attendance history

## 📦 Core Modules

### A. Employee Management
**Features:**
- Complete employee CRUD operations
- Auto-generated employee codes (EMP0001, EMP0002, etc.)
- Personal information management
- Bank details storage
- Identity documents (Aadhaar, PAN)
- Department and role assignment
- Employment status tracking
- Salary structure setup

**Pages:**
- `/admin/employees` - Employee list with search
- `/admin/employees/add` - Add new employee form
- `/admin/employees/:id` - Employee details
- `/admin/employees/:id/edit` - Edit employee

### B. Attendance Management
**Features:**
- Daily check-in/check-out system
- Automatic work hours calculation
- Attendance status tracking (Present, Late, Half-day, Absent, On Leave)
- Attendance calendar view
- Monthly attendance reports
- Real-time attendance marking

**Logic:**
- Check-in creates attendance record
- Check-out calculates total hours
- Late detection based on configurable threshold
- Half-day logic for < 4 hours
- Auto-mark on-leave status from approved leaves

**Pages:**
- `/employee` - Employee dashboard with check-in/out
- `/admin/attendance` - Admin attendance view
- `/hr/attendance` - HR attendance management

### C. Leave Management
**Features:**
- Multiple leave types (Casual, Sick, Paid, Unpaid, Maternity, Paternity)
- Leave request workflow
- Approval/rejection with reasons
- Leave balance tracking
- Calendar integration
- Leave history

**Workflow:**
1. Employee applies for leave
2. Request goes to HR/Admin
3. HR/Admin approves or rejects
4. Approved leaves reflect in attendance
5. Leave impacts salary calculation

**Pages:**
- `/employee/leaves` - Employee leave portal
- `/admin/leaves` - Admin leave approvals
- `/hr/leaves` - HR leave management

### D. Payroll & Salary Management
**Features:**
- Comprehensive salary structure
  - Basic salary
  - Allowances (HRA, Travel, Medical, etc.)
  - Deductions (PF, Tax, etc.)
  - Bonuses
  - Overtime calculation
- Monthly payroll processing
- Automatic calculations:
  - Gross Salary = Basic + Total Allowances
  - Net Salary = Gross - Total Deductions
- Per-day salary calculation
- Leave impact on salary
- Payroll history

**Formulas:**
```
Gross Salary = Basic Salary + Total Allowances
Net Salary = Gross Salary - Total Deductions
Per Day Salary = Monthly Salary / Working Days
```

**Pages:**
- `/admin/payroll` - Payroll processing
- `/employee/payslips` - Employee payslip view

### E. Document Management
**Features:**
- Upload/download documents
- Document types:
  - Aadhaar Card
  - PAN Card
  - Resume/CV
  - Bank Statements
  - Appointment Letter
  - Experience Letters
  - Education Certificates
- Secure file storage
- Document versioning

### F. Dashboard & Analytics
**Admin Dashboard:**
- Total employees count
- Today's attendance
- Pending leave requests
- Monthly payroll summary
- Recent activities
- Quick actions

**Employee Dashboard:**
- Check-in/out interface
- Leave balance
- Basic salary display
- Recent leaves
- Quick links

**HR Dashboard:**
- Employee statistics
- Pending approvals
- Attendance overview
- Quick actions

## 🗄️ Database Schema

### Tables

1. **user_profiles** - Extended user info with roles
2. **departments** - Company departments
3. **job_roles** - Job positions
4. **employees** - Complete employee records
5. **salary_components** - Allowances & deductions
6. **attendance** - Daily attendance records
7. **leave_types** - Types of leaves
8. **leaves** - Leave requests & approvals
9. **payroll** - Monthly payroll records
10. **documents** - Employee documents
11. **notifications** - System notifications
12. **holidays** - Company holidays
13. **settings** - System configuration

### Key Relationships
```
users (auth.users)
  └── user_profiles (role, is_active)
      └── employees
          ├── departments
          ├── job_roles
          ├── salary_components
          ├── attendance
          ├── leaves
          ├── payroll
          └── documents
```

## 🔒 Security Features

### Row Level Security (RLS)
All tables have RLS enabled with policies:

1. **Admin** - Full access to all data
2. **HR** - Read access to employees, manage attendance/leaves
3. **Employee** - Access only to own data

### Authentication
- Email/password authentication via Supabase
- JWT-based session management
- Role-based access control
- Protected routes
- Automatic session refresh

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Supabase account
- npm or yarn

### 2. Environment Setup

Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

The database schema is already created via migration. To set it up:

1. Go to your Supabase project
2. The migration has created all tables with RLS policies
3. Insert sample departments:
```sql
INSERT INTO departments (name, description, status) VALUES
  ('Engineering', 'Software Development', 'active'),
  ('Human Resources', 'HR Department', 'active'),
  ('Sales', 'Sales Team', 'active'),
  ('Marketing', 'Marketing Team', 'active');
```

4. Insert sample job roles:
```sql
INSERT INTO job_roles (title, description, department_id) VALUES
  ('Software Engineer', 'Full Stack Developer', (SELECT id FROM departments WHERE name = 'Engineering')),
  ('HR Manager', 'HR Manager', (SELECT id FROM departments WHERE name = 'Human Resources')),
  ('Sales Executive', 'Sales Representative', (SELECT id FROM departments WHERE name = 'Sales'));
```

### 4. Create Demo Users

Create test users in Supabase Authentication:

1. **Admin User**
```sql
-- After creating user in Auth, insert profile
INSERT INTO user_profiles (id, role) VALUES
  ('admin_user_id_from_auth', 'admin');
```

2. **HR User**
```sql
INSERT INTO user_profiles (id, role) VALUES
  ('hr_user_id_from_auth', 'hr');
```

3. **Employee User**
```sql
INSERT INTO user_profiles (id, role) VALUES
  ('employee_user_id_from_auth', 'employee');
```

Then create employee records linking to the users.

### 5. Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📱 Pages & Routes

### Public Routes
- `/login` - Login page

### Admin Routes
- `/admin` - Dashboard
- `/admin/employees` - Employee list
- `/admin/employees/add` - Add employee
- `/admin/attendance` - Attendance management
- `/admin/leaves` - Leave approvals
- `/admin/payroll` - Payroll processing
- `/admin/holidays` - Holiday calendar
- `/admin/settings` - System settings

### HR Routes
- `/hr` - HR Dashboard
- `/hr/employees` - View employees
- `/hr/attendance` - Mark attendance
- `/hr/leaves` - Approve leaves

### Employee Routes
- `/employee` - Employee dashboard
- `/employee/attendance` - My attendance
- `/employee/leaves` - Apply/view leaves
- `/employee/payslips` - Salary slips
- `/employee/profile` - Personal profile

## 🎨 Design Philosophy

### UI/UX Principles
- Clean, professional interface
- Intuitive navigation
- Responsive design (mobile, tablet, desktop)
- Consistent color scheme (Blue as primary)
- Clear visual hierarchy
- Loading states for all async operations
- Error handling with user-friendly messages

### Color Palette
- Primary: Blue (#2563eb)
- Success: Green (#059669)
- Warning: Orange (#ea580c)
- Error: Red (#dc2626)
- Background: Gray (#f9fafb)

## 🔧 Configuration Settings

System settings (stored in `settings` table):
- `company_name` - Company name for documents
- `company_address` - Company address
- `working_hours_per_day` - Standard work hours (default: 8)
- `late_threshold_minutes` - Late marking threshold (default: 15)
- `half_day_hours` - Minimum hours for half day (default: 4)
- `overtime_multiplier` - Overtime pay rate (default: 1.5x)

## 📊 Business Logic

### Attendance Calculation
```typescript
// Present: Check-in recorded
// Late: Check-in after threshold time
// Half-day: Total hours < 4
// Absent: No check-in
// On Leave: Approved leave for the day
```

### Salary Calculation
```typescript
// Monthly Processing
for each employee:
  basic_salary = employee.basic_salary
  allowances = sum(salary_components where type='allowance')
  deductions = sum(salary_components where type='deduction')

  gross_salary = basic_salary + allowances
  net_salary = gross_salary - deductions

  // Adjust for attendance
  working_days = getDaysInMonth()
  present_days = getPresent Days()
  salary_adjustment = (net_salary / working_days) * present_days
```

### Leave Impact
- Approved leaves mark attendance as 'on_leave'
- Unpaid leaves reduce net salary
- Paid leaves don't affect salary
- Leave balance deducted from annual quota

## 🚧 Future Enhancements

### Planned Features
1. **Payslip PDF Generator** - Auto-generate PDF payslips with company branding
2. **Email Notifications** - Send emails for leave approvals, payroll, etc.
3. **Advanced Analytics** - Charts and graphs for HR metrics
4. **Performance Reviews** - Employee performance management
5. **Expense Management** - Employee expense claims
6. **Shift Management** - Multiple shift support
7. **Biometric Integration** - Hardware attendance devices
8. **Mobile App** - React Native mobile application
9. **Reports Export** - Excel/CSV export functionality
10. **Multi-tenant Support** - Multiple companies on one platform

## 🐛 Known Limitations

1. No PDF generation yet (payslip download buttons are placeholders)
2. No email notifications system
3. No file upload for documents (URLs only)
4. No advanced reporting/analytics
5. No bulk operations support
6. No data import/export

## 📝 Development Notes

### Code Structure
```
src/
├── components/          # Reusable components
│   ├── Layout.tsx      # Main layout with sidebar
│   └── ProtectedRoute.tsx  # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/               # Utilities and config
│   ├── supabase.ts    # Supabase client
│   └── database.types.ts  # TypeScript types
├── pages/             # Page components
│   ├── admin/        # Admin pages
│   ├── hr/           # HR pages
│   ├── employee/     # Employee pages
│   ├── Login.tsx     # Login page
│   └── Unauthorized.tsx  # 403 page
└── App.tsx           # Main app with routing
```

### Coding Standards
- TypeScript strict mode enabled
- Functional components with hooks
- Async/await for async operations
- Error handling with try/catch
- Loading states for all data fetching
- Responsive design with Tailwind
- Reusable component patterns

## 📄 License

This is a proprietary HR management system for internal company use.

## 👨‍💻 Support

For technical support or feature requests, contact the development team.

---

**Built with React, TypeScript, and Supabase**
**Production-Ready HR & Payroll Management System**
