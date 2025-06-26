
import { useState, useEffect, useCallback } from 'react';

interface ScanResult {
  fileName: string;
  status: 'clean' | 'infected' | 'suspicious';
  threatType?: 'malware' | 'trojan' | 'adware' | 'ransomware';
  dinoType: 'herbivore' | 'carnivore' | 'omnivore';
}

interface ScanStats {
  filesScanned: number;
  threatsFound: number;
  progress: number;
  currentFile: string;
  isScanning: boolean;
  results: ScanResult[];
}

export const useRealTimeScanning = () => {
  const [scanStats, setScanStats] = useState<ScanStats>({
    filesScanned: 0,
    threatsFound: 0,
    progress: 0,
    currentFile: '',
    isScanning: false,
    results: []
  });

  const [scanInterval, setScanInterval] = useState<NodeJS.Timeout | null>(null);

  const mockFiles = [
    'system32.dll', 'kernel.exe', 'browser.exe', 'antivirus.exe', 'documents.pdf',
    'photos.jpg', 'music.mp3', 'malware.exe', 'trojan.bat', 'suspicious.js',
    'safe_document.docx', 'clean_image.png', 'normal_app.exe', 'virus.exe'
  ];

  const generateScanResult = (fileName: string): ScanResult => {
    const isThreat = fileName.includes('malware') || fileName.includes('trojan') || fileName.includes('virus');
    const isSuspicious = fileName.includes('suspicious') || fileName.includes('bat') || fileName.includes('js');
    
    if (isThreat) {
      return {
        fileName,
        status: 'infected',
        threatType: fileName.includes('trojan') ? 'trojan' : 'malware',
        dinoType: 'carnivore' // Dangerous threats = carnivorous dinosaurs
      };
    } else if (isSuspicious) {
      return {
        fileName,
        status: 'suspicious',
        threatType: 'adware',
        dinoType: 'omnivore' // Suspicious = omnivorous dinosaurs
      };
    } else {
      return {
        fileName,
        status: 'clean',
        dinoType: 'herbivore' // Safe files = herbivorous dinosaurs
      };
    }
  };

  const startScan = useCallback(() => {
    setScanStats(prev => ({ ...prev, isScanning: true, progress: 0, filesScanned: 0, threatsFound: 0, results: [] }));
    
    let fileIndex = 0;
    const interval = setInterval(() => {
      if (fileIndex >= mockFiles.length) {
        clearInterval(interval);
        setScanStats(prev => ({ 
          ...prev, 
          isScanning: false, 
          progress: 100, 
          currentFile: 'Scan completed' 
        }));
        setScanInterval(null);
        return;
      }

      const currentFile = mockFiles[fileIndex];
      const result = generateScanResult(currentFile);
      
      setScanStats(prev => ({
        ...prev,
        filesScanned: fileIndex + 1,
        threatsFound: prev.threatsFound + (result.status === 'infected' ? 1 : 0),
        progress: Math.round(((fileIndex + 1) / mockFiles.length) * 100),
        currentFile,
        results: [...prev.results, result]
      }));

      fileIndex++;
    }, 500);

    setScanInterval(interval);
  }, [mockFiles]);

  const stopScan = useCallback(() => {
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
    setScanStats(prev => ({ ...prev, isScanning: false }));
  }, [scanInterval]);

  useEffect(() => {
    return () => {
      if (scanInterval) {
        clearInterval(scanInterval);
      }
    };
  }, [scanInterval]);

  return {
    scanStats,
    startScan,
    stopScan
  };
};
