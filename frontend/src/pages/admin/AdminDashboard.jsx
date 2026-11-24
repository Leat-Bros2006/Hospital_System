import React, { useState } from 'react';
import {
    Users,
    Stethoscope,
    CalendarCheck,
    DollarSign,
    Clock,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    Plus,
    CalendarPlus,
} from 'lucide-react';
import { Link } from 'react-router';
import {
    initialPatients,
    initialDoctors,
    initialAppointments,
    initialBills,
} from '../../data/mockData';

const AdminDashboard = () => {
    // ទាញទិន្នន័យរួមពី localStorage ឬ mockData ដើម្បីគណនាស្ថិតិជាក់ស្តែង
    const [patients] = useState(() => {
        const saved = localStorage.getItem('hms_patients');
        return saved ? JSON.parse(saved) : initialPatients;
    });

    const [doctors] = useState(() => {
        const saved = localStorage.getItem('hms_doctors');
        return saved ? JSON.parse(saved) : initialDoctors;
    });

    const [appointments] = useState(() => {
        const saved = localStorage.getItem('hms_appointments');
        return saved ? JSON.parse(saved) : initialAppointments;
    });

    const [bills] = useState(() => {
        const saved = localStorage.getItem('hms_bills');
        return saved ? JSON.parse(saved) : initialBills;
    });

    // គណនាស្ថិតិសង្ខេប
    const activeDoctorsCount = doctors.filter((doc) => doc.status === 'active').length;
    const pendingAppointmentsCount = appointments.filter((apt) => apt.status === 'pending').length;
    const totalRevenue = bills
        .filter((bill) => bill.status === 'paid')
        .reduce((sum, bill) => sum + bill.total, 0);

    const stats = [
        {
            title: 'អ្នកជំងឺសរុប',
            value: patients.length,
            subText: 'ក្នុងប្រព័ន្ធទាំងអស់',
            icon: Users,
            color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
            link: '/admin/patients',
        },
        {
            title: 'គ្រូពេទ្យប្រចាំការ',
            value: doctors.length,
            subText: `${activeDoctorsCount} នាក់កំពុងធ្វើការ`,
            icon: Stethoscope,
            color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
            link: '/admin/doctors',
        },
        {
            title: 'ការណាត់ជួបថ្ងៃនេះ',
            value: appointments.length,
            subText: `${pendingAppointmentsCount} កំពុងរង់ចាំអនុម័ត`,
            icon: CalendarCheck,
            color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
            link: '/admin/appointments',
        },
        {
            title: 'ចំណូលបានទូទាត់',
            value: `$${totalRevenue.toFixed(2)}`,
            subText: `ពីវិក្កយបត្រសរុប ${bills.length}`,
            icon: DollarSign,
            color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            link: '/admin/billing',
        },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        បានពិនិត្យរួច
                    </span>
                );
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        បានអនុម័ត
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                        <Clock className="w-3.5 h-3.5" />
                        កំពុងរង់ចាំ
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                        <XCircle className="w-3.5 h-3.5" />
                        បានបោះបង់
                    </span>
                );
        }
    };

    return (
        <div className="space-y-8">
            {/* ក្បាលទំព័រ និងប៊ូតុងផ្លូវកាត់ */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        ទិដ្ឋភាពទូទៅ (Admin Dashboard)
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        សង្ខេបទិន្នន័យប្រតិបត្តិការពិគ្រោះអ្នកជំងឺប្រចាំថ្ងៃ
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        to="/admin/appointments"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-sm font-medium rounded-xl transition"
                    >
                        <CalendarPlus className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span>កក់ការណាត់ជួប</span>
                    </Link>

                    <Link
                        to="/admin/patients"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-xl shadow-md shadow-sky-600/20 transition"
                    >
                        <Plus className="w-4 h-4" />
                        <span>ចុះឈ្មោះអ្នកជំងឺថ្មី</span>
                    </Link>
                </div>
            </div>

            {/* កាតស្ថិតិទាំង ៤ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={index}
                            to={item.link}
                            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-800 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        {item.title}
                                    </p>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                        {item.value}
                                    </h3>
                                </div>
                                <div className={`p-3 rounded-xl ${item.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                <span>{item.subText}</span>
                                <ArrowUpRight className="w-4 h-4 text-sky-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* តារាងការណាត់ជួបថ្មីៗ */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            បញ្ជីការណាត់ជួបថ្មីៗ
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            តាមដានអ្នកជំងឺដែលបានកក់ម៉ោងពិនិត្យសុខភាព
                        </p>
                    </div>
                    <Link
                        to="/admin/appointments"
                        className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline"
                    >
                        មើលទាំងអស់
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">លេខកូដ</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">ឈ្មោះអ្នកជំងឺ</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">គ្រូពេទ្យទទួលបន្ទុក</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">ផ្នែក / ឯកទេស</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">កាលបរិច្ឆេទ & ម៉ោង</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">ស្ថានភាព</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {appointments.map((apt) => (
                                <tr
                                    key={apt.id}
                                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                                >
                                    <td className="py-4 px-4 sm:px-6 font-semibold text-sky-600 dark:text-sky-400">
                                        {apt.id}
                                    </td>
                                    <td className="py-4 px-4 sm:px-6">
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {apt.patientName}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {apt.phone}
                                        </p>
                                    </td>
                                    <td className="py-4 px-4 sm:px-6 text-slate-700 dark:text-slate-300">
                                        {apt.doctorName}
                                    </td>
                                    <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400">
                                        {apt.department}
                                    </td>
                                    <td className="py-4 px-4 sm:px-6 text-slate-700 dark:text-slate-300">
                                        <p className="font-medium">{apt.time}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {apt.date}
                                        </p>
                                    </td>
                                    <td className="py-4 px-4 sm:px-6">{getStatusBadge(apt.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;