import React, { useEffect, useState } from 'react';
import { Users, Clock, FileText, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const HRDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    todayPresent: 0,
    newHires: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [employeesRes, leavesRes, attendanceRes] = await Promise.all([
        supabase.from('employees').select('*', { count: 'exact' }).eq('employment_status', 'active'),
        supabase.from('leaves').select('*', { count: 'exact' }).eq('status', 'pending'),
        supabase
          .from('attendance')
          .select('*', { count: 'exact' })
          .eq('date', new Date().toISOString().split('T')[0])
          .eq('status', 'present'),
      ]);

      setStats({
        totalEmployees: employeesRes.count || 0,
        pendingLeaves: leavesRes.count || 0,
        todayPresent: attendanceRes.count || 0,
        newHires: 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Today Present',
      value: stats.todayPresent,
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      icon: FileText,
      color: 'bg-orange-500',
    },
    {
      title: 'This Month Hires',
      value: stats.newHires,
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">HR Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage employees, attendance, and leave requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/hr/attendance"
              className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              <p className="font-medium text-blue-900">Mark Attendance</p>
              <p className="text-sm text-blue-700">Record today's attendance</p>
            </a>
            <a
              href="/hr/leaves"
              className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition"
            >
              <p className="font-medium text-green-900">Review Leave Requests</p>
              <p className="text-sm text-green-700">{stats.pendingLeaves} pending approvals</p>
            </a>
            <a
              href="/hr/employees"
              className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
            >
              <p className="font-medium text-purple-900">View Employees</p>
              <p className="text-sm text-purple-700">Manage employee records</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Attendance marked</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Leave request approved</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


