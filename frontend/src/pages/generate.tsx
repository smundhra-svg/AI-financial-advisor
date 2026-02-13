import React from 'react';
import { ArrowRight, Shield, TrendingUp,Zap } from 'lucide-react';
import { Button } from '@components/components/ui/button';

const Generate = () => {
  return (
    <div className="min-h-screen bg-primary relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 gradient-radial pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-300/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 py-16 max-w-2xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cyan-300">
            <Zap className="w-4 h-4 text-cyan-400 text-glow-success" />
            <span className="text-sm font-medium text-cyan-400">AI-Powered Analysis</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">Smart </span>
            <span className="text-gradient text-cyan-300">Statement Analyzer</span>
          </h1>
        </header>
        <div className='w-full h-auto mx-auto flex flex-wrap justify-center items-center'>
        <Button className='w-98 h-12 text-base font-semibold bg-cyan-600 hover:bg-cyan-300/90 text-black neon-glow hover:neon-glow transition-all duration-300 disabled:opacity-50 disabled:neon-glow-subtle-none'>
            Generate Analysis <ArrowRight className='text-black h-auto w-10'/> 
        </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-border">
            <Shield className="w-4 h-4 text-green-600  text-glow-success" />
            <span className="text-sm text-white">Bank-level Security</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800  border border-border">
            <TrendingUp className="w-4 h-4 text-cyan-300"/>
            <span className="text-sm text-white">Spending Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generate;