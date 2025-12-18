
import { X, Mail, Phone, MapPin, Briefcase, CreditCard, User, Calendar } from 'lucide-react';

const ViewEmployeeModal = ({ employee, onClose }: any) => {
  if (!employee) return null;

  const InfoBlock = ({ icon: Icon, label, value }: any) => (
    <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider">
        <Icon size={14} />
        {label}
      </div>
      <div className="text-gray-900 font-semibold">{value || "N/A"}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30">
              {employee.full_name?.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">{employee.full_name}</h2>
              <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Briefcase size={16} />
                {employee.job_role?.title || employee.job_role} • {employee.department?.name || employee.department}
              </p>
              <span className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                ID: {employee.employee_code}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Column: Personal Info */}
            <div className="md:col-span-2 space-y-6">
              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-blue-600" /> Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoBlock icon={Mail} label="Email Address" value={employee.email} />
                  <InfoBlock icon={Phone} label="Phone Number" value={employee.phone} />
                  <InfoBlock icon={Calendar} label="Date of Birth" value={employee.date_of_birth} />
                  <InfoBlock icon={User} label="Gender" value={employee.gender} />
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" /> Location & Contact
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <InfoBlock icon={MapPin} label="Residential Address" value={employee.address} />
                  <InfoBlock icon={Phone} label="Emergency Contact" value={employee.emergency_contact} />
                </div>
              </section>
            </div>

            {/* Right Column: Work & Finance */}
            <div className="space-y-6">
              <section className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CreditCard size={18} /> Financials
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Monthly Basic Salary</p>
                    <p className="text-xl font-bold text-green-600">₹{employee.basic_salary?.toLocaleString()}</p>
                  </div>
                  <hr className="border-slate-200" />
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-400">BANK DETAILS</p>
                    <div>
                      <p className="text-xs text-gray-500">Bank Name</p>
                      <p className="text-sm font-medium">{employee.bank_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Account Number</p>
                      <p className="text-sm font-mono">{employee.bank_account_number}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-xs text-gray-500">IFSC</p>
                            <p className="text-sm font-medium">{employee.ifsc_code}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">PAN</p>
                            <p className="text-sm font-medium">{employee.pan_number}</p>
                        </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-600 mb-1">Joining Date</p>
                <p className="text-md font-bold text-indigo-900">{employee.joining_date}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;