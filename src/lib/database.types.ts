export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'hr' | 'employee';
export type EmploymentStatus = 'active' | 'inactive' | 'terminated' | 'resigned';
export type AttendanceStatus = 'present' | 'absent' | 'half_day' | 'late' | 'on_leave';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type PayrollStatus = 'draft' | 'processed' | 'paid';
export type ComponentType = 'allowance' | 'deduction';
export type DocumentType = 'aadhaar' | 'pan' | 'resume' | 'bank_statement' | 'appointment_letter' | 'experience_letter' | 'education_certificate' | 'other';
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'leave_request' | 'leave_approved' | 'leave_rejected' | 'payroll_processed' | 'announcement';

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          role: UserRole;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role: UserRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      departments: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          status?: string;
          updated_at?: string;
        };
      };
      job_roles: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          department_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          department_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          department_id?: string | null;
          updated_at?: string;
        };
      };
      employees: {
        Row: {
          id: string;
          user_id: string | null;
          employee_code: string;
          full_name: string;
          email: string;
          phone: string | null;
          department_id: string | null;
          role_id: string | null;
          joining_date: string;
          employment_status: EmploymentStatus;
          basic_salary: number;
          bank_account_number: string | null;
          bank_name: string | null;
          ifsc_code: string | null;
          aadhaar_number: string | null;
          pan_number: string | null;
          emergency_contact: string | null;
          address: string | null;
          date_of_birth: string | null;
          gender: string | null;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          employee_code: string;
          full_name: string;
          email: string;
          phone?: string | null;
          department_id?: string | null;
          role_id?: string | null;
          joining_date: string;
          employment_status?: EmploymentStatus;
          basic_salary?: number;
          bank_account_number?: string | null;
          bank_name?: string | null;
          ifsc_code?: string | null;
          aadhaar_number?: string | null;
          pan_number?: string | null;
          emergency_contact?: string | null;
          address?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string | null;
          employee_code?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          department_id?: string | null;
          role_id?: string | null;
          joining_date?: string;
          employment_status?: EmploymentStatus;
          basic_salary?: number;
          bank_account_number?: string | null;
          bank_name?: string | null;
          ifsc_code?: string | null;
          aadhaar_number?: string | null;
          pan_number?: string | null;
          emergency_contact?: string | null;
          address?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          photo_url?: string | null;
          updated_at?: string;
        };
      };
      salary_components: {
        Row: {
          id: string;
          employee_id: string;
          component_type: ComponentType;
          component_name: string;
          amount: number;
          percentage: number;
          is_percentage: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          component_type: ComponentType;
          component_name: string;
          amount?: number;
          percentage?: number;
          is_percentage?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          component_type?: ComponentType;
          component_name?: string;
          amount?: number;
          percentage?: number;
          is_percentage?: boolean;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          check_in: string | null;
          check_out: string | null;
          total_hours: number;
          status: AttendanceStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          date: string;
          check_in?: string | null;
          check_out?: string | null;
          total_hours?: number;
          status?: AttendanceStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          check_in?: string | null;
          check_out?: string | null;
          total_hours?: number;
          status?: AttendanceStatus;
          notes?: string | null;
          updated_at?: string;
        };
      };
      leave_types: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          days_per_year: number;
          is_paid: boolean;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          days_per_year?: number;
          is_paid?: boolean;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          days_per_year?: number;
          is_paid?: boolean;
          is_active?: boolean;
        };
      };
      leaves: {
        Row: {
          id: string;
          employee_id: string;
          leave_type_id: string;
          from_date: string;
          to_date: string;
          total_days: number;
          reason: string;
          status: LeaveStatus;
          approved_by: string | null;
          approved_at: string | null;
          rejection_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          leave_type_id: string;
          from_date: string;
          to_date: string;
          total_days: number;
          reason: string;
          status?: LeaveStatus;
          approved_by?: string | null;
          approved_at?: string | null;
          rejection_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          leave_type_id?: string;
          from_date?: string;
          to_date?: string;
          total_days?: number;
          reason?: string;
          status?: LeaveStatus;
          approved_by?: string | null;
          approved_at?: string | null;
          rejection_reason?: string | null;
          updated_at?: string;
        };
      };
      payroll: {
        Row: {
          id: string;
          employee_id: string;
          month: number;
          year: number;
          basic_salary: number;
          total_allowances: number;
          total_deductions: number;
          gross_salary: number;
          net_salary: number;
          working_days: number;
          present_days: number;
          leaves_taken: number;
          overtime_hours: number;
          overtime_amount: number;
          bonus: number;
          payslip_pdf_url: string | null;
          status: PayrollStatus;
          processed_by: string | null;
          processed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          month: number;
          year: number;
          basic_salary?: number;
          total_allowances?: number;
          total_deductions?: number;
          gross_salary?: number;
          net_salary?: number;
          working_days?: number;
          present_days?: number;
          leaves_taken?: number;
          overtime_hours?: number;
          overtime_amount?: number;
          bonus?: number;
          payslip_pdf_url?: string | null;
          status?: PayrollStatus;
          processed_by?: string | null;
          processed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          basic_salary?: number;
          total_allowances?: number;
          total_deductions?: number;
          gross_salary?: number;
          net_salary?: number;
          working_days?: number;
          present_days?: number;
          leaves_taken?: number;
          overtime_hours?: number;
          overtime_amount?: number;
          bonus?: number;
          payslip_pdf_url?: string | null;
          status?: PayrollStatus;
          processed_by?: string | null;
          processed_at?: string | null;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          employee_id: string;
          document_type: DocumentType;
          document_name: string;
          file_url: string;
          file_size: number | null;
          uploaded_at: string;
          uploaded_by: string | null;
        };
        Insert: {
          id?: string;
          employee_id: string;
          document_type: DocumentType;
          document_name: string;
          file_url: string;
          file_size?: number | null;
          uploaded_at?: string;
          uploaded_by?: string | null;
        };
        Update: {
          document_type?: DocumentType;
          document_name?: string;
          file_url?: string;
          file_size?: number | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: NotificationType;
          is_read: boolean;
          link: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: NotificationType;
          is_read?: boolean;
          link?: string | null;
          created_at?: string;
        };
        Update: {
          is_read?: boolean;
        };
      };
      holidays: {
        Row: {
          id: string;
          name: string;
          date: string;
          type: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          date: string;
          type?: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          date?: string;
          type?: string;
          description?: string | null;
        };
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          value?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}
