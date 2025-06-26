
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, FileText, Activity } from 'lucide-react';
import { DinosaurIcon } from './DinosaurIcons';
import { useRealTimeScanning } from '@/hooks/useRealTimeScanning';

const ScanPanel = () => {
  const { scanStats, startScan, stopScan } = useRealTimeScanning();
  const [scanType, setScanType] = useState<'quick' | 'full' | 'deep' | null>(null);

  const handleStartScan = (type: 'quick' | 'full' | 'deep') => {
    setScanType(type);
    startScan();
  };

  const handleStopScan = () => {
    stopScan();
    setScanType(null);
  };

  const scanTypes = [
    {
      id: 'quick',
      title: 'Quick Scan',
      description: 'Scans common threat locations',
      icon: 'raptor',
      color: 'amber',
      time: '2-5 minutes',
      gradient: 'from-amber-500/20 to-amber-600/20',
      border: 'border-amber-400/30',
      iconColor: 'text-amber-300'
    },
    {
      id: 'full',
      title: 'Full System Scan',
      description: 'Complete system scan',
      icon: 'stegosaurus',
      color: 'teal',
      time: '30-60 minutes',
      gradient: 'from-teal-500/20 to-teal-600/20',
      border: 'border-teal-400/30',
      iconColor: 'text-teal-300'
    },
    {
      id: 'deep',
      title: 'Deep Scan',
      description: 'Thorough rootkit and malware detection',
      icon: 'pteranodon',
      color: 'purple',
      time: '1-3 hours',
      gradient: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-400/30',
      iconColor: 'text-purple-300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Scan Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scanTypes.map((scan) => (
          <Card 
            key={scan.id}
            className={`bg-gradient-to-br ${scan.gradient} ${scan.border} hover:scale-105 transition-all cursor-pointer`}
            onClick={() => !scanStats.isScanning && handleStartScan(scan.id as any)}
          >
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <DinosaurIcon type={scan.icon as any} className={`w-12 h-12 ${scan.iconColor} mx-auto`} />
                <div>
                  <h3 className="text-lg font-semibold text-white">{scan.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">{scan.description}</p>
                  <Badge variant="outline" className="mt-2 bg-black/20 text-slate-300 border-slate-500">
                    {scan.time}
                  </Badge>
                </div>
                <Button 
                  className="w-full"
                  disabled={scanStats.isScanning}
                  variant={scanStats.isScanning && scanType === scan.id ? "destructive" : "default"}
                >
                  {scanStats.isScanning && scanType === scan.id ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Scan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Scan Progress */}
      {scanStats.isScanning && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400 animate-pulse" />
                Real-time Scan Progress
              </span>
              <Button variant="outline" size="sm" onClick={handleStopScan} className="border-red-400 text-red-300 hover:bg-red-500/20">
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-teal-300">Progress</span>
                <span className="text-amber-300">{scanStats.progress}%</span>
              </div>
              <Progress value={scanStats.progress} className="h-3 bg-slate-700">
                <div className="h-full bg-gradient-to-r from-amber-500 to-teal-500 rounded-full transition-all scan-progress" />
              </Progress>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Files Scanned:</span>
                <span className="text-teal-300">{scanStats.filesScanned.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Threats Found:</span>
                <span className="text-red-300">{scanStats.threatsFound}</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-slate-400">Currently scanning: </span>
              <span className="text-amber-300">{scanStats.currentFile}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Results */}
      {scanStats.results.length > 0 && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
          <CardHeader>
            <CardTitle className="text-amber-100">Scan Results - Dinosaur Classification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {scanStats.results.slice(-10).map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DinosaurIcon 
                      type={
                        result.dinoType === 'carnivore' ? 'trex' : 
                        result.dinoType === 'omnivore' ? 'raptor' : 
                        'brontosaurus'
                      } 
                      className={`w-5 h-5 ${
                        result.status === 'infected' ? 'text-red-400' :
                        result.status === 'suspicious' ? 'text-yellow-400' :
                        'text-emerald-400'
                      }`} 
                    />
                    <div>
                      <div className="text-sm font-medium text-white">{result.fileName}</div>
                      <div className="text-xs text-slate-400">
                        {result.dinoType === 'carnivore' ? 'Dangerous Carnivore' :
                         result.dinoType === 'omnivore' ? 'Suspicious Omnivore' :
                         'Safe Herbivore'}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={result.status === 'infected' ? "destructive" : result.status === 'suspicious' ? "default" : "outline"} 
                    className={
                      result.status === 'clean' ? 'border-emerald-400 text-emerald-300' : 
                      result.status === 'suspicious' ? 'border-yellow-400 text-yellow-300' :
                      ''
                    }
                  >
                    {result.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Scan Results */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
        <CardHeader>
          <CardTitle className="text-amber-100">Recent Scan Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'Quick Scan', date: '2 hours ago', threats: 0, status: 'Clean' },
              { type: 'Full Scan', date: '1 day ago', threats: 2, status: 'Quarantined' },
              { type: 'Deep Scan', date: '3 days ago', threats: 0, status: 'Clean' }
            ].map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-teal-400" />
                  <div>
                    <div className="text-sm font-medium text-white">{result.type}</div>
                    <div className="text-xs text-slate-400">{result.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={result.threats > 0 ? "destructive" : "default"} className="text-xs">
                    {result.threats} threats
                  </Badge>
                  <Badge variant="outline" className={result.status === 'Clean' ? 'border-emerald-400 text-emerald-300' : 'border-amber-400 text-amber-300'}>
                    {result.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanPanel;
