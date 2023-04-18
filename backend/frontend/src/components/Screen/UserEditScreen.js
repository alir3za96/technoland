import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PreLoader } from '../PreLoader/PreLoader'
import Message from '../Message'
import FormContainer from '../../components/FormContainer'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

function UserEditScreen() {

    const userId = useParams();
    const history = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isStaff, setIsStaff] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history('/admin/user/list')
        } else {
            if (!user.username || user.id !== Number(userId.id)) {
                console.log(user,userId.id)
                dispatch(getUserDetails(userId.id))
            } else {
                setUsername(user.username)
                setEmail(user.email)
                setIsStaff(user.is_staff)
            }
        }

    }, [dispatch, user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, username, email, isStaff }))
    }

    return (
        <div>
            <Link to='/admin/user/list'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <PreLoader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <PreLoader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='username'>
                                <Form.Label>UserName</Form.Label>
                                <Form.Control

                                    type='username'
                                    placeholder='Enter name'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isSatff'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is staff'
                                    checked={isStaff}
                                    onChange={(e) => setIsStaff(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default UserEditScreen