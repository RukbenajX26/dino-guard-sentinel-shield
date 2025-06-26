
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const DinosaurAccents = () => {
  const dinosaurs = [
    { name: 'T-Rex', color: 'from-red-500 to-red-600', accent: 'border-red-400' },
    { name: 'Triceratops', color: 'from-blue-500 to-blue-600', accent: 'border-blue-400' },
    { name: 'Stegosaurus', color: 'from-purple-500 to-purple-600', accent: 'border-purple-400' },
    { name: 'Raptor', color: 'from-yellow-500 to-yellow-600', accent: 'border-yellow-400' },
    { name: 'Brontosaurus', color: 'from-green-500 to-green-600', accent: 'border-green-400' },
    { name: 'Pteranodon', color: 'from-cyan-500 to-cyan-600', accent: 'border-cyan-400' }
  ];

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-amber-200/20">
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-amber-100 font-semibold">Dinosaur King Protection</h3>
          <p className="text-sm text-slate-400">Six legendary guardians protecting your system</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {dinosaurs.map((dino, index) => (
            <div
              key={index}
              className={`h-12 bg-gradient-to-br ${dino.color} rounded-lg border-2 ${dino.accent} flex items-center justify-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold drop-shadow-lg">
                  {dino.name.charAt(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DinosaurAccents;
