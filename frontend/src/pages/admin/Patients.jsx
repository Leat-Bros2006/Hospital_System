import React, { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    Eye,
    Edit2,
    Trash2,
    X,
    Phone,
    Droplet,
    MapPin,
    Calendar,
    FileText,
    Users,
} from 'lucide-react';
import { initialPatients } from '../../data/mockData';

const Patients = () => {
    // ទាញទិន្នន័យពី localStorage ឬប្រើ initialPatients លើកដំបូង
    const [patients, setPatients] = useState(() => {
        const saved = localStorage.getItem('hms_patients');
        return saved ? JSON.parse(saved) : initialPatients;
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('all');

    // State សម្រាប់គ្រប់គ្រង Modal ('add' | 'edit' | 'view')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [formData, setFormData] = useState({
        fullName: '',
        gender: 'ប្រុស',
        age: '',
        phone: '',
        bloodType: 'O+',
        address: '',
        medicalHistory: '',
    });

    // រក្សាទុកចូល localStorage រាល់ពេលបញ្ជីអ្នកជំងឺផ្លាស់ប្តូរ
    useEffect(() => {
        localStorage.setItem('hms_patients', JSON.stringify(patients));
    }, [patients]);

    // ត្រងទិន្នន័យតាមពាក្យស្វែងរក និងភេទ
    const filteredPatients = patients.filter((patient) => {
        const matchesSearch =
            patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.phone.includes(searchTerm) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGender = genderFilter === 'all' ? true : patient.gender === genderFilter;

        return matchesSearch && matchesGender;
    });

    // បើក Modal បន្ថែមអ្នកជំងឺថ្មី
    const handleOpenAdd = () => {
        setModalMode('add');
        setSelectedPatient(null);
        setFormData({
            fullName: '',
            gender: 'ប្រុស',
            age: '',
            phone: '',
            bloodType: 'O+',
            address: '',
            medicalHistory: '',
        });
        setIsModalOpen(true);
    };

    // បើក Modal កែប្រែព័ត៌មាន
    const handleOpenEdit = (patient) => {
        setModalMode('edit');
        setSelectedPatient(patient);
        setFormData({
            fullName: patient.fullName,
            gender: patient.gender,
            age: patient.age,
            phone: patient.phone,
            bloodType: patient.bloodType,
            address: patient.address,
            medicalHistory: patient.medicalHistory,
        });
        setIsModalOpen(true);
    };

    // បើក Modal មើលព័ត៌មានលម្អិត
    const handleOpenView = (patient) => {
        setModalMode('view');
        setSelectedPatient(patient);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // រក្សាទុកទិន្នន័យ (បន្ថែមថ្មី ឬ កែប្រែ)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (modalMode === 'add') {
            const nextNumber = String(patients.length + 1).padStart(3, '0');
            const newPatient = {
                id: `PT-${nextNumber}`,
                ...formData,
                age: Number(formData.age),
                registeredDate: new Date().toISOString().split('T')[0],
            };
            setPatients([newPatient, ...patients]);
        } else if (modalMode === 'edit' && selectedPatient) {
            setPatients(
                patients.map((item) =>
                    item.id === selectedPatient.id
                        ? { ...item, ...formData, age: Number(formData.age) }
                        : item
                )
            );
        }

        setIsModalOpen(false);
    };

    // លុបអ្នកជំងឺ
    const handleDelete = (id, name) => {
        if (window.confirm(`តើអ្នកពិតជាចង់លុបទិន្នន័យអ្នកជំងឺ "${name}" មែនទេ?`)) {
            setPatients(patients.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* ក្បាលទំព័រ */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        គ្រប់គ្រងអ្នកជំងឺ
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        បញ្ជីឈ្មោះអ្នកជំងឺសរុប ({patients.length} នាក់) និងការចុះឈ្មោះអ្នកជំងឺថ្មី
                    </p>
                </div>

                <button
                    onClick={handleOpenAdd}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-xl shadow-md shadow-sky-600/20 transition cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>ចុះឈ្មោះអ្នកជំងឺថ្មី</span>
                </button>
            </div>

            {/* របារស្វែងរក និងតម្រង */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ស្វែងរកតាមលេខកូដ (PT-001), ឈ្មោះ ឬ លេខទូរស័ព្ទ..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 dark:text-white"
                    />
                </div>

                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer"
                >
                    <option value="all">ភេទ៖ ទាំងអស់</option>
                    <option value="ប្រុស">ប្រុស</option>
                    <option value="ស្រី">ស្រី</option>
                </select>
            </div>

            {/* តារាងបង្ហាញបញ្ជីអ្នកជំងឺ */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                                <th className="py-3.5 px-6 font-semibold">លេខកូដ</th>
                                <th className="py-3.5 px-6 font-semibold">ឈ្មោះអ្នកជំងឺ</th>
                                <th className="py-3.5 px-6 font-semibold">ភេទ / អាយុ</th>
                                <th className="py-3.5 px-6 font-semibold">លេខទូរស័ព្ទ</th>
                                <th className="py-3.5 px-6 font-semibold">ក្រុមឈាម</th>
                                <th className="py-3.5 px-6 font-semibold">អាសយដ្ឋាន</th>
                                <th className="py-3.5 px-6 font-semibold text-right">សកម្មភាព</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => (
                                    <tr
                                        key={patient.id}
                                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                                    >
                                        <td className="py-4 px-6 font-semibold text-sky-600 dark:text-sky-400">
                                            {patient.id}
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-semibold text-slate-900 dark:text-white">
                                                {patient.fullName}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                ចុះឈ្មោះ៖ {patient.registeredDate}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                                            {patient.gender} ({patient.age} ឆ្នាំ)
                                        </td>
                                        <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                                            {patient.phone}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                                                {patient.bloodType}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                                            {patient.address}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenView(patient)}
                                                    title="មើលលម្អិត"
                                                    className="p-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/50 transition cursor-pointer"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenEdit(patient)}
                                                    title="កែប្រែ"
                                                    className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition cursor-pointer"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(patient.id, patient.fullName)}
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
                                        <Users className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                                        <p>មិនមានទិន្នន័យអ្នកជំងឺត្រូវនឹងការស្វែងរកទេ</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal សម្រាប់ បន្ថែម / កែប្រែ / មើលលម្អិត */}
            {isModalOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                        {/* ក្បាល Modal */}
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {modalMode === 'add'
                                    ? 'ចុះឈ្មោះអ្នកជំងឺថ្មី'
                                    : modalMode === 'edit'
                                        ? 'កែប្រែព័ត៌មានអ្នកជំងឺ'
                                        : 'សំណុំរឿងលម្អិតអ្នកជំងឺ'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* ខ្លឹមសារ Modal */}
                        {modalMode === 'view' && selectedPatient ? (
                            <div className="p-6 space-y-4 text-sm">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50">
                                    <div>
                                        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                                            {selectedPatient.id}
                                        </span>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                                            {selectedPatient.fullName}
                                        </h4>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                                        ឈាម {selectedPatient.bloodType}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">ភេទ និង អាយុ</p>
                                        <p className="font-semibold text-slate-800 dark:text-white mt-0.5">
                                            {selectedPatient.gender} • {selectedPatient.age} ឆ្នាំ
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <Phone className="w-3.5 h-3.5" /> លេខទូរស័ព្ទ
                                        </p>
                                        <p className="font-semibold text-slate-800 dark:text-white mt-0.5">
                                            {selectedPatient.phone}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" /> អាសយដ្ឋាន
                                        </p>
                                        <p className="font-semibold text-slate-800 dark:text-white mt-0.5">
                                            {selectedPatient.address}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" /> ថ្ងៃចុះឈ្មោះ
                                        </p>
                                        <p className="font-semibold text-slate-800 dark:text-white mt-0.5">
                                            {selectedPatient.registeredDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
                                        <FileText className="w-3.5 h-3.5" /> ប្រវត្តិសុខភាព / កំណត់ចំណាំ
                                    </p>
                                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                                        {selectedPatient.medicalHistory || 'មិនមានកំណត់ចំណាំ'}
                                    </p>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-sm font-medium hover:bg-slate-700 cursor-pointer"
                                    >
                                        បិទផ្ទាំងនេះ
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
                                <div>
                                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        ឈ្មោះពេញអ្នកជំងឺ *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="ឧ. សុខ ដារ៉ា"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:text-white"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            ភេទ *
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                        >
                                            <option value="ប្រុស">ប្រុស</option>
                                            <option value="ស្រី">ស្រី</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            អាយុ *
                                        </label>
                                        <input
                                            type="number"
                                            name="age"
                                            min="0"
                                            max="130"
                                            required
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="25"
                                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            ក្រុមឈាម
                                        </label>
                                        <select
                                            name="bloodType"
                                            value={formData.bloodType}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                        >
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            លេខទូរស័ព្ទ (សម្រាប់ Login) *
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

                                    <div>
                                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            ខេត្ត / ក្រុង *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="ភ្នំពេញ"
                                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        ប្រវត្តិសុខភាព / ការអាលែកហ្ស៊ីថ្នាំ
                                    </label>
                                    <textarea
                                        name="medicalHistory"
                                        rows="3"
                                        value={formData.medicalHistory}
                                        onChange={handleChange}
                                        placeholder="បញ្ជាក់ពីជំងឺប្រចាំកាយ ឬថ្នាំដែលអ្នកជំងឺអាលែកហ្ស៊ី..."
                                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                                    />
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
                                        {modalMode === 'add' ? 'រក្សាទុកអ្នកជំងឺ' : 'រក្សាទុកការកែប្រែ'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Patients;