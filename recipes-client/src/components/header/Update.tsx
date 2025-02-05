import { FormEvent, useContext,  useState } from "react";
import { UserContext, UserType } from "../../reducer/UserReducer";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import axios from "axios";


const Update = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const { user, userDispatch } = useContext(UserContext);
    const [form, setForm] = useState<UserType>(user);
    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value })
    }
    const SaveUser = async (e: FormEvent) => {
        e.preventDefault();
        console.log(form)
        try {
            const res = await axios.put(`http://localhost:3000/api/user`, form, {
                headers: {
                    'user-id': user.id
                }
            });
            console.log(res)
            userDispatch({ type: "UPDATE_USER", data: form });
        } catch (e: any) {
            if (axios.isAxiosError(e) && e.response?.status === 404) {
                console.log(e)
                alert('User not found:')
            }
        }
        setOpenForm(false);
    }
    return (
        <>
            <Button variant="text" onClick={() => setOpenForm(true)} sx={{ height: "35px", textTransform: 'none', marginTop: 0.5, marginLeft: 1.5 }}>Update</Button>
            {openForm &&
                <Dialog open={openForm} onClose={() => setOpenForm(false)}>

                    <DialogContent sx={{ width: 370 }}>
                        <form onSubmit={SaveUser}>
                            <TextField
                                sx={{ marginBottom: '16px' }}
                                type="text" fullWidth
                                id="email" label="Email"
                                value={form.email} variant="outlined"                               
                                onChange={(e) => handleChange(e.target.id, e.target.value)}                                
                            />
                            <TextField
                                sx={{ marginBottom: '16px' }}
                                type="text" fullWidth
                                id="firstName"label="First Name" 
                                value={form.firstName} variant="outlined"
                                onChange={(e) => handleChange(e.target.id, e.target.value)}
                                
                            />
                            <TextField
                                sx={{ marginBottom: '16px' }}
                                type="text" fullWidth
                                id="lastName" label="Last Name"                               
                                value={form.lastName} variant="outlined"
                                onChange={(e) => handleChange(e.target.id, e.target.value)}
                                
                            />
                            <TextField
                                sx={{ marginBottom: '16px' }}
                                type="text" fullWidth
                                id="address" label="Address"
                                value={form.address} variant="outlined"
                                onChange={(e) => handleChange(e.target.id, e.target.value)}                                    
                            />
                            <TextField
                                sx={{ marginBottom: '16px' }}
                                type="text" fullWidth
                                id="phone" label="Phone"
                                value={form.phone} variant="outlined"
                                onChange={(e) => handleChange(e.target.id, e.target.value)}       
                            />
                            <DialogActions>
                                <Button sx={{ textTransform: 'none' }} type="submit" color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}
export default Update