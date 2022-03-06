import DashboardLayout from "@components/DashboardLayout";
import Exchange from "@components/modals/ExchangeCurrencies";
import Transaction from "@components/modals/Transaction";
import { CircularProgress } from "@material-ui/core";
import { get } from "@store/actions";
import { actionCreator } from "@store/reducer";
import { spawn } from "child_process";
import moment from "moment";
import { AppContext } from "pages/_app";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { TransactionResponse, Wallet } from "types";

interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = ({ }) => {
    const store = useContext(AppContext);
    const token = useMemo(() => store.state.token, [store]);
    const auth = useMemo(() => store.state.auth, [store]);
    const users = useMemo(() => store.state.users, [store]);
    const wallets = useMemo(() => store.state.wallet, [store.state.wallet]);
    const
        [isLoading, setIsLoading] = useState<boolean>(true),
        [loadingWallet, setloadingWallet] = useState<boolean>(true),
        [rate, setRates] = useState({ status: false, data: { USD: undefined, NGN: undefined } }),
        [transaction, setTransaction] = useState({ data: [], page: 0, pages: 0 }),
        [pagesBuffer, setPagesBuffer] = useState<number[]>([]),

        goToTablePage = (pageValue: string | number) => {
            console.log(pageValue);
        },
        //getUsers
        getUsers = async () => {
            const response = await get('user');
            if (response?.status) {
                const result = response.data as unknown as [];
                store.dispatch({
                    type: actionCreator.SET_USERS,
                    payload: result
                });
            }
        },
        getWallet = async () => {
            const response = await get('user/wallet');
            if (response?.status) {
                const result = response.data as unknown as [];
                store.dispatch({
                    type: actionCreator.SET_WALLET,
                    payload: result
                });
                setloadingWallet(false);
            }
        },
        //get trasactions
        getTransactions = async () => {
            const response = await get('user/transaction');
            if (response?.status) {
                const result = response.data as unknown as TransactionResponse;
                setTransaction({ ...result, data: result.transaction });
                setIsLoading(false);
                //get the number of pages
                if (transaction.pages > 0) {
                    let count = 0;
                    let buffer = [];
                    for (let i = 0; i < transaction.pages; i++) {
                        count += 1;
                        buffer.push(count);
                    }
                    setPagesBuffer(buffer);
                }
            }
            const rate = await get('exchange-rate');
            if (rate?.status) {
                let result = rate.data as any;
                result = result.rates;
                setRates({ status: true, data: result });
            }
        };

    useEffect(() => {
        if (token) {
            getTransactions();
            getWallet();
            getUsers();
        }
    }, [token]);


    return (
        <DashboardLayout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        <div className="nk-block-head nk-block-head-sm">
                            <div className="nk-block-between">
                                <div className="nk-block-head-content">
                                    <h3 className="nk-block-title page-title text-capitalize">Hello {auth?.name}</h3>
                                    <div className="nk-block-des text-soft">
                                        <p>Welcome to your dashboard.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* wallet */}
                        <div className="row g-s mb-4">
                            {
                                loadingWallet === true ?
                                    (
                                        //loding wallet
                                        <>
                                            <div className="col-md-4">
                                                <div className="card card-bordered  card-full">
                                                    <div className="card-inner">
                                                        <div className="card-title-group align-start mb-0">
                                                            <div className="card-title">
                                                                <h6 className="subtitle">Balance in account</h6>
                                                            </div>
                                                            <div className="card-tools">
                                                                <em className="card-hint icon ni ni-help-fill" data-toggle="tooltip" data-placement="left" title="" data-original-title="Total Balance in Account"></em>
                                                            </div>
                                                        </div>
                                                        <div className="card-amount">
                                                            <span className="amount"> Loading.. <span className="currency currency-usd"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-bordered  card-full">
                                                    <div className="card-inner">
                                                        <div className="card-title-group align-start mb-0">
                                                            <div className="card-title">
                                                                <h6 className="subtitle">Balance in account</h6>
                                                            </div>
                                                            <div className="card-tools">
                                                                <em className="card-hint icon ni ni-help-fill" data-toggle="tooltip" data-placement="left" title="" data-original-title="Total Balance in Account"></em>
                                                            </div>
                                                        </div>
                                                        <div className="card-amount">
                                                            <span className="amount"> Loading.. <span className="currency currency-usd"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-bordered  card-full">
                                                    <div className="card-inner">
                                                        <div className="card-title-group align-start mb-0">
                                                            <div className="card-title">
                                                                <h6 className="subtitle">Balance in account</h6>
                                                            </div>
                                                            <div className="card-tools">
                                                                <em className="card-hint icon ni ni-help-fill" data-toggle="tooltip" data-placement="left" title="" data-original-title="Total Balance in Account"></em>
                                                            </div>
                                                        </div>
                                                        <div className="card-amount">
                                                            <span className="amount"> Loading.. <span className="currency currency-usd"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) :
                                    (
                                        wallets?.map((wallet: Wallet) => (
                                            <div className="col-md-4" data-toggle="tooltip" data-placement="top" title="click here to exchange currencies" data-original-title="" key={wallet._id}>
                                                <div className="card card-bordered card-full cursor-pointer" data-toggle="modal" data-target="#modalFormExchange">
                                                    <div className="card-inner">
                                                        <div className="card-title-group align-start mb-0">
                                                            <div className="card-title">
                                                                <h6 className="subtitle">Balance in {wallet.type} wallet</h6>
                                                            </div>
                                                            <div className="card-tools">
                                                                <em className="card-hint icon ni ni-help-fill" data-toggle="tooltip" data-placement="left" title="" data-original-title="Total Balance in Account"></em>
                                                            </div>
                                                        </div>
                                                        <div className="card-amount">
                                                            <span className="amount"> {parseFloat(wallet.amount).toFixed(2)} <span className="currency currency-usd">{wallet.type}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                            }
                        </div>
                        {/* transaction */}
                        <div className='nk-block recent-transactions'>
                            <div className='card card-bordered card-stretch'>
                                <div className='card-inner-group'>
                                    <div className='card-inner'>
                                        <div className='card-title-group'>
                                            <div className='card-title'>
                                                <h5 className='title'>Recent Transaction</h5>
                                            </div>
                                            <ul className="nk-block-tools g-3">
                                                <li className="nk-block-tools-opt">
                                                    <div className="drodown">
                                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalForm">
                                                            <em className="icon ni ni-plus"></em>
                                                            <span>NEW TRANSACTION</span>
                                                        </button>
                                                        {/* <a href="#addtransaction" className="dropdown-toggle btn btn-icon btn-primary px-3"></a> */}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='card-inner p-0'>
                                        <table className='table table-tranx'>
                                            {
                                                isLoading &&
                                                (
                                                    <div className='loader-class-centered dd-table'>
                                                        <CircularProgress disableShrink style={{ color: '#0971fe' }} />
                                                    </div>
                                                )
                                            }
                                            {
                                                isLoading === false && transaction.data?.length > 0 ?
                                                    (
                                                        <>
                                                            <thead>
                                                                <tr className='tb-tnx-head'>
                                                                    <th>
                                                                        <span>ID</span>
                                                                    </th>
                                                                    <th>
                                                                        <span>From</span>
                                                                    </th>
                                                                    <th>
                                                                        <span>To</span>
                                                                    </th>
                                                                    <th>
                                                                        <span>Amount</span>
                                                                    </th>
                                                                    <th>
                                                                        <span>Currency</span>
                                                                    </th>
                                                                    <th>
                                                                        <span>Created At</span>
                                                                    </th>
                                                                    <th>
                                                                        <span>Updated At</span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    transaction.data.map((transaction: any, index: number) => (
                                                                        <tr className='tb-tnx-item' key={index}>
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td className="text-capitalize">
                                                                                <span>
                                                                                    {
                                                                                        auth?._id == transaction?.sender_id ?
                                                                                            "you"
                                                                                            :
                                                                                            users?.filter((user) => user._id == transaction?.sender_id)[0]?.name
                                                                                    }
                                                                                    {
                                                                                        transaction?.sender_id == null && "Not given"
                                                                                    }
                                                                                </span>
                                                                            </td>
                                                                            <td className="text-capitalize">
                                                                                {
                                                                                    auth?._id == transaction?.receiver_id ?
                                                                                        "you"
                                                                                        :
                                                                                        users?.filter((user) => user._id == transaction.receiver_id)[0]?.name
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    transaction.type == "-1" && auth?._id == transaction?.receiver_id ?
                                                                                        (<span><span className="text-success"><b>+</b>{transaction.amount}</span> <small>{transaction.source_currency}</small></span>)
                                                                                        :
                                                                                        (<span><span className="text-danger"> <b>-</b> {transaction.amount}</span> <small>{transaction.source_currency}</small></span>)
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    transaction?.sender_id == transaction?.receiver_id ?
                                                                                        (
                                                                                            <span>{transaction.source_currency + ' -> ' + transaction.target_currency}</span>
                                                                                        )
                                                                                        :
                                                                                        (
                                                                                            (
                                                                                                auth?._id == transaction?.sender_id ?
                                                                                                    transaction.source_currency
                                                                                                    :
                                                                                                    transaction.target_currency
                                                                                            )
                                                                                        )
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {moment(transaction.created_at).format('MMMM Do YYYY, h:mm')}
                                                                            </td>
                                                                            <td>
                                                                                {moment(transaction.updated_at).format('MMMM Do YYYY, h:mm')}
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </>
                                                    )
                                                    : null
                                            }
                                            {
                                                isLoading === false && transaction.data?.length < 1 ?
                                                    (
                                                        <>
                                                            <div className='loader-class-centered dd-table' style={{ minHeight: "10vh" }}>
                                                                No recent transaction
                                                            </div>
                                                        </>
                                                    )
                                                    : null
                                            }
                                        </table>
                                    </div>
                                    <div className='card-inner d-none'>
                                        <ul className='pagination justify-content-center justify-content-md-start'>
                                            <li className='page-item'>
                                                <button type="button" className={`page-link ${transaction.page === 1 ? 'disabled' : ''}`} onClick={() => goToTablePage('prev')}>
                                                    Prev
                                                </button>
                                            </li>
                                            {
                                                pagesBuffer?.length > 0 && pagesBuffer?.map((page: any) => (
                                                    <li className={`page-item ${page === (transaction.page + 1) ? 'active' : ''}`} key={page}>
                                                        <button type="button" className='page-link' onClick={() => goToTablePage(page)}>
                                                            {page}
                                                        </button>
                                                    </li>
                                                ))
                                            }
                                            <li className='page-item'>
                                                <button type="button" className={`page-link ${transaction.page === transaction.pages ? 'disabled' : ''}`} onClick={() => goToTablePage('next')}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Modal Form */}
            <Transaction users={users} wallets={wallets} rate={rate} />
            <Exchange users={users} wallets={wallets} rate={rate} />
        </DashboardLayout>
    );
};

export default Dashboard;