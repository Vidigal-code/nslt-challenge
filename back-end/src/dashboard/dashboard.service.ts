import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { Order } from '../order/order.schema';
import { Product } from '../product/product.schema';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    async getAggregatedData(filters: {
        categoryId?: string;
        productId?: string;
        startDate?: Date;
        endDate?: Date;
        period?: string;
    }) {
        const pipeline = await this.buildPipeline(filters);
        const chartData = await this.orderModel.aggregate(pipeline).exec();

        return {
            kpis: this.calculateKPIs(chartData),
            chartData: chartData.map(item => ({
                period: item.period,
                totalOrders: item.totalOrders,
                totalRevenue: item.totalRevenue,
                averageOrderValue: item.averageOrderValue
            }))
        };
    }

    private async buildPipeline(filters: any): Promise<PipelineStage[]> {
        const pipeline: PipelineStage[] = [];
        const matchStage: Record<string, any> = {};

        if (filters.productId) {
            if (!Types.ObjectId.isValid(filters.productId)) {
                throw new Error('Invalid productId: Must be 24-character hex');
            }
            matchStage.productIds = filters.productId;
        }

        if (filters.categoryId) {
            if (!Types.ObjectId.isValid(filters.categoryId)) {
                throw new Error('Invalid categoryId: Must be 24-character hex');
            }
            const products = await this.productModel.find({
                categoryIds: filters.categoryId
            }).select('_id').lean();

            if (!products.length) return [];
            const productIds = products.map(p => p._id.toString());
            matchStage.productIds = { $in: productIds };
        }

        if (filters.startDate && filters.endDate) {
            matchStage.date = {
                $gte: new Date(filters.startDate),
                $lte: new Date(filters.endDate)
            };
        }

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        pipeline.push(
            { $unwind: '$productIds' },
            {
                $match: {
                    $expr: {
                        $regexMatch: {
                            input: '$productIds',
                            regex: /^[0-9a-fA-F]{24}$/i
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    let: { productIdStr: '$productIds' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$_id',
                                        { $toObjectId: '$$productIdStr' }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $group: {
                    _id: this.getDateGroup(filters.period || 'daily'),
                    date: { $first: '$date' },
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$total' },
                    averageOrderValue: { $avg: '$total' },
                    products: { $addToSet: '$product.name' },
                    uniqueProductIds: { $addToSet: '$product._id' }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: '$_id',
                    totalOrders: 1,
                    totalRevenue: { $round: ['$totalRevenue', 2] },
                    averageOrderValue: { $round: ['$averageOrderValue', 2] },
                    products: 1,
                    uniqueProductIds: 1
                }
            },
            { $sort: { 'period.date': 1 } }
        );

        return pipeline;
    }

    private calculateKPIs(data: any[]): any {
        const result = data.reduce((acc, item) => ({
            totalOrders: acc.totalOrders + item.totalOrders,
            totalRevenue: acc.totalRevenue + item.totalRevenue,
            uniqueProducts: new Set([...acc.uniqueProducts, ...item.products]),
            uniqueProductIds: new Set([...acc.uniqueProductIds, ...item.uniqueProductIds])
        }), {
            totalOrders: 0,
            totalRevenue: 0,
            uniqueProducts: new Set<string>(),
            uniqueProductIds: new Set<string>()
        });

        return {
            totalOrders: result.totalOrders,
            totalRevenue: Number(result.totalRevenue.toFixed(2)),
            averageOrderValue: result.totalOrders > 0
                ? Number((result.totalRevenue / result.totalOrders).toFixed(2))
                : 0,
            uniqueProducts: result.uniqueProducts.size,
            totalPeriods: data.length,
            bestPeriod: data.length > 0
                ? data.reduce((max, curr) => curr.totalRevenue > max.totalRevenue ? curr : max)
                : null
        };
    }

    private getDateGroup(period: string) {
        const config = {
            daily: {
                date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
            },
            weekly: {
                year: { $isoWeekYear: '$date' },
                week: { $isoWeek: '$date' },
                date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
            },
            monthly: {
                year: { $year: '$date' },
                month: { $month: '$date' },
                date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
            }
        };
        return config[period as keyof typeof config] || config.daily;
    }
}