import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/auth/Login';
import Patients from './pages/admin/Patients';
import Doctors from './pages/admin/Doctors';

// Component បណ្ដោះអាសន្នសម្រាប់ទំព័រដែលកំពុងរៀបចំបន្ត
const ComingSoon = ({ title }) => (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
            ទំព័រនេះកំពុងស្ថិតក្នុងដំណាក់កាលអភិវឌ្ឍ...
        </p>
    </div>
);

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    {/* Login */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                    </Route>

                    {/* Admin និង Doctor (ប្រើ DashboardLayout រួមគ្នា) */}
                    <Route element={<DashboardLayout />}>
                        {/* Admin Routes */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/patients" element={<Patients />} />
                        <Route path="/admin/doctors" element={<Doctors />} />
                        <Route path="/admin/appointments" element={<ComingSoon title="គ្រប់គ្រងការណាត់ជួប" />} />
                        <Route path="/admin/billing" element={<ComingSoon title="វិក្កយបត្រ & ការទូទាត់" />} />

                        {/* Doctor Routes */}
                        <Route path="/doctor/appointments" element={<ComingSoon title="ការណាត់ជួបថ្ងៃនេះ (គ្រូពេទ្យ)" />} />
                        <Route path="/doctor/patients" element={<ComingSoon title="អ្នកជំងឺរបស់ខ្ញុំ" />} />
                        <Route path="/doctor/prescriptions" element={<ComingSoon title="ចេញវេជ្ជបញ្ជា" />} />
                    </Route>

                    {/* សម្រាប់អ្នកជំងឺ (User) */}
                    <Route path="/" element={<ComingSoon title="ទំព័រដើមសម្រាប់អ្នកជំងឺ (User Portal)" />} />

                    {/* បើវាយ URL ខុស ឱ្យរត់ទៅ Login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;