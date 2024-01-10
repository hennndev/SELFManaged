import React from 'react'
import { redirect } from 'next/navigation'
import Navbar from '@/app/components/dashboard/navbar'
import { getTodo } from '@/app/lib/actions/todoActions'
import TodoHeader from '@/app/components/dashboard/todolist/todo/todoHeader'
import Todo from '@/app/components/dashboard/todolist/todo/todo'

export const metadata = {
    title: 'Todo - Task List | SELFManaged'
}
const TodoPage = async ({params}: {params: {todoId: string}}) => {
    const todoData: any = await getTodo(params.todoId)
    if(todoData.error) {
        redirect('/dashboard/todo-list')
    }
    return (
        <section className='flex-1'>
            <Navbar title="Todo - Task List"/>
            <section className='px-7 mt-5 pb-10'>
                <TodoHeader todo={todoData.todo as TodoDataTypes}/>
                <Todo todoData={todoData.todo as TodoDataTypes}/>
            </section>
        </section>
    )
}
export default TodoPage