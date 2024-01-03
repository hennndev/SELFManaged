'use server'
import { revalidatePath } from "next/cache"
import { Todo } from "@/app/lib/models/todo.model"
import { Task } from "@/app/lib/models/task.model"
import { connectDB } from "@/app/lib/utils/mongoose"

export const getTodos = async (userId: string) => {
    await connectDB()
    try {
        const data: any = await Todo.findOne({user: userId}).select('-createdAt -__v -updatedAt').lean().populate({
            path: 'todos.tasks',
            model: Task,
            select: '-updatedAt -createdAt -__v'
        })
        if(data) {
            return {
                todos: data?.todos.map((todo: TodoDataTypes) => {
                    return {
                        ...todo,
                        tasks: todo.tasks.map(task => {
                            return {
                                ...task,
                                _id: task._id.toString()
                            }
                        }),
                        _id: todo._id.toString()
                    }
                }) as TodoDataTypes[]
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

export const getTodo = async (userId: string, todoId: string) => {
    await connectDB()
    try {
        const data: any = await Todo.findOne({user: userId}).select('-updatedAt -createdAt -__v').lean().populate({
            path: 'todos.tasks',
            model: Task,
            select: '-updatedAt -createdAt -__v'
        })
        const todoData = data.todos.find((todo: TodoDataTypes) => todo._id.toString() === todoId)
        const transformedData = {
            ...todoData,
            _id: todoData._id.toString(),
            tasks: todoData.tasks.map((task: TaskDataTypes) => {
                return {
                    ...task,
                    _id: task._id.toString()
                }
            })
        }
        if(data) {
            return {
                todo: transformedData as TodoDataTypes
            }
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const addTodo = async (userId: string, todo: TodoTypes) => {
    await connectDB()
    const checkTodoUserExist = await Todo.findOne({user: userId})
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

export const editTodo = async (userId: string, todoId: string, newTodo: TodoTypes, isTodoPage?: boolean) => {
    await connectDB()
    try {
        const response = await Todo.updateOne({user: userId, todos: {$elemMatch: {_id: todoId}}}, {
            $set: {
                'todos.$.title': newTodo.todoTitle,
                'todos.$.description': newTodo.todoDescription,
                'todos.$.date': newTodo.todoDate,
                'todos.$.topics': newTodo.todoTopics
            }
        })
        if(response) {
            revalidatePath(`/dashboard/todo-list/todo/[todoId]`, 'page')
            revalidatePath('/dashboard/todo-list')
            return true
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const deleteTodo = async (userId: string, todoId: string) => {
    await connectDB()
    try {
        await Todo.updateOne({user: userId}, {
            $pull: {todos: { _id: todoId }}
        })
        await Task.deleteMany({todoId: todoId})
        revalidatePath('/dashboard/todo-list')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}