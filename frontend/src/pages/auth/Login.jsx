import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Phone, Lock, Eye, EyeOff, Cross, ShieldCheck, Stethoscope, User } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('user'); // 'user' | 'doctor' | 'admin'
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '012345678',
        password: 'password123',
        remember: false,
    });

    // ប្តូរតួនាទី និងបំពេញទិន្នន័យគំរូដោយស្វ័យប្រវត្តិសម្រាប់តេស្ត Prototype
    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        if (selectedRole === 'admin') {
            setFormData((prev) => ({
                ...prev,
                email: 'admin@hospital.com',
                password: 'password123',
            }));
        } else if (selectedRole === 'doctor') {
            setFormData((prev) => ({
                ...prev,
                email: 'doctor@hospital.com',
                password: 'password123',
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                email: '012345678',
                password: 'password123',
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // រក្សាទុកតួនាទីបណ្ដោះអាសន្នសម្រាប់ Prototype
        localStorage.setItem('role', role);

        // បញ្ជូនទៅកាន់ទំព័រតាមតួនាទី
        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else if (role === 'doctor') {
            navigate('/doctor/appointments');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-sky-700 via-sky-600 to-teal-600 dark:from-slate-800 dark:via-slate-900 dark:to-sky-950 p-12 text-white relative overflow-hidden">
                {/* រង្វង់តុបតែងផ្ទៃខាងក្រោយ */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400/10 rounded-full blur-2xl"></div>

                {/* Logo ខាងលើ */}
                <div className="flex items-center gap-3 z-10">
                    <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                        <Cross className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-wide">មន្ទីរពេទ្យ</span>
                </div>

                {/* ខ្លឹមសារកណ្តាល */}
                <div className="my-auto text-center max-w-md mx-auto z-10 space-y-6">
                    <div className="w-24 h-24 mx-auto bg-white/15 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-white/20">
                        <Cross className="w-12 h-12 text-teal-200" />
                    </div>
                    <h1 className="text-3xl xl:text-4xl font-bold leading-snug">
                        ប្រព័ន្ធគ្រប់គ្រងមន្ទីរពេទ្យ
                    </h1>
                    <p className="text-sky-100 text-base leading-relaxed">
                        គ្រប់គ្រងទិន្នន័យអ្នកជំងឺ កាលវិភាគណាត់ជួបគ្រូពេទ្យ និងប្រវត្តិព្យាបាលប្រកបដោយសុវត្ថិភាព និងរហ័សទាន់ចិត្ត។
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-center p-6 sm:p-12 bg-slate-50/80 dark:bg-slate-950 transition-colors duration-300">
                {/* Card Container */}
                <div className="w-full max-w-md space-y-7 bg-white dark:bg-slate-900 p-7 sm:p-9 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/50">

                    {/* ចំណងជើង */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            ចូលប្រើប្រាស់ប្រព័ន្ធ
                        </h2>
                        <p className="text-sm text-slate-500 mt-3 dark:text-slate-400">
                            សូមជ្រើសរើសតួនាទី និងបញ្ចូលព័ត៌មានគណនីរបស់អ្នក
                        </p>
                    </div>

                    {/* Choose (Role Selector Tabs) */}
                    <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
                        <button
                            type="button"
                            onClick={() => handleRoleSelect('user')}
                            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                                role === 'user'
                                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-md shadow-slate-200/70 dark:shadow-black/30 ring-1 ring-slate-200/50 dark:ring-slate-600'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <User className="w-4 h-4" />
                            <span>អ្នកជំងឺ</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRoleSelect('doctor')}
                            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                                role === 'doctor'
                                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-md shadow-slate-200/70 dark:shadow-black/30 ring-1 ring-slate-200/50 dark:ring-slate-600'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <Stethoscope className="w-4 h-4" />
                            <span>គ្រូពេទ្យ</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRoleSelect('admin')}
                            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                                role === 'admin'
                                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-md shadow-slate-200/70 dark:shadow-black/30 ring-1 ring-slate-200/50 dark:ring-slate-600'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <ShieldCheck className="w-4 h-4" />
                            <span>បុគ្គលិក</span>
                        </button>
                    </div>

                    {/* Form បញ្ចូលព័ត៌មាន */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* អ៊ីមែល ឬ លេខទូរស័ព្ទ */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                {role === 'user' ? 'អ៊ីមែល ឬ លេខទូរស័ព្ទ' : 'អ៊ីមែល (Email)'}
                            </label>
                            <div className="relative group">
                                {role === 'user' ? (
                                    <Phone className="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                                ) : (
                                    <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                                )}
                                <input
                                    type={role === 'user' ? 'text' : 'email'}
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={
                                        role === 'user'
                                            ? '012 345 678 ឬ example@gmail.com'
                                            : 'example@hospital.com'
                                    }
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm shadow-xs focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 focus:shadow-md focus:shadow-sky-500/10 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        {/* ពាក្យសម្ងាត់ */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                ពាក្យសម្ងាត់ (Password)
                            </label>
                            <div className="relative group">
                                <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-11 py-3 bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm shadow-xs focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 focus:shadow-md focus:shadow-sky-500/10 dark:text-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* ចងចាំខ្ញុំ និង ភ្លេចពាក្យសម្ងាត់ */}
                        <div className="flex items-center justify-between text-sm pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-sky-600 focus:ring-sky-500 shadow-xs"
                                />
                                <span>ចងចាំខ្ញុំ</span>
                            </label>

                            <button
                                type="button"
                                onClick={() =>
                                    alert(
                                        'សូមទាក់ទងផ្នែកទទួលភ្ញៀវ ឬអ្នកគ្រប់គ្រងប្រព័ន្ធ (Admin) ដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ។'
                                    )
                                }
                                className="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors cursor-pointer"
                            >
                                ភ្លេចពាក្យសម្ងាត់?
                            </button>
                        </div>

                        {/* ប៊ូតុង Login */}
                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-sky-600/30 hover:shadow-xl hover:shadow-sky-600/40 transition-all duration-200 cursor-pointer"
                        >
                            ចូលប្រើប្រាស់
                        </button>
                    </form>

                    {/* សារណែនាំផ្នែកខាងក្រោមតាមតួនាទី */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        {role === 'user' ? (
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                សម្រាប់អ្នកជំងឺថ្មី សូមទាក់ទង{' '}
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                    ផ្នែកទទួលភ្ញៀវ (Receptionist)
                                </span>{' '}
                                នៅមន្ទីរពេទ្យផ្ទាល់ ដើម្បីចុះឈ្មោះបង្កើតគណនី។
                            </p>
                        ) : (
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                សម្រាប់បុគ្គលិក និងគ្រូពេទ្យ សូមទាក់ទង{' '}
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                    អ្នកគ្រប់គ្រងប្រព័ន្ធ (Admin)
                                </span>{' '}
                                ដើម្បីទទួលបានគណនី។
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;