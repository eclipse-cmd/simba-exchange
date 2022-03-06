import React from 'react';

interface SideBardProps {

}

const SideBard: React.FC<SideBardProps> = ({ }) => {
    return (
        <div className="nk-sidebar nk-sidebar-fixed " data-content="sidebarMenu">
            <div className="nk-sidebar-element nk-sidebar-head border-bottom">
                <div className="nk-sidebar-brand">
                    <h3>Simba</h3>
                </div>
                <div className="nk-menu-trigger mr-n2">
                    <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left"></em></a>
                </div>
            </div>
            <div className="nk-sidebar-element">
                <div className="nk-sidebar-body" data-simplebar>
                    <div className="nk-sidebar-content">
                        <div className="nk-sidebar-menu">
                            <ul className="nk-menu">
                                <li className="nk-menu-heading">
                                    <h6 className="overline-title text-primary-alt">Dashboards</h6>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/index-invest.html" className="nk-menu-link">
                                        <span className="nk-menu-icon"><em className="icon ni ni-coins"></em></span>
                                        <span className="nk-menu-text">Transactions Dashboard</span>
                                    </a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/index-analytics.html" className="nk-menu-link">
                                        <span className="nk-menu-icon"><em className="icon ni ni-growth"></em></span>
                                        <span className="nk-menu-text">Analytics Dashboard</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SideBard;