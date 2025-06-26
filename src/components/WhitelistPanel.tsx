
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, Trash2, Folder, Globe, FileText } from 'lucide-react';

const WhitelistPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [whitelistItems] = useState([
    {
      id: 1,
      name: 'Steam',
      path: 'C:\\Program Files (x86)\\Steam\\Steam.exe',
      type: 'Application',
      dateAdded: '2024-01-10',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Google Chrome',
      path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      type: 'Application',
      dateAdded: '2024-01-08',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Development Folder',
      path: 'C:\\Users\\Dev\\Projects\\*',
      type: 'Folder',
      dateAdded: '2024-01-05',
      status: 'Active'
    },
    {
      id: 4,
      name: 'trusted-domain.com',
      path: 'https://trusted-domain.com/*',
      type: 'Website',
      dateAdded: '2024-01-03',
      status: 'Active'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Application': return FileText;
      case 'Folder': return Folder;
      case 'Website': return Globe;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Application': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'Folder': return 'bg-purple-500/20 text-purple-300 border-purple-400';
      case 'Website': return 'bg-green-500/20 text-green-300 border-green-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const filteredItems = whitelistItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            Whitelist Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search whitelist items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-300">{whitelistItems.length}</div>
              <div className="text-slate-400">Total Items</div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-300">2</div>
              <div className="text-slate-400">Applications</div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-300">1</div>
              <div className="text-slate-400">Folders</div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-green-300">1</div>
              <div className="text-slate-400">Websites</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Whitelist Items */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
        <CardHeader>
          <CardTitle className="text-amber-100">Trusted Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const IconComponent = getTypeIcon(item.type);
              return (
                <div key={item.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="font-semibold text-white">{item.name}</div>
                          <div className="text-sm text-slate-400">{item.path}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Type:</span>
                          <Badge className={getTypeColor(item.type)}>
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Added:</span>
                          <span className="text-teal-300">{item.dateAdded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Status:</span>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400">
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" className="border-red-400 text-red-300 hover:bg-red-500/20">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhitelistPanel;
