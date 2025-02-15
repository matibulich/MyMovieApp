import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";

const pages = ["Home", "Panel de usuario"];
export const CustomNav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  const handleOpenRegisterModal = () => {
    setIsRegisterOpen(true);
    handleCloseUserMenu();
  };

  const handleOpenLoginModal = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      handleCloseUserMenu();
    } else {
      alert("Ya estás logueado");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
 
    setIsLoggedIn(false);
    handleCloseUserMenu();
    navigate("/");
  };

  const handleCloseModals = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleNavigation = (page) => {
    if (page === "Panel de usuario") {
      if (isLoggedIn) {
        navigate("/userpanel");
      } else {
        handleOpenLoginModal();
      }
    } else if (page === "Home") {
      navigate("/");
    }
  };

  const userSettings = isLoggedIn
    ? [
        { label: "Mi Perfil", action: () => navigate("/profile") },
        { label: "Log Out", action: handleLogout },
      ]
    : [
        { label: "Registrarse", action: handleOpenRegisterModal },
        { label: "Login", action: handleOpenLoginModal },
      ];

  return (
    <>
      <AppBar color="primary" position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                mr: 2,
              }}
            >
              <IconButton
                size="large"
                aria-label="menu"
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
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleNavigation(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: { xs: 1, md: 0 },
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                component="img"
                src="./img/logo.png"
                alt="Logo"
                sx={{
                  height: { xs: 20, md: 30 },
                }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-start",
                ml: 2,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleNavigation(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Registrarse/LogIn">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting.label} onClick={setting.action}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {isRegisterOpen && <Register isOpen={isRegisterOpen} onClose={handleCloseModals} />}
      {isLoginOpen && <Login isOpen={isLoginOpen} onClose={handleCloseModals} />}
    </>
  );
};
