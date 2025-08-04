/**
 * @author Healium Digital
 * Executive Funnel Chart Component
 * Professional conversion funnel visualization for executive presentations
 */

import React from 'react';
import { ResponsiveFunnel, FunnelDatum } from '@nivo/funnel';
import { TrendingDownIcon, TrendingUpIcon, UsersIcon, MousePointerClickIcon, TargetIcon, BarChart3Icon } from 'lucide-react';

interface FunnelData extends FunnelDatum {
  id: string;
  value: number;
  label: string;
  icon?: React.ComponentType<any>;
  color?: string;
  dropOff?: number;
}

interface TooltipProps {
  part: {
    data: FunnelData;
    formattedValue: string | number;
    color: string;
  };
  allData: FunnelData[];
}

const CustomTooltip = ({ part, allData }: TooltipProps): JSX.Element | null => {
  if (!part || !part.data || !allData || allData.length === 0) return null;
  
  const maxValue = allData[0].value; // First item (Impressions) has the max value
  const percentage = ((part.data.value / maxValue) * 100).toFixed(1);
  const IconComponent = part.data.icon || UsersIcon;
  
  return (
    <div className="bg-[#1A0B2E]/95 backdrop-blur-sm text-white p-6 rounded-lg shadow-xl border border-purple-500/30 min-w-[320px]">
      {/* Stage Analysis Header */}
      <div className="flex items-center gap-2 mb-4">
        <UsersIcon className="w-5 h-5 text-purple-300" />
        <h3 className="text-sm font-semibold text-purple-200">Stage Analysis</h3>
      </div>
      
      {/* Current Stage Details */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <IconComponent className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <p className="font-bold text-base text-white">{part.data.label}</p>
          <p className="text-sm text-purple-300">{percentage}% of total funnel</p>
        </div>
      </div>
      
      {/* All Stages Overview */}
      <div className="space-y-3">
        {allData.map((item, index) => {
          const isCurrentStage = item.id === part.data.id;
          const stagePercentage = ((item.value / maxValue) * 100).toFixed(1);
          
          return (
            <div key={item.id} className={`flex items-center justify-between p-2 rounded ${
              isCurrentStage ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-transparent'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className={`text-sm ${isCurrentStage ? 'text-white font-medium' : 'text-purple-300'}`}>
                  {item.label}
                </span>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${isCurrentStage ? 'text-white' : 'text-purple-200'}`}>
                  {item.value.toLocaleString()}
                </p>
                <p className={`text-xs ${isCurrentStage ? 'text-purple-200' : 'text-purple-400'}`}>
                  {stagePercentage}%
                </p>
                {item.dropOff !== undefined && item.dropOff > 0 && (
                  <div className="flex items-center gap-1 justify-end">
                    <TrendingDownIcon className="w-3 h-3 text-red-400" />
                    <span className="text-xs text-red-400">-{item.dropOff}%</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface FunnelChartProps {
  data?: FunnelData[];
  colors?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  direction?: 'horizontal' | 'vertical';
  interpolation?: 'smooth' | 'linear';
  valueFormat?: (value: number) => string;
  shapeBlending?: number;
  spacing?: number;
  borderWidth?: number;
  enableLabel?: boolean;
  labelColor?: string;
  labelPosition?: 'inside' | 'outside';
  theme?: any;
  defs?: any[];
  fill?: any[];
  showDropOff?: boolean;
}

const FunnelChart = ({
  data = [
    {
      id: "Impressions",
      value: 15420,
      label: "Impressions",
      icon: UsersIcon,
      color: '#4F46E5',
      dropOff: 0
    },
    {
      id: "Clicks",
      value: 8750,
      label: "Clicks",
      icon: MousePointerClickIcon,
      color: '#7C3AED',
      dropOff: 43.3
    },
    {
      id: "Conversions",
      value: 3200,
      label: "Conversions",
      icon: TargetIcon,
      color: '#EC4899',
      dropOff: 63.4
    }
  ],
  colors = ['#4F46E5', '#7C3AED', '#EC4899'],
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  direction = 'horizontal',
  interpolation = 'smooth',
  valueFormat = (value: number) => value.toLocaleString(),
  shapeBlending = 0.9,
  spacing = 6,
  borderWidth = 0,
  enableLabel = true,
  labelColor = "#E9D5FF",
  labelPosition = "inside",
  theme = {
    labels: {
      text: {
        fontSize: 16,
        fill: '#E9D5FF',
        fontWeight: 600,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
      }
    }
  },
  defs = [
    {
      id: 'impressionsGradient',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#4F46E5' },
        { offset: 100, color: '#6366F1' }
      ]
    },
    {
      id: 'clicksGradient',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#7C3AED' },
        { offset: 100, color: '#8B5CF6' }
      ]
    },
    {
      id: 'conversionsGradient',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#EC4899' },
        { offset: 100, color: '#F472B6' }
      ]
    }
  ],
  fill = [
    { match: { id: 'Impressions' }, id: 'impressionsGradient' },
    { match: { id: 'Clicks' }, id: 'clicksGradient' },
    { match: { id: 'Conversions' }, id: 'conversionsGradient' }
  ],
  showDropOff = true,
}: FunnelChartProps): JSX.Element => {
  const CustomTooltipWrapper = (props: any) => (
    <CustomTooltip {...props} allData={data} />
  );

  const funnelProps = {
    data,
    margin,
    direction,
    valueFormat,
    interpolation,
    shapeBlending,
    spacing,
    colors,
    borderWidth,
    enableLabel,
    labelColor,
    label: (d: FunnelData) => {
      const maxValue = data[0].value;
      const percentage = ((d.value / maxValue) * 100).toFixed(1);
      return `${d.label} (${percentage}%)`;
    },
    labelPosition,
    theme,
    defs,
    fill,
    tooltip: CustomTooltipWrapper,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15
  };

  // Calculate key metrics
  const clickRate = ((data[1].value / data[0].value) * 100).toFixed(1);
  const conversionRate = ((data[2].value / data[1].value) * 100).toFixed(1);
  const overallRate = ((data[2].value / data[0].value) * 100).toFixed(1);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Main Funnel Chart */}
      <div className="w-full h-full">
        <ResponsiveFunnel<FunnelData> {...funnelProps} />
      </div>
      
      {/* Funnel Performance Panel - Separate Section */}
      <div className="absolute top-4 right-4 bg-[#1A0B2E]/95 backdrop-blur-sm rounded-lg border border-purple-500/20 p-4 min-w-[280px]">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3Icon className="w-5 h-5 text-purple-300" />
          <h3 className="text-sm font-semibold text-purple-200">Funnel Performance</h3>
        </div>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300 mb-1">Click Rate</p>
            <p className="text-lg font-bold text-emerald-400">{clickRate}%</p>
          </div>
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300 mb-1">Conversion Rate</p>
            <p className="text-lg font-bold text-emerald-400">{conversionRate}%</p>
          </div>
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300 mb-1">Overall Rate</p>
            <p className="text-lg font-bold text-emerald-400">{overallRate}%</p>
          </div>
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300 mb-1">Total Drop-off</p>
            <p className="text-lg font-bold text-red-400">{data[2].dropOff}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;