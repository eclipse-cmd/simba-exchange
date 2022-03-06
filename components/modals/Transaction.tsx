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

const Transaction: React.FC<TransactionProps> = ({ wallets, users, rate }) => {
    const
        [value, setValue] = useState({}),
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
            const response = await post('user/transaction', value);
            if (response) {
                setloader(false);
                successToast("Transaction successfull");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setloader(false);
            }

        };

    return (
        <div className="modal fade" id="modalForm">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create a new transaction</h5>
                        <a href="#" className="close" data-dismiss="modal" aria-label="Close">
                            <em className="icon ni ni-cross"></em>
                        </a>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className="form-validate is-alter">
                            <div className='form-group'>
                                <label className='form-label'>Select source wallet</label>
                                <div className='form-control-wrap wrap-select'>
                                    <select className='data-select wrap-select custom-select' required onChange={handleSelect} name='source_currency'>
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
                                    <select className='data-select wrap-select custom-select' required onChange={handleSelect} name='target_currency'>
                                        <option>Select an option</option>
                                        <option value="USD">USD</option>
                                        <option value="EURO">EURO</option>
                                        <option value="NGN">NGN</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="pay-amount">Amount</label>
                                <div className="form-control-wrap">
                                    <input type="text" className="form-control" required onChange={handleChange} name="amount" />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Select user</label>
                                <div className='form-control-wrap wrap-select'>
                                    <select className='data-select wrap-select custom-select text-capitalize' required onChange={handleSelect} name='receiver_id'>
                                        <option>Select an option</option>
                                        {users?.map((user: User) => (
                                            <option key={user._id} className="text-capitalize" value={user._id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
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
                                <Button btn_text="Add transaction" isLoading={loader} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Transaction;