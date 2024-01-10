'use server'
import { revalidatePath } from "next/cache"
import { Todo } from "@/app/lib/models/todo.model"
import { Task } from "@/app/lib/models/task.model"
import { connectDB } from "@/app/lib/utils/mongoose"
import { UserData } from "@/app/lib/models/user-data.model"

export const getTodos = async (userId: string) => {
    await connectDB()
    try {
        const data: any = await UserData.findOne({user_id: userId}).select('_id user_id todos').lean().populate({
            path: 'todos',
            model: Todo,
            select: '-updatedAt -user -createdAt -__v',
            populate: {
                path: 'tasks',
                model: Task,
                select: '-updatedAt -createdAt -__v -user'
            }
        })
        if(data?.todos.length > 0) {
            return {
                todos: data?.todos.map((todo: TodoDataTypes) => {
                    return {
                        ...todo,
                        _id: todo._id.toString(),
                        tasks: todo.tasks.map((task: TaskDataTypes) => {
                            return {
                                ...task,
                                _id: task._id.toString()
                            }
                        })
                    }
                }) as TodoDataTypes[]
            }
        } else {
            throw new Error('Todos list has not yet created')
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const getTodo = async (todoId: string) => {
    await connectDB()
    try {
        const data: any = await Todo.findOne({_id: todoId}).select('-updatedAt -user -createdAt -__v').lean().populate({
            path: 'tasks',
            model: Task,
            select: '-updatedAt -createdAt -__v'
        })
        const transformedData = {
            ...data,
            _id: data._id.toString(),
            tasks: data.tasks.map((task: TaskDataTypes) => {
                return {
                    ...task,
                    _id: task._id.toString()
                }
            })
        }
        if(!data) {
            throw new Error('Todo not exist')
        } 
        return {
            todo: transformedData
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const addTodo = async (userId: string, todo: TodoTypes) => {
    await connectDB()
    try {
        const newTodo = await Todo.create({
            user: userId,
            title: todo.todoTitle,
            description: todo.todoDescription,
            date: todo.todoDate,
            topics: todo.todoTopics

        })
        await UserData.updateOne({user_id: userId}, {
            $push: {todos: newTodo._id}
        })
        revalidatePath('/dashboard/todo-list')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}
export const editTodo = async (todoId: string, updatedTodo: TodoTypes) => {
    await connectDB()
    try {
        await Todo.updateOne({_id: todoId}, {
            $set: {
                title: updatedTodo.todoTitle,
                description: updatedTodo.todoDescription,
                date: updatedTodo.todoDate,
                topics: updatedTodo.todoTopics
            }
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
export const deleteTodo = async (userId: string, todoId: string) => {
    await connectDB()
    try {
        await Todo.deleteOne({_id: todoId})
        await UserData.updateOne({user_id: userId}, {
            $pull: {todos: todoId}
        })
        await Task.deleteMany({todoId: todoId})
        revalidatePath('/dashboard/todo-list')
        revalidatePath('/dashboard/todo-list/todo/[todoId]', 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}