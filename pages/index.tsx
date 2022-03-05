import Layout from '@components/Layout'
import type { NextPage } from 'next'
import NextLink from "next/link"


const Home: NextPage = () => {
  return (
    <Layout head='Login'>
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
                    <p className="uk-text-lead uk-margin-small-top uk-margin-medium-bottom">Log into your account</p>
                    <form className="uk-grid uk-form">
                      <div className="uk-margin-small uk-width-1-1 uk-inline">
                        <span className="uk-form-icon uk-form-icon-flip fas fa-user fa-sm"></span>
                        <input className="uk-input uk-border-rounded" value="" name="email" type="email" placeholder="Email address" />
                      </div>
                      <div className="uk-margin-small uk-width-1-1 uk-inline">
                        <span className="uk-form-icon uk-form-icon-flip fas fa-lock fa-sm"></span>
                        <input className="uk-input uk-border-rounded" value="" type="password" placeholder="Password" />
                      </div>
                      <div className="uk-margin-small uk-width-1-1">
                        <button className="uk-button uk-width-1-1 uk-button-primary uk-border-rounded uk-float-left" type="submit">Sign in</button>
                      </div>
                    </form>

                    <span className="uk-text-small">Don't have an account? <NextLink href="/register"><a className="uk-button uk-button-text">Register here</a></NextLink> </span>
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

export default Home
