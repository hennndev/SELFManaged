'use server'
import { revalidatePath } from "next/cache"
import { Task } from "@/app/lib/models/task.model"
import { Todo } from "@/app/lib/models/todo.model"
import { connectDB } from "@/app/lib/utils/mongoose"


export const addTask = async (userId: string, todoId: string, newTask: TaskTypes, isTodoPage?: boolean) => {
    await connectDB()
    try {
        const response = await Task.create({
            todoId: todoId,
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
            if(isTodoPage) {
                revalidatePath(`/dashboard/todo-list/todo/${todoId}`, 'page')
            } else {
                revalidatePath('/dashboard/todo-list')
            }
            return true
        }
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}

export const editTask = async (taskId: string, updatedTask: TaskTypes) => {
    await connectDB()
    try {
        const response = await Task.updateOne({_id: taskId}, {
            $set: {
                title: updatedTask.taskTitle,
                description: updatedTask.taskDescription,
                time: {
                    time_start: updatedTask.taskTimeStart,
                    time_end: updatedTask.taskTimeEnd
                },
                is_important: updatedTask.isImportant
            }
        })
        if(response) {
            revalidatePath('/dashboard/todo-list/todo/[todoId]')
            revalidatePath('/dashboard/todo-list')
            return true
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const deleteTask = async (taskId: string, userId: string, todoId: string) => {
    await connectDB()
    try {
        const response = await Task.deleteOne({_id: taskId})     
        if(response) {
            await Todo.updateOne({user: userId, todo: {$elemMatch: {_id: todoId}}}, {
                $pull: {'todos.$.tasks': taskId}
            })
            revalidatePath('/dashboard/todo-list/todo/[todoId]')
            revalidatePath('/dashboard/todo-list')
            return true
        }   
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const toggleTask = async (taskId: string, value: boolean) => {
    await connectDB()
    try {
        await Task.updateOne({_id: taskId}, {
            $set: { is_done: value }
        })
        revalidatePath('/dashboard/todo-list')
        revalidatePath('/dashboard/todo-list/todo/[todoId]')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}