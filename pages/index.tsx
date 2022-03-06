import Button from "@components/Button";
import Footer from "@components/HomeFooter";
import Layout from '@components/Layout';
import { errorToast, saveLocalstorage } from "@store/helper";
import axios from "axios";
import { NextPage } from 'next';
import NextLink from "next/link";
import { useState } from "react";
import { User } from "types";


const Home: NextPage = () => {
  const
    [data, setData] = useState({ email: "", password: "", }),
    [loading, setLoading] = useState<boolean>(false),

    //Functions
    inputsHandler = (e: React.ChangeEvent<HTMLInputElement>): Promise<any> | void => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(`/api/v1/login`, data);
        const result = await response.data;
        if (!result.status) {
          setLoading(false);
          errorToast(result.message);
          return;
        }
        const res = response.data.data as unknown as { token: string, user: User; };
        console.log(res);
        saveLocalstorage(res.token, res.user);
        setLoading(false);
        window.location.href = "/dashboard";
      } catch (error: any) {
        errorToast("an error occured, please try again later");
      }
    };

  return (
    <Layout head='Login'>
      <div className="nk-main">
        <div className="nk-wrap nk-wrap-nosidebar">
          <div className="nk-content ">
            <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
              <div className="brand-logo pb-4 text-center">
                <h3>Simba Exchange</h3>
              </div>
              <div className="card card-bordered">
                <div className="card-inner card-inner-lg">
                  <div className="nk-block-head">
                    <div className="nk-block-head-content">
                      <h4 className="nk-block-title">Sign-In</h4>
                      <div className="nk-block-des">
                        <p>Access the Simba Exchange account using your email and password.</p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">Email address</label>
                      </div>
                      <div className="form-control-wrap">
                        <input type="email" className="form-control form-control-lg" name="email" required onChange={inputsHandler} placeholder="Enter your email address" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>
                      <div className="form-control-wrap">
                        <a href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
                          <em className="passcode-icon icon-show icon ni ni-eye"></em>
                          <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                        </a>
                        <input type="password" name="password" onChange={inputsHandler} required className="form-control form-control-lg" placeholder="Enter your password" />
                      </div>
                    </div>
                    <div className="form-group">
                      <Button isLoading={loading} btn_text="Sign in" />
                    </div>
                  </form>
                  <div className="form-note-s2 text-center pt-4"> New on our platform? <NextLink href="/register"><a>Create an account</a></NextLink>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
