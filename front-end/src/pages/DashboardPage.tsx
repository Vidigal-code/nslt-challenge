import React, {useState, useEffect} from 'react';
import {
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    MenuItem,
    CircularProgress,
    Select,
    SelectChangeEvent,
    Button, Divider, InputLabel, Chip,
    FormControl,
    Fade,
    Container,
    Grow,
    Paper
} from '@mui/material';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart} from 'recharts';
import {fetchDashboardData} from '../api/Api';
import {DashboardResponse, DashboardChartItem} from "../types/interface/Interfaces";
import {
    FilterList,
    Clear,
    Search,
    Analytics,
    Inventory,
    TrendingUp,
    AttachMoney,
    ShoppingCart,
    DateRange
} from '@mui/icons-material';

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
        try {
            const response = await fetchDashboardData(filters);
            if (!response.success) {
                throw new Error('Error loading dashboard data');
            }
            setData(response.data || {
                kpis: {
                    totalOrders: 0,
                    totalRevenue: 0,
                    averageOrderValue: 0,
                    uniqueProducts: 0,
                    totalPeriods: 0,
                    bestPeriod: null
                },
                chartData: []
            });
        } catch (error) {
            console.error('Dashboard data loading error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        setFilters(prev => ({...prev, [field]: e.target.value}));
    };

    const handleApplyFilters = () => {
        loadData();
    };

    const handleClearFilters = () => {
        setFilters({
            category: '',
            product: '',
            start: '',
            end: '',
            period: 'daily'
        });
    };

    const formatPeriod = (period: DashboardChartItem['period']) => {
        if (!period) return '';
        const {date, week, year, month} = period;

        switch (filters.period) {
            case 'daily':
                return date || '';
            case 'weekly':
                return `Week ${week}, ${year}`;
            case 'monthly':
                return new Date(year!, month! - 1)
                    .toLocaleString('default', {month: 'short', year: 'numeric'});
            default:
                return '';
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-US').format(value);
    };

    useEffect(() => {
        loadData();
    }, []);

    const {kpis, chartData} = data || {};
    const totalOrders = kpis?.totalOrders || 0;
    const totalRevenue = kpis?.totalRevenue || 0;
    const averageValue = kpis?.averageOrderValue || 0;
    const uniqueProducts = kpis?.uniqueProducts || 0;
    const totalPeriods = kpis?.totalPeriods || 0;
    const bestPeriod = kpis?.bestPeriod;

    const getPeriodLabel = () => {
        switch (filters.period) {
            case 'daily':
                return 'Daily';
            case 'weekly':
                return 'Weekly';
            case 'monthly':
                return 'Monthly';
            default:
                return 'Daily';
        }
    };

    const modernCardStyle = {
        background: '#ffffff',
        border: '1px solid #f0f0f0',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
        }
    };

    const kpiCardStyle = {
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid #e9ecef',
        borderRadius: '20px',
        boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #000000 0%, #333333 100%)',
        }
    };

    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            border: '1px solid #e9ecef',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
                border: 'none',
            },
            '&:hover': {
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #dee2e6',
            },
            '&.Mui-focused': {
                backgroundColor: '#ffffff',
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #000000',
            }
        },
        '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: '#495057',
            '&.Mui-focused': {
                color: '#000000',
            }
        }
    };

    const selectStyle = {
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        border: '1px solid #e9ecef',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '&:hover': {
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid #dee2e6',
        },
        '&.Mui-focused': {
            backgroundColor: '#ffffff',
            boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #000000',
        }
    };

    const primaryButtonStyle = {
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        color: '#ffffff',
        borderRadius: '12px',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '14px',
        padding: '12px 24px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        border: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-1px)',
        },
        '&:disabled': {
            background: '#6c757d',
            color: '#fff',
            boxShadow: 'none'
        }
    };

    const secondaryButtonStyle = {
        background: 'transparent',
        color: '#000000',
        border: '2px solid #000000',
        borderRadius: '12px',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '14px',
        padding: '10px 24px',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            background: '#000000',
            color: '#ffffff',
            transform: 'translateY(-1px)',
        },
        '&:disabled': {
            border: '2px solid #6c757d',
            color: '#6c757d'
        }
    };

    const chipStyle = {
        borderRadius: '8px',
        border: '1px solid #000000',
        color: '#000000',
        backgroundColor: 'transparent',
        fontWeight: 500,
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: 'none',
            py: 4
        }}>
            <Container maxWidth="xl">
                <Fade in timeout={800}>
                    <Paper sx={{
                        ...modernCardStyle,
                        mb: 4,
                        background: 'none',
                        border: 'none',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                        <CardContent sx={{p: 4}}>
                            <Box sx={{textAlign: 'center', mb: 3}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    gap: 2
                                }}>
                                    <Analytics sx={{fontSize: 40, color: '#000000'}}/>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontSize: {xs: '2rem', sm: '2.5rem', md: '3rem'}
                                        }}
                                    >
                                        Sales Dashboard
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#6c757d',
                                        fontWeight: 400,
                                        maxWidth: '600px',
                                        mx: 'auto'
                                    }}
                                >
                                    Comprehensive analytics and insights for your business performance
                                </Typography>
                            </Box>

                            <Divider sx={{
                                mb: 4,
                                background: 'linear-gradient(90deg, transparent, #000000, transparent)',
                                height: '2px',
                                border: 'none'
                            }}/>

                            <Box sx={{mb: 3}}>
                                <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                                    <FilterList sx={{mr: 1, color: '#000000'}}/>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#000000'
                                        }}
                                    >
                                        Filters & Controls
                                    </Typography>
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid>
                                        <TextField
                                            label="Category ID"
                                            value={filters.category}
                                            onChange={handleFilterChange('category')}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="e.g., CAT001"
                                            sx={textFieldStyle}
                                        />
                                    </Grid>

                                    <Grid>
                                        <TextField
                                            label="Product ID"
                                            value={filters.product}
                                            onChange={handleFilterChange('product')}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="e.g., PROD001"
                                            sx={textFieldStyle}
                                        />
                                    </Grid>

                                    <Grid>
                                        <TextField
                                            label="Start Date"
                                            type="date"
                                            InputLabelProps={{shrink: true}}
                                            value={filters.start}
                                            onChange={handleFilterChange('start')}
                                            fullWidth
                                            variant="outlined"
                                            sx={textFieldStyle}
                                            InputProps={{
                                                startAdornment: <DateRange sx={{mr: 1, color: '#6c757d'}}/>
                                            }}
                                        />
                                    </Grid>

                                    <Grid>
                                        <TextField
                                            label="End Date"
                                            type="date"
                                            InputLabelProps={{shrink: true}}
                                            value={filters.end}
                                            onChange={handleFilterChange('end')}
                                            fullWidth
                                            variant="outlined"
                                            sx={textFieldStyle}
                                            InputProps={{
                                                startAdornment: <DateRange sx={{mr: 1, color: '#6c757d'}}/>
                                            }}
                                        />
                                    </Grid>

                                    <Grid>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                fontWeight: 500,
                                                color: '#495057',
                                                '&.Mui-focused': {color: '#000000'}
                                            }}>
                                                Period
                                            </InputLabel>
                                            <Select
                                                value={filters.period}
                                                onChange={handleFilterChange('period')}
                                                label="Period"
                                                sx={selectStyle}
                                            >
                                                <MenuItem value="daily">
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Chip label="D" size="small"
                                                              sx={{...chipStyle, minWidth: '24px', height: '24px'}}/>
                                                        Daily Reports
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="weekly">
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Chip label="W" size="small"
                                                              sx={{...chipStyle, minWidth: '24px', height: '24px'}}/>
                                                        Weekly Reports
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="monthly">
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Chip label="M" size="small"
                                                              sx={{...chipStyle, minWidth: '24px', height: '24px'}}/>
                                                        Monthly Reports
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid>
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 2,
                                            justifyContent: {xs: 'center', lg: 'flex-end'},
                                            alignItems: 'center',
                                            flexWrap: 'wrap'
                                        }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleApplyFilters}
                                                disabled={loading}
                                                startIcon={loading ? <CircularProgress size={20} color="inherit"/> :
                                                    <Search/>}
                                                sx={primaryButtonStyle}
                                            >
                                                {loading ? 'Applying...' : 'Apply Filters'}
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                onClick={handleClearFilters}
                                                disabled={loading}
                                                startIcon={<Clear/>}
                                                sx={secondaryButtonStyle}
                                            >
                                                Clear All
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box sx={{mt: 4}}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: '#495057',
                                            mb: 2,
                                            fontWeight: 600
                                        }}
                                    >
                                        Active Filters:
                                    </Typography>
                                    <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                        {filters.category && (
                                            <Chip
                                                label={`Category: ${filters.category}`}
                                                variant="outlined"
                                                size="medium"
                                                sx={chipStyle}
                                            />
                                        )}
                                        {filters.product && (
                                            <Chip
                                                label={`Product: ${filters.product}`}
                                                variant="outlined"
                                                size="medium"
                                                sx={chipStyle}
                                            />
                                        )}
                                        {filters.start && (
                                            <Chip
                                                label={`From: ${filters.start}`}
                                                variant="outlined"
                                                size="medium"
                                                sx={chipStyle}
                                            />
                                        )}
                                        {filters.end && (
                                            <Chip
                                                label={`To: ${filters.end}`}
                                                variant="outlined"
                                                size="medium"
                                                sx={chipStyle}
                                            />
                                        )}
                                        {filters.period && (
                                            <Chip
                                                label={`Period: ${getPeriodLabel()}`}
                                                variant="outlined"
                                                size="medium"
                                                sx={chipStyle}
                                            />
                                        )}
                                        {!filters.category && !filters.product && !filters.start && !filters.end && (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#adb5bd',
                                                    fontStyle: 'italic',
                                                    py: 1
                                                }}
                                            >
                                                No filters applied - showing all data
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Paper>
                </Fade>

                {loading && (
                    <Fade in timeout={300}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            py: 8
                        }}>
                            <CircularProgress
                                size={40}
                                sx={{color: '#000000'}}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    ml: 3,
                                    color: '#495057',
                                    fontWeight: 500
                                }}
                            >
                                Loading dashboard data...
                            </Typography>
                        </Box>
                    </Fade>
                )}

                {!loading && data && (
                    <>

                        <Fade in timeout={1400}>
                            <Card sx={{...modernCardStyle, mb: 3}}>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{mb: 4, mt: 3}}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid>
                                        <Grow in timeout={800}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <AttachMoney sx={{
                                                            fontSize: 32,
                                                            color: '#000000',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#495057',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            Total Revenue
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: '#000000',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatCurrency(totalRevenue)}
                                                    </Typography>
                                                    {bestPeriod && (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{color: '#6c757d'}}
                                                        >
                                                            Best: {formatCurrency(bestPeriod.totalRevenue)}
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Grid>

                                    <Grid>
                                        <Grow in timeout={600}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <ShoppingCart sx={{
                                                            fontSize: 32,
                                                            color: '#000000',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#495057',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            Total Orders
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: '#000000',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatNumber(totalOrders)}
                                                    </Typography>
                                                    {totalPeriods > 0 && (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{color: '#6c757d'}}
                                                        >
                                                            Across {totalPeriods} periods
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Grid>

                                </Grid>

                                <Grid
                                    container
                                    spacing={3}
                                    sx={{mb: 4, mt: 3}}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid>
                                        <Grow in timeout={1000}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <TrendingUp sx={{
                                                            fontSize: 32,
                                                            color: '#000000',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#495057',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            Average Order Value
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: '#000000',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatCurrency(averageValue)}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{color: '#6c757d'}}
                                                    >
                                                        Per order
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Grid>

                                    <Grid>
                                        <Grow in timeout={1200}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <Inventory sx={{
                                                            fontSize: 32,
                                                            color: '#000000',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#495057',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            Unique Products
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: '#000000',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatNumber(uniqueProducts)}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{color: '#6c757d'}}
                                                    >
                                                        Products sold
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Grid>

                                </Grid>
                            </Card>
                        </Fade>

                        {chartData && chartData.length > 0 ? (
                            <>
                                <Fade in timeout={1400}>
                                    <Card sx={{...modernCardStyle, mb: 3}}>
                                        <CardContent sx={{p: 4}}>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    mb: 3,
                                                    fontWeight: 700,
                                                    color: '#000000'
                                                }}
                                            >
                                                Sales Trends ({getPeriodLabel()})
                                            </Typography>
                                            <Box sx={{height: 400}}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        data={chartData}
                                                        margin={{top: 5, right: 30, left: 20, bottom: 60}}
                                                    >
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            stroke="#f1f3f4"
                                                        />
                                                        <XAxis
                                                            dataKey="period"
                                                            tickFormatter={formatPeriod}
                                                            angle={-45}
                                                            textAnchor="end"
                                                            height={80}
                                                            stroke="#6c757d"
                                                        />
                                                        <YAxis
                                                            yAxisId="revenue"
                                                            orientation="left"
                                                            stroke="#6c757d"
                                                        />
                                                        <YAxis
                                                            yAxisId="orders"
                                                            orientation="right"
                                                            stroke="#6c757d"
                                                        />
                                                        <Tooltip
                                                            labelFormatter={formatPeriod}
                                                            formatter={(value, name) => {
                                                                if (name === 'Revenue') {
                                                                    return [formatCurrency(Number(value)), name];
                                                                }
                                                                return [formatNumber(Number(value)), name];
                                                            }}
                                                            contentStyle={{
                                                                backgroundColor: '#ffffff',
                                                                border: '1px solid #e9ecef',
                                                                borderRadius: '12px',
                                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                                                            }}
                                                        />
                                                        <Line
                                                            yAxisId="revenue"
                                                            type="monotone"
                                                            dataKey="totalRevenue"
                                                            stroke="#000000"
                                                            strokeWidth={3}
                                                            name="Revenue"
                                                            dot={{r: 6, fill: '#000000'}}
                                                            activeDot={{r: 8, fill: '#000000'}}
                                                        />
                                                        <Line
                                                            yAxisId="orders"
                                                            type="monotone"
                                                            dataKey="totalOrders"
                                                            stroke="#666666"
                                                            strokeWidth={3}
                                                            name="Orders"
                                                            dot={{r: 6, fill: '#666666'}}
                                                            activeDot={{r: 8, fill: '#666666'}}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Fade>

                                <Fade in timeout={1600}>
                                    <Card sx={modernCardStyle}>
                                        <CardContent sx={{p: 4}}>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    mb: 3,
                                                    fontWeight: 700,
                                                    color: '#000000'
                                                }}
                                            >
                                                Order Distribution ({getPeriodLabel()})
                                            </Typography>
                                            <Box sx={{height: 400}}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        data={chartData}
                                                        margin={{top: 5, right: 30, left: 20, bottom: 60}}
                                                    >
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            stroke="#f1f3f4"
                                                        />
                                                        <XAxis
                                                            dataKey="period"
                                                            tickFormatter={formatPeriod}
                                                            angle={-45}
                                                            textAnchor="end"
                                                            height={80}
                                                            stroke="#6c757d"
                                                        />
                                                        <YAxis stroke="#6c757d"/>
                                                        <Tooltip
                                                            labelFormatter={formatPeriod}
                                                            formatter={(value) => [formatNumber(Number(value)), 'Orders']}
                                                            contentStyle={{
                                                                backgroundColor: '#ffffff',
                                                                border: '1px solid #e9ecef',
                                                                borderRadius: '12px',
                                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                                                            }}
                                                        />
                                                        <Bar
                                                            dataKey="totalOrders"
                                                            fill="#000000"
                                                            name="Orders"
                                                            radius={[8, 8, 0, 0]}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Fade>
                            </>
                        ) : (
                            <Fade in timeout={1000}>
                                <Card sx={modernCardStyle}>
                                    <CardContent>
                                        <Box sx={{
                                            textAlign: 'center',
                                            py: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}>
                                            <Analytics sx={{
                                                fontSize: 80,
                                                color: '#dee2e6',
                                                mb: 2
                                            }}/>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    color: '#6c757d',
                                                    fontWeight: 600,
                                                    mb: 1
                                                }}
                                            >
                                                No Data Available
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: '#adb5bd',
                                                    maxWidth: '400px'
                                                }}
                                            >
                                                No data found for the selected filters. Try adjusting your filter
                                                criteria or check back later.
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Fade>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
};

export default DashboardPage;