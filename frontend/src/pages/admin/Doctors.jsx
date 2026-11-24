import React, { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    X,
    Stethoscope,
    Clock,
    Phone,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { initialDoctors } from '../../data/mockData';

const Doctors = () => {
    const [doctors, setDoctors] = useState(() => {
        const saved = localStorage.getItem('hms_doctors');
        return saved ? JSON.parse(saved) : initialDoctors;
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('all');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        specialty: 'ជំងឺទូទៅ',
        phone: '',
        schedule: 'ចន្ទ - សុក្រ (08:00 AM - 05:00 PM)',
        status: 'active',
    });

    const specialties = [
        'ជំងឺទូទៅ',
        'ជំងឺបេះដូង',
        'ជំងឺកុមារ',
        'សម្ភព និងរោគស្ត្រី',
        'ត្រចៀក ច្រមុះ បំពង់ក',
        'ជំងឺសើស្បែក',
    ];

    useEffect(() => {
        localStorage.setItem('hms_doctors', JSON.stringify(doctors));
    }, [doctors]);

    // ត្រងទិន្នន័យគ្រូពេទ្យ
    const filteredDoctors = doctors.filter((doc) => {
        const matchesSearch =
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.phone.includes(searchTerm) ||
            doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialty =
            specialtyFilter === 'all' ? true : doc.specialty === specialtyFilter;

        return matchesSearch && matchesSpecialty;
    });

    const handleOpenAdd = () => {
        setModalMode('add');
        setSelectedDoctor(null);
        setFormData({
            name: '',
            specialty: 'ជំងឺទូទៅ',
            phone: '',
            schedule: 'ចន្ទ - សុក្រ (08:00 AM - 05:00 PM)',
            status: 'active',
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (doctor) => {
        setModalMode('edit');
        setSelectedDoctor(doctor);
        setFormData({
            name: doctor.name,
            specialty: doctor.specialty,
            phone: doctor.phone,
            schedule: doctor.schedule,
            status: doctor.status,
        });
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modalMode === 'add') {
            const nextNumber = String(doctors.length + 1).padStart(3, '0');
            const formattedName = formData.name.startsWith('វេជ្ជ.')
                ? formData.name
                : `វេជ្ជ. ${formData.name}`;

            const newDoctor = {
                id: `DR-${nextNumber}`,
                ...formData,
                name: formattedName,
            };
            setDoctors([newDoctor, ...doctors]);
        } else if (modalMode === 'edit' && selectedDoctor) {
            setDoctors(
                doctors.map((doc) =>
                    doc.id === selectedDoctor.id ? { ...doc, ...formData } : doc
                )
            );
        }

        setIsModalOpen(false);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`តើអ្នកពិតជាចង់លុបឈ្មោះ "${name}" ចេញពីបញ្ជីមែនទេ?`)) {
            setDoctors(doctors.filter((doc) => doc.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* ក្បាលទំព័រ */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        គ្រប់គ្រងគ្រូពេទ្យ
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        បញ្ជីគ្រូពេទ្យឯកទេស ({doctors.length} នាក់) និងកាលវិភាគប្រចាំការ
                    </p>
                </div>

                <button
                    onClick={handleOpenAdd}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-xl shadow-md shadow-sky-600/20 transition cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>បន្ថែមគ្រូពេទ្យថ្មី</span>
                </button>
            </div>

            {/* របារស្វែងរក និងតម្រងឯកទេស */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ស្វែងរកតាមលេខកូដ (DR-001), ឈ្មោះគ្រូពេទ្យ ឬ លេខទូរស័ព្ទ..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 dark:text-white"
                    />
                </div>

                <select
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer"
                >
                    <option value="all">ឯកទេស៖ ទាំងអស់</option>
                    {specialties.map((spec) => (
                        <option key={spec} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>
            </div>

            {/* តារាងបញ្ជីគ្រូពេទ្យ */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">លេខកូដ</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">ឈ្មោះគ្រូពេទ្យ</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">ផ្នែក / ឯកទេស</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">លេខទូរស័ព្ទ</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">ម៉ោងប្រចាំការ</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold">ស្ថានភាព</th>
                                <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">សកម្មភាព</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map((doctor) => (
                                    <tr
                                        key={doctor.id}
                                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                                    >
                                        <td className="py-4 px-4 sm:px-6 font-semibold text-sky-600 dark:text-sky-400">
                                            {doctor.id}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 dark:text-white">
                                            {doctor.name}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400">
                                                <Stethoscope className="w-3.5 h-3.5" />
                                                {doctor.specialty}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-slate-700 dark:text-slate-300">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                {doctor.phone}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                {doctor.schedule}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 sm:px-6">
                                            {doctor.status === 'active' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    កំពុងប្រចាំការ
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    សម្រាក
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenEdit(doctor)}
                                                    title="កែប្រែ"
                                                    className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition cursor-pointer"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(doctor.id, doctor.name)}
                                                    title="លុប"
                                                    className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-12 text-center text-slate-500 dark:text-slate-400">
                                        <Stethoscope className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                                        <p>មិនមានទិន្នន័យគ្រូពេទ្យត្រូវនឹងការស្វែងរកទេ</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal សម្រាប់ បន្ថែម / កែប្រែគ្រូពេទ្យ */}
            {isModalOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {modalMode === 'add' ? 'បន្ថែមគ្រូពេទ្យថ្មី' : 'កែប្រែព័ត៌មានគ្រូពេទ្យ'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
                            <div>
                                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    ឈ្មោះគ្រូពេទ្យ *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="ឧ. វេជ្ជ. សុខ វិសាល"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        ផ្នែក / ឯកទេស *
                                    </label>
                                    <select
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                    >
                                        {specialties.map((spec) => (
                                            <option key={spec} value={spec}>
                                                {spec}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        លេខទូរស័ព្ទ *
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="012 345 678"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    កាលវិភាគប្រចាំការ *
                                </label>
                                <input
                                    type="text"
                                    name="schedule"
                                    required
                                    value={formData.schedule}
                                    onChange={handleChange}
                                    placeholder="ឧ. ចន្ទ - សុក្រ (08:00 AM - 05:00 PM)"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    ស្ថានភាពធ្វើការ
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                >
                                    <option value="active">កំពុងប្រចាំការ (Active)</option>
                                    <option value="inactive">សម្រាក / មិនប្រចាំការ (Inactive)</option>
                                </select>
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium cursor-pointer"
                                >
                                    បោះបង់
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium shadow-md shadow-sky-600/20 cursor-pointer"
                                >
                                    {modalMode === 'add' ? 'រក្សាទុកគ្រូពេទ្យ' : 'រក្សាទុកការកែប្រែ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Doctors;