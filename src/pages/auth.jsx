import React, { useEffect, useState } from 'react'
import { Form, Input, Card, Button, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import "../assets/styles/auth.css"

function Login() {
    const [user, setUser] = useState({ email: import.meta.env.VITE_ADMIN_EMAIL })
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const token = await userCredential.user.getIdToken();
            document.cookie = `authToken=${token}; path=/; max-age=${3600}`
            navigate("/")
        } catch (error) {
            console.log(error, 'error')
            setAlert(true)
        }
    }

    useEffect(() => {
        setTimeout(() => { setAlert(false) }, [5000])
    })

    return (
        <>
            {alert &&

                <Alert
                    description="Invalid credentials. Please retry !"
                    type="error"
                    showIcon
                />
            }
            <div className='card-container'>
                <Card>
                    <Form layout='vertical' onFinish={handleLogin}>
                        <Form.Item label="Email">
                            <Input
                                placeholder="Enter email"
                                type='email'
                                value={user?.email}
                                onChange={(e) => {
                                    setUser(prevDetails => ({
                                        ...prevDetails,
                                        email: e.target.value,
                                    }))
                                }} />
                        </Form.Item>
                        <Form.Item label="Password">
                            <Input.Password
                                placeholder="Enter password"
                                value={user?.password}
                                onChange={(e) => {
                                    setUser(prevDetails => ({
                                        ...prevDetails,
                                        password: e.target.value,
                                    }))
                                }} />
                        </Form.Item>
                        <Button htmlType='submit' type='primary'>Login</Button>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default Login