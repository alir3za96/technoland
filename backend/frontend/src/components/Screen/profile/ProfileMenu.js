import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../../actions/userActions'
import { ListGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

function ProfileMenu() {
    const [pathname, setPathname] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const location = useLocation()

    const profileMenuListGroupHandler = (event) => {
        navigate(`/user/${event.target.value}`)
    }
    const logoutHandler = () => {
        dispatch(logout())
    }
    useEffect(() => {
        setPathname(location.pathname.split('user/')[1])
    }, [location]);
    return (
        <ListGroup className='profile-menu-list-group text-center'>
            <ListGroup.Item className={`${pathname == 'dashboard' ? 'active' : ''}`}>
                <input
                    hidden
                    id='input1'
                    value='dashboard'
                    onClick={profileMenuListGroupHandler}
                ></input>
                <label for='input1'>داشبورد</label>
            </ListGroup.Item>
            <ListGroup.Item className={`${pathname == 'information' ? 'active' : ''}`}>
                <input
                    hidden
                    id='input7'
                    value='information'
                    onClick={profileMenuListGroupHandler}
                ></input>
                <label for='input7'>اطلاعات حساب کاربری</label>
            </ListGroup.Item>
            <ListGroup.Item className={`${pathname == 'orders' ? 'active' : ''}`}>
                <input
                    hidden
                    id='input2'
                    value='orders'
                    onClick={profileMenuListGroupHandler}
                ></input>
                <label for='input2'>سفارش‌ها</label>
            </ListGroup.Item><ListGroup.Item className={`${(pathname == 'lists' || pathname == 'lists/favorite') ? 'active' : ''}`}>
                <input
                    hidden
                    id='input3'
                    value='lists'
                    onClick={profileMenuListGroupHandler}
                ></input>
                <label for='input3'>لیست‌ها</label>
            </ListGroup.Item>
            {/* <ListGroup.Item className={`${pathname == 'comments'? 'active':''}`}>
            <input
                hidden
                id='input4'
                value='comments'
                onClick={profileMenuListGroupHandler}
            ></input>
            <label for='input4'>دیدگاه‌ها</label>
        </ListGroup.Item><ListGroup.Item className={`${pathname == 'addresses'? 'active':''}`}>
            <input
                hidden
                id='input5'
                value='addresses'
                onClick={profileMenuListGroupHandler}
            ></input>
            <label for='input5'>آدرس‌ها</label>
        </ListGroup.Item>
        
            <ListGroup.Item className={`${pathname == 'password-change'? 'active':''}`}>
                <input
                    hidden
                    id='input8'
                    value='password-change'
                    onClick={profileMenuListGroupHandler}
                ></input>
                <label for='input8'>تغییر رمز</label>
            </ListGroup.Item> */}
            <ListGroup.Item className={`${pathname == 'messages' ? 'active' : ''}`}>
                <input
                    hidden
                    id='input6'
                    value='messages'
                    onClick={profileMenuListGroupHandler}
                ></input>
                <label for='input6'>پیام‌ها</label>
            </ListGroup.Item>

            <ListGroup.Item>
                <input
                    hidden
                    id='input9'
                    value='logout'
                    onClick={logoutHandler}
                ></input>
                <label for='input9'>خروج</label>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default ProfileMenu