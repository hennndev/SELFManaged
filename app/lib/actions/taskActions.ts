'use server'
import { revalidatePath } from "next/cache"
import { Task } from "@/app/lib/models/task.model"
import { Todo } from "@/app/lib/models/todo.model"
import { connectDB } from "@/app/lib/utils/mongoose"

export const addTask = async (todoId: string, task: TaskTypes) => {
    await connectDB()
    try {
        const newTask = await Task.create({
            todoId: todoId,
            title: task.taskTitle,
            description: task.taskDescription,
            time: {
                time_start: task.taskTimeStart,
                time_end: task.taskTimeEnd
            },
            is_important: task.isImportant
        })
        await Todo.updateOne({_id: todoId}, {
            $push: {tasks: newTask._id}
        })
        revalidatePath('/dashboard/todo-list')
        revalidatePath(`/dashboard/todo-list/todo/[todoId]`, 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const editTask = async (taskId: string, updatedTask: TaskTypes) => {
    await connectDB()
    try {
        await Task.updateOne({_id: taskId}, {
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
        revalidatePath('/dashboard/todo-list/todo/[todoId]', 'page')
        revalidatePath('/dashboard/todo-list')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const deleteTask = async (taskId: string, todoId: string) => {
    await connectDB()
    try {
        await Task.deleteOne({_id: taskId})
        await Todo.updateOne({_id: todoId}, {
            $pull: {tasks: taskId}
        })
        revalidatePath(`/dashboard/todo-list/todo/[todoId]`, 'page')
        revalidatePath('/dashboard/todo-list')
        return true
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
        revalidatePath('/dashboard/todo-list/todo/[todoId]', 'page')
        revalidatePath('/dashboard/todo-list')
        return true
    } catch (error: any) {
        return {
            error: error.message
        } 
    }
}
export const toggleAllTask = async (todoId: string, value: boolean) => {
    await connectDB()
    try {
        await Task.updateMany({todoId: todoId}, {
            $set: {
                is_done: value
            }
        })
        revalidatePath('/dashboard/todo-list/todo/[todoId]', 'page')
        revalidatePath('/dashboard/todo-list')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}