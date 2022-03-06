import { route } from "next/dist/server/router";
import { Router } from "next/router";
import React from 'react';
import { useRouter } from "next/router";

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("_simba");
        router.push('/');
    };

    return (
        <div className="nk-header nk-header-fixed is-light">
            <div className="container-fluid">
                <div className="nk-header-wrap">
                    <div className="nk-header-brand d-xl-none">
                        <h3>Simba</h3>
                    </div>
                    <div className="nk-header-tools">
                        <ul className="nk-quick-nav">

                            <li className="dropdown user-dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <div className="user-toggle">
                                        <div className="user-avatar sm">
                                            <em className="icon ni ni-user-alt"></em>
                                        </div>
                                        <div className="user-info d-none d-md-block">
                                            <div className="user-status">User</div>
                                            <div className="user-name dropdown-indicator">Emmanuel</div>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                        <div className="user-card">
                                            <div className="user-avatar">
                                                <span>AB</span>
                                            </div>
                                            <div className="user-info">
                                                <span className="lead-text">Emmanuel Popoola</span>
                                                <span className="sub-text">info@softnio.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-inner">
                                        <ul className="link-list">
                                            <li><a href="#logout" onClick={() => logout()}><em className="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;