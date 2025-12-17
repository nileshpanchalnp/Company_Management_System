import React, { useEffect, useState } from 'react';
import { Clock, FileText, DollarSign, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEmployeeData();
    }
  }, [user]);

  const fetchEmployeeData = async () => {
    try {
      const { data: empData } = await supabase
        .from('employees')
        .select('*, departments(name), job_roles(title)')
        .eq('user_id', user!.id)
        .maybeSingle();

      setEmployee(empData);

      if (empData) {
        const today = new Date().toISOString().split('T')[0];
        const { data: attendance } = await supabase
          .from('attendance')
          .select('*')
          .eq('employee_id', empData.id)
          .eq('date', today)
          .maybeSingle();

        setTodayAttendance(attendance);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!employee) return;

    setCheckingIn(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from('attendance')
        .insert({
          employee_id: employee.id,
          date: today,
          check_in: now,
          status: 'present',
        })
        .select()
        .single();

      if (error) throw error;
      setTodayAttendance(data);
    } catch (error) {
      console.error('Error checking in:', error);
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    if (!todayAttendance) return;

    setCheckingIn(true);
    try {
      const now = new Date().toISOString();
      const checkIn = new Date(todayAttendance.check_in);
      const checkOut = new Date(now);
      const hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);

      const { data, error } = await supabase
        .from('attendance')
        .update({
          check_out: now,
          total_hours: Math.round(hours * 100) / 100,
        })
        .eq('id', todayAttendance.id)
        .select()
        .single();

      if (error) throw error;
      setTodayAttendance(data);
    } catch (error) {
      console.error('Error checking out:', error);
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {employee?.full_name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 mt-1">{employee?.job_roles?.title} • {employee?.departments?.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Today's Attendance
          </h2>

          {!todayAttendance ? (
            <div className="text-center py-8">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't checked in yet today</p>
              <button
                onClick={handleCheckIn}
                disabled={checkingIn}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {checkingIn ? 'Checking In...' : 'Check In'}
              </button>
            </div>
          ) : todayAttendance.check_out ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-800 font-semibold mb-2">You've completed your day</p>
              <div className="flex justify-center space-x-8 mt-4">
                <div>
                  <p className="text-sm text-gray-600">Check In</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(todayAttendance.check_in).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check Out</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(todayAttendance.check_out).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="font-semibold text-gray-800">
                    {todayAttendance.total_hours}h
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-800 font-semibold mb-2">You're checked in</p>
              <p className="text-gray-600 mb-4">
                Since {new Date(todayAttendance.check_in).toLocaleTimeString()}
              </p>
              <button
                onClick={handleCheckOut}
                disabled={checkingIn}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {checkingIn ? 'Checking Out...' : 'Check Out'}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Basic Salary</h3>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              ₹{employee?.basic_salary?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Leave Balance</h3>
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">12 days</p>
            <p className="text-xs text-gray-500 mt-1">Available this year</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Leaves
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-gray-800">No leave requests</p>
                <p className="text-sm text-gray-500">You're all caught up</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h2>
          <div className="space-y-2">
            <a href="/employee/leaves" className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
              <p className="font-medium text-blue-900">Apply for Leave</p>
            </a>
            <a href="/employee/payslips" className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition">
              <p className="font-medium text-green-900">View Payslips</p>
            </a>
            <a href="/employee/profile" className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
              <p className="font-medium text-purple-900">Update Profile</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
