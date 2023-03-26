import { useAuth } from '@/hooks/auth';
import { AppBar, CssBaseline, Link, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import * as React from 'react';

const Navigation = ({ user }) => {
	const router = useRouter();

	const { logout } = useAuth();

	const [open, setOpne] = useState();
	const pages = ['Upload', 'Browse', 'Compare'];

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<CssBaseline />
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Load Order Library
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' }
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign="center">
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Load Order Library
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' }
						}}
						justifyContent="flex-end"
					>
						{pages.map((page) => (
							<Link
								key={page}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									mr: 2,
									color: 'white',
									display: 'block'
								}}
								href={page}
							>
								{page}
							</Link>
						))}
					</Box>

					<Box
						sx={{
							flexGrow: 0,
							display: { xs: 'none', md: 'flex' }
						}}
					>
						{user ? (
							<Typography onClick={handleOpenUserMenu}>
								{user?.name}
							</Typography>
						) : (
							<Box>
								<Link
									href="/login"
									underline="none"
									color="white"
									sx={{ mr: 2 }}
								>
									Login
								</Link>

								<Link
									href="/register"
									underline="none"
									color="white"
								>
									Register
								</Link>
							</Box>
						)}

						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">
									<Link href="/dashboard">Dashboard</Link>
								</Typography>
							</MenuItem>

							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">
									<Link onClick={logout}>Logout</Link>
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navigation;
