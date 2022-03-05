import Layout from '@components/Layout'
import type { NextPage } from 'next'
import NextLink from "next/link"


const Register: NextPage = () => {
    return (
        <Layout head='Registration'>
            <div className="uk-section uk-padding-remove-vertical">
                <div className="uk-container uk-container-expand">
                    <div className="uk-grid h-min-vh">
                        <div className="uk-width-3-5@m uk-background-cover uk-background-center-right uk-visible@m uk-box-shadow-xlarge" style={{ backgroundImage: "url(/assets/img/in-signin-image.jpg)" }}>
                        </div>
                        <div className="uk-width-expand@m uk-flex uk-flex-middle">
                            <div className="uk-grid uk-flex-center">
                                <div className="uk-width-3-5@m">
                                    <div className="uk-text-center in-padding-horizontal@s">
                                        <h2>Simba-Exchange</h2>
                                        <p className="uk-text-lead uk-margin-small-top uk-margin-medium-bottom">Register a new account</p>
                                        <form className="uk-grid uk-form">
                                            <div className="uk-margin-small uk-width-1-1 uk-inline">
                                                <span className="uk-form-icon uk-form-icon-flip fas fa-user fa-sm"></span>
                                                <input className="uk-input uk-border-rounded" value="" name="email" type="email" placeholder="Email address" />
                                            </div>
                                            <div className="uk-margin-small uk-width-1-1 uk-inline">
                                                <span className="uk-form-icon uk-form-icon-flip fas fa-user fa-sm"></span>
                                                <input className="uk-input uk-border-rounded" value="" name="email" type="email" placeholder="Email address" />
                                            </div>
                                            <div className="uk-margin-small uk-width-1-1 uk-inline">
                                                <span className="uk-form-icon uk-form-icon-flip fas fa-lock fa-sm"></span>
                                                <input className="uk-input uk-border-rounded" value="" type="password" placeholder="Password" />
                                            </div>
                                            <div className="uk-margin-small uk-width-1-1">
                                                <button className="uk-button uk-width-1-1 uk-button-primary uk-border-rounded uk-float-left" type="submit">Sign up</button>
                                            </div>
                                        </form>
                                        <span className="uk-text-small">Have an existing account? <NextLink href="/"><a className="uk-button uk-button-text">Login here</a></NextLink> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register
