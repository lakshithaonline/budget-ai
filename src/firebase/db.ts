import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import {Expense, ExpenseInput} from "../models/expense";


// Reference to the "expenses" collection
const expensesCollection = collection(db, "expenses");

// Add Expense
export const addExpense = async (expense: ExpenseInput): Promise<void> => {
    await addDoc(expensesCollection, expense);
};

// Get All Expenses
export const getExpenses = async (): Promise<Expense[]> => {
    const snapshot = await getDocs(expensesCollection);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Expense[]; // Explicitly cast Firestore data to Expense
};

// Delete an Expense
export const deleteExpense = async (id: string): Promise<void> => {
    const expenseDoc = doc(db, "expenses", id);
    await deleteDoc(expenseDoc);
};
