import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../firebase/db";
import {Expense} from "../../models/expense";


const ExpenseList: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getExpenses();
                setExpenses(data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteExpense(id);
            setExpenses((prevExpenses) =>
                prevExpenses.filter((expense) => expense.id !== id)
            );
            alert("Expense deleted successfully!");
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert("Failed to delete expense.");
        }
    };

    return (
        <div>
            <h2>Expense List</h2>
            {expenses.length > 0 ? (
                expenses.map((expense) => (
                    <div key={expense.id}>
                        <h3>{expense.title}</h3>
                        <p>Total Amount: {expense.amount} LKR</p>
                        <p>Advance Paid: {expense.advancePaid} LKR</p>
                        <p>Remaining: {expense.amount - expense.advancePaid} LKR</p>
                        <p>Due Date: {expense.dueDate}</p>
                        <button onClick={() => handleDelete(expense.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No expenses found.</p>
            )}
        </div>
    );
};

export default ExpenseList;
