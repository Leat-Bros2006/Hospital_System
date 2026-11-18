import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Sun, Moon } from 'lucide-react';

const AuthLayout = () => {
    const [darkMode, setDarkMode] = useState(() =>{
        return localStorage.getItem('theme') === 'dark'
    });

    // dark mode
    useEffect(() =>{
        if(darkMode){
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else{
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* Open/Close Dark Mode */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                title="ប្តូរពន្លឺអេក្រង់"
                className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
            >
                {darkMode ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                    <Moon className="w-5 h-5 text-slate-600" />
                )}
            </button>

            {/* Show child (Login / Register) */}
            <Outlet />
        </div>
    );
};

export default AuthLayout;