import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useTheme } from "../context/theme-context";

interface NavbarProps {
    toggleTheme: () => void;
}

const DRAWER_WIDTH = 240;

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const { currentTheme } = useTheme();

    const handleThemeChange = (event: React.MouseEvent<HTMLElement>, newTheme: "light" | "dark") => {
        if (newTheme !== null) {
            toggleTheme();
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = user
        ? [
            { label: "Overview", path: "/" },
            { label: "Add Expense", path: "/add-expense" },
            { label: "Expenses", path: "/expenses" },
        ]
        : [{ label: "Overview", path: "/" }];

    const NavigationList = () => (
        <List>
            {navItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={item.path}
                        sx={{
                            textAlign: "left",
                            px: 3,
                            py: 1.5,
                            bgcolor: location.pathname === item.path ?
                                (currentTheme === "dark" ? "rgba(255, 255, 255, 0.08)" : "#e0e0e0")
                                : "inherit",
                            "&:hover": {
                                bgcolor: currentTheme === "dark" ?
                                    "rgba(255, 255, 255, 0.12)"
                                    : "#d7d7d7"
                            },
                        }}
                    >
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Top AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: currentTheme.primary,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Budget Management
                    </Typography>

                    {/* Theme Toggle */}
                    <Tooltip title="Toggle Theme" arrow>
                        <ToggleButtonGroup
                            value={currentTheme}
                            exclusive
                            onChange={handleThemeChange}
                            aria-label="theme toggle"
                            sx={{
                                mr: 2,
                                border: "1px solid",
                                borderColor: currentTheme === "dark" ? "#444" : "#ccc",
                                borderRadius: "50px",
                            }}
                        >
                            <ToggleButton
                                value="light"
                                aria-label="Light Mode"
                                sx={{
                                    padding: "8px",
                                    borderRadius: "50px",
                                    color: currentTheme === "dark" ? "#f5f5f5" : "#212121",
                                    '&.Mui-selected': {
                                        backgroundColor: currentTheme === "dark" ? "#424242" : "#f5f5f5",
                                    },
                                }}
                            >
                                🌞
                            </ToggleButton>
                            <ToggleButton
                                value="dark"
                                aria-label="Dark Mode"
                                sx={{
                                    padding: "8px",
                                    borderRadius: "50px",
                                    color: currentTheme === "dark" ? "#f5f5f5" : "#212121",
                                    '&.Mui-selected': {
                                        backgroundColor: currentTheme === "dark" ? "#f5f5f5" : "#424242",
                                    },
                                }}
                            >
                                🌙
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Tooltip>

                    {/* Auth Buttons */}
                    {!user ? (
                        <Button
                            component={Link}
                            to="/sign-in"
                            sx={{ color: "#fff" }}
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            onClick={logout}
                            sx={{ color: "#fff" }}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            {/* Permanent Sidebar for Desktop / Temporary Drawer for Mobile */}
            <Box
                component="nav"
                sx={{
                    width: { sm: DRAWER_WIDTH },
                    flexShrink: { sm: 0 }
                }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            bgcolor: currentTheme.background,
                        },
                    }}
                >
                    <NavigationList />
                </Drawer>

                {/* Desktop Permanent Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            bgcolor: currentTheme.background,
                            borderRight: `1px solid ${currentTheme === "dark" ? "rgba(255, 255, 255, 0.12)" : "#e0e0e0"}`,
                        },
                    }}
                    open
                >
                    <Toolbar /> {/* This creates space for the AppBar */}
                    <NavigationList />
                </Drawer>
            </Box>

            {/* Main Content Wrapper */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                    mt: '64px', // Height of the AppBar
                }}
            >
                {/* Your main content goes here */}
            </Box>
        </Box>
    );
};

export default Navbar;