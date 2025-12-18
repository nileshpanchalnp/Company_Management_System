import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X, User, Briefcase, Landmark, MapPin, Save, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

// --- 1. DEFINE CONSTANTS & SUB-COMPONENTS OUTSIDE TO FIX THE FOCUS BUG ---

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-slate-300";

const FormField = ({ label, children }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1 flex items-center gap-1.5">
      {label}
    </label>
    {children}
  </div>
);

const EditEmployeeModal = ({ employee, onClose, onUpdated }: any) => {
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [departments, setDepartments] = useState<any[]>([]);
const [jobRoles, setJobRoles] = useState<any[]>([]);

  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

const [form, setForm] = useState({
  employee_code: employee.employee_code || '',
  full_name: employee.full_name || '',
  email: employee.email || '',
  phone: employee.phone || '',
  joining_date: formatDate(employee.joining_date),
  basic_salary: employee.basic_salary || '',
  employment_status: employee.employment_status || 'active',
  department: employee.department?._id || '',
  job_role: employee.job_role?._id || '',
  bank_account_number: employee.bank_account_number || '',
  bank_name: employee.bank_name || '',
  ifsc_code: employee.ifsc_code || '',
  aadhaar_number: employee.aadhaar_number || '',
  pan_number: employee.pan_number || '',
  address: employee.address || '',
  date_of_birth: formatDate(employee.date_of_birth),
  gender: employee.gender || '',
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // This updates the state without causing the component to remount
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
  fetchDepartments();
  fetchJobRoles();
}, []);

const fetchDepartments = async () => {
  const res = await axios.get('http://localhost:5000/department/get');
  setDepartments(res.data.data);
};

const fetchJobRoles = async () => {
  const res = await axios.get('http://localhost:5000/job_role/get');
  setJobRoles(res.data.data);
};

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/employee/update/${employee._id}`, form);
      onUpdated();
      onClose();
      toast.success('Employee updated successfully!');
    }catch (err: any) {
    console.error("Error creating question:", err);
    setError(err.response?.data?.message || "Failed to create question");
    toast.error(err.response?.data?.message || "Failed to update Employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#F8FAFC] w-full max-w-5xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-h-[94vh] flex flex-col overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-300">
        
        {/* MODERN HEADER */}
        <div className="relative bg-white px-10 py-6 border-b border-slate-100 flex justify-between items-center">
             {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
               <User size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Edit Employee</h2>
              <p className="text-slate-400 text-sm font-medium">Update profile for ID: <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">{form.employee_code}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-10 overflow-y-auto space-y-12 custom-scrollbar">
          
          {/* PERSONAL INFO SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <User size={18} className="text-indigo-600" /> Personal Details
              </h3>
              <p className="text-xs text-slate-400">Manage the employee's identity and basic contact information.</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <FormField label="Full Name">
                <input name="full_name" value={form.full_name} onChange={handleChange} className={inputBase} />
              </FormField>
              <FormField label="Email Address">
                <input name="email" value={form.email} onChange={handleChange} className={inputBase} />
              </FormField>
              <FormField label="Phone">
                <input name="phone" value={form.phone} onChange={handleChange} className={inputBase} />
              </FormField>
              <FormField label="Date of Birth">
                <input name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} className={inputBase} />
              </FormField>
            </div>
          </div>

          {/* WORK & FINANCE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-600" /> Work & Finance
              </h3>
              <p className="text-xs text-slate-400">Payroll, bank details, and employment status settings.</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <FormField label="Joining Date">
                <input name="joining_date" type="date" value={form.joining_date} onChange={handleChange} className={inputBase} />
              </FormField>
              <FormField label="Department">
  <select
    name="department"
    value={form.department}
    onChange={handleChange}
    className={inputBase}
  >
    <option value="">Select Department</option>
    {departments.map((dept) => (
      <option key={dept._id} value={dept._id}>
        {dept.name}
      </option>
    ))}
  </select>
</FormField>

<FormField label="Job Role">
  <select
    name="job_role"
    value={form.job_role}
    onChange={handleChange}
    className={inputBase}
  >
    <option value="">Select Role</option>
    {jobRoles.map((role) => (
      <option key={role._id} value={role._id}>
        {role.title}
      </option>
    ))}
  </select>
</FormField>
              <FormField label="Salary (₹)">
                <input name="basic_salary" type="number" value={form.basic_salary} onChange={handleChange} className={inputBase} />
              </FormField>
              <FormField label="Bank Name">
                <input name="bank_name" value={form.bank_name} onChange={handleChange} className={inputBase} />
              </FormField>
              <FormField label="Account Number">
                <input name="bank_account_number" value={form.bank_account_number} onChange={handleChange} className={inputBase} />
              </FormField>
              <div className="sm:col-span-2">
                <FormField label="Employment Status">
                  <select name="employment_status" value={form.employment_status} onChange={handleChange} className={inputBase}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="resigned">Resigned</option>
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          {/* ADDRESS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <MapPin size={18} className="text-indigo-600" /> Location
              </h3>
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <FormField label="Full Address">
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} className={`${inputBase} resize-none`} />
              </FormField>
            </div>
          </div>
        </div>

        {/* MODERN FOOTER */}
        <div className="px-10 py-6 bg-white border-t border-slate-100 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-2 text-slate-400 text-[13px]">
            <AlertCircle size={14} />
            <span>Verify details before saving changes.</span>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={onClose} className="flex-1 md:flex-none px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 md:flex-none relative group px-10 py-3 bg-slate-900 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm">
                {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                {loading ? 'Saving...' : 'Save Profile'}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;