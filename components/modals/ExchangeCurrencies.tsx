import Button from "@components/Button";
import { post } from "@store/actions";
import { successToast } from "@store/helper";
import React, { useState } from 'react';
import { Wallet, User } from "types";

interface TransactionProps {
    wallets: [Wallet] | null,
    users: [User] | null,
    rate: any;
}

const Exchange: React.FC<TransactionProps> = ({ wallets, users, rate }) => {
    const
        currencies = ['USD', 'EURO', 'NGN'],
        [value, setValue] = useState({ source_wallet: undefined }),
        [loader, setloader] = useState<boolean>(false),

        handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue({ ...value, [e.target.name]: e.target.value });
        },

        handleSelect: React.ChangeEventHandler<HTMLSelectElement> | undefined = (e: any) => {
            setValue({ ...value, [e.target.name]: e.target.value });
        },

        handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setloader(true);
            // console.log(value);
            // return;
            const response = await post('user/wallet', value);
            console.log(response);
            if (response) {
                setloader(false);
                successToast("wallet swapped successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setloader(false);
            }
        };

    return (
        <div className="modal fade" id="modalFormExchange">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Swap currency between your wallets</h5>
                        <a href="#" className="close" data-dismiss="modal" aria-label="Close">
                            <em className="icon ni ni-cross"></em>
                        </a>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className="form-validate is-alter">
                            <div className='form-group'>
                                <label className='form-label'>Select source wallet</label>
                                <div className='form-control-wrap wrap-select'>
                                    <select className='data-select wrap-select custom-select' onChange={handleSelect} name='source_wallet'>
                                        <option>Select an option</option>
                                        {wallets?.map((wallet: Wallet) => (
                                            <option key={wallet._id} value={wallet.type}>
                                                {wallet.type} ({parseFloat(wallet.amount).toFixed(2)})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Select target wallet</label>
                                <div className='form-control-wrap wrap-select'>
                                    <select className='data-select wrap-select custom-select' onChange={handleSelect} name='target_wallet'>
                                        <option>Select an option</option>
                                        {
                                            currencies.map((c, index) => (
                                                c != value.source_wallet ?
                                                    <option key={index} value={c}>{c}</option>
                                                    :
                                                    null
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="pay-amount">Amount</label>
                                <div className="form-control-wrap">
                                    <input type="text" className="form-control" onChange={handleChange} name="amount" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Exchange Rate</label>
                                <ul className="custom-control-group g-3 align-center">
                                    {
                                        rate.status === true ?
                                            (<>
                                                <li>
                                                    <div className="">
                                                        1 <small>EURO</small> = {rate.data.USD} <small>USD</small>   ,
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="">
                                                        1 <small>EURO</small> = {rate.data.NGN} <small>NGN</small>
                                                    </div>
                                                </li>
                                            </>)
                                            :
                                            (<li>
                                                Getting rates...
                                            </li>)
                                    }

                                </ul>
                            </div>
                            <div className="form-group">
                                <Button btn_text="Swap wallet" isLoading={loader} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Exchange;