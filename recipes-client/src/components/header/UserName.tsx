import { useState, useContext } from "react";
import { UserContext } from "../../reducer/UserReducer";
import { Avatar, Tooltip, Popover, Typography, Box } from "@mui/material";
import Update from "./Update";
const UserName = () => {
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "user-popover" : undefined;

    return (<>
            <Tooltip title={user.firstName ? user.firstName + " " + user.lastName : "User"}>
                <Avatar
                    sx={{
                        fontSize: 25,
                        width: 39,
                        height: 39,
                        marginRight: 3.4,
                        marginBottom: 1.2,
                        bgcolor: "primary.main",
                        cursor: "pointer",
                    }}
                    onClick={handleClick}
                >
                    {user.firstName ? user.firstName[0].toUpperCase() : undefined}
                </Avatar>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        width: 200,
                        height: 280, 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Avatar
                        sx={{
                            fontSize: 28,
                            width: 55,
                            height: 55,
                            marginTop: 4, 
                            marginBottom: 4, 
                            bgcolor: "primary.main",
                        }}
                    >
                        {user.firstName ? user.firstName[0].toUpperCase() : ""}
                    </Avatar>
                    <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        {user.firstName ? user.firstName : "User"} {user.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray", marginBottom: 2 }}>
                        {user.email ? user.email : "User"}
                    </Typography>
                </Box>
                {user.id != "" && (
                    <Update />
                )}
            </Popover>
</>);};

export default UserName;