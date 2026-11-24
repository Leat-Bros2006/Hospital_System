import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    CalendarCheck,
    FileText,
    Receipt,
    LogOut,
    Menu,
    X,
    Sun,
    Moon,
    Cross,
    Bell,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ទាញយកតួនាទីដែលបានរក្សាទុកពេល Login ('admin' ឬ 'doctor')
    const role = localStorage.getItem('role') || 'admin';

    // បញ្ជីម៉ឺនុយសម្រាប់ Admin (បុគ្គលិក)
    const adminMenus = [
        { name: 'ផ្ទាំងគ្រប់គ្រង', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'គ្រប់គ្រងអ្នកជំងឺ', path: '/admin/patients', icon: Users },
        { name: 'គ្រប់គ្រងគ្រូពេទ្យ', path: '/admin/doctors', icon: Stethoscope },
        { name: 'ការណាត់ជួប', path: '/admin/appointments', icon: CalendarCheck },
        { name: 'វិក្កយបត្រ & ការទូទាត់', path: '/admin/billing', icon: Receipt },
    ];

    // បញ្ជីម៉ឺនុយសម្រាប់ Doctor (គ្រូពេទ្យ)
    const doctorMenus = [
        { name: 'ការណាត់ជួបថ្ងៃនេះ', path: '/doctor/appointments', icon: CalendarCheck },
        { name: 'អ្នកជំងឺរបស់ខ្ញុំ', path: '/doctor/patients', icon: Users },
        { name: 'ចេញវេជ្ជបញ្ជា', path: '/doctor/prescriptions', icon: FileText },
    ];

    const menus = role === 'doctor' ? doctorMenus : adminMenus;

    const handleLogout = () => {
        localStorage.removeItem('role');
        navigate('/login');
    };

    // ១. ទាញឈ្មោះអ្នកប្រើប្រាស់ (ពេលភ្ជាប់ Backend នឹងរក្សាទុក userName ពេល Login ជោគជ័យ)
    const userName =
        localStorage.getItem('userName') ||
        (role === 'doctor' ? 'វេជ្ជ. ចាន់ សុខា' : 'សុខ ដារ៉ា (បុគ្គលិក)');

    // ២. បង្កើតកាលបរិច្ឆេទថ្ងៃនេះជាភាសាខ្មែរ
    const todayDate = new Date().toLocaleDateString('km-KH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* ផ្ទាំងខ្មៅស្រអាប់ពេលបើក Sidebar លើទូរស័ព្ទ */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
                />
            )}

            {/* Sidebar ខាងឆ្វេង */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-68 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* ផ្នែក Logo ខាងលើ Sidebar */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-600 rounded-xl shadow-md shadow-sky-600/20">
                            <Cross className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-base text-slate-900 dark:text-white leading-none">
                                មន្ទីរពេទ្យ
                            </h1>
                            <span className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
                                {role === 'doctor' ? 'ផ្នែកគ្រូពេទ្យ' : 'ផ្នែកគ្រប់គ្រងទូទៅ'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* បញ្ជី Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {menus.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* ប៊ូតុងចាកចេញខាងក្រោម Sidebar */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>ចាកចេញពីប្រព័ន្ធ</span>
                    </button>
                </div>
            </aside>

            {/* ផ្នែកខាងស្តាំ (Top Navbar + ខ្លឹមសារទំព័រ) */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="h-16 px-4 sm:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white leading-tight">
                                សួស្តី, {userName}!
                            </h2>
                            <p className="text-xs mt-1 text-slate-500 dark:text-slate-400 hidden sm:block">
                                {todayDate}
                            </p>
                        </div>
                    </div>

                    {/* ប៊ូតុងខាងស្តាំ Navbar */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        {/* ប៊ូតុងប្តូរពន្លឺអេក្រង់ */}
                        <button
                            onClick={toggleDarkMode}
                            title="ប្តូរពន្លឺអេក្រង់"
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5 text-amber-400" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        {/* រូបតំណាងជូនដំណឹង */}
                        <button
                            title="ការជូនដំណឹង"
                            className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
                        </button>

                        {/* Profile គណនី */}
                        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-700">
                            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-bold text-sm flex items-center justify-center">
                                {role === 'doctor' ? 'DR' : 'AD'}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-xs font-semibold text-slate-800 dark:text-white leading-tight">
                                    {role === 'doctor' ? 'ដុកទ័រ សុខា' : 'Admin Staff'}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                                    {role}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* កន្លែងបង្ហាញទំព័រកូនៗ (Outlet) */}
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;