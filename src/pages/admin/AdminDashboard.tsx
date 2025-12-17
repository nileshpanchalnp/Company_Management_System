import React, { useEffect, useState } from 'react';
import { Users, Clock, FileText, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  pendingLeaves: number;
  todayPresent: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    pendingLeaves: 0,
    todayPresent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [employeesRes, leavesRes, attendanceRes] = await Promise.all([
        supabase.from('employees').select('employment_status', { count: 'exact' }),
        supabase.from('leaves').select('*', { count: 'exact' }).eq('status', 'pending'),
        supabase
          .from('attendance')
          .select('*', { count: 'exact' })
          .eq('date', new Date().toISOString().split('T')[0])
          .eq('status', 'present'),
      ]);

      const activeEmployees = employeesRes.data?.filter(
        (e) => e.employment_status === 'active'
      ).length || 0;

      setStats({
        totalEmployees: employeesRes.count || 0,
        activeEmployees,
        pendingLeaves: leavesRes.count || 0,
        todayPresent: attendanceRes.count || 0,
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
      subtext: `${stats.activeEmployees} active`,
    },
    {
      title: 'Today Present',
      value: stats.todayPresent,
      icon: Clock,
      color: 'bg-green-500',
      subtext: 'checked in',
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      icon: FileText,
      color: 'bg-orange-500',
      subtext: 'awaiting approval',
    },
    {
      title: 'Monthly Payroll',
      value: '₹0',
      icon: DollarSign,
      color: 'bg-purple-500',
      subtext: 'current month',
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
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
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
              <p className="text-sm text-gray-500 mt-1">{card.subtext}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">New employee onboarded</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Leave request approved</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Payroll processed</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
              <p className="font-medium text-blue-900">Add New Employee</p>
              <p className="text-sm text-blue-700">Onboard a new team member</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition">
              <p className="font-medium text-green-900">Process Payroll</p>
              <p className="text-sm text-green-700">Calculate monthly salaries</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition">
              <p className="font-medium text-orange-900">Review Leave Requests</p>
              <p className="text-sm text-orange-700">{stats.pendingLeaves} pending approvals</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
