import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import { Order } from '../../types';
import Layout from '../layout';
import OrderCard from './OrderCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: orders, loading, error } = useApi<Order[]>('/mosavvabat/orders/');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">داشبورد</h2>
          <p>خوش آمدید، {user?.first_name} {user?.last_name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;