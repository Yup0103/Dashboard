import { ResponsiveFunnel } from '@nivo/funnel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDownIcon } from "lucide-react";

const CustomTooltip = ({ datum }: any) => (
  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
    <div className="text-white font-medium">{datum.id}</div>
    <div className="text-purple-300 text-sm">
      Value: <span className="font-semibold">{datum.value.toLocaleString()}</span>
    </div>
    <div className="text-purple-300 text-sm">
      Percentage: <span className="font-semibold">{datum.formattedValue}</span>
    </div>
  </div>
);

const FunnelChart = () => {
  const funnelData = [
    { id: 'Impressions', value: 15420, label: 'Impressions' },
    { id: 'Clicks', value: 8750, label: 'Clicks' },
    { id: 'Conversions', value: 3200, label: 'Conversions' },
    { id: 'Sales', value: 1250, label: 'Sales' }
  ];

  const performanceMetrics = [
    { label: 'Total Revenue', value: '₹8.7M', change: '+18.3%', icon: '₹' },
    { label: 'Total Spend', value: '₹2.4M', change: '+12.5%', icon: '💰' },
    { label: 'ROI', value: '3.6x', change: '+5.2%', icon: '📈' },
    { label: 'Total Conversions', value: '12.4K', change: '+22.1%', icon: '🎯' },
    { label: 'CPC', value: '₹2.69', change: '-3.2%', icon: '💳' },
    { label: 'CPM', value: '₹53.10', change: '-1.8%', icon: '📊' },
    { label: 'CPC Cost', value: '₹193.55', change: '-7.8%', icon: '💸' },
    { label: 'Total Customers', value: '45.2K', change: '+15.7%', icon: '👥' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
        <CardHeader>
          <CardTitle className="text-purple-100 flex items-center gap-2">
            <TrendingDownIcon className="w-6 h-6 text-purple-400" />
            Conversion Funnel
          </CardTitle>
          <CardDescription className="text-purple-300">
            Track your funnel conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-4">
            <ResponsiveFunnel
              data={funnelData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              valueFormat=" >-.0f"
              colors={['#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE']}
              borderWidth={2}
              labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
              beforeSeparatorLength={100}
              beforeSeparatorOffset={20}
              afterSeparatorLength={100}
              afterSeparatorOffset={20}
              currentPartSizeExtension={10}
              currentBorderWidth={40}
              motionConfig="wobbly"
              tooltip={CustomTooltip}
              theme={{
                background: 'transparent',
                text: {
                  fontSize: 12,
                  fill: '#E5E7EB',
                },
                tooltip: {
                  container: {
                    background: '#1F2937',
                    color: '#F3F4F6',
                    fontSize: '12px',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics Grid */}
      <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
        <CardHeader>
          <CardTitle className="text-purple-100 flex items-center gap-2">
            📊 Funnel Performance
          </CardTitle>
          <CardDescription className="text-purple-300">
            Key business performance indicators at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300 text-sm">{metric.label}</span>
                  <span className="text-lg">{metric.icon}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-white text-xl font-bold">{metric.value}</div>
                  <div className={`text-xs font-medium ${
                    metric.change.startsWith('+') ? 'text-green-400' : 
                    metric.change.startsWith('-') ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunnelChart;