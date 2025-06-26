
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Search, Trash2, RefreshCw, Download, Eye } from 'lucide-react';

const QuarantinePanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quarantineItems] = useState([
    {
      id: 1,
      name: 'suspicious_file.exe',
      path: 'C:\\Users\\Downloads\\suspicious_file.exe',
      threat: 'Trojan.Win32.Generic',
      riskLevel: 'High',
      dateQuarantined: '2024-01-15 14:30:22',
      size: '2.3 MB'
    },
    {
      id: 2,
      name: 'malware_sample.dll',
      path: 'C:\\Windows\\System32\\malware_sample.dll',
      threat: 'Adware.Win32.Browser',
      riskLevel: 'Medium',
      dateQuarantined: '2024-01-14 09:15:10',
      size: '856 KB'
    },
    {
      id: 3,
      name: 'keylogger.bat',
      path: 'C:\\Temp\\keylogger.bat',
      threat: 'Spyware.Generic.Keylogger',
      riskLevel: 'Critical',
      dateQuarantined: '2024-01-13 16:45:33',
      size: '1.2 KB'
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500/20 text-red-300 border-red-400';
      case 'High': return 'bg-orange-500/20 text-orange-300 border-orange-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const filteredItems = quarantineItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.threat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Quarantine Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search quarantined items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-red-400 text-red-300 hover:bg-red-500/20">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-red-300">{quarantineItems.length}</div>
              <div className="text-slate-400">Total Items</div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-300">1</div>
              <div className="text-slate-400">Critical</div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-300">1</div>
              <div className="text-slate-400">High Risk</div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-green-300">1</div>
              <div className="text-slate-400">Medium Risk</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quarantined Items */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
        <CardHeader>
          <CardTitle className="text-amber-100">Quarantined Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-sm text-slate-400">{item.path}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Threat Type:</span>
                        <span className="text-red-300">{item.threat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">File Size:</span>
                        <span className="text-teal-300">{item.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Quarantined:</span>
                        <span className="text-amber-300">{item.dateQuarantined}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Risk Level:</span>
                        <Badge className={getRiskColor(item.riskLevel)}>
                          {item.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" variant="outline" className="border-teal-400 text-teal-300 hover:bg-teal-500/20">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-400 text-green-300 hover:bg-green-500/20">
                      <Download className="w-4 h-4 mr-1" />
                      Restore
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-400 text-red-300 hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
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

export default QuarantinePanel;
