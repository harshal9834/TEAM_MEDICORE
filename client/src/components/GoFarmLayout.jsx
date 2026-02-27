import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const GoFarmLayout = () => {
    const location = useLocation();
    const { user } = useAuthStore();
    const currentPath = location.pathname;

    const tabs = [
        { path: '/farmer/home', icon: 'fa-home', label: 'Home' },
        { path: '/farmer/products-tab', icon: 'fa-box-open', label: 'Products' },
        { path: '/farmer/exchange-tab', icon: 'fa-exchange-alt', label: 'Exchange' },
        { path: '/farmer/labour-tab', icon: 'fa-hard-hat', label: 'Labour' },
        { path: '/farmer/market-ai', icon: 'fa-chart-line', label: 'Market AI' },
        { path: '/farmer/more', icon: 'fa-ellipsis-h', label: 'More' },
    ];

    const isActive = (path) => currentPath === path;

    return (
        <div className="gofarm-app">
            {/* Top Header Bar */}
            <header className="gofarm-header">
                <div className="gofarm-header-inner">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-leaf text-xl text-emerald-500"></i>
                        <h1 className="text-xl font-bold">
                            <span className="text-emerald-700">Go</span>
                            <span className="text-amber-500">Farm</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/chat" className="gofarm-header-icon">
                            <i className="fas fa-bell text-base"></i>
                        </Link>
                        <Link to="/profile" className="gofarm-avatar">
                            <i className="fas fa-user text-xs text-white"></i>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="gofarm-content">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="gofarm-bottom-nav">
                <div className="gofarm-nav-inner">
                    {tabs.map((tab) => {
                        const active = isActive(tab.path);
                        return (
                            <Link
                                key={tab.path}
                                to={tab.path}
                                className={`gofarm-nav-tab ${active ? 'active' : ''}`}
                            >
                                <div className={`gofarm-nav-icon-wrap ${active ? 'active' : ''}`}>
                                    <i className={`fas ${tab.icon}`}></i>
                                </div>
                                <span className="gofarm-nav-label">{tab.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default GoFarmLayout;
