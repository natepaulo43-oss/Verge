import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Users, 
  Clock, 
  ClipboardCheck, 
  CheckCircle, 
  AlertCircle, 
  FolderOpen, 
  Settings, 
  LogOut,
  Target
} from 'lucide-react';

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/app/add-case', icon: Plus, label: 'Add New Case' },
  { to: '/app/clients', icon: Users, label: 'Client List' },
  { to: '/app/in-progress', icon: Clock, label: 'In Progress' },
  { to: '/app/for-review', icon: ClipboardCheck, label: 'For Review' },
  { to: '/app/finalized', icon: CheckCircle, label: 'Finalized' },
  { to: '/app/errors', icon: AlertCircle, label: 'Errors / Flags' },
  { to: '/app/files', icon: FolderOpen, label: 'Files' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-gray-900" />
          </div>
          <span className="font-semibold text-lg">Verge Immigration</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
