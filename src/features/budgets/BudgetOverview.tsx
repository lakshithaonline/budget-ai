import React, { useEffect, useState } from "react";
import { getExpenses } from "../../firebase/db";
import {Expense} from "../../models/expense";

const BudgetOverview: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAdvancePaid, setTotalAdvancePaid] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedExpenses = await getExpenses();
            setExpenses(fetchedExpenses);

            const total = fetchedExpenses.reduce(
                (acc, expense) => ({
                    amount: acc.amount + expense.amount,
                    advancePaid: acc.advancePaid + expense.advancePaid,
                }),
                { amount: 0, advancePaid: 0 }
            );

            setTotalAmount(total.amount);
            setTotalAdvancePaid(total.advancePaid);
        };

        fetchData();
    }, []);

    const remainingBalance = totalAmount - totalAdvancePaid;

    return (
        <div>
            <h2>Budget Overview</h2>
            <p>Total Budget: {totalAmount} LKR</p>
            <p>Total Advance Paid: {totalAdvancePaid} LKR</p>
            <p>Remaining Balance: {remainingBalance} LKR</p>
        </div>
    );
};

export default BudgetOverview;
