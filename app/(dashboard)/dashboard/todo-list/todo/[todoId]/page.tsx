import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Navbar from '@/app/components/dashboard/navbar'
import { getTodo } from '@/app/lib/actions/todoActions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TodoHeader from '@/app/components/dashboard/todolist/todoPageHeader'
import TodoPageContent from '@/app/components/dashboard/todolist/todoPageContent'

export const metadata = {
    title: 'Todo - Task List | SELFManaged'
}

const TodoPage = async ({params}: {params: {todoId: string}}) => {
    const session = await getServerSession(authOptions)
    const user = session?.user as UserLoginTypes
    const todoData: any = await getTodo(user.userId, params.todoId)

    if(todoData.error) {
        redirect('/dashboard/todo-list')
    }
    return (
        <section className='flex-1'>
            <Navbar title="Todo - Task List"/>
            <section className='px-7 mt-5 pb-10'>
                <TodoHeader todo={todoData.todo as TodoDataTypes}/>
                <TodoPageContent todoData={todoData.todo as TodoDataTypes}/>
            </section>
        </section>
    )
}

export default TodoPage