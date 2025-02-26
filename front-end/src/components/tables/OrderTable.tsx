import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, TablePagination } from '@mui/material';
import { Order } from '../../types/Order';

const OrderTable = ({ orders, onEdit, onDelete }: any) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 2 }}>
            <TableContainer component={Box} sx={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product IDs</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedOrders.map((order: Order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.productIds.join(', ')}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Button variant="outlined" onClick={() => onEdit(order)} sx={{ mb: 1 }}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => onDelete(order._id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default OrderTable;
