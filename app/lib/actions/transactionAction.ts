'use server'
import { revalidatePath } from "next/cache"
import { connectDB } from "@/app/lib/utils/mongoose"
import { Transaction } from "@/app/lib/models/transaction.model"
import { ExpenseManager } from "@/app/lib/models/expense-manager.model"

export const addTransaction = async (expenseManagerId: string, values: TransactionTypes) => {
    await connectDB()
    try {
        const newTransaction = await Transaction.create({
            expense_manager_id: expenseManagerId,
            name: values.transactionName,
            type: values.transactionType,
            category: values.transactionCategory,
            description: values.transactionDescription,
            amount: values.transactionAmount,
            date: values.transactionDate,
            time: values.transactionTime
        })
        await ExpenseManager.updateOne({_id: expenseManagerId}, {
            $push: { transactions: newTransaction._id},
            $inc: { balance: newTransaction.type === 'income' ? +values.transactionAmount : -(+values.transactionAmount) }
        })
        revalidatePath('/dashboard/expense-managers/expense-manager/[expenseManagerId]', 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const editTransaction = async (expenseManagerId: string, transactionId: string, values: TransactionTypes) => {
    await connectDB()
    const transactionPreUpdate = await Transaction.findOne({_id: transactionId})
    try {       
        if(transactionPreUpdate.type !== values.transactionType && transactionPreUpdate.amount === +values.transactionAmount) {
            await ExpenseManager.updateOne({_id: expenseManagerId}, {
                $inc: {balance: 
                    values.transactionType === 'income' ? 
                        (values.transactionAmount + transactionPreUpdate.amount) : -(values.transactionAmount + transactionPreUpdate.amount)}
            })
        }
        if(transactionPreUpdate.amount !== +values.transactionAmount && transactionPreUpdate.type === values.transactionType) {
            await ExpenseManager.updateOne({_id: expenseManagerId}, {
                $inc: {balance: 
                    values.transactionType === 'income' ? 
                        transactionPreUpdate.amount > +values.transactionAmount ? 
                            -(transactionPreUpdate.amount - +values.transactionAmount) 
                            : 
                            transactionPreUpdate.amount < +values.transactionAmount ?
                                +values.transactionAmount - transactionPreUpdate.amount  : 0  
                        : 
                        transactionPreUpdate.amount < +values.transactionAmount ?
                            -(+values.transactionAmount - transactionPreUpdate.amount) 
                            : 
                            transactionPreUpdate.amount > +values.transactionAmount ?
                               transactionPreUpdate.amount - +values.transactionAmount : 0
                }
            })
        }
        if(transactionPreUpdate.amount !== +values.transactionAmount && transactionPreUpdate.type !== values.transactionType) {
            await ExpenseManager.updateOne({_id: expenseManagerId}, {
                $inc: {balance: 
                    values.transactionType === 'income' ?
                        transactionPreUpdate.amount > +values.transactionAmount ?
                            (transactionPreUpdate.amount + +values.transactionAmount)
                            :
                            transactionPreUpdate.amount < +values.transactionAmount ?
                                (transactionPreUpdate.amount + +values.transactionAmount) : 0
                        :
                        transactionPreUpdate.amount < +values.transactionAmount ?
                            -(transactionPreUpdate.amount + +values.transactionAmount)
                            :
                            transactionPreUpdate.amount > +values.transactionAmount ?
                                -(transactionPreUpdate.amount + +values.transactionAmount) : 0
                }
            })
        }
        await Transaction.updateOne({_id: transactionId}, {
            $set: {
                name: values.transactionName,
                type: values.transactionType,
                category: values.transactionCategory,
                description: values.transactionDescription,
                amount: values.transactionAmount,
                date: values.transactionDate,
                time: values.transactionTime
            }
        })
        revalidatePath('/dashboard/expense-managers/expense-manager/[expenseManagerId]', 'page')
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
        const transactionPreDelete = await Transaction.findOne({_id: transactionId})
        await ExpenseManager.updateOne({_id: expenseManagerId}, {
            $pull: {transactions: transactionId},
            $inc: {balance: transactionPreDelete.type === 'income' ? -transactionPreDelete.amount : transactionPreDelete.amount}
        })
        await Transaction.deleteOne({_id: transactionId})
        revalidatePath('/dashboard/expense-manager/expense-manager/[expenseManagerId]', 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}