import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Button, Box, TablePagination } from '@mui/material';

const ProductTable = ({ products, onEdit, onDelete }: any) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedProducts = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 2 }}>
            <TableContainer component={Box} sx={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>CategoryIDs</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map((product: any) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.categoryIds.join(', ')}</TableCell>
                                <TableCell>
                                    {product.imageUrl ? (
                                        <Avatar src={product.imageUrl} alt={product.name} />
                                    ) : (
                                        <Avatar>{product.name.charAt(0)}</Avatar>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Button variant="outlined" onClick={() => onEdit(product)} sx={{ mb: 1 }}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => onDelete(product._id)}>
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
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default ProductTable;
