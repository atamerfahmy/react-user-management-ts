import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from "./styles.module.css";
import { NAVBAR_BACKGROUND_COLOR } from '../../assets/constants';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useFormik } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import store from '../../store/store';
import { createUserAction, updateUserAction } from '../../store/slices/users/users.actions';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    // p: 4,
    borderRadius: "10px",
    maxHeight: "500px"
};

interface IProps {
    handleClose: any;
    open: boolean;
    data: any;
    editing: boolean;
}

interface formikValues {
    firstName?: string,
    lastName?: string,
    username?: string,
    email?: string,
    group?: string,
    profile?: string
}

export default function BasicModal({ handleClose, open, data, editing }: IProps) {

    const validate = (values: formikValues) => {
        const errors: formikValues = {};
        if (!values.firstName) {
            errors.firstName = 'Required';
        } else if (values.firstName.length > 15) {
            errors.firstName = 'Must be 15 characters or less';
        }

        if (!values.username) {
            errors.username = 'Required';
        } else if (values.username.length > 20) {
            errors.username = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (errors) {
            setError(true)
        }

        return errors;
    };

    const [error, setError] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            group: '',
            profile: ''
        },
        validate,
        onSubmit: async values => {

            if (editing) {
                store.dispatch(updateUserAction({ ...data, ...values, firstName: values.firstName, lastName: values.lastName, }))
            } else {
                store.dispatch(createUserAction({ ...values, firstName: values.firstName, lastName: values.lastName }))
            }
            formik.resetForm();
            handleClose();
        },
    });

    const handleCancel = () => {
        formik.resetForm();
        handleClose();
    }

    React.useEffect(() => {
        formik.setValues({
            email: data.email,
            group: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            profile: data.profile,
            username: data.lastName
        });
    }, [data, editing])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box className={styles.modal_top_container} sx={{ backgroundColor: NAVBAR_BACKGROUND_COLOR }}>
                        <Typography fontSize={"20px"}>{editing ? "Update User" : "Add New User"}</Typography>
                        <IconButton onClick={handleClose}>

                            <ClearIcon sx={{
                                color: "white"
                            }} />
                        </IconButton>
                    </Box>
                    <Box className={styles.middle_container}>
                        <Box className={styles.groups}>
                            <Typography fontSize={"16px"} fontWeight={600}>First Name</Typography>
                            <FormHelperText color='red'>{formik.errors.firstName}</FormHelperText>
                            <TextField id="firstName" placeholder='Enter first name' sx={{
                                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                    padding: "10px 10px"
                                }
                            }}
                                onChange={formik.handleChange}
                                value={formik.values.firstName} />
                        </Box>
                        <Box className={styles.groups}>
                            <Typography fontSize={"16px"} fontWeight={600}>Last Name</Typography>
                            <FormHelperText color='red'>{formik.errors.lastName}</FormHelperText>
                            <TextField id="lastName" placeholder='Enter last name' sx={{
                                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                    padding: "10px 10px"
                                }
                            }}
                                onChange={formik.handleChange}
                                value={formik.values.lastName} />
                        </Box>
                        <Box className={styles.groups}>
                            <Typography fontSize={"16px"} fontWeight={600}>User Name</Typography>
                            <FormHelperText color='red'>{formik.errors.username}</FormHelperText>
                            <TextField id="username" placeholder='Enter username' sx={{
                                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                    padding: "10px 10px"
                                }
                            }}
                                onChange={formik.handleChange}
                                value={formik.values.username} />
                        </Box>
                        <Box className={styles.groups}>
                            <Typography fontSize={"16px"} fontWeight={600}>Email Address</Typography>
                            <FormHelperText color='red'>{formik.errors.email}</FormHelperText>
                            <TextField id="email" type={"email"} placeholder='Enter user email address' sx={{
                                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                    padding: "10px 10px"
                                }
                            }}
                                onChange={formik.handleChange}
                                value={formik.values.email} />
                        </Box>
                        <Box className={styles.groups}>
                            <Typography fontSize={"16px"} fontWeight={600}>User Group</Typography>
                            <TextField id="group" placeholder='Choose User Group' sx={{
                                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                    padding: "10px 10px"
                                }
                            }}
                                onChange={formik.handleChange}
                                value={formik.values.group} />
                        </Box>
                        <Box className={styles.groups}>
                            <Typography fontSize={"16px"} fontWeight={600}>Assign Profile</Typography>
                            <TextField id="profile" placeholder='Choose Profile' sx={{
                                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                    padding: "10px 10px"
                                }
                            }}
                                onChange={formik.handleChange}
                                value={formik.values.profile} />
                        </Box>
                    </Box>

                    <Box className={styles.bottom_container}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                formik.resetForm();
                            }}
                            sx={{
                                color: "black",
                                textDecorationColor: "black",
                                fontWeight: 600
                            }}
                        >
                            Reset fields
                        </Link>
                        <Box className={styles.button_group}>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: "black",
                                    border: "1px #dbdee6 solid",
                                    ':hover': {
                                        border: "1px #dbdee6 solid",
                                        backgroundColor: "#dbdee6"
                                    },
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                                onClick={handleCancel}>Cancel</Button>
                            <Button
                                variant="contained"
                                color={editing ? "primary" : 'success'}
                                sx={{
                                    backgroundColor: "#22a565",
                                    textTransform: "none"
                                }}
                                onClick={formik.submitForm}
                            >{editing ? "Update User" : "Add User"}</Button>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </div >
    );
}