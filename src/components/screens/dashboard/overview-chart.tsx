'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts';
import { useDir } from '@/hooks/use-dir';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const data = [
  {
    month: 'Jan',
    sales: 4000,
  },
  {
    month: 'Feb',
    sales: 3000,
  },
  {
    month: 'Mar',
    sales: 2000,
  },
  {
    month: 'Apr',
    sales: 2780,
  },
  {
    month: 'May',
    sales: 1890,
  },
  {
    month: 'Jun',
    sales: 2390,
  },
  {
    month: 'Jul',
    sales: 3490,
  },
  {
    month: 'Aug',
    sales: 4000,
  },
  {
    month: 'Sep',
    sales: 3000,
  },
  {
    month: 'Oct',
    sales: 2000,
  },
  {
    month: 'Nov',
    sales: 2780,
  },
  {
    month: 'Dec',
    sales: 1890,
  },
];

type OverviewChartProps = {
  title: string;
};

export const OverviewChart = ({ title }: OverviewChartProps) => {
  const direction = useDir();

  useEffect(() => {
    // Suppressing defaultProps warning from recharts until it's fixed
    const error = console.error;
    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };
  }, []);

  return (
    <Card className='lg:col-span-4'>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' className='!h-[240px] md:!h-[350px]'>
          <BarChart
            style={{ direction: 'ltr' }}
            margin={{ left: 0, right: 0 }}
            data={data}
            width={500}
            height={300}>
            <XAxis
              tickLine={false}
              axisLine={false}
              dataKey='month'
              strokeWidth={0}
              className='fill-accent-foreground text-sm ltr:font-inter rtl:font-hanuman'
              style={{
                fill: 'var(--accent-foreground)',
                fontFamily: 'var(--font-inter)',
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              orientation={direction === 'rtl' ? 'right' : 'left'}
              className='fill-accent-foreground text-sm'
              tickFormatter={(v) => `$${v}`}
              style={{
                fill: 'var(--accent-foreground)',
              }}
            />
            <Tooltip
              wrapperClassName='!bg-popover !rounded-md !border-border !text-popover-foreground'
              labelClassName='!text-popover-foreground'
              content={<TooltipContent />}
              cursor={{
                className: 'fill-accent',
              }}
            />
            <Bar dataKey='sales' className='fill-primary' radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const TooltipContent = ({ payload, active, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <Card className='!rounded-md !border-border !bg-popover !text-popover-foreground'>
        <CardHeader className='p-4 pb-0'>{label}</CardHeader>
        <CardContent className='p-4 pt-0'>
          <p className='text-sm'>Sales: ${payload[0].value}</p>
        </CardContent>
      </Card>
    );
  }

  return null;
};
