import React, { useEffect, useState } from 'react';
import { Calendar, Check, X, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Leave {
  id: string;
  from_date: string;
  to_date: string;
  total_days: number;
  reason: string;
  status: string;
  created_at: string;
  leave_types: { name: string };
  employees: { full_name: string; employee_code: string };
}

export const LeaveRequests: React.FC = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    fetchLeaves();
  }, [filter]);

  const fetchLeaves = async () => {
    try {
      let query = supabase
        .from('leaves')
        .select('*, leave_types(name), employees(full_name, employee_code)')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setLeaves(data || []);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId: string) => {
    try {
      const { error } = await supabase
        .from('leaves')
        .update({
          status: 'approved',
          approved_by: user!.id,
          approved_at: new Date().toISOString(),
        })
        .eq('id', leaveId);

      if (error) throw error;
      fetchLeaves();
    } catch (error) {
      console.error('Error approving leave:', error);
      alert('Error approving leave');
    }
  };

  const handleReject = async (leaveId: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      const { error } = await supabase
        .from('leaves')
        .update({
          status: 'rejected',
          approved_by: user!.id,
          approved_at: new Date().toISOString(),
          rejection_reason: reason,
        })
        .eq('id', leaveId);

      if (error) throw error;
      fetchLeaves();
    } catch (error) {
      console.error('Error rejecting leave:', error);
      alert('Error rejecting leave');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Leave Requests</h1>
        <p className="text-gray-600 mt-1">Review and manage employee leave applications</p>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {leaves.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No leave requests found</p>
          ) : (
            <div className="space-y-4">
              {leaves.map((leave) => (
                <div key={leave.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {leave.employees?.full_name}
                      </h3>
                      <p className="text-sm text-gray-500">{leave.employees?.employee_code}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        leave.status
                      )}`}
                    >
                      {leave.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <span className="font-medium">Leave Type:</span>
                      <span>{leave.leave_types?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(leave.from_date).toLocaleDateString()} -{' '}
                        {new Date(leave.to_date).toLocaleDateString()}
                      </span>
                      <span className="text-gray-500">({leave.total_days} days)</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Reason:</span> {leave.reason}
                    </div>
                    <div className="text-xs text-gray-500">
                      Applied on {new Date(leave.created_at).toLocaleString()}
                    </div>
                  </div>

                  {leave.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(leave.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(leave.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
