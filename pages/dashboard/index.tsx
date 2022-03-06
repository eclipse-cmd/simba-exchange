import DashboardLayout from "@components/DashboardLayout";
import { CircularProgress } from "@material-ui/core";
import { get } from "@store/actions";
import React, { useEffect, useState } from 'react';
import { TransactionResponse } from "types";

interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = ({ }) => {
    const
        [transaction, setTransaction] = useState({ data: [], page: 0, pages: 0 }),
        [isLoading, setIsLoading] = useState<boolean>(true),
        [pagesBuffer, setPagesBuffer] = useState<number[]>([]),


        goToTablePage = (pageValue: string | number) => {
            console.log(pageValue);
            // const getPaged = async (page: string | number | true) => {
            //     return await dispatch(getUnset(`transactions/cryptos?page=${page}`));
            // };
            // let page: number | string | boolean = pageValue;
            // if (pageValue === 'next') {
            //     page = transactions.current_page !== transactions.last_page ? transactions.current_page + 1 : false;
            // }
            // if (pageValue === 'prev') {
            //     page = transactions.current_page !== 1 ? transactions.current_page - 1 : false;
            // }
            // if (page) {
            //     setIsLoadingTransaction(true);
            //     getPaged(page).then((response: any) => {
            //         setTransactions({
            //             ...response, links: response.links.filter((_: any, index: number) => (index !== 0 && index !== response.links.length - 1))
            //         });
            //         console.log(transactions);
            //         setIsLoadingTransaction(false);
            //     });
            // }
        };

    useEffect(() => {
        const getTransactions = async () => {
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
                    // console.log(buffer)
                    setPagesBuffer(buffer);
                }
            }
        };
        getTransactions();
    }, [get]);


    return (
        <DashboardLayout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        <div className="nk-block-head nk-block-head-sm">
                            <div className="nk-block-between">
                                <div className="nk-block-head-content">
                                    <h3 className="nk-block-title page-title">Hello Emmanuel</h3>
                                    <div className="nk-block-des text-soft">
                                        <p>Welcome to your dashboard.</p>
                                    </div>
                                </div>

                            </div>
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
                                            <div className='card-search search-wrap' data-search='search'>
                                                <div className='search-content'>
                                                    <a href='#default' className='search-back btn btn-icon toggle-search' data-target='search'>
                                                        <em className='icon ni ni-arrow-left'></em>
                                                    </a>
                                                    <input type='text' className='form-control form-control-sm border-transparent form-focus-none' placeholder='Quick search by order id' />
                                                    <button className='search-submit btn btn-icon'>
                                                        <em className='icon ni ni-search'></em>
                                                    </button>
                                                </div>
                                            </div>
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
                                                                        <span className='tb-tnx-total'>Currency</span>
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
                                                                            <td>
                                                                                {transaction.sender_id}
                                                                            </td>
                                                                            <td>
                                                                                {transaction.receiver_id}
                                                                            </td>
                                                                            <td>
                                                                                {transaction.amount}
                                                                            </td>
                                                                            <td>
                                                                                {transaction.target_currency}
                                                                            </td>
                                                                            <td>
                                                                                {transaction.created_at}
                                                                            </td>
                                                                            <td>
                                                                                {transaction.updated_at}
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
        </DashboardLayout>
    );
};

export default Dashboard;