'use server'
import { connectDB } from "@/app/lib/utils/mongoose"
import { Transaction } from "@/app/lib/models/transaction.model"
import { ExpenseManager } from "../models/expense-manager.model"
import { revalidatePath } from "next/cache"

export const addTransaction = async (expenseManagerId: string, transaction: TransactionTypes) => {
    await connectDB()
    try {
        const newTransaction = await Transaction.create({
            name: transaction.transactionName,
            type: transaction.transactionType,
            category: transaction.transactionCategory,
            amount: transaction.transactionAmount,
            date: transaction.transactionDate,
            description: transaction.transactionDescription
        })
        await ExpenseManager.updateOne({_id: expenseManagerId}, {
            $push: { transactions: newTransaction._id}
        })
        revalidatePath('/dashboard/expense-managers/[expenseManagerId]', 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const editTransaction = async (transactionId: string, updatedTransaction: TransactionTypes) => {
    await connectDB()
    try {
        await Transaction.updateOne({_id: transactionId}, {
            $set: {
                name: updatedTransaction.transactionName,
                type: updatedTransaction.transactionType,
                category: updatedTransaction.transactionCategory,
                amount: updatedTransaction.transactionAmount,
                date: updatedTransaction.transactionDate,
                description: updatedTransaction.transactionDescription
            }
        })
        revalidatePath('/dashboard/expense-managers/[expenseManagerId]', 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const deleteTransaction = async (expenseManagerId: string, transactionId: string) => {
    await connectDB()
    try {
        await Transaction.deleteOne({_id: transactionId})
        await ExpenseManager.updateOne({_id: expenseManagerId}, {
            $pull: {transactions: transactionId}
        })
        revalidatePath('/dashboard/expense-manager/[expenseManagerId]')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}