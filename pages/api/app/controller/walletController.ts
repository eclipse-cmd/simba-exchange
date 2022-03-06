import { WalletSwapInput } from "types";
import { Transaction, Wallet } from "../model";
import { exchange_currency, exchange_rate, randomString } from "../_util";

export const
    getWallet = async (user: any) => {
        const wallets = await Wallet.find(
            { owner_id: user._id }
        ).exec();
        if (wallets.length > 0) {
            return wallets;
        }
        return false;
    },

    exchangeWallet = async (data: WalletSwapInput) => {
        if (!data.source_wallet || !data.target_wallet || !data.amount) {
            return {
                status: false,
                message: "all input fields are required"
            };
        }

        if (data.source_wallet == data.target_wallet) {
            return {
                status: false,
                message: "cannot transfer from same wallet"
            };
        }

        const wallet = await Wallet.findOne({
            owner_id: data.user._id,
            type: data.source_wallet
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
                message: "insufficient balance"
            };
        }

        const calculated_amount = exchange_currency(data.target_wallet);
        //if source wallet = euro
        if (data.source_wallet === "EURO") {
            if (calculated_amount) {
                //debit source wallet 
                const debit_source_wallet = await Wallet.findOneAndUpdate(
                    {
                        owner_id: data.user._id,
                        type: data.source_wallet
                    },
                    { amount: (balance - amount).toString() },
                    { new: true }
                );
                //credit target wallet
                if (debit_source_wallet) {
                    const wallet_to_be_updated = await Wallet.findOne({
                        owner_id: data.user._id,
                        type: data.target_wallet
                    }).exec();

                    if (wallet_to_be_updated) {
                        const balance = parseFloat(wallet_to_be_updated.amount);
                        const updated_wallet = await Wallet.findOneAndUpdate(
                            {
                                owner_id: data.user._id,
                                type: data.target_wallet
                            },
                            {
                                amount: (balance + (calculated_amount * amount)).toString()
                            },
                            { new: true }
                        );
                        //store transaction if successful
                        if (updated_wallet) {
                            try {
                                const new_transaction = await Transaction.create({
                                    receiver_id: data.user._id,
                                    sender_id: data.user._id,
                                    amount: amount.toString(),
                                    type: -1,
                                    source_currency: data.source_wallet,
                                    target_currency: data.target_wallet,
                                    refrence: randomString(),
                                    created_at: new Date(),
                                    updated_at: new Date()
                                });
                                if (new_transaction) {
                                    return {
                                        status: true,
                                        message: "currency swapped successfully"
                                    };
                                }
                            } catch (error) {
                                return {
                                    status: false,
                                    error
                                };
                            }

                        }
                    }
                }
            }
            return {
                status: false,
                message: "transaction failed"
            };
        }

        //if source wallet = usd
        if (data.source_wallet === "USD") {
            //if target wallet = euro
            let target_amount = data.target_wallet === "EURO" ?
                amount / exchange_rate().USD :
                (amount / exchange_rate().USD) * exchange_rate().NGN;

            //debit source wallet
            const debit_source_wallet = await Wallet.findOneAndUpdate(
                {
                    owner_id: data.user._id,
                    type: "USD"
                },
                { amount: (balance - amount).toString() },
                { new: true }
            );

            //credit target wallet
            if (debit_source_wallet) {
                const wallet_to_be_updated = await Wallet.findOne({
                    owner_id: data.user._id,
                    type: data.target_wallet
                }).exec();

                if (wallet_to_be_updated) {
                    const balance = parseFloat(wallet_to_be_updated.amount);
                    const updated_wallet = await Wallet.findOneAndUpdate(
                        {
                            owner_id: data.user._id,
                            type: data.target_wallet
                        },
                        {
                            amount: (balance + target_amount).toString()
                        },
                        { new: true }
                    );
                    //store transaction if successful
                    if (updated_wallet) {
                        try {
                            const new_transaction = await Transaction.create({
                                receiver_id: data.user._id,
                                sender_id: data.user._id,
                                amount: amount.toString(),
                                type: -1,
                                source_currency: data.source_wallet,
                                target_currency: data.target_wallet,
                                refrence: randomString(),
                                created_at: new Date(),
                                updated_at: new Date()
                            });
                            if (new_transaction) {
                                return {
                                    status: true,
                                    message: "currency swapped successfully"
                                };
                            }
                        } catch (error) {
                            return {
                                status: false,
                                error
                            };
                        }

                    }
                }
            }

            return {
                status: false,
                message: "transaction failed"
            };
        }

        //if source wallet = usd
        if (data.source_wallet === "NGN") {
            //if target wallet = euro
            let target_amount = data.target_wallet === "EURO" ?
                amount / exchange_rate().NGN :
                (amount / exchange_rate().NGN) * exchange_rate().USD;

            //debit source wallet
            const debit_source_wallet = await Wallet.findOneAndUpdate(
                {
                    owner_id: data.user._id,
                    type: "NGN"
                },
                { amount: (balance - amount).toString() },
                { new: true }
            );

            //credit target wallet
            if (debit_source_wallet) {
                const wallet_to_be_updated = await Wallet.findOne({
                    owner_id: data.user._id,
                    type: data.target_wallet
                }).exec();

                if (wallet_to_be_updated) {
                    const balance = parseFloat(wallet_to_be_updated.amount);
                    const updated_wallet = await Wallet.findOneAndUpdate(
                        {
                            owner_id: data.user._id,
                            type: data.target_wallet
                        },
                        {
                            amount: (balance + target_amount).toString()
                        },
                        { new: true }
                    );
                    //store transaction if successful
                    if (updated_wallet) {
                        try {
                            const new_transaction = await Transaction.create({
                                receiver_id: data.user._id,
                                sender_id: data.user._id,
                                amount: amount.toString(),
                                type: -1,
                                source_currency: data.source_wallet,
                                target_currency: data.target_wallet,
                                refrence: randomString(),
                                created_at: new Date(),
                                updated_at: new Date()
                            });
                            if (new_transaction) {
                                return {
                                    status: true,
                                    message: "currency swapped successfully"
                                };
                            }
                        } catch (error) {
                            return {
                                status: false,
                                error
                            };
                        }

                    }
                }
            }

            return {
                status: false,
                message: "transaction failed"
            };
        }
    };
