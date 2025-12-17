# Quick Setup Guide - HR & Payroll System

## Step-by-Step Setup

### 1. Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Get your project credentials:
   - Project URL: `Settings` → `API` → `Project URL`
   - Anon Key: `Settings` → `API` → `anon/public key`

### 2. Configure Environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Database Migration

The database schema is already applied via Supabase migrations. If you need to manually create tables:

1. Go to Supabase SQL Editor
2. The migration file has already been applied
3. Verify tables exist in `Database` → `Tables`

### 4. Add Sample Data

#### Create Departments
```sql
INSERT INTO departments (name, description, status) VALUES
  ('Engineering', 'Software Development Team', 'active'),
  ('Human Resources', 'HR Department', 'active'),
  ('Sales', 'Sales and Business Development', 'active'),
  ('Marketing', 'Marketing and Communications', 'active'),
  ('Finance', 'Finance and Accounting', 'active');
```

#### Create Job Roles
```sql
INSERT INTO job_roles (title, description, department_id)
SELECT 'Software Engineer', 'Full Stack Developer', id FROM departments WHERE name = 'Engineering'
UNION ALL
SELECT 'HR Manager', 'Human Resources Manager', id FROM departments WHERE name = 'Human Resources'
UNION ALL
SELECT 'Sales Executive', 'Sales Representative', id FROM departments WHERE name = 'Sales'
UNION ALL
SELECT 'Marketing Manager', 'Marketing Team Lead', id FROM departments WHERE name = 'Marketing'
UNION ALL
SELECT 'Accountant', 'Finance Professional', id FROM departments WHERE name = 'Finance';
```

### 5. Create Test Users

#### Option A: Using Supabase Dashboard

1. Go to `Authentication` → `Users` → `Add User`
2. Create three test users:

**Admin User:**
- Email: `admin@company.com`
- Password: `password123`

**HR User:**
- Email: `hr@company.com`
- Password: `password123`

**Employee User:**
- Email: `employee@company.com`
- Password: `password123`

3. After creating each user, note their User ID

#### Option B: Using SQL (after authentication)

After users are created in Authentication, assign roles:

```sql
-- Replace 'user_id_here' with actual User IDs from auth.users

-- Admin Profile
INSERT INTO user_profiles (id, role, is_active)
VALUES ('admin_user_id', 'admin', true);

-- HR Profile
INSERT INTO user_profiles (id, role, is_active)
VALUES ('hr_user_id', 'hr', true);

-- Employee Profile
INSERT INTO user_profiles (id, role, is_active)
VALUES ('employee_user_id', 'employee', true);
```

### 6. Create Sample Employees

```sql
-- Admin Employee Record
INSERT INTO employees (
  user_id, employee_code, full_name, email, phone,
  department_id, role_id, joining_date, basic_salary,
  employment_status
) VALUES (
  'admin_user_id',
  'EMP0001',
  'John Admin',
  'admin@company.com',
  '+1234567890',
  (SELECT id FROM departments WHERE name = 'Engineering'),
  (SELECT id FROM job_roles WHERE title = 'Software Engineer'),
  '2024-01-01',
  100000,
  'active'
);

-- HR Employee Record
INSERT INTO employees (
  user_id, employee_code, full_name, email, phone,
  department_id, role_id, joining_date, basic_salary,
  employment_status
) VALUES (
  'hr_user_id',
  'EMP0002',
  'Sarah HR',
  'hr@company.com',
  '+1234567891',
  (SELECT id FROM departments WHERE name = 'Human Resources'),
  (SELECT id FROM job_roles WHERE title = 'HR Manager'),
  '2024-01-01',
  80000,
  'active'
);

-- Employee Record
INSERT INTO employees (
  user_id, employee_code, full_name, email, phone,
  department_id, role_id, joining_date, basic_salary,
  employment_status
) VALUES (
  'employee_user_id',
  'EMP0003',
  'Mike Employee',
  'employee@company.com',
  '+1234567892',
  (SELECT id FROM departments WHERE name = 'Sales'),
  (SELECT id FROM job_roles WHERE title = 'Sales Executive'),
  '2024-01-01',
  60000,
  'active'
);
```

### 7. Add Salary Components (Optional)

```sql
-- HRA Allowance for Employee
INSERT INTO salary_components (
  employee_id, component_type, component_name,
  percentage, is_percentage, is_active
) VALUES (
  (SELECT id FROM employees WHERE email = 'employee@company.com'),
  'allowance',
  'HRA (House Rent Allowance)',
  40,
  true,
  true
);

-- PF Deduction
INSERT INTO salary_components (
  employee_id, component_type, component_name,
  percentage, is_percentage, is_active
) VALUES (
  (SELECT id FROM employees WHERE email = 'employee@company.com'),
  'deduction',
  'PF (Provident Fund)',
  12,
  true,
  true
);
```

### 8. Install Dependencies

```bash
npm install
```

### 9. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 10. Test Login

Use these credentials to test different roles:

**Admin Access:**
- Email: `admin@company.com`
- Password: `password123`
- Access: Full system control

**HR Access:**
- Email: `hr@company.com`
- Password: `password123`
- Access: Employee management, attendance, leaves

**Employee Access:**
- Email: `employee@company.com`
- Password: `password123`
- Access: Personal dashboard, attendance, leaves, payslips

## Testing the System

### 1. Test Employee Check-in/out
1. Login as `employee@company.com`
2. Click "Check In" on dashboard
3. Wait a few seconds
4. Click "Check Out"
5. Verify total hours calculated

### 2. Test Leave Application
1. Login as `employee@company.com`
2. Go to "My Leaves"
3. Click "Apply Leave"
4. Fill form and submit
5. Logout and login as `admin@company.com`
6. Go to "Leave Requests"
7. Approve or reject the request

### 3. Test Payroll Processing
1. Login as `admin@company.com`
2. Go to "Payroll"
3. Select current month/year
4. Click "Process Payroll"
5. Verify payroll records created
6. Logout and login as `employee@company.com`
7. Go to "Salary Slips"
8. Verify your payslip appears

### 4. Test Employee Management
1. Login as `admin@company.com`
2. Go to "Employees"
3. Click "Add Employee"
4. Fill employee details
5. Save and verify in list

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution:** Ensure `.env` file exists with correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Issue: "Access Denied" or tables not found
**Solution:**
1. Check RLS policies are enabled
2. Verify user has correct role in `user_profiles` table
3. Check employee record is linked to user_id

### Issue: Can't login
**Solution:**
1. Verify user exists in `Authentication` → `Users`
2. Check password is correct
3. Verify user has profile in `user_profiles` table

### Issue: Employee can't see their data
**Solution:**
1. Check `employees.user_id` matches their auth user ID
2. Verify RLS policies allow access
3. Check `employment_status` is 'active'

### Issue: Payroll not processing
**Solution:**
1. Verify employees have `basic_salary` set
2. Check salary_components exist (optional)
3. Ensure user has 'admin' role

## Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy

### Deploy to Supabase Hosting
```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref your-project-ref

# Deploy
supabase deploy
```

## Next Steps

After basic setup:

1. **Customize Settings**
   - Update company name in settings
   - Configure working hours
   - Set late threshold

2. **Add Real Employees**
   - Create users in Authentication
   - Add employee records
   - Set up salary structures

3. **Configure Leave Types**
   - Modify default leave types
   - Set annual quotas
   - Define paid/unpaid status

4. **Set Up Departments & Roles**
   - Add your company departments
   - Create job roles
   - Link to salary grades

5. **Create Salary Components**
   - Define allowances (HRA, Travel, Medical)
   - Set up deductions (PF, Tax, Insurance)
   - Configure percentage vs fixed amounts

## Security Checklist

- [ ] Change default passwords
- [ ] Enable email confirmation in Supabase (optional)
- [ ] Review RLS policies
- [ ] Set up database backups
- [ ] Configure environment variables securely
- [ ] Enable 2FA for admin accounts (in Supabase)
- [ ] Review API rate limits
- [ ] Set up monitoring and alerts

## Support

For issues or questions:
1. Check the PROJECT_OVERVIEW.md
2. Review Supabase documentation
3. Check browser console for errors
4. Verify database tables and RLS policies

---

**System Ready!** You now have a fully functional HR & Payroll Management System.
