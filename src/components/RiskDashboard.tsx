import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Bug, Wifi, Lock } from 'lucide-react';

interface RiskDashboardProps {
  detailed?: boolean;
}

const RiskDashboard: React.FC<RiskDashboardProps> = ({ detailed = false }) => {
  const threats = [
    { name: 'Malware', count: 0, risk: 'Low', icon: Bug, color: 'emerald' },
    { name: 'Trojans', count: 2, risk: 'High', icon: Bug, color: 'red' },
    { name: 'Network Intrusions', count: 1, risk: 'Medium', icon: Wifi, color: 'yellow' },
    { name: 'Ransomware', count: 0, risk: 'Low', icon: Lock, color: 'emerald' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Threat Analysis Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {threats.map((threat, index) => {
                const Icon = threat.icon;
                return (
                  <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 text-${threat.color}-400`} />
                        <div>
                          <div className="font-semibold text-white">{threat.name}</div>
                          <div className="text-sm text-slate-400">Active threats detected</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{threat.count}</div>
                        <Badge className={`${getRiskColor(threat.risk)} bg-transparent border-current`}>
                          {threat.risk}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={threat.count > 0 ? Math.min(threat.count / 5 * 100, 100) : 0} 
                      className="h-2 bg-slate-600"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
          <CardHeader>
            <CardTitle className="text-amber-100">Security Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-300">High Priority</div>
                  <div className="text-sm text-yellow-200">2 Trojans detected in quarantine require immediate attention</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-300">Medium Priority</div>
                  <div className="text-sm text-blue-200">Network monitoring detected 1 intrusion attempt</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
      <CardHeader>
        <CardTitle className="text-amber-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Risk Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threats.map((threat, index) => {
            const Icon = threat.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 text-${threat.color}-400`} />
                  <span className="text-white">{threat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{threat.count}</span>
                  <Badge className={`${getRiskColor(threat.risk)} bg-transparent border-current text-xs`}>
                    {threat.risk}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskDashboard;
