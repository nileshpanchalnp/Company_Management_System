import React, { useEffect, useState } from 'react';
import {
  User, Mail, Phone, Calendar, Briefcase,
  MapPin, CreditCard, ShieldCheck, Landmark, Hash,Eye, EyeOff
} from 'lucide-react';
import axios from 'axios';
import { Server } from '../../server/Server';

export const MyProfile: React.FC = () => {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSalary, setShowSalary] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`${Server}employee/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployee(res.data.data);
    } catch (error) {
      console.error('Employee fetch failed', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* 1. HEADER BANNER SECTION */}
      <div className="relative h-64 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 transform translate-x-24" />
        
        {/* Alignment Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full relative bottom-20">
          <div className="flex items-end h-full pb-10">
            {/* The Floating Profile Unit */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 z-10 translate-y-20">
              <div className="relative">
                <div className="p-1.5 bg-white rounded-[2.5rem] shadow-2xl">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-100 rounded-[2.2rem] flex items-center justify-center border-4 border-white overflow-hidden">
                    <User className="w-16 h-16 text-indigo-900 opacity-80" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
              </div>

              <div className="text-center md:text-left mb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {employee?.full_name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-2 text-indigo-100/90">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md text-sm border border-white/10">
                    <Briefcase size={14} /> {employee?.job_role?.title}
                  </span>
                  <span className="text-sm tracking-widest uppercase font-semibold opacity-60">{employee?.employee_code}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT SECTION */}
      {/* mt-32 accounts for the profile picture overlapping height */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Sidebar Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Employment Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 font-medium">Status</span>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                    employee?.employment_status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {employee?.employment_status}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 font-medium">Joined Date</span>
                  <span className="text-slate-900 font-bold">
                    {new Date(employee?.joining_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

      <div className="bg-indigo-900 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200/50">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
        <CreditCard size={24} className="text-indigo-200" />
      </div>
      <div>
        <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
          Monthly Salary
        </p>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold tracking-tighter">
            {showSalary 
              ? `₹${employee?.basic_salary?.toLocaleString()}` 
              : "••••••••"}
          </h2>
          <button 
            onClick={() => setShowSalary(!showSalary)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 group"
            title={showSalary ? "Hide Salary" : "Show Salary"}
          >
            {showSalary ? (
              <EyeOff size={20} className="text-indigo-300 group-hover:text-white" />
            ) : (
              <Eye size={20} className="text-indigo-300 group-hover:text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div className="pt-4 border-t border-white/10 text-indigo-300 text-sm italic">
    Payment processed on the 1st of every month.
  </div>
</div>
          </div>

          {/* RIGHT COLUMN: Detailed Information */}
          <div className="lg:col-span-8 space-y-8">
            <SectionCard title="Primary Information" icon={<User className="text-indigo-600" />}>
              <InfoBox icon={<Mail />} label="Email Address" value={employee?.email} />
              <InfoBox icon={<Phone />} label="Phone Number" value={employee?.phone} />
              <InfoBox icon={<Calendar />} label="Date of Birth" value={employee?.date_of_birth ? new Date(employee.date_of_birth).toLocaleDateString() : 'N/A'} />
              <InfoBox icon={<ShieldCheck />} label="Gender" value={employee?.gender} />
              <InfoBox icon={<MapPin />} label="Permanent Address" value={employee?.address} fullWidth />
            </SectionCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <SectionCard title="Banking" icon={<Landmark className="text-indigo-600" />}>
                  <div className="space-y-5 w-full">
                     <DetailRow label="Bank Name" value={employee?.bank_name} />
                     <DetailRow label="Account Number" value={employee?.bank_account_number} />
                     <DetailRow label="IFSC Code" value={employee?.ifsc_code} />
                  </div>
               </SectionCard>

               <SectionCard title="Identification" icon={<Hash className="text-indigo-600" />}>
                  <div className="space-y-5 w-full">
                     <DetailRow label="Aadhaar ID" value={employee?.aadhaar_number} />
                     <DetailRow label="PAN Card" value={employee?.pan_number} />
                     <DetailRow label="Emergency Contact" value={employee?.emergency_contact} />
                  </div>
               </SectionCard>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= REFINED COMPONENTS ================= */

const SectionCard = ({ title, icon, children }: any) => (
  <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 transition-all hover:shadow-md">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-indigo-50 rounded-2xl">{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-y-8">{children}</div>
  </div>
);

const InfoBox = ({ icon, label, value, fullWidth }: any) => (
  <div className={`${fullWidth ? 'w-full' : 'w-full md:w-1/2'} flex gap-4`}>
    <div className="text-slate-300 mt-1">{React.cloneElement(icon, { size: 20 })}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">{label}</p>
      <p className="text-slate-700 font-semibold text-lg">{value || '—'}</p>
    </div>
  </div>
);

const DetailRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-sm font-bold text-slate-900">{value || '—'}</span>
  </div>
);