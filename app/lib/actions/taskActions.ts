'use server'
import { Task } from "@/app/lib/models/task.model"
import { connectDB } from "@/app/lib/utils/mongoose"
import { Todo } from "../models/todo.model"
import { revalidatePath } from "next/cache"


export const addTask = async (userId: string, todoId: string, newTask: TaskTypes) => {
    await connectDB()
    try {
        const response = await Task.create({
            title: newTask.taskTitle,
            description: newTask.taskDescription,
            time: {
                time_start: newTask.taskTimeStart,
                time_end: newTask.taskTimeEnd
            },
            is_important: newTask.isImportant
        })
        if(response) {
            await Todo.updateOne({user: userId, todos: {$elemMatch: {_id: todoId}}}, {
                $push: {'todos.$.tasks': response._id}
            })
            revalidatePath('/dashboard/todo-list')
            return true
        }
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message
        }        
    }
}

export const editTask = async () => {
    await connectDB()
    try {
        
    } catch (error) {
        
    }
}

export const deleteTask = async () => {
    await connectDB()
    try {
        
    } catch (error) {
        
    }
}