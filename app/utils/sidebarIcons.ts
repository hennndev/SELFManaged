import { PiStudent } from "react-icons/pi"
import { AiOutlineHome, AiOutlineFileText, AiOutlineTeam, AiOutlineBarChart, AiOutlineTrophy, AiOutlineOrderedList, AiOutlineDiff, AiOutlineLaptop, AiOutlineFolderOpen, AiOutlineLineChart } from "react-icons/ai"
import { LuListTodo } from "react-icons/lu";


export const sidebarIcons = [
    {
        Icon: AiOutlineHome,
        title: 'Dashboard',
        route: 'dashboard'
    },
    {
        Icon: AiOutlineTeam,
        title: 'Colleague',
        route: 'dashboard/colleague'
    },
    {
        Icon: AiOutlineLineChart,
        title: 'Expense Manager',
        route: 'dashboard/expense-manager'
    },
    {
        Icon: LuListTodo,
        title: 'Todo List',
        route: 'dashboard/todo-list'
    },
    {
        Icon: AiOutlineBarChart,
        title: 'My Progress',
        route: 'dashboard/my-progress',
        plan: 'premium'
    },
    {
        Icon: PiStudent,
        title: 'My Courses',
        route: 'dashboard/my-courses',
        plan: 'premium'
    },
    {
        Icon: AiOutlineTrophy,
        title: 'Achievment',
        route: 'dashboard/achievment',
        plan: 'premium'
    },
    {
        Icon: AiOutlineFolderOpen,
        title: 'File Storage',
        route: 'dashboard/file-storage',
        plan: 'premium'
    },
    {
        Icon: AiOutlineLaptop,
        title: 'My Portfolio',
        route: 'dashboard/my-portfolio',
        plan: 'premium'
    },
    {
        Icon: AiOutlineFileText,
        title: 'URL List',
        route: 'dashboard/url-list',
        plan: 'premium'
    }
]