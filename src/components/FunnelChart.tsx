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
    { label: 'Click Rate', value: '56.7%', color: 'text-green-400' },
    { label: 'Conversion Rate', value: '36.6%', color: 'text-blue-400' },
    { label: 'Overall Rate', value: '20.8%', color: 'text-yellow-400' },
    { label: 'Total Drop-off', value: '63.4%', color: 'text-red-400' }
  ];

  return (
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
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Funnel Chart */}
          <div className="flex-1">
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
          </div>

          {/* Performance Metrics */}
          <div className="lg:w-64">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/20">
              <h3 className="text-purple-100 font-semibold mb-4 flex items-center gap-2">
                <TrendingDownIcon className="w-4 h-4" />
                Funnel Performance
              </h3>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-purple-300 text-sm">{metric.label}</span>
                    <span className={`font-semibold text-sm ${metric.color}`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;