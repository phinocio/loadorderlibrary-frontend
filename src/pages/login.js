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

const Login = () => {
	const router = useRouter();
	const { login } = useAuth({
		middleware: 'guest',
		redirectIfAuthenticated: '/dashboard'
	});

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [shouldRemember, setShouldRemember] = useState(false);
	const [errors, setErrors] = useState([]);
	const [status, setStatus] = useState(null);

	useEffect(() => {
		if (router.query.reset?.length > 0 && errors.length === 0) {
			setStatus(atob(router.query.reset));
		} else {
			setStatus(null);
		}
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		login({
			name,
			password,
			remember: shouldRemember,
			setErrors,
			setStatus
		});
	};

	return (
		<GuestLayout>
			<Head>
				<title>Login | Load Order Library</title>
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
						Sign in
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
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
						<FormControlLabel
							control={
								<Checkbox
									value="remember"
									color="primary"
									onChange={(event) =>
										setShouldRemember(event.target.checked)
									}
								/>
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							{/* <Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid> */}
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</GuestLayout>
	);
};

export default Login;
