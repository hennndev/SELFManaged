import React from 'react'
import { getServerSession } from 'next-auth'
import Navbar from '@/app/components/dashboard/navbar'
import TodoListContent from '@/app/components/dashboard/todolist/todoList'
import TodoListHeader from '@/app/components/dashboard/todolist/todoListHeader'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getTodos } from '@/app/lib/actions/todoActions'

export const metadata = {
    title: 'Todo List | SELFManaged'
}

const TodoList = async () => {

    const session: any = await getServerSession(authOptions)
    const data = await getTodos(session?.user?.userId as string)
    console.log(data)

    return (
        <section className='flex-1'>
            <Navbar title="Todo List"/>
            <section className="mt-5">
                <div className="px-7">
                    <TodoListHeader/>
                    {data.todos ? (
                        <TodoListContent todosData={data?.todos as Array<TodoDataTypes>}/>
                    ): (
                        <div className='flex-center mt-10'>
                            <p className='text-gray-700 dark:text-gray-300 font-medium'>{data?.error as string}</p>
                        </div>
                    )}
                </div>
            </section>
        </section>
    )
}

export default TodoList