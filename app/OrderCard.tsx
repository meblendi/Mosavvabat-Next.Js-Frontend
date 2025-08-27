import React from 'react';
import Link from 'next/link';
import { 
  Clock, 
  User, 
  Building, 
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { Order } from '../types';
import { format, formatDistanceToNow } from 'date-fns';
import { faIR } from 'date-fns/locale';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'returned':
        return 'bg-orange-100 text-orange-800';
      case 'finalized':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'under_review':
        return <Clock className="w-4 h-4" />;
      case 'returned':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      draft: 'پیش‌نویس',
      under_review: 'در حال بررسی',
      approved: 'تأیید شده',
      rejected: 'رد شده',
      returned: 'عودت داده شده',
      finalized: 'نهایی شده',
    };
    return statusMap[status] || status;
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-blue-100 text-blue-800';
      case 3:
        return 'bg-yellow-100 text-yellow-800';
      case 4:
        return 'bg-orange-100 text-orange-800';
      case 5:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <Link href={`/orders/${order.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                {order.title}
              </h3>
            </Link>
          </div>
          
          {order.is_urgent && (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {order.description}
        </p>

        {/* Metadata */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>{order.created_by_name}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Building className="w-4 h-4" />
              <span>{order.organization_name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                اولویت {order.priority}
              </span>
              
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span>{getStatusText(order.status)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span className="text-xs">
                {formatDistanceToNow(new Date(order.created), {
                  addSuffix: true,
                  locale: faIR
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Deadline */}
        {order.deadline && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600 font-medium">مهلت:</span>
              <span className="text-gray-600">
                {format(new Date(order.deadline), 'yyyy/MM/dd - HH:mm', { locale: faIR })}
              </span>
            </div>
          </div>
        )}

        {/* Current Stage */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">مرحله فعلی:</span>
            <span className="font-medium text-gray-900">{order.current_stage_name}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex space-x-2">
          <Link
            href={`/orders/${order.id}`}
            className="flex-1 bg-primary-600 text-white text-center py-2 px-3 rounded-md text-sm hover:bg-primary-700 transition-colors"
          >
            مشاهده جزئیات
          </Link>
          
          {(order.status === 'draft' || order.status === 'returned') && (
            <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-300 transition-colors">
              ویرایش
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;