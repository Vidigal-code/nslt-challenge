import React, { useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Box,
    TablePagination,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';
import { Category } from '../../types/Category';

const CategoryTable = ({ categories, onEdit, onDelete }: any) => {

    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmId, setConfirmId] = useState<string | null>(null);
    const [confirmName, setConfirmName] = useState<string>('');

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedCategories = categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const requestDelete = (category: Category) => {
        setConfirmId(category._id);
        setConfirmName(category.name || 'this category');
    };

    const handleConfirmDelete = () => {
        if (confirmId) onDelete(confirmId);
        setConfirmId(null);
        setConfirmName('');
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            }}
                        >
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Category Name</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCategories.map((category: Category) => (
                            <TableRow 
                                key={category._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <CategoryIcon sx={{ color: 'primary.main' }} />
                                        <span style={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                            {category.name}
                                        </span>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                        <IconButton
                                            onClick={() => onEdit(category)}
                                            size="small"
                                            sx={{
                                                color: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                },
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => requestDelete(category)}
                                            size="small"
                                            sx={{
                                                color: 'error.main',
                                                '&:hover': {
                                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    borderTop: `1px solid ${theme.palette.divider}`,
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                        color: 'text.secondary',
                    },
                }}
            />

            <Dialog open={Boolean(confirmId)} onClose={() => setConfirmId(null)}>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {confirmName}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmId(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryTable;
