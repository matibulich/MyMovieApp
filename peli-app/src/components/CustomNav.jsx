import { useState } from "react";
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
import { Link } from "react-router-dom";
import { Register } from "../components/Register";
import {Login} from "../components/Login"


const pages = ["Home"];
const settings = ["Registrarse", "Login"];


export const CustomNav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)


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
    setIsLoginOpen(true);
    handleCloseUserMenu();
  };

  const handleCloseModals = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
  };


  return (<>
    <AppBar color="primary" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menú Hamburguesa (pantallas pequeñas) */}
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo centrado en pantallas pequeñas */}
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

          {/* Menú de navegación en pantallas grandes */}
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
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: "white", display: "block" }}
           >
             <Link
               to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
               
               style={{ textDecoration: "none", color: "inherit" }}
             >
               {page}
             </Link>
             
           </Button>
            ))}
          </Box>

          {/* Avatar y Configuración */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
              {settings.map((setting) => (
                <MenuItem
                key={setting}
                onClick={
                  setting === "Registrarse"
                    ? handleOpenRegisterModal
                    : setting === "Login"
                    ? handleOpenLoginModal 
                    :handleCloseUserMenu
                }
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
 {/* Modales de Registro y Login */}
 {isRegisterOpen && (
        <Register isOpen={isRegisterOpen} onClose={handleCloseModals} />
      )}

{isLoginOpen && (
        <Login isOpen={isLoginOpen} onClose={handleCloseModals} />
      )}

    </>
  );
};
