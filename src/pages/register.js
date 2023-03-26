import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GuestLayout from '@/components/layouts/GuestLayout';
import Head from 'next/head';
import { Box, Container } from '@mui/system';
import {
	Avatar,
	Button,
	Checkbox,
	CssBaseline,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
	const { register } = useAuth({
		middleware: 'guest',
		redirectIfAuthenticated: '/dashboard'
	});

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		register({
			name,
			email,
			password,
			password_confirmation: passwordConfirmation,
			setErrors
		});
	};

	return (
		<GuestLayout>
			<Head>
				<title>Register | Load Order Library</title>
			</Head>

			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Username"
							name="name"
							autoComplete="name"
							onChange={(event) => setName(event.target.value)}
							autoFocus
						/>
						<TextField
							margin="normal"
							fullWidth
							id="email"
							label="Email Address (optional)"
							name="email"
							autoComplete="email"
							onChange={(event) => setEmail(event.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="new-password"
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="passwordConfirmation"
							label="Password Confirmation"
							type="password"
							id="passwordConfirmation"
							onChange={(event) =>
								setPasswordConfirmation(event.target.value)
							}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
						<Grid container>
							{/* <Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid> */}
							<Grid item>
								<Link href="/login" variant="body2">
									{'Already have an account? Log in'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</GuestLayout>
	);
};

export default Register;
