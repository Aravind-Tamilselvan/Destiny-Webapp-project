import { React, useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material';
import SignupPage from './SignupPage'
import LoginPage from './LoginPage'

const AuthPage = () => {
    const [index, setIndex] = useState(0);
    const handleChange = (event, newValue) => setIndex(newValue);
    const CustomTabPanel = ({ value, index, children }) => (
        <div hidden={value !== index}>
            {value === index && <>{children}</>}
        </div>
    );
    return (
        <div className='auth-page'>
            <div className='auth-logo'>
                <img src={'assets/Destiny.jpg'} alt='logo' style={{ height: "150px" }} />
            </div>
            <Box width={"100%"} marginTop={"60px"}>
                <Tabs value={index} onChange={handleChange} className='tabs'>
                    <Tab label='Signup' />
                    <Tab label='Signin' />
                </Tabs>
                <CustomTabPanel value={index} index={0} className='tab-panel'>
                    <SignupPage />
                </CustomTabPanel>

                <CustomTabPanel value={index} index={1} className='tab-panel'>
                    <LoginPage />
                </CustomTabPanel>
            </Box>
            <p style={{ position: "absolute", bottom: "0", right: "50%", transform: "translateX(50%)", textAlign : "center" }}>Copyrights belongs to Aravind, For demo use account<br></br> email:demo@gmail.com password:demo@123</p>
        </div>
    )
}

export default AuthPage