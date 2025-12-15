import StatusCard from '../components/dashboard/StatusCard';
import { ClipboardCheck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const statusMetrics = {
    forReview: 12,
    inProgress: 302,
    finalized: 963,
    errors: 7,
  };

  const chartData = {
    labels: ['01 Nov', '04 Nov', '07 Nov', '10 Nov', '13 Nov', '16 Nov', '19 Nov', '22 Nov'],
    datasets: [
      {
        label: 'Cases Completed',
        data: [35, 42, 38, 55, 48, 52, 45, 60],
        borderColor: '#111827',
        backgroundColor: 'rgba(17, 24, 39, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Documents Generated',
        data: [25, 30, 28, 40, 35, 38, 32, 45],
        borderColor: '#9ca3af',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Matthew</h1>
        <p className="text-gray-600">Here's an overview of your immigration cases</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatusCard
          title="For Review"
          count={statusMetrics.forReview}
          subtitle="Cases awaiting review"
          icon={ClipboardCheck}
          trend={{ value: 12.7, label: 'this week', isPositive: true }}
          linkTo="/app/for-review"
          variant="dark"
        />
        <StatusCard
          title="In Progress"
          count={statusMetrics.inProgress}
          subtitle="Active cases"
          icon={Clock}
          trend={{ value: 1.2, label: 'this week', isPositive: true }}
          linkTo="/app/in-progress"
        />
        <StatusCard
          title="Finalized"
          count={statusMetrics.finalized}
          subtitle="Completed cases"
          icon={CheckCircle}
          trend={{ value: 12.7, label: 'this week', isPositive: false }}
          linkTo="/app/finalized"
        />
        <StatusCard
          title="Errors / Flags"
          count={statusMetrics.errors}
          subtitle="Require attention"
          icon={AlertCircle}
          linkTo="/app/errors"
        />
      </div>

      {/* Performance Chart & Top Case Types */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Performance Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Case Performance</h2>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Export data
              </button>
              <select className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option>Last 14 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Top Case Types */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Case Types</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Work Visa</span>
                <span className="text-sm font-semibold text-gray-900">$6.2k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Family-Based</span>
                <span className="text-sm font-semibold text-gray-900">$4.8k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Green Card</span>
                <span className="text-sm font-semibold text-gray-900">$3.5k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
