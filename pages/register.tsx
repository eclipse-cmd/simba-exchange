import Button from "@components/Button";
import Footer from "@components/HomeFooter";
import Layout from '@components/Layout';
import { errorToast, saveLocalstorage, successToast } from "@store/helper";
import axios from "axios";
import type { NextPage } from 'next';
import NextLink from "next/link";
import { useState } from "react";
import { User } from "types";

const Register: NextPage = () => {
    const
        [data, setData] = useState({}),
        [loading, setLoading] = useState<boolean>(false),

        //Functions
        inputsHandler = (e: React.ChangeEvent<HTMLInputElement>): Promise<any> | void => {
            setData({ ...data, [e.target.name]: e.target.value });
        },
        handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault();
            setLoading(true);
            try {
                const response = await axios.post(`/api/v1/register`, data);
                const result = await response.data;
                if (!result.status) {
                    setLoading(false);
                    errorToast(result.message);
                    return;
                }
                const res = response.data.data as unknown as { token: string, user: User; };
                saveLocalstorage(res.token, res.user);
                setLoading(false);
                successToast("registration is successful, you will be redirected automatically");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 3000);
            } catch (error: any) {
                setLoading(false);
                errorToast("an error occured, please try again later");
            }
        };


    return (
        <Layout head='Registration'>
            <div className="nk-main ">
                <div className="nk-wrap nk-wrap-nosidebar">
                    <div className="nk-content ">
                        <div className="nk-block nk-block-middle nk-auth-body wide-xs">
                            <div className="brand-logo pb-4 text-center">
                                <h3>Simba Exchange</h3>
                            </div>
                            <div className="card card-bordered">
                                <div className="card-inner card-inner-lg">
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Register</h4>
                                            <div className="nk-block-des">
                                                <p>Create New Simba Account</p>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">Full Name</label>
                                            <div className="form-control-wrap">
                                                <input type="text" className="form-control form-control-lg" name="name" onChange={inputsHandler} required placeholder="Enter your full name" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email">Email </label>
                                            <div className="form-control-wrap">
                                                <input type="text" className="form-control form-control-lg" name="email" onChange={inputsHandler} required placeholder="Enter your email address" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <div className="form-control-wrap">
                                                <input type="password" className="form-control form-control-lg" name="password" onChange={inputsHandler} required placeholder="Enter your password" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="password">Confirm Password</label>
                                            <div className="form-control-wrap">
                                                <input type="password" className="form-control form-control-lg" name="password_confirmation" onChange={inputsHandler} required placeholder="Enter your password" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Button btn_text="Register" isLoading={loading} />
                                        </div>
                                    </form>
                                    <div className="form-note-s2 text-center pt-4"> Already have an account? <NextLink href="/"><a><strong>Sign in instead</strong></a></NextLink>
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

export default Register;
