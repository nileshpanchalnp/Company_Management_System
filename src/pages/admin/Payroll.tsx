import React, { useEffect, useState } from 'react';
import { DollarSign, Download, Calendar, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface PayrollRecord {
  id: string;
  month: number;
  year: number;
  basic_salary: number;
  gross_salary: number;
  net_salary: number;
  status: string;
  employees: { full_name: string; employee_code: string };
}

export const Payroll: React.FC = () => {
  const { user } = useAuth();
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchPayroll();
  }, [selectedMonth, selectedYear]);

  const fetchPayroll = async () => {
    try {
      const { data, error } = await supabase
        .from('payroll')
        .select('*, employees(full_name, employee_code)')
        .eq('month', selectedMonth)
        .eq('year', selectedYear)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayroll(data || []);
    } catch (error) {
      console.error('Error fetching payroll:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPayroll = async () => {
    if (!confirm('Are you sure you want to process payroll for this month?')) return;

    setProcessing(true);
    try {
      const { data: employees, error: empError } = await supabase
        .from('employees')
        .select('*')
        .eq('employment_status', 'active');

      if (empError) throw empError;

      for (const employee of employees || []) {
        const { data: existing } = await supabase
          .from('payroll')
          .select('id')
          .eq('employee_id', employee.id)
          .eq('month', selectedMonth)
          .eq('year', selectedYear)
          .maybeSingle();

        if (existing) continue;

        const { data: components } = await supabase
          .from('salary_components')
          .select('*')
          .eq('employee_id', employee.id)
          .eq('is_active', true);

        let totalAllowances = 0;
        let totalDeductions = 0;

        components?.forEach((comp) => {
          const amount = comp.is_percentage
            ? (employee.basic_salary * comp.percentage) / 100
            : comp.amount;

          if (comp.component_type === 'allowance') {
            totalAllowances += amount;
          } else {
            totalDeductions += amount;
          }
        });

        const grossSalary = employee.basic_salary + totalAllowances;
        const netSalary = grossSalary - totalDeductions;

        await supabase.from('payroll').insert({
          employee_id: employee.id,
          month: selectedMonth,
          year: selectedYear,
          basic_salary: employee.basic_salary,
          total_allowances: totalAllowances,
          total_deductions: totalDeductions,
          gross_salary: grossSalary,
          net_salary: netSalary,
          working_days: 30,
          present_days: 30,
          status: 'processed',
          processed_by: user!.id,
          processed_at: new Date().toISOString(),
        });
      }

      fetchPayroll();
      alert('Payroll processed successfully!');
    } catch (error) {
      console.error('Error processing payroll:', error);
      alert('Error processing payroll');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'processed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalNetSalary = payroll.reduce((sum, p) => sum + p.net_salary, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payroll Management</h1>
          <p className="text-gray-600 mt-1">Process and manage employee salaries</p>
        </div>
        <button
          onClick={processPayroll}
          disabled={processing || payroll.length > 0}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DollarSign className="w-5 h-5" />
          <span>{processing ? 'Processing...' : 'Process Payroll'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Payroll</h3>
          <p className="text-3xl font-bold text-gray-800">
            ₹{totalNetSalary.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Employees</h3>
          <p className="text-3xl font-bold text-blue-600">{payroll.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Status</h3>
          <p className="text-3xl font-bold text-green-600">
            {payroll.length > 0 ? 'Processed' : 'Pending'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[2024, 2025, 2026].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Salary
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payroll.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No payroll records for this period. Click "Process Payroll" to generate.
                  </td>
                </tr>
              ) : (
                payroll.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {record.employees?.full_name}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {record.employees?.employee_code}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      ₹{record.basic_salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      ₹{record.gross_salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">
                      ₹{record.net_salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Download Payslip"
                      >
                        <FileText className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
