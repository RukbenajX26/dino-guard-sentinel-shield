
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Database, Users, Activity, Clock, Zap } from 'lucide-react';
import { DinosaurIcon } from '@/components/DinosaurIcons';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import ScanPanel from '@/components/ScanPanel';
import QuarantinePanel from '@/components/QuarantinePanel';
import WhitelistPanel from '@/components/WhitelistPanel';
import RiskDashboard from '@/components/RiskDashboard';
import SystemStatus from '@/components/SystemStatus';
import DinosaurAccents from '@/components/DinosaurAccents';

const DinosaurKingAntivirus = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemStatus, setSystemStatus] = useState({
    protection: 'Active',
    lastScan: '2 hours ago',
    threatsBlocked: 127,
    systemHealth: 95
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 relative">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="bg-slate-800/90 backdrop-blur-sm border-b border-amber-200/20 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <DinosaurIcon type="trex" className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-100">Dinosaur King Security</h1>
                <p className="text-teal-300 text-sm">Premium Protection Suite</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-400">
                {systemStatus.protection}
              </Badge>
              <Button variant="ghost" className="text-amber-200 hover:text-amber-100">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 backdrop-blur-sm border border-amber-200/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-200">
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="scan" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-200">
              <DinosaurIcon type="raptor" className="w-4 h-4 mr-2" />
              Scan
            </TabsTrigger>
            <TabsTrigger value="quarantine" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-200">
              <DinosaurIcon type="trex" className="w-4 h-4 mr-2" />
              Quarantine
            </TabsTrigger>
            <TabsTrigger value="whitelist" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-200">
              <DinosaurIcon type="brontosaurus" className="w-4 h-4 mr-2" />
              Whitelist
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-200">
              <Database className="w-4 h-4 mr-2" />
              Threats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SystemStatus status={systemStatus} />
              </div>
              <div className="space-y-6">
                <RiskDashboard />
                <DinosaurAccents />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scan" className="mt-6">
            <ScanPanel />
          </TabsContent>

          <TabsContent value="quarantine" className="mt-6">
            <QuarantinePanel />
          </TabsContent>

          <TabsContent value="whitelist" className="mt-6">
            <WhitelistPanel />
          </TabsContent>

          <TabsContent value="threats" className="mt-6">
            <RiskDashboard detailed={true} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DinosaurKingAntivirus;
