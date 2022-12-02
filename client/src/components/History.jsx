import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FORM_ROUTE, HISTORY_ROUTE } from "../utils/consts"
import { useDispatch, useSelector } from 'react-redux'

import { checkUser } from '../redux/features/slices/authSlice'
import Header from './Header'
import WaysListComponent from './WaysListComponent'
import { bestWaysUser } from '../redux/features/userSlice/userSlice'
import { render } from 'react-dom'
import { NewWay } from '../redux/features/userSlice/userSlice'


//Страница истории для авторизованых
export default function History() {

    const dispatch = useDispatch()

    
    
    const isLoading1 = useSelector((state) => state.user.isProgress)
    const paths = useSelector((state) => state.user.paths)
    const isLoading2 = useSelector((state) => state.user.isAllProgress)
    const allpath  = useSelector((state)=>state.user.allpaths)
    
    
    const NewWayHandler = () => {
        dispatch(NewWay())
    }
    
    useEffect(() => {
        dispatch(checkUser())
        
    },[dispatch])





        return (
        <div>  
            <Header/>
        
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>История маршрутов</h2>
                
                <div>
                <div>
                {(isLoading1) && WaysListComponent(paths)}
                </div>
                <div className='mt-9'>
                    {(isLoading2) && allpath?.map((path) => (
                        WaysListComponent(path.path)
                    ))}
                </div> 
                </div>
                

                <Link className="button_style" to= {FORM_ROUTE} onClick = {NewWayHandler}>Добавить новый</Link>
            </main> 
        </div>)         
}