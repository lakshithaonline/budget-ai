// Expense model used throughout the frontend
export interface Expense {
    id: string; // Unique Firestore document ID
    title: string; // Title of the expense
    amount: number; // Total amount of the expense
    dueDate: string; // Due date for payment
    advancePaid: number; // Advance payment made
}

// Type used when adding or editing expenses
export type ExpenseInput = Omit<Expense, "id">; // Same as Expense, without the "id"
