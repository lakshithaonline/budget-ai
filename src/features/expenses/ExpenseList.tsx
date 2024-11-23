import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../firebase/db";
import {Expense} from "../../models/expense";


const ExpenseList: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getExpenses();
                setExpenses(data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            } finally {
                setLoading(false);
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
            {loading ? (
                <p>Loading expenses...</p>
            ) : expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id} className="expense-item">
                        <h3>{expense.title}</h3>
                        <p><strong>Total Amount:</strong> {expense.amount} LKR</p>
                        <p><strong>Advance Paid:</strong> {expense.advancePaid} LKR</p>
                        <p><strong>Remaining:</strong> {expense.amount - expense.advancePaid} LKR</p>
                        <p><strong>Due Date:</strong> {expense.dueDate}</p>
                        <button onClick={() => handleDelete(expense.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ExpenseList;
