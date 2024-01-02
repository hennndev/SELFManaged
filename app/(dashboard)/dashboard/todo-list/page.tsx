import React from 'react'
import { getServerSession } from 'next-auth'
import Navbar from '@/app/components/dashboard/navbar'
import { getTodos } from '@/app/lib/actions/todoActions'
import EmptyDataMessage from '@/app/components/utils/emptyDataMessage'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TodoListContent from '@/app/components/dashboard/todolist/todoList'
import TodoListHeader from '@/app/components/dashboard/todolist/todoListHeader'

export const metadata = {
    title: 'Todo List | SELFManaged'
}
const TodoList = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user as UserLoginTypes
    const data = await getTodos(user?.userId as string)
    return (
        <section className='flex-1'>
            <Navbar title="Todo List"/>
            <section className="mt-5 px-7 pb-10">
                <TodoListHeader/>
                {data.todos ? (
                    <TodoListContent todosData={data?.todos as Array<TodoDataTypes>}/>
                ): (
                    <EmptyDataMessage>
                        <div className='flex-center flex-col space-y-3 mt-10'>
                            <p className='text-gray-700 dark:text-gray-300 font-medium text-lg'>{data?.error as string}</p>
                            <p className='text-gray-500 dark:text-gray-500 text-sm font-medium'>-- Do something great today --</p>
                        </div>
                    </EmptyDataMessage>
                )}
            </section>
        </section>
    )
}
export default TodoList