'use server'
import { Todo } from "@/app/lib/models/todo.model"
import { connectDB } from "@/app/lib/utils/mongoose"
import { revalidatePath } from "next/cache"


export const getTodos = async (userId: string) => {
    await connectDB()
    const data: any = await Todo.findOne({user: userId}).lean().populate('todos.tasks')
    try {
        if(data) {
            return {
                todos: data?.todos
            } 
        } else {
            throw new Error('Todos has not yet created')
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const addTodo = async (userId: string, todo: TodoTypes) => {
    await connectDB()
    const checkTodoUserExist: any = await Todo.findOne({user: userId})
    try {
        if(checkTodoUserExist) {
            await Todo.updateOne({user: userId}, {
                $push: {todos: {
                    title: todo.todoTitle,
                    description: todo.todoDescription,
                    date: todo.todoDate,
                    topics: todo.todoTopics
                }}
            })
        } else {
            await Todo.create({
                user: userId,
                todos: [{
                    title: todo.todoTitle,
                    description: todo.todoDescription,
                    date: todo.todoDate,
                    topics: todo.todoTopics
                }]
            })
        }
        revalidatePath('/dashboard/todo-list')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const editTodo = async () => {
    await connectDB()
    try {
        
    } catch (error) {
        
    }
}

export const deleteTodo = async () => {
    await connectDB()
    try {
        
    } catch (error) {
        
    }
}