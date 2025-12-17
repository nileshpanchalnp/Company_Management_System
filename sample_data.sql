-- ============================================
-- HR & Payroll System - Sample Data
-- ============================================
-- This script creates sample data for testing
-- Run this after the main migration is complete
-- ============================================

-- Step 1: Create Departments
INSERT INTO departments (name, description, status) VALUES
  ('Engineering', 'Software Development and Technology', 'active'),
  ('Human Resources', 'HR and People Operations', 'active'),
  ('Sales', 'Sales and Business Development', 'active'),
  ('Marketing', 'Marketing and Communications', 'active'),
  ('Finance', 'Finance and Accounting', 'active'),
  ('Operations', 'Operations and Administration', 'active')
ON CONFLICT (name) DO NOTHING;

-- Step 2: Create Job Roles
INSERT INTO job_roles (title, description, department_id)
SELECT 'CEO', 'Chief Executive Officer', d.id FROM departments d WHERE d.name = 'Operations'
UNION ALL
SELECT 'CTO', 'Chief Technology Officer', d.id FROM departments d WHERE d.name = 'Engineering'
UNION ALL
SELECT 'Senior Software Engineer', 'Senior Developer', d.id FROM departments d WHERE d.name = 'Engineering'
UNION ALL
SELECT 'Software Engineer', 'Full Stack Developer', d.id FROM departments d WHERE d.name = 'Engineering'
UNION ALL
SELECT 'Junior Developer', 'Entry Level Developer', d.id FROM departments d WHERE d.name = 'Engineering'
UNION ALL
SELECT 'HR Manager', 'Human Resources Manager', d.id FROM departments d WHERE d.name = 'Human Resources'
UNION ALL
SELECT 'HR Executive', 'HR Professional', d.id FROM departments d WHERE d.name = 'Human Resources'
UNION ALL
SELECT 'Sales Manager', 'Sales Team Lead', d.id FROM departments d WHERE d.name = 'Sales'
UNION ALL
SELECT 'Sales Executive', 'Sales Representative', d.id FROM departments d WHERE d.name = 'Sales'
UNION ALL
SELECT 'Marketing Manager', 'Marketing Team Lead', d.id FROM departments d WHERE d.name = 'Marketing'
UNION ALL
SELECT 'Marketing Executive', 'Marketing Professional', d.id FROM departments d WHERE d.name = 'Marketing'
UNION ALL
SELECT 'Finance Manager', 'Finance Team Lead', d.id FROM departments d WHERE d.name = 'Finance'
UNION ALL
SELECT 'Accountant', 'Finance Professional', d.id FROM departments d WHERE d.name = 'Finance';

-- Step 3: Add Holidays for Current Year
INSERT INTO holidays (name, date, type, description) VALUES
  ('New Year', '2025-01-01', 'public', 'New Year Day'),
  ('Republic Day', '2025-01-26', 'public', 'Republic Day of India'),
  ('Holi', '2025-03-14', 'public', 'Festival of Colors'),
  ('Good Friday', '2025-04-18', 'optional', 'Good Friday'),
  ('Independence Day', '2025-08-15', 'public', 'Independence Day of India'),
  ('Gandhi Jayanti', '2025-10-02', 'public', 'Birth Anniversary of Mahatma Gandhi'),
  ('Diwali', '2025-10-20', 'public', 'Festival of Lights'),
  ('Christmas', '2025-12-25', 'public', 'Christmas Day')
ON CONFLICT (date) DO NOTHING;

-- ============================================
-- IMPORTANT: User and Employee Creation
-- ============================================
-- You MUST manually create users first in Supabase Authentication UI
-- Then replace the user IDs below with actual IDs from auth.users table
-- ============================================

-- STEP 4: After creating users in Supabase Auth, run these queries:

-- Example: Create user profiles (replace UUIDs with actual user IDs)
--
-- INSERT INTO user_profiles (id, role, is_active) VALUES
--   ('your-admin-user-uuid-here', 'admin', true),
--   ('your-hr-user-uuid-here', 'hr', true),
--   ('your-employee-user-uuid-here', 'employee', true);

-- Example: Create employee records (replace UUIDs and adjust values)
--
-- Admin Employee
-- INSERT INTO employees (
--   user_id, employee_code, full_name, email, phone,
--   department_id, role_id, joining_date, basic_salary,
--   bank_account_number, bank_name, ifsc_code,
--   employment_status, gender, date_of_birth, address
-- ) VALUES (
--   'admin-user-uuid',
--   'EMP0001',
--   'John Admin',
--   'admin@company.com',
--   '+91-9876543210',
--   (SELECT id FROM departments WHERE name = 'Engineering' LIMIT 1),
--   (SELECT id FROM job_roles WHERE title = 'CTO' LIMIT 1),
--   '2024-01-01',
--   150000,
--   '1234567890',
--   'HDFC Bank',
--   'HDFC0001234',
--   'active',
--   'male',
--   '1990-01-15',
--   '123 Main Street, City, State, 12345'
-- );

-- HR Employee
-- INSERT INTO employees (
--   user_id, employee_code, full_name, email, phone,
--   department_id, role_id, joining_date, basic_salary,
--   bank_account_number, bank_name, ifsc_code,
--   employment_status, gender, date_of_birth, address
-- ) VALUES (
--   'hr-user-uuid',
--   'EMP0002',
--   'Sarah HR Manager',
--   'hr@company.com',
--   '+91-9876543211',
--   (SELECT id FROM departments WHERE name = 'Human Resources' LIMIT 1),
--   (SELECT id FROM job_roles WHERE title = 'HR Manager' LIMIT 1),
--   '2024-01-01',
--   80000,
--   '1234567891',
--   'ICICI Bank',
--   'ICIC0001234',
--   'active',
--   'female',
--   '1992-05-20',
--   '456 Park Avenue, City, State, 12345'
-- );

-- Regular Employee
-- INSERT INTO employees (
--   user_id, employee_code, full_name, email, phone,
--   department_id, role_id, joining_date, basic_salary,
--   bank_account_number, bank_name, ifsc_code,
--   employment_status, gender, date_of_birth, address
-- ) VALUES (
--   'employee-user-uuid',
--   'EMP0003',
--   'Mike Employee',
--   'employee@company.com',
--   '+91-9876543212',
--   (SELECT id FROM departments WHERE name = 'Sales' LIMIT 1),
--   (SELECT id FROM job_roles WHERE title = 'Sales Executive' LIMIT 1),
--   '2024-01-01',
--   60000,
--   '1234567892',
--   'SBI Bank',
--   'SBIN0001234',
--   'active',
--   'male',
--   '1995-08-10',
--   '789 Lake Road, City, State, 12345'
-- );

-- ============================================
-- STEP 5: Add Salary Components
-- ============================================
-- Run these after creating employees
-- Replace employee IDs with actual IDs from employees table

-- Example salary components for an employee:
--
-- HRA Allowance (40% of basic)
-- INSERT INTO salary_components (
--   employee_id, component_type, component_name,
--   percentage, is_percentage, is_active
-- ) VALUES (
--   (SELECT id FROM employees WHERE employee_code = 'EMP0003'),
--   'allowance',
--   'HRA (House Rent Allowance)',
--   40,
--   true,
--   true
-- );
--
-- Travel Allowance (Fixed amount)
-- INSERT INTO salary_components (
--   employee_id, component_type, component_name,
--   amount, is_percentage, is_active
-- ) VALUES (
--   (SELECT id FROM employees WHERE employee_code = 'EMP0003'),
--   'allowance',
--   'Travel Allowance',
--   5000,
--   false,
--   true
-- );
--
-- Medical Allowance (Fixed amount)
-- INSERT INTO salary_components (
--   employee_id, component_type, component_name,
--   amount, is_percentage, is_active
-- ) VALUES (
--   (SELECT id FROM employees WHERE employee_code = 'EMP0003'),
--   'allowance',
--   'Medical Allowance',
--   2000,
--   false,
--   true
-- );
--
-- PF Deduction (12% of basic)
-- INSERT INTO salary_components (
--   employee_id, component_type, component_name,
--   percentage, is_percentage, is_active
-- ) VALUES (
--   (SELECT id FROM employees WHERE employee_code = 'EMP0003'),
--   'deduction',
--   'PF (Provident Fund)',
--   12,
--   true,
--   true
-- );
--
-- Professional Tax (Fixed amount)
-- INSERT INTO salary_components (
--   employee_id, component_type, component_name,
--   amount, is_percentage, is_active
-- ) VALUES (
--   (SELECT id FROM employees WHERE employee_code = 'EMP0003'),
--   'deduction',
--   'Professional Tax',
--   200,
--   false,
--   true
-- );

-- ============================================
-- STEP 6: Create Sample Attendance Records
-- ============================================
-- This creates attendance for the last 7 days for testing

-- Example (replace employee_id):
-- DO $$
-- DECLARE
--   emp_id uuid := (SELECT id FROM employees WHERE employee_code = 'EMP0003');
--   start_date date := CURRENT_DATE - INTERVAL '7 days';
--   curr_date date;
-- BEGIN
--   FOR i IN 0..6 LOOP
--     curr_date := start_date + i;
--
--     -- Skip weekends
--     IF EXTRACT(DOW FROM curr_date) NOT IN (0, 6) THEN
--       INSERT INTO attendance (
--         employee_id,
--         date,
--         check_in,
--         check_out,
--         total_hours,
--         status
--       ) VALUES (
--         emp_id,
--         curr_date,
--         (curr_date + TIME '09:00:00')::timestamptz,
--         (curr_date + TIME '18:00:00')::timestamptz,
--         9,
--         'present'
--       ) ON CONFLICT (employee_id, date) DO NOTHING;
--     END IF;
--   END LOOP;
-- END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify departments
SELECT 'Departments' as table_name, COUNT(*) as count FROM departments;

-- Verify job roles
SELECT 'Job Roles' as table_name, COUNT(*) as count FROM job_roles;

-- Verify holidays
SELECT 'Holidays' as table_name, COUNT(*) as count FROM holidays;

-- Verify leave types
SELECT 'Leave Types' as table_name, COUNT(*) as count FROM leave_types;

-- Check if users need to be created
SELECT 'User Profiles' as table_name, COUNT(*) as count FROM user_profiles;

-- Check if employees need to be created
SELECT 'Employees' as table_name, COUNT(*) as count FROM employees;

-- ============================================
-- HELPFUL QUERIES FOR SETUP
-- ============================================

-- Get all user IDs from auth
-- SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- Get all department IDs
-- SELECT id, name FROM departments ORDER BY name;

-- Get all job role IDs
-- SELECT id, title, (SELECT name FROM departments WHERE id = job_roles.department_id) as department
-- FROM job_roles ORDER BY title;

-- Get all employee codes
-- SELECT id, employee_code, full_name, email FROM employees ORDER BY employee_code;

-- ============================================
-- NOTES
-- ============================================
-- 1. Always create users in Supabase Authentication first
-- 2. Then create user_profiles with correct role
-- 3. Then create employee records linked to user_id
-- 4. Add salary components after employees exist
-- 5. Payroll will be auto-generated when you click "Process Payroll"
-- ============================================
