import React, { useEffect, useState } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Payslip {
  id: string;
  month: number;
  year: number;
  basic_salary: number;
  total_allowances: number;
  total_deductions: number;
  gross_salary: number;
  net_salary: number;
  working_days: number;
  present_days: number;
  status: string;
  processed_at: string;
}

export const MyPayslips: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPayslips();
    }
  }, [user]);

  const fetchPayslips = async () => {
    try {
      const { data: empData } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();

      setEmployee(empData);

      if (empData) {
        const { data, error } = await supabase
          .from('payroll')
          .select('*')
          .eq('employee_id', empData.id)
          .order('year', { ascending: false })
          .order('month', { ascending: false });

        if (error) throw error;
        setPayslips(data || []);
      }
    } catch (error) {
      console.error('Error fetching payslips:', error);
    } finally {
      setLoading(false);
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Salary Slips</h1>
        <p className="text-gray-600 mt-1">View and download your payslips</p>
      </div>

      {payslips.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No payslips available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {payslips.map((payslip) => (
            <div key={payslip.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {monthNames[payslip.month - 1]} {payslip.year}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {payslip.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Processed on {new Date(payslip.processed_at).toLocaleDateString()}
                </p>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Basic Salary</span>
                  <span className="font-medium text-gray-800">
                    ₹{payslip.basic_salary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Allowances</span>
                  <span className="font-medium text-green-600">
                    +₹{payslip.total_allowances.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deductions</span>
                  <span className="font-medium text-red-600">
                    -₹{payslip.total_deductions.toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-semibold">Net Salary</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₹{payslip.net_salary.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Working Days: {payslip.working_days}</span>
                  <span>Present: {payslip.present_days}</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
