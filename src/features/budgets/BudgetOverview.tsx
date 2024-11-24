import React, { useEffect, useState } from "react";
import { getExpenses } from "../../firebase/db";
import { Expense } from "../../models/expense";

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

            <h3>Expenses</h3>
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            <p><strong>{expense.title}</strong></p>
                            <p>Amount: {expense.amount} LKR</p>
                            <p>Advance Paid: {expense.advancePaid} LKR</p>
                            <p>Remaining: {expense.amount - expense.advancePaid} LKR</p>
                            <p>Due Date: {expense.dueDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses available</p>
            )}
        </div>
    );
};

export default BudgetOverview;
