import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, MenuItem, CircularProgress, Select, SelectChangeEvent, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchDashboardData } from '../services/Api';
import { ApiException } from "../services/ApiException";
import { DashboardResponse, DashboardChartItem } from "../services/Interfaces";

const DashboardPage = () => {

    const [data, setData] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        product: '',
        start: '',
        end: '',
        period: 'daily'
    });

    const loadData = async () => {
        setLoading(true);
        fetchDashboardData(filters)
            .then((response) => {
                if (!response.success) {
                    throw new ApiException('Error loading dashboard data', response.status, response.error);
                }
                setData(response.data || {
                    kpis: {
                        totalOrders: 0,
                        totalRevenue: 0,
                        averageOrderValue: 0,
                        uniqueProducts: 0
                    },
                    chartData: []
                });
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleFilterChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        setFilters(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleApplyFilters = () => {
        loadData();
    };

    const formatPeriod = (period: DashboardChartItem['period']) => {
        if (!period) return '';
        const { date, week, year, month } = period;

        switch (filters.period) {
            case 'daily': return date || '';
            case 'weekly': return `Week ${week}, ${year}`;
            case 'monthly': return new Date(year!, month! - 1)
                .toLocaleString('default', { month: 'short', year: 'numeric' });
            default: return '';
        }
    };

    useEffect(() => { loadData(); }, [filters]);

    const { kpis, chartData } = data || {};
    const totalOrders = kpis?.totalOrders || 0;
    const totalRevenue = kpis?.totalRevenue || 0;
    const averageValue = kpis?.averageOrderValue || 0;

    const uniqueProducts = kpis?.uniqueProducts || 0;

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Sales Dashboard
            </Typography>
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        label="Category ID"
                        value={filters.category}
                        onChange={handleFilterChange('category')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        label="Product ID"
                        value={filters.product}
                        onChange={handleFilterChange('product')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.start}
                        onChange={handleFilterChange('start')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.end}
                        onChange={handleFilterChange('end')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Select
                        value={filters.period}
                        onChange={handleFilterChange('period')}
                        fullWidth
                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyFilters}
                        disabled={loading}
                        fullWidth
                    >
                        Apply Filters
                    </Button>
                </Grid>
            </Grid>

            {loading && (
                <Box display="flex" justifyContent="center" p={4}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && data && (
                <>
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Orders
                                    </Typography>
                                    <Typography variant="h4">{totalOrders.toLocaleString()}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Revenue
                                    </Typography>
                                    <Typography variant="h4">
                                        ${totalRevenue.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Average Order Value
                                    </Typography>
                                    <Typography variant="h4">
                                        ${averageValue.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {chartData && chartData.length > 0 && (
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Sales Over Time ({filters.period})
                                </Typography>
                                <Box height={400}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="period"
                                                tickFormatter={formatPeriod}
                                            />
                                            <YAxis />
                                            <Tooltip
                                                labelFormatter={formatPeriod}
                                                formatter={(value) => `$${Number(value).toFixed(2)}`}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="totalRevenue"
                                                stroke="#8884d8"
                                                name="Revenue"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="totalOrders"
                                                stroke="#82ca9d"
                                                name="Orders"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </Box>
    );
};

export default DashboardPage;