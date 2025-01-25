/**
 * @author Healium Digital
 * Funnel Chart Component
 * Visualizes conversion funnel with stages and metrics
 */

import React from 'react';
import { ResponsiveFunnel, FunnelDatum } from '@nivo/funnel';

interface FunnelData extends FunnelDatum {
  id: string;
  value: number;
  label: string;
}

interface TooltipProps {
  part: {
    data: FunnelData;
    formattedValue: string | number;
    color: string;
  };
}

const CustomTooltip = ({ part }: TooltipProps): JSX.Element | null => {
  if (!part || !part.data) return null;
  
  const maxValue = part.data.value; // First item (Impressions) has the max value
  const percentage = ((part.data.value / maxValue) * 100).toFixed(1);
  
  return (
    <div className="bg-[#1A0B2E] text-white p-3 rounded-lg shadow-lg border border-[#4A148C]">
      <p className="font-bold text-base">{part.data.label} ({percentage}%)</p>
      <p className="text-sm mt-1">Value: {part.data.value.toLocaleString()}</p>
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
}

const FunnelChart = ({
  data = [
    {
      id: "Impressions",
      value: 15420,
      label: "Impressions"
    },
    {
      id: "Clicks",
      value: 8750,
      label: "Clicks"
    },
    {
      id: "Conversions",
      value: 3200,
      label: "Conversions"
    }
  ],
  colors = ['#2D1B69', '#4C1D95', '#6D28D9'],
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  direction = 'horizontal',
  interpolation = 'smooth',
  valueFormat = (value: number) => value.toLocaleString(),
  shapeBlending = 0.8,
  spacing = 4,
  borderWidth = 0,
  enableLabel = true,
  labelColor = "#E9D5FF",
  labelPosition = "inside",
  theme = {
    labels: {
      text: {
        fontSize: 14,
        fill: '#E9D5FF',
        fontWeight: 600
      }
    }
  },
  defs = [
    {
      id: 'gradient1',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#2D1B69' },
        { offset: 100, color: '#4C1D95' }
      ]
    },
    {
      id: 'gradient2',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#4C1D95' },
        { offset: 100, color: '#6D28D9' }
      ]
    },
    {
      id: 'gradient3',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#6D28D9' },
        { offset: 100, color: '#8B5CF6' }
      ]
    }
  ],
  fill = [
    { match: { id: 'Impressions' }, id: 'gradient1' },
    { match: { id: 'Clicks' }, id: 'gradient2' },
    { match: { id: 'Conversions' }, id: 'gradient3' }
  ],
}: FunnelChartProps): JSX.Element => {
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
    tooltip: CustomTooltip
  };

  return (
    <div style={{ width: '100%', height: '400px', minWidth: '600px' }}>
      <ResponsiveFunnel<FunnelData> {...funnelProps} />
    </div>
  );
};

export default FunnelChart;