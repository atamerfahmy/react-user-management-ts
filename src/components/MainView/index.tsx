import React from 'react'
import styles from "./styles.module.css";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Typography } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '../Table';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../Modal";

interface IProps {

}

function MainView({ }: IProps) {

    function notificationsLabel(count: number) {
        if (count === 0) {
            return 'no notifications';
        }
        if (count > 9) {
            return 'more than 9 notifications';
        }
        return `${count} notifications`;
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={styles.container}>
            <div className={styles.top_containier}>
                <div className={styles.top_containier_left}>
                    <IconButton>

                        <MenuOpenIcon sx={{
                            color: "#51576d"
                        }} />
                    </IconButton>

                    <Typography fontSize={"14px"} fontWeight={600} sx={{
                        color: "#51576d"
                    }}>Good Morning!</Typography>
                    <Typography fontSize={"13px"} sx={{
                        color: "#51576d"
                    }}>Tue Jan 12, 2021</Typography>
                    <Typography fontSize={"13px"} sx={{
                        color: "#51576d"
                    }}>9:39 AM</Typography>
                </div>
                <div className={styles.top_containier_left}>
                    <IconButton>
                        <HelpOutlineIcon sx={{
                            color: "#51576d"
                        }} />
                    </IconButton>

                    <IconButton aria-label={notificationsLabel(10)}>
                        <Badge badgeContent={"9+"} color="error" overlap="circular">
                            <NotificationsIcon sx={{
                                color: "#51576d"
                            }} />
                        </Badge>
                    </IconButton>


                    <Divider orientation="vertical" variant="middle" />
                    <Typography fontSize={"13px"} fontWeight={600} >Ahmed Fahmy</Typography>
                    <IconButton>
                        <Avatar sx={{ bgcolor: "#e6f1ff", width: "30px", height: "30px", color: "black", fontSize: "12px", fontWeight: 600 }}>AF</Avatar>
                        <KeyboardArrowDownIcon sx={{
                            color: "#51576d"
                        }} />
                    </IconButton>

                </div>
            </div>
            <div className={styles.main_component}>
                <div className={styles.title_div}>
                    <Typography fontSize={"22px"} fontWeight={600}>User Management</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} sx={{
                        backgroundColor: "#22a565",
                        ':hover': {
                            backgroundColor: "#22a565",
                        }
                    }}
                        onClick={handleOpen}>
                        Add New
                    </Button>
                </div>
                <div className={styles.table}>
                    <Table />
                </div>

            </div>

            <Modal handleClose={handleClose} open={open} />
        </div>
    )
}

export default MainView;