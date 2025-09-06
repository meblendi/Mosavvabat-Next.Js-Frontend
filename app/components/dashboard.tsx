import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import { Order } from '../../types';
import OrderCard from './OrderCard';
import Image from 'next/image';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: orders, loading, error } = useApi<Order[]>('/mosavvabat/orders/');

  if (loading) return <div className='flex justify-center'>... Dashboard is Loading </div>;
  if (error) return <div>Error: {error}</div>;

  // Get organization logo URL
  const organizationLogo = user?.profile?.organization_logo || 
                          user?.profile?.organization?.logo_url || 
                          user?.profile?.organization?.logo;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">داشبورد</h2>
          
          {/* Organization Logo */}
          {organizationLogo && (
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                {user?.profile?.organization?.name}
              </div>
              <div className="w-12 h-12 relative">
                <Image
                  src={organizationLogo}
                  alt={`Logo of ${user?.profile?.organization?.name}`}
                  fill
                  className="object-contain rounded"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        <p className="text-gray-700">
          خوش آمدید، <span className="font-semibold">{user?.first_name} {user?.last_name}</span>
        </p>
        
        {/* Additional user info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">سمت:</span> {user?.profile?.position || 'تعیین نشده'}
          </div>
          <div>
            <span className="font-medium">سازمان:</span> {user?.profile?.organization?.name}
          </div>
          {user?.profile?.can_approve && (
            <div>
              <span className="font-medium">سقف تأیید:</span> {user?.profile?.approval_limit}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;