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
    Chip,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CalendarMonth as DateIcon,
} from '@mui/icons-material';
import { Order } from '../../types/Order';

const OrderTable = ({ orders, onEdit, onDelete }: any) => {

    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmId, setConfirmId] = useState<string | null>(null);
    const [confirmLabel, setConfirmLabel] = useState<string>('');

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const requestDelete = (order: Order) => {
        setConfirmId(order._id);
        setConfirmLabel(`order on ${formatDate(order.date)}`);
    };

    const handleConfirmDelete = () => {
        if (confirmId) onDelete(confirmId);
        setConfirmId(null);
        setConfirmLabel('');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Products</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Total</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedOrders.map((order: Order) => (
                            <TableRow 
                                key={order._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {order.productIds.map((prodId: string, index: number) => (
                                            <Chip
                                                key={index}
                                                label={prodId}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: 'primary.main',
                                                    color: 'primary.main',
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={`$${order.total.toFixed(2)}`}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: alpha(theme.palette.success.main, 0.15),
                                            color: 'success.main',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <DateIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <span style={{ color: theme.palette.text.secondary }}>
                                            {formatDate(order.date)}
                                        </span>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                        <IconButton
                                            onClick={() => onEdit(order)}
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
                                            onClick={() => requestDelete(order)}
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
                count={orders.length}
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
                        Are you sure you want to delete {confirmLabel || 'this order'}? This action cannot be undone.
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

export default OrderTable;
