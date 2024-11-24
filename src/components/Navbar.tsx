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

    const handleThemeChange = (
        event: React.MouseEvent<HTMLElement>,
        newTheme: "light" | "dark"
    ) => {
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
                            margin: 1,
                            borderRadius: 2,
                            color:
                                currentTheme.palette.mode === 'dark'
                                    ? currentTheme.palette.primary.contrastText
                                    : currentTheme.palette.primary.main,
                            bgcolor:
                                location.pathname === item.path
                                    ? currentTheme.palette.primary.main
                                    : currentTheme.palette.mode === 'dark'
                                        ? currentTheme.palette.text.disabled
                                        : currentTheme.palette.secondary.main,
                            "&:hover": {
                                bgcolor:
                                    currentTheme.palette.mode === 'dark'
                                        ? currentTheme.palette.action.hover
                                        : currentTheme.palette.action.selected,
                            },
                        }}
                    >
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                color:
                                    currentTheme.palette.mode === 'dark'
                                        ? currentTheme.palette.primary.contrastText
                                        : currentTheme.palette.primary.contrastText,
                            }}
                        />
                    </ListItemButton>
                </ListItem>



            ))}
        </List>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Top Navigation Bar */}
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: "transparent",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    boxShadow: "none",
                }}
            >
                <Toolbar sx={{ padding: '0 16px' }}>
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
                        variant="h4"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color:
                                currentTheme.palette.mode === 'dark'
                                    ? currentTheme.palette.text.primary
                                    : currentTheme.palette.primary.main,
                        }}
                    >
                        Budget Ai
                    </Typography>

                    {/* Theme Toggle */}
                    <Tooltip title="Toggle Theme" arrow>
                        <ToggleButtonGroup
                            value={currentTheme.palette.mode}
                            exclusive
                            onChange={handleThemeChange}
                            aria-label="theme toggle"
                            sx={{
                                mr: 2,
                                borderRadius: "50px",
                                borderColor:
                                    currentTheme.palette.mode === "dark"
                                        ? currentTheme.palette.action.hover
                                        : currentTheme.palette.divider,
                            }}
                        >
                            <ToggleButton
                                value="light"
                                aria-label="Light Mode"
                                sx={{
                                    padding: "8px",
                                    borderRadius: "50px",
                                    backgroundColor:
                                        currentTheme.palette.mode === "dark"
                                            ? currentTheme.palette.primary.main
                                            : currentTheme.palette.background.paper,
                                    color:
                                        currentTheme.palette.mode === "dark"
                                            ? currentTheme.palette.text.primary
                                            : currentTheme.palette.text.primary,
                                    '&.Mui-selected': {
                                        backgroundColor: currentTheme.palette.action.selected,
                                    },
                                    '&:hover': {
                                        backgroundColor:
                                            currentTheme.palette.mode === "dark"
                                                ? currentTheme.palette.action.hover
                                                : currentTheme.palette.action.hover,
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
                                    backgroundColor:
                                        currentTheme.palette.mode === "light"
                                            ? currentTheme.palette.text.primary
                                            : currentTheme.palette.text.primary,
                                    color:
                                        currentTheme.palette.mode === "light"
                                            ? currentTheme.palette.text.primary
                                            : currentTheme.palette.text.primary,
                                    '&.Mui-selected': {
                                        backgroundColor: currentTheme.palette.action.selected,
                                    },
                                    '&:hover': {
                                        backgroundColor:
                                            currentTheme.palette.mode === "light"
                                                ? currentTheme.palette.action.hover
                                                : currentTheme.palette.action.hover,
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
                            sx={{
                                color: currentTheme.palette.text.secondary,
                                mx: 2,
                                py: 1,
                                borderRadius: 2,
                                backgroundColor:
                                    currentTheme.palette.mode === "dark"
                                        ? currentTheme.palette.primary.main
                                        : currentTheme.palette.primary.contrastText,
                                "&:hover": {
                                    backgroundColor:
                                        currentTheme.palette.mode === "dark"
                                            ? currentTheme.palette.primary.main
                                            : currentTheme.palette.primary.contrastText,
                                },
                                "&:active": {
                                    backgroundColor:
                                        currentTheme.palette.mode === "dark"
                                            ? currentTheme.palette.primary.main
                                            : currentTheme.palette.primary.main,
                                },
                            }}
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            onClick={logout}
                            sx={{
                                color: currentTheme.palette.primary.contrastText,
                                mx: 2,
                                py: 1,
                                borderRadius: 2,
                                backgroundColor:
                                    currentTheme.palette.mode === "dark"
                                        ? currentTheme.palette.secondary.main // Use primary color for dark mode
                                        : currentTheme.palette.primary.main, // Use contrastText for light mode
                                "&:hover": {
                                    backgroundColor:
                                        currentTheme.palette.mode === "dark"
                                            ? currentTheme.palette.secondary.main // Darker shade for hover in dark mode
                                            : currentTheme.palette.secondary.main, // Lighter shade for hover in light mode
                                },
                                "&:active": {
                                    backgroundColor:
                                        currentTheme.palette.mode === "dark"
                                            ? currentTheme.palette.primary.main
                                            : currentTheme.palette.primary.main,
                                },
                            }}
                        >
                            Logout
                        </Button>
                    )}

                </Toolbar>
            </AppBar>

            {/* Permanent Sidebar for Desktop / Temporary Drawer for Mobile */}
            <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
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
                            bgcolor: currentTheme.palette.background.default,
                        },
                    }}
                >
                    <NavigationList />
                </Drawer>

                {/* Desktop Permanent Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: DRAWER_WIDTH,
                            bgcolor:
                                currentTheme.palette.mode === 'dark'
                                    ? currentTheme.palette.background.paper
                                    : currentTheme.palette.background.default,
                            borderRight: `1px dashed ${currentTheme.palette.text.disabled}`,
                        },
                    }}
                    open
                >
                    <Toolbar />
                    <NavigationList />
                </Drawer>
            </Box>

            {/* Main Content Wrapper */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
                {/* Main content goes here */}
            </Box>
        </Box>
    );
};

export default Navbar;
