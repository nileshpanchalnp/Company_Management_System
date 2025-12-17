import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* ================= TYPES ================= */

interface Employee {
  _id: string;
  employee_code: string;
  full_name: string;
  email: string;
  phone?: string;
  employment_status: 'active' | 'inactive' | 'terminated' | 'resigned';
  joining_date: string;
  basic_salary: number;
  department?: {
    name: string;
  };
  job_role?: {
    title: string;
  };
}

/* ================= COMPONENT ================= */

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/employee/get');
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employee_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      case 'resigned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
          <p className="text-gray-600 mt-1">Manage your company's workforce</p>
        </div>
        <button
          onClick={() => navigate('/admin/employees/add')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or code..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-left">Code</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Salary</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{emp.full_name}</p>
                    <p className="text-sm text-gray-500">{emp.email}</p>
                  </td>
                  <td className="px-6 py-4">{emp.employee_code}</td>
                  <td className="px-6 py-4">{emp.department?.name || 'N/A'}</td>
                  <td className="px-6 py-4">{emp.job_role?.title || 'N/A'}</td>
                  <td className="px-6 py-4">₹{emp.basic_salary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(emp.employment_status)}`}>
                      {emp.employment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Eye
                      className="text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/admin/employees/${emp._id}`)}
                    />
                    <Edit
                      className="text-green-600 cursor-pointer"
                      onClick={() => navigate(`/admin/employees/${emp._id}/edit`)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
