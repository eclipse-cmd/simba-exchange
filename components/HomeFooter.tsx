import React from 'react';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <div className="nk-footer nk-auth-footer-full">
            <div className="container wide-lg">
                <div className="row g-3">
                    <div className="col-lg-12">
                        <div className="nk-block-content text-center text-lg-left">
                            <p className="text-soft text-center">&copy; {new Date().getFullYear()} Simba. All Rights Reserved. Designed by <b>eclipse_cmd</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;