import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  count: number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  linkTo: string;
  variant?: 'default' | 'dark';
}

export default function StatusCard({
  title,
  count,
  subtitle,
  icon: Icon,
  trend,
  linkTo,
  variant = 'default',
}: StatusCardProps) {
  return (
    <Link to={linkTo}>
      <div
        className={`card card-hover p-6 cursor-pointer ${
          variant === 'dark' ? 'bg-gray-900 text-white border-gray-800' : ''
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${variant === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Icon className={`w-6 h-6 ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          </div>
          <svg
            className={`w-5 h-5 ${variant === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <div>
          <div className={`text-sm font-medium mb-1 ${variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </div>
          {subtitle && (
            <div className={`text-xs mb-2 ${variant === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {subtitle}
            </div>
          )}
          <div className={`text-3xl font-bold mb-2 ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {count.toLocaleString()}
          </div>
          {trend && (
            <div className="flex items-center gap-2">
              {trend.isPositive !== false ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.isPositive !== false ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive !== false ? '+' : ''}
                {trend.value}%
              </span>
              <span className={`text-sm ${variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {trend.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
