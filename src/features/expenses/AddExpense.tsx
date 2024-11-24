import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    Alert,
    Snackbar,
    InputAdornment,
} from "@mui/material";
import { addExpense } from "../../firebase/db";
import { useTheme } from "../../context/theme-context";

const AddExpense: React.FC = () => {
    const { currentTheme } = useTheme();
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        dueDate: "",
        advancePaid: "",
    });
    const [errors, setErrors] = useState({
        title: false,
        amount: false,
        dueDate: false,
        advancePaid: false,
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const validateForm = () => {
        const newErrors = {
            title: !formData.title.trim(),
            amount: !formData.amount || Number(formData.amount) <= 0,
            dueDate: !formData.dueDate,
            advancePaid: Number(formData.advancePaid) < 0 ||
                Number(formData.advancePaid) > Number(formData.amount),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors({
                ...errors,
                [field]: false,
            });
        }
    };

    const handleAddExpense = async () => {
        if (!validateForm()) return;

        try {
            await addExpense({
                title: formData.title,
                amount: Number(formData.amount),
                dueDate: formData.dueDate,
                advancePaid: Number(formData.advancePaid),
            });

            setSnackbar({
                open: true,
                message: "Expense added successfully!",
                severity: "success",
            });

            // Reset form
            setFormData({
                title: "",
                amount: "",
                dueDate: "",
                advancePaid: "",
            });
        } catch (error) {
            console.error("Error adding expense:", error);
            setSnackbar({
                open: true,
                message: "Failed to add expense. Please try again.",
                severity: "error",
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ backgroundColor: currentTheme.palette.background.default, color: currentTheme.palette.text.primary, minHeight: "100vh", padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Add Expense
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    bgcolor: currentTheme.palette.background.paper,
                    maxWidth: 600,
                    mx: "auto",
                    borderRadius: 2,
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Expense Title"
                            value={formData.title}
                            onChange={handleChange("title")}
                            error={errors.title}
                            helperText={errors.title ? "Title is required" : ""}
                            variant="outlined"
                            InputProps={{
                                style: { color: currentTheme.palette.text.primary, backgroundColor: currentTheme.palette.background.default },
                            }}
                            InputLabelProps={{
                                style: { color: currentTheme.palette.text.secondary },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Total Amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange("amount")}
                            error={errors.amount}
                            helperText={errors.amount ? "Valid amount is required" : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{
                                            color: currentTheme.palette.mode === 'dark'
                                                ? currentTheme.palette.text.primary
                                                : currentTheme.palette.text.secondary, // Adjust the color based on the theme
                                        }}
                                    >
                                        LKR
                                    </InputAdornment>
                                ),
                                style: { color: currentTheme.palette.text.primary, backgroundColor: currentTheme.palette.background.default },
                            }}
                            InputLabelProps={{
                                style: { color: currentTheme.palette.text.secondary },
                            }}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Advance Paid"
                            type="number"
                            value={formData.advancePaid}
                            onChange={handleChange("advancePaid")}
                            error={errors.advancePaid}
                            helperText={errors.advancePaid ? "Invalid advance amount" : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{
                                            color: currentTheme.palette.mode === 'dark'
                                                ? currentTheme.palette.text.primary
                                                : currentTheme.palette.text.secondary,
                                        }}
                                    >
                                        LKR
                                    </InputAdornment>
                                ),
                                style: { color: currentTheme.palette.text.primary, backgroundColor: currentTheme.palette.background.default },
                            }}
                            InputLabelProps={{
                                style: { color: currentTheme.palette.text.secondary },
                            }}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Due Date"
                            type="date"
                            value={formData.dueDate}
                            onChange={handleChange("dueDate")}
                            error={errors.dueDate}
                            helperText={errors.dueDate ? "Due date is required" : ""}
                            InputLabelProps={{
                                shrink: true,
                                style: { color: currentTheme.palette.text.secondary },
                            }}
                            InputProps={{
                                style: { color: currentTheme.palette.text.primary, backgroundColor: currentTheme.palette.background.default },
                            }}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleAddExpense}
                            fullWidth
                            size="large"
                            sx={{
                                mt: 2,
                                bgcolor: currentTheme.palette.primary.main,
                                color: currentTheme.palette.primary.contrastText,
                                '&:hover': {
                                    bgcolor: currentTheme.palette.primary.main,
                                },
                            }}
                        >
                            Add Expense
                        </Button>
                    </Grid>

                </Grid>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddExpense;
