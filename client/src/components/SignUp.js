import React from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { signUp } from '../services/authService'; 
import * as Yup from 'yup';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom'; 

// Validation schema for signup
const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Styles
const customStyles = {
    form: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        background: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        animation: `${fadeIn} 0.8s ease-in-out`,
    },
    title: {
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
        fontSize: '1.8rem',
        textAlign: 'center', 
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#ccc',
            },
            '&:hover fieldset': {
                borderColor: '#6A5B8A',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6A5B8A',
            },
        },
    },
    submitButton: {
        marginTop: '20px',
        backgroundColor: '#6A5B8A',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '1.1rem',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#5A4D6A',
        },
    },
    sideImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
};

function Signup({ showNotification }) {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const data = await signUp(values.name, values.email, values.password);
            sessionStorage.setItem('guest_id', data.id);
            sessionStorage.setItem('guest_email', values.email);
            showNotification(`Signed up as ${values.name}`);
            navigate('/'); 
        } catch (error) {
            const errorMessage = error?.message || error?.response?.data?.message || 'Signup failed. Please try again.';
            showNotification(errorMessage);
        }
    };

    return (
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
            <Grid container sx={{ height: '100%', width: '100%' }}>
                {/* Left side: Form */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' }}>
                    <Box sx={customStyles.form}>
                        <Typography variant="h4" gutterBottom sx={customStyles.title}>
                            Be our Guest
                        </Typography>
                        <Formik
                            initialValues={{ name: '', email: '', password: '' }}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, handleChange, handleBlur, values }) => (
                                <Form>
                                    <Field
                                        name="name"
                                        as={TextField}
                                        label="Name"
                                        fullWidth
                                        margin="normal"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                        sx={customStyles.textField}
                                    />
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label="Email"
                                        fullWidth
                                        margin="normal"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={customStyles.textField}
                                    />
                                    <Field
                                        name="password"
                                        as={TextField}
                                        type="password"
                                        label="Password"
                                        fullWidth
                                        margin="normal"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        sx={customStyles.textField}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={customStyles.submitButton}
                                    >
                                        Sign Up
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>

                {/* Right side: Image */}
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
                    <img 
                        src="https://th.bing.com/th/id/R.f85dfe5577c4dadefb2c504745045d89?rik=b7aIZNvrtQ2wmQ&pid=ImgRaw&r=0" 
                        alt="Signup visual"
                        style={customStyles.sideImage}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Signup;
