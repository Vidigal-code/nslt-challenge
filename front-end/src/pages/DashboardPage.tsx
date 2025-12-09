/**
 *
 * 3.3. Component Documentation
 * • Use Storybook to document at least 2 main components. Examples:
 * • Table (for listing Products, Orders or Categories).
 * • Form (for creating/editing).
 *
 */
import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    CircularProgress,
    Select,
    SelectChangeEvent,
    Button, 
    Divider, 
    InputLabel, 
    Chip,
    FormControl,
    Fade,
    Container,
    Grow,
    Paper,
    useTheme,
    MenuItem,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart } from 'recharts';
import { DashboardChartItem } from "../types/interface/Interfaces";
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
import { useDashboardQuery } from '../shared/api/hooks';

const DashboardPage = () => {

    const theme = useTheme();


    const [filters, setFilters] = useState({
        category: '',
        product: '',
        start: '',
        end: '',
        period: 'daily'
    });

    const { data, isFetching, refetch } = useDashboardQuery(filters);

    const handleFilterChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        setFilters(prev => ({...prev, [field]: e.target.value}));
    };

    const handleApplyFilters = () => {
        refetch();
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
        borderRadius: '16px',
        boxShadow: theme.palette.mode === 'dark' 
            ? '0 4px 24px rgba(0, 0, 0, 0.5)'
            : '0 4px 24px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 40px rgba(0, 0, 0, 0.7)'
                : '0 8px 40px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
        }
    };

    const kpiCardStyle = {
        background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '20px',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 2px 16px rgba(0, 0, 0, 0.5)'
            : '0 2px 16px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.7)'
                : '0 8px 32px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        }
    };

    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
                border: 'none',
            },
            '&:hover': {
                backgroundColor: 'background.paper',
                boxShadow: theme.palette.mode === 'dark'
                    ? '0 2px 8px rgba(0, 0, 0, 0.5)'
                    : '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: `1px solid ${theme.palette.primary.main}`,
            },
            '&.Mui-focused': {
                backgroundColor: 'background.paper',
                boxShadow: theme.palette.mode === 'dark'
                    ? `0 0 0 3px ${theme.palette.primary.main}40`
                    : `0 0 0 3px ${theme.palette.primary.main}20`,
                border: `1px solid ${theme.palette.primary.main}`,
            }
        },
        '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: 'text.secondary',
            '&.Mui-focused': {
                color: 'primary.main',
            }
        }
    };

    const selectStyle = {
        borderRadius: '12px',
        backgroundColor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: theme.palette.mode === 'dark'
                ? '0 2px 8px rgba(0, 0, 0, 0.5)'
                : '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: `1px solid ${theme.palette.primary.main}`,
        },
        '&.Mui-focused': {
            backgroundColor: 'background.paper',
            boxShadow: theme.palette.mode === 'dark'
                ? `0 0 0 3px ${theme.palette.primary.main}40`
                : `0 0 0 3px ${theme.palette.primary.main}20`,
            border: `1px solid ${theme.palette.primary.main}`,
        }
    };

    const primaryButtonStyle = {
        borderRadius: '12px',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '14px',
        padding: '12px 24px',
        boxShadow: 3,
        '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-1px)',
        },
    };

    const secondaryButtonStyle = {
        background: 'transparent',
        color: 'primary.main',
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: '12px',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '14px',
        padding: '10px 24px',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            background: 'primary.main',
            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
            transform: 'translateY(-1px)',
        },
    };

    const chipStyle = {
        borderRadius: '8px',
        border: `1px solid ${theme.palette.primary.main}`,
        color: 'primary.main',
        backgroundColor: 'transparent',
        fontWeight: 500,
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(144, 202, 249, 0.08)'
                : 'rgba(25, 118, 210, 0.04)',
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            py: { xs: 2, md: 4 }
        }}>
            <Container maxWidth="xl">
                <Fade in timeout={800}>
                    <Paper sx={{
                        ...modernCardStyle,
                        mb: 4,
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                            : '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    gap: 2
                                }}>
                                    <Analytics sx={{ fontSize: 40, color: 'primary.main' }} />
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            color: 'text.primary',
                                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                                        }}
                                    >
                                        Sales Dashboard
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'text.secondary',
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
                                background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                                height: '2px',
                                border: 'none'
                            }} />

                            <Box sx={{mb: 3}}>
                                <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                                    <FilterList sx={{mr: 1, color: 'primary.main'}}/>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'text.primary'
                                        }}
                                    >
                                        Filters & Controls
                                    </Typography>
                                </Box>

                                <Box sx={{ 
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                    },
                                    gap: 3,
                                }}>
                                    <Box>
                                        <TextField
                                            label="Category ID"
                                            value={filters.category}
                                            onChange={handleFilterChange('category')}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="e.g., CAT001"
                                            sx={textFieldStyle}
                                        />
                                    </Box>

                                    <Box>
                                        <TextField
                                            label="Product ID"
                                            value={filters.product}
                                            onChange={handleFilterChange('product')}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="e.g., PROD001"
                                            sx={textFieldStyle}
                                        />
                                    </Box>

                                    <Box>
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
                                                startAdornment: <DateRange sx={{mr: 1, color: 'text.secondary'}}/>
                                            }}
                                        />
                                    </Box>

                                    <Box>
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
                                                startAdornment: <DateRange sx={{mr: 1, color: 'text.secondary'}}/>
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                fontWeight: 500,
                                                color: 'text.secondary',
                                                '&.Mui-focused': {color: 'primary.main'}
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
                                    </Box>

                                    <Box sx={{ 
                                        gridColumn: { xs: '1', md: '1 / -1' },
                                        display: 'flex',
                                        justifyContent: { xs: 'center', md: 'flex-end' },
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                            flexWrap: 'wrap'
                                        }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleApplyFilters}
                                                disabled={isFetching}
                                                startIcon={isFetching ? <CircularProgress size={20} color="inherit"/> :
                                                    <Search/>}
                                                sx={primaryButtonStyle}
                                            >
                                                {isFetching ? 'Applying...' : 'Apply Filters'}
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                onClick={handleClearFilters}
                                                disabled={isFetching}
                                                startIcon={<Clear/>}
                                                sx={secondaryButtonStyle}
                                            >
                                                Clear All
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{mt: 4}}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: 'text.secondary',
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
                                                    color: 'text.secondary',
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

                {isFetching && (
                    <Fade in timeout={300}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            py: 8
                        }}>
                            <CircularProgress
                                size={40}
                                sx={{color: 'primary.main'}}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    ml: 3,
                                    color: 'text.secondary',
                                    fontWeight: 500
                                }}
                            >
                                Loading dashboard data...
                            </Typography>
                        </Box>
                    </Fade>
                )}

                {!isFetching && data && (
                    <>

                        <Fade in timeout={1400}>
                            <Card sx={{...modernCardStyle, mb: 3}}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            sm: 'repeat(2, 1fr)',
                                            md: 'repeat(4, 1fr)',
                                        },
                                        gap: 3,
                                        mb: 4,
                                        mt: 3,
                                        px: 3,
                                    }}
                                >
                                    <Box>
                                        <Grow in timeout={800}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <AttachMoney sx={{
                                                            fontSize: 32,
                                                            color: 'primary.main',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: 'text.secondary',
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
                                                            color: 'text.primary',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatCurrency(totalRevenue)}
                                                    </Typography>
                                                    {bestPeriod && (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{color: 'text.secondary'}}
                                                        >
                                                            Best: {formatCurrency(bestPeriod.totalRevenue)}
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Box>

                                    <Box>
                                        <Grow in timeout={600}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <ShoppingCart sx={{
                                                            fontSize: 32,
                                                            color: 'primary.main',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: 'text.secondary',
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
                                                            color: 'text.primary',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatNumber(totalOrders)}
                                                    </Typography>
                                                    {totalPeriods > 0 && (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{color: 'text.secondary'}}
                                                        >
                                                            Across {totalPeriods} periods
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Box>

                                    <Box>
                                        <Grow in timeout={1000}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <TrendingUp sx={{
                                                            fontSize: 32,
                                                            color: 'primary.main',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: 'text.secondary',
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
                                                            color: 'text.primary',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatCurrency(averageValue)}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{color: 'text.secondary'}}
                                                    >
                                                        Per order
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Box>

                                    <Box>
                                        <Grow in timeout={1200}>
                                            <Card sx={kpiCardStyle}>
                                                <CardContent sx={{p: 3}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                        <Inventory sx={{
                                                            fontSize: 32,
                                                            color: 'primary.main',
                                                            mr: 2
                                                        }}/>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: 'text.secondary',
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
                                                            color: 'text.primary',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {formatNumber(uniqueProducts)}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{color: 'text.secondary'}}
                                                    >
                                                        Products sold
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grow>
                                    </Box>

                                </Box>
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
                                                    color: 'text.primary'
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
                                                            stroke={theme.palette.divider}
                                                        />
                                                        <XAxis
                                                            dataKey="period"
                                                            tickFormatter={formatPeriod}
                                                            angle={-45}
                                                            textAnchor="end"
                                                            height={80}
                                                            stroke={theme.palette.text.secondary}
                                                        />
                                                        <YAxis
                                                            yAxisId="revenue"
                                                            orientation="left"
                                                            stroke={theme.palette.text.secondary}
                                                        />
                                                        <YAxis
                                                            yAxisId="orders"
                                                            orientation="right"
                                                            stroke={theme.palette.text.secondary}
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
                                                                backgroundColor: theme.palette.background.paper,
                                                                border: `1px solid ${theme.palette.divider}`,
                                                                borderRadius: '12px',
                                                                boxShadow: theme.palette.mode === 'dark'
                                                                    ? '0 8px 32px rgba(0, 0, 0, 0.7)'
                                                                    : '0 8px 32px rgba(0, 0, 0, 0.12)',
                                                                color: theme.palette.text.primary,
                                                            }}
                                                        />
                                                        <Line
                                                            yAxisId="revenue"
                                                            type="monotone"
                                                            dataKey="totalRevenue"
                                                            stroke={theme.palette.primary.main}
                                                            strokeWidth={3}
                                                            name="Revenue"
                                                            dot={{r: 6, fill: theme.palette.primary.main}}
                                                            activeDot={{r: 8, fill: theme.palette.primary.main}}
                                                        />
                                                        <Line
                                                            yAxisId="orders"
                                                            type="monotone"
                                                            dataKey="totalOrders"
                                                            stroke={theme.palette.secondary.main}
                                                            strokeWidth={3}
                                                            name="Orders"
                                                            dot={{r: 6, fill: theme.palette.secondary.main}}
                                                            activeDot={{r: 8, fill: theme.palette.secondary.main}}
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
                                                    color: 'text.primary'
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
                                                            stroke={theme.palette.divider}
                                                        />
                                                        <XAxis
                                                            dataKey="period"
                                                            tickFormatter={formatPeriod}
                                                            angle={-45}
                                                            textAnchor="end"
                                                            height={80}
                                                            stroke={theme.palette.text.secondary}
                                                        />
                                                        <YAxis stroke={theme.palette.text.secondary}/>
                                                        <Tooltip
                                                            labelFormatter={formatPeriod}
                                                            formatter={(value) => [formatNumber(Number(value)), 'Orders']}
                                                            contentStyle={{
                                                                backgroundColor: theme.palette.background.paper,
                                                                border: `1px solid ${theme.palette.divider}`,
                                                                borderRadius: '12px',
                                                                boxShadow: theme.palette.mode === 'dark'
                                                                    ? '0 8px 32px rgba(0, 0, 0, 0.7)'
                                                                    : '0 8px 32px rgba(0, 0, 0, 0.12)',
                                                                color: theme.palette.text.primary,
                                                            }}
                                                        />
                                                        <Bar
                                                            dataKey="totalOrders"
                                                            fill={theme.palette.primary.main}
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
                                                color: 'action.disabled',
                                                mb: 2
                                            }}/>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontWeight: 600,
                                                    mb: 1
                                                }}
                                            >
                                                No Data Available
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: 'text.secondary',
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