import { Transaction, Wallet } from "../model";
import { randomString } from "../_util";

const userRegistrationListener = async (user_id: string) => {
    const id = user_id.toString();
    console.log(id);
    try {
        await Wallet.create({
            owner_id: id,
            amount: "1000",
            type: "USD"
        });
        await Wallet.create({
            owner_id: id,
            amount: "0",
            type: "EURO"
        });
        await Wallet.create({
            owner_id: id,
            amount: "0",
            type: "NGN"
        });

        await Transaction.create({
            receiver_id: id,
            refrence: randomString(20),
            amount: "1000",
            type: "-1",
            source_currency: "USD",
            target_currency: "USD",
            description: "initial transaction from the signup"
        });
    } catch (error) {
        console.log("Listener failed: ", error);
    }
};

export default userRegistrationListener;