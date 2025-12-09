import React, { useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Avatar, 
    Box,
    TablePagination,
    IconButton,
    Chip,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
} from '@mui/icons-material';

const ProductTable = ({ products, onEdit, onDelete }: any) => {

    const theme = useTheme();

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
        <Box sx={{ width: '100%' }}>
            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            }}
                        >
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Image</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Categories</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map((product: any) => (
                            <TableRow 
                                key={product._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                <TableCell>
                                    {product.imageUrl ? (
                                        <Avatar 
                                            src={product.imageUrl} 
                                            alt={product.name}
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                border: `2px solid ${theme.palette.divider}`,
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                bgcolor: alpha(theme.palette.primary.main, 0.2),
                                                color: 'primary.main',
                                            }}
                                        >
                                            <ImageIcon />
                                        </Avatar>
                                    )}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {product.name}
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary', maxWidth: 300 }}>
                                    {product.description}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={`$${product.price.toFixed(2)}`}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: alpha(theme.palette.success.main, 0.15),
                                            color: 'success.main',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {product.categoryIds.map((catId: string, index: number) => (
                                            <Chip
                                                key={index}
                                                label={catId}
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
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                        <IconButton
                                            onClick={() => onEdit(product)}
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
                                            onClick={() => onDelete(product._id)}
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
                count={products.length}
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
        </Box>
    );
};

export default ProductTable;
