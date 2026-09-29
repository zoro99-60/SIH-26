import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon: React.ReactNode;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  trendValue,
  icon,
  className,
}) => {
  return (
    <Card
      className={cn(
        "bg-white border border-slate-200/90 rounded-lg shadow-sm hover:shadow transition-shadow font-sans",
        className
      )}
    >
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase font-semibold text-slate-500 tracking-wider">
              {title}
            </span>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {value}
            </div>
          </div>

          {/* Prominent icon with a light amber background circle */}
          <div className="h-11 w-11 rounded-full bg-amber-50 text-[#D97706] border border-amber-200/60 flex items-center justify-center shrink-0 shadow-sm">
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                  className: cn(
                    "h-5 w-5 stroke-[2.25] text-[#D97706]",
                    (icon.props as { className?: string })?.className
                  ),
                })
              : icon}
          </div>
        </div>

        {/* Trend Indicator */}
        {(trend || trendValue) && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold">
            {trend === 'up' && (
              <span className="inline-flex items-center gap-0.5 text-[#10B981] font-bold">
                <ArrowUp className="h-3.5 w-3.5 stroke-[2.5]" />
                {trendValue}
              </span>
            )}
            {trend === 'down' && (
              <span className="inline-flex items-center gap-0.5 text-[#EF4444] font-bold">
                <ArrowDown className="h-3.5 w-3.5 stroke-[2.5]" />
                {trendValue}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiCard;
