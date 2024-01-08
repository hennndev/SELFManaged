'use server'
import { revalidatePath } from "next/cache"
import { connectDB } from "@/app/lib/utils/mongoose"
import { UserData } from "../models/user-data.model"
import { Transaction } from "@/app/lib/models/transaction.model"
import { ExpenseManager } from "@/app/lib/models/expense-manager.model"

export const getExpenseManagers = async (userId: string) => {
    await connectDB()
    try {
        const data: any = await UserData.findOne({user_id: userId}).select('_id user_id expense_managers').lean().populate({
            path: 'expense_managers',
            model: ExpenseManager,
            select: '-updatedAt -user -createdAt -__v -transactions'
        })
        const transformedExpenseManager = data.expense_managers.map((obj: ExpenseManagerDataTypes) => {
            return {
                ...obj,
                _id: obj._id.toString()
            }
        })
        if(data?.expense_managers.length > 0) {
            return {
                expense_managers: transformedExpenseManager
            }
        } else {
            throw new Error('Expense managers has not yet created')
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const getExpenseManager = async (expenseManagerId: string) => {
    await connectDB()
    try {
        const expenseManager: any = await ExpenseManager.findOne({_id: expenseManagerId}).select('-updatedAt -createdAt -__v').lean().populate({
            path: 'transactions',
            model: Transaction,
            select: '-updatedAt -createdAt -__v'
        })
        const transformedData = {
            ...expenseManager,
            _id: expenseManager._id.toString(),
            transactions: expenseManager.transactions.map((obj: TransactionDataTypes) => {
                return {
                    ...obj,
                    _id: obj._id.toString()
                }
            })
        } as ExpenseManagerDataTypes
        if(!expenseManager) {
            throw new Error('Expense manager not existed')
        } else {
            return {
                expenseManager: transformedData
            }
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const addExpenseManager = async (userId: string, expenseManager: ExpenseManagerTypes) => {
    await connectDB()
    try {
        const newExpenseManager = await ExpenseManager.create({
            user: userId,
            title: expenseManager.expenseManagerTitle,
            currency: expenseManager.expenseManagerCurrency,
            description: expenseManager.expenseManagerDescription,
            balance: 0,
        })
        await UserData.updateOne({user_id: userId}, {
            $push: {expense_managers: newExpenseManager._id}
        })
        revalidatePath('/dashboard/expense-managers')
        return true
    } catch (error: any) {
        return { 
            error: error.message
        }
    }
}
export const editExpenseManager = async (expenseManagerId: string, updatedExpenseManager: ExpenseManagerTypes) => {
    await connectDB()
    try {
        await ExpenseManager.updateOne({_id: expenseManagerId}, {
            $set: {
                title: updatedExpenseManager.expenseManagerTitle,
                currency: updatedExpenseManager.expenseManagerCurrency,
                description: updatedExpenseManager.expenseManagerDescription
            }
        })
        revalidatePath('/dashboard/expense-managers')
        // revalidatePath('/dashboard/expense-managers/expense-manager/[expenseManagerId]', 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}
export const deleteExpenseManager = async (userId: string, expenseManagerId: string) => {
    await connectDB()
    try {
        await ExpenseManager.deleteOne({_id: expenseManagerId})
        await UserData.updateOne({user_id: userId}, {
            $pull: {expense_managers: expenseManagerId}
        })
        revalidatePath('/dashboard/expense-managers')
        // revalidatePath('/dashboard/expense-managers')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

