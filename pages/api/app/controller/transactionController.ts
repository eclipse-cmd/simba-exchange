import { TransactionInput, User } from "types";
import { Transaction, Wallet } from "../model";
import { exchange_currency, exchange_rate, randomString } from "../_util";

export const
    getTransaction = async (perPage: any, page: any, user: User) => {

        const transaction = await Transaction
            .find({ $or: [{ sender_id: user._id }, { receiver_id: user._id }] })
            .select([])
            .limit(perPage)
            .skip(perPage * page)
            .sort({ created_at: 'desc' })
            .exec();

        let count = await Transaction.find({ $or: [{ sender_id: user._id }, { receiver_id: user._id }] }).count().exec();
        if (count != 0) {
            count = count > perPage ? Math.ceil(count / perPage) : 1;
        }

        return {
            transaction,
            page,
            pages: count
        };
    },

    addTransaction = async (data: TransactionInput) => {
        //validation
        if (!data.receiver_id || !data.amount || !data.source_currency || !data.target_currency) {
            return {
                status: false,
                message: "all input fields are required"
            };
        }

        if (data.user._id == data.receiver_id) {
            return {
                status: false,
                message: "you cannot transfer money to your own wallet"
            };
        }

        const _id = data.user._id.toString();
        const wallet = await Wallet.findOne({
            owner_id: _id,
            type: data.source_currency
        }).exec();

        if (!wallet) {
            return {
                status: false,
                message: "wallet not found"
            };
        }

        //check wallet balance
        const balance = parseFloat(wallet.amount);
        const amount = parseFloat(data.amount);
        if (balance < amount) {
            return {
                status: false,
                message: "insufficient wallet balance"
            };
        }

        //check if they have same wallet
        const currency = data.source_currency === data.target_currency;
        if (currency) {
            //debit sender wallet 
            try {
                const debited = await Wallet.findOneAndUpdate(
                    {
                        owner_id: _id,
                        type: data.source_currency
                    },
                    {
                        amount: (balance - amount).toString()
                    }
                ).exec();

                if (debited) {
                    //get the target wallet
                    const target_wallet = await Wallet.findOne(
                        {
                            owner_id: data.receiver_id,
                            type: data.target_currency
                        }
                    ).exec();

                    const target_wallet_balance = parseFloat(target_wallet.amount);

                    const balance_update = await Wallet.findOneAndUpdate(
                        { _id: target_wallet._id },
                        { amount: (target_wallet_balance + amount).toString() },
                        { new: true }
                    );
                    //if reciever has been credited
                    if (balance_update) {
                        const transaction = await Transaction.create({
                            sender_id: _id,
                            receiver_id: data.receiver_id,
                            amount: data.amount,
                            type: -1,
                            source_currency: data.source_currency,
                            target_currency: data.target_currency,
                            refrence: randomString(),
                        });

                        if (transaction) {
                            return {
                                status: true,
                            };
                        } else {
                            return {
                                status: false,
                                message: "transaction successfull, but trasaction log not create yet!"
                            };
                        }
                    }
                }
            } catch (error) {
                return {
                    status: false,
                    message: "wallet update failed",
                    error
                };
            }
        } else {
            //if they are using differenct wallet, use the exchange rates
            const base_currency = data.source_currency;
            const target_currency = data.target_currency as string;

            if (base_currency === "EURO") {
                //check if there is an exchanged amount to usd or ngn
                const exchange_amount_rate = exchange_currency(target_currency);
                if (exchange_amount_rate) {
                    let amount_to_be_credited = amount * exchange_amount_rate;
                    try {
                        const debited = await Wallet.findOneAndUpdate(
                            {
                                owner_id: _id,
                                type: "EURO"
                            },
                            { amount: (balance - amount).toFixed(5) },
                            { new: true }
                        ).exec();
                        //find and update the target wallet
                        if (debited) {
                            const target_wallet = await Wallet.findOne(
                                {
                                    owner_id: data.receiver_id,
                                    type: data.target_currency
                                }
                            ).exec();

                            //get the current wallet balance
                            const target_wallet_balance = parseFloat(target_wallet.amount);

                            //update the current wallet balance
                            const balance_update = await Wallet.findOneAndUpdate(
                                { _id: target_wallet._id },
                                { amount: (target_wallet_balance + amount_to_be_credited).toString() },
                                { new: true }
                            );

                            //if reciever has been credited
                            if (balance_update) {
                                const transaction = await Transaction.create({
                                    sender_id: _id,
                                    receiver_id: data.receiver_id,
                                    amount: data.amount,
                                    type: -1,
                                    source_currency: data.source_currency,
                                    target_currency: data.target_currency,
                                    refrence: randomString(),
                                });

                                if (transaction) {
                                    return {
                                        status: true,
                                    };
                                } else {
                                    return {
                                        status: false,
                                        message: "transaction successfull, but trasaction log not create yet!"
                                    };
                                }
                            }
                        }
                    } catch (error) {
                        return {
                            status: false,
                            message: "transaction failed",
                            error
                        };
                    }
                }
            }

            if (base_currency === "USD") {
                const target_amount = data.target_currency === "EURO" ?
                    amount / exchange_rate().USD :
                    (amount / exchange_rate().USD) * exchange_rate().NGN;

                //check if there is an exchanged amount to usd or ngn
                if (target_amount) {
                    try {
                        const debited = await Wallet.findOneAndUpdate(
                            {
                                owner_id: _id,
                                type: "USD"
                            },
                            { amount: (balance - amount).toFixed(5) },
                            { new: true }
                        ).exec();
                        //find and update the target wallet
                        if (debited) {
                            const target_wallet = await Wallet.findOne(
                                {
                                    owner_id: data.receiver_id,
                                    type: data.target_currency
                                }
                            ).exec();

                            //get the current wallet balance
                            const target_wallet_balance = parseFloat(target_wallet.amount);

                            //update the current wallet balance
                            const balance_update = await Wallet.findOneAndUpdate(
                                { _id: target_wallet._id },
                                { amount: (target_wallet_balance + target_amount).toString() },
                                { new: true }
                            );

                            //if reciever has been credited
                            if (balance_update) {
                                const transaction = await Transaction.create({
                                    sender_id: _id,
                                    receiver_id: data.receiver_id,
                                    amount: data.amount,
                                    type: -1,
                                    source_currency: data.source_currency,
                                    target_currency: data.target_currency,
                                    refrence: randomString(),
                                });

                                if (transaction) {
                                    return {
                                        status: true,
                                    };
                                } else {
                                    return {
                                        status: false,
                                        message: "transaction successfull, but trasaction log not create yet!"
                                    };
                                }
                            }
                        }
                    } catch (error) {
                        return {
                            status: false,
                            message: "transaction failed",
                            error
                        };
                    }
                }
            }

            if (base_currency === "NGN") {
                const target_amount = data.target_currency === "EURO" ?
                    amount / exchange_rate().NGN :
                    (amount / exchange_rate().NGN) * exchange_rate().USD;

                //check if there is an exchanged amount to usd or ngn
                if (target_amount) {
                    try {
                        const debited = await Wallet.findOneAndUpdate(
                            {
                                owner_id: _id,
                                type: "NGN"
                            },
                            { amount: (balance - amount).toFixed(5) },
                            { new: true }
                        ).exec();
                        //find and update the target wallet
                        if (debited) {
                            const target_wallet = await Wallet.findOne(
                                {
                                    owner_id: data.receiver_id,
                                    type: data.target_currency
                                }
                            ).exec();

                            //get the current wallet balance
                            const target_wallet_balance = parseFloat(target_wallet.amount);

                            //update the current wallet balance
                            const balance_update = await Wallet.findOneAndUpdate(
                                { _id: target_wallet._id },
                                { amount: (target_wallet_balance + target_amount).toString() },
                                { new: true }
                            );

                            //if reciever has been credited
                            if (balance_update) {
                                const transaction = await Transaction.create({
                                    sender_id: _id,
                                    receiver_id: data.receiver_id,
                                    amount: data.amount,
                                    type: -1,
                                    source_currency: data.source_currency,
                                    target_currency: data.target_currency,
                                    refrence: randomString(),
                                });

                                if (transaction) {
                                    return {
                                        status: true,
                                    };
                                } else {
                                    return {
                                        status: false,
                                        message: "transaction successfull, but trasaction log not create yet!"
                                    };
                                }
                            }
                        }
                    } catch (error) {
                        return {
                            status: false,
                            message: "transaction failed",
                            error
                        };
                    }
                }
            }

            return {
                status: false,
                message: "transaction failed"
            };
        }
    };
