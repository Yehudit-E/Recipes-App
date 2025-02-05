import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from "../../reducer/UserReducer";
const Login = ({ setIsLogin }: { setIsLogin: Function }) => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const { user, userDispatch } = useContext(UserContext);
    console.log(user);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const saveFromSignIn = async () => {
        const newUser = {
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
        }
        try {
            const res = await axios.post('http://localhost:3000/api/user/login',
                newUser
            )
            console.log(res.data);
            userDispatch({ type: "CREATE_USER", data: res.data.user });
            setIsLogin(true);
        } catch (e: any) {
            if (axios.isAxiosError(e) && e.response?.status === 401)
                setError('User doesn\'t exist')
        }
        setOpenForm(false);
    }
    const saveFromSignUp = async () => {
        const newUser = {
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
        }
        try {
            const res = await axios.post('http://localhost:3000/api/user/register',
                newUser,
            )
            userDispatch({
                type: "CREATE_USER", data: {
                    id: res.data.userId, email: emailRef.current?.value || '',
                    password: passwordRef.current?.value || '',
                }
            });
            setIsLogin(true);
        } catch (e: any) {
            if (axios.isAxiosError(e) && e.response?.status === 400)
                setError('user already signed up')
        }
        setOpenForm(false);
    }
    return (
        <>
            <Button variant="text" onClick={() => setOpenForm(true)} sx={{ height: "35px", textTransform: 'none', marginRight: 1.5 }}>Login</Button>
            {openForm &&(
                <Dialog open={openForm} onClose={() => setOpenForm(false)}>
                    <DialogContent sx={{ width: 370, height: 200 }}>
                        <form >
                            <TextField
                                sx={{ marginBottom: '16px' }}
                                type="text" label="Email"
                                variant="outlined" fullWidth
                                inputRef={emailRef}
                            />
                            <TextField
                                sx={{ marginBottom: '16px' }}
                                type={showPassword ? 'text' : 'password'}
                                label="Password" inputRef={passwordRef}
                                variant="outlined" fullWidth   
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleShowPassword}
                                                onMouseDown={(event) => event.preventDefault()}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <DialogActions>
                                <Button sx={{ textTransform: 'none' }} onClick={saveFromSignIn} color="primary">
                                    Sign In
                                </Button>
                                <Button sx={{ textTransform: 'none' }} onClick={saveFromSignUp} color="primary">
                                    Sign Up
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert severity="error" variant="filled" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
    </>)
}
export default Login