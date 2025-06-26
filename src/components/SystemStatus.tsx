
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, CheckCircle, Zap, Activity } from 'lucide-react';
import { DinosaurIcon } from './DinosaurIcons';

interface SystemStatusProps {
  status: {
    protection: string;
    lastScan: string;
    threatsBlocked: number;
    systemHealth: number;
  };
}

const SystemStatus: React.FC<SystemStatusProps> = ({ status }) => {
  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <DinosaurIcon type="triceratops" className="w-5 h-5 text-emerald-400" />
            System Protection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-teal-300">Real-time Protection</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400">
                  Active
                </Badge>
              </div>
              <Progress value={100} className="h-2 bg-slate-700">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" />
              </Progress>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-teal-300">System Health</span>
                <span className="text-amber-300 font-semibold">{status.systemHealth}%</span>
              </div>
              <Progress value={status.systemHealth} className="h-2 bg-slate-700">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all" />
              </Progress>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <DinosaurIcon type="trex" className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-red-300">{status.threatsBlocked}</div>
              <div className="text-sm text-slate-400">Threats Blocked</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-teal-400" />
              </div>
              <div className="text-2xl font-bold text-teal-300">{status.lastScan}</div>
              <div className="text-sm text-slate-400">Last Scan</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <DinosaurIcon type="brontosaurus" className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-300">Safe</div>
              <div className="text-sm text-slate-400">Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-400/30 hover:from-amber-500/30 hover:to-amber-600/30 transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <DinosaurIcon type="raptor" className="w-8 h-8 text-amber-300 mx-auto mb-2" />
            <div className="text-amber-100 font-semibold">Quick Scan</div>
            <div className="text-amber-300 text-sm">~2 minutes</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 border-teal-400/30 hover:from-teal-500/30 hover:to-teal-600/30 transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <DinosaurIcon type="stegosaurus" className="w-8 h-8 text-teal-300 mx-auto mb-2" />
            <div className="text-teal-100 font-semibold">Full Scan</div>
            <div className="text-teal-300 text-sm">~45 minutes</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400/30 hover:from-purple-500/30 hover:to-purple-600/30 transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <DinosaurIcon type="pteranodon" className="w-8 h-8 text-purple-300 mx-auto mb-2" />
            <div className="text-purple-100 font-semibold">Deep Scan</div>
            <div className="text-purple-300 text-sm">~2 hours</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemStatus;
