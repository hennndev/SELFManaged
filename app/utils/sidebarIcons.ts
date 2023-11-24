import { PiStudent } from "react-icons/pi"
import { AiOutlineHome, AiOutlineFileText, AiOutlineTeam, AiOutlineBarChart, AiOutlineTrophy, AiOutlineOrderedList, AiOutlineDiff, AiOutlineLaptop, AiOutlineFolderOpen } from "react-icons/ai"

export const sidebarIcons = [
    {
        Icon: AiOutlineHome,
        title: 'Dashboard',
        route: ''
    },
    {
        Icon: AiOutlineBarChart,
        title: 'My Progress',
        route: 'my-progress'
    },
    {
        Icon: PiStudent,
        title: 'My Courses',
        route: 'my-courses'
    },
    {
        Icon: AiOutlineTeam,
        title: 'Colleague',
        route: 'colleague'
    },
    {
        Icon: AiOutlineTrophy,
        title: 'Achievment',
        route: 'achievment'
    },
    {
        Icon: AiOutlineDiff,
        title: 'My Planning',
        route: 'my-planning'
    },
    {
        Icon: AiOutlineOrderedList,
        title: 'Todo List',
        route: 'todo-list'
    },
    {
        Icon: AiOutlineFolderOpen,
        title: 'File Storage',
        route: 'file-storage'
    },
    {
        Icon: AiOutlineLaptop,
        title: 'My Portfolio',
        route: 'my-portfolio'
    },
    {
        Icon: AiOutlineFileText,
        title: 'URL List',
        route: 'url-list'
    }
]