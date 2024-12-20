import React, { useEffect, useState } from 'react'
import { Form, Input, Card, Button, Alert, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import "../assets/styles/auth.css"

function Login() {
    const [user, setUser] = useState({ email: import.meta.env.VITE_ADMIN_EMAIL })
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        setLoading(true); 
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const token = await userCredential.user.getIdToken();
            document.cookie = `authToken=${token}; path=/; max-age=${86400}`
            setLoading(false)
            navigate("/"); 
            
        } catch (error) {
            console.log(error, 'error')
            setAlert(true)
            setLoading(false)
        } 
    }

    useEffect(() => {
        setTimeout(() => { setAlert(false) }, 5000)
    }, []);

    return (
        <>
            {alert && (
                <Alert
                    description="Invalid credentials. Please retry!"
                    type="error"
                    showIcon
                />
            )}

            <div className="card-container">
               
                    <Card>
                        <Form layout="vertical" onFinish={handleLogin}>
                            <Form.Item label="Email">
                                <Input
                                    placeholder="Enter email"
                                    type="email"
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
                            {loading ? <Spin /> :
                            <Button htmlType="submit" type="primary" loading={loading}>
                                Login
                            </Button> }
                        </Form>
                    </Card>
               
            </div>
        </>
    )
}

export default Login;
