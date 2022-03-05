import React from 'react'

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <div className="uk-section footer-background">
                <div className="uk-container">
                    <div className="uk-grid uk-flex justify-center">
                        <div className="uk-text-small">
                            <p className="copyright-text">©{new Date().getFullYear()} Simba Exchange. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="uk-visible@m">
                <a href="#" className="in-totop fas fa-chevron-up" data-uk-scroll></a>
            </div>
        </footer>
    )
}

export default Footer