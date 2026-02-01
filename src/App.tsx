import React, { useState, useEffect } from 'react';

// Types
interface XHandle {
  id: string;
  handle: string;
  avatar: string;
  followers: string;
  isActive: boolean;
}

interface DetectedTicker {
  id: string;
  ticker: string;
  source: string;
  timestamp: string;
  post: string;
  confidence: number;
  virality: number;
  trend: number;
  mentions: number;
}

interface Trade {
  id: string;
  ticker: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  timestamp: string;
  status: 'EXECUTED' | 'PENDING' | 'CANCELLED';
  pnl?: number;
}

interface Position {
  ticker: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

// Mock data generators
const generateHandles = (): XHandle[] => [
  { id: '1', handle: '@elikiratuba', avatar: '🦈', followers: '2.1M', isActive: true },
  { id: '2', handle: '@CryptoWhale', avatar: '🐋', followers: '890K', isActive: true },
  { id: '3', handle: '@WallStBets', avatar: '🚀', followers: '1.5M', isActive: true },
  { id: '4', handle: '@TraderMike', avatar: '📈', followers: '450K', isActive: false },
  { id: '5', handle: '@FinanceGuru', avatar: '💎', followers: '780K', isActive: true },
];

const tickers = ['$NVDA', '$TSLA', '$AAPL', '$AMD', '$META', '$GOOGL', '$MSFT', '$AMZN', '$COIN', '$GME'];
const posts = [
  'Just loaded up on more shares. This is going to the moon! 🚀',
  'Technical analysis showing strong breakout pattern forming.',
  'Insider info: Big announcement coming next week.',
  'This dip is a gift. Loading the boat.',
  'Chart looking absolutely bullish. Entry point right here.',
];

const generateTicker = (): DetectedTicker => {
  const ticker = tickers[Math.floor(Math.random() * tickers.length)];
  const handles = generateHandles();
  const source = handles[Math.floor(Math.random() * handles.length)].handle;
  return {
    id: Math.random().toString(36).substr(2, 9),
    ticker,
    source,
    timestamp: new Date().toLocaleTimeString(),
    post: posts[Math.floor(Math.random() * posts.length)],
    confidence: Math.floor(Math.random() * 40) + 60,
    virality: Math.floor(Math.random() * 100),
    trend: Math.floor(Math.random() * 100),
    mentions: Math.floor(Math.random() * 50000) + 1000,
  };
};

const generateTrade = (ticker: string): Trade => ({
  id: Math.random().toString(36).substr(2, 9),
  ticker,
  type: Math.random() > 0.3 ? 'BUY' : 'SELL',
  amount: Math.floor(Math.random() * 100) + 10,
  price: Math.random() * 500 + 50,
  timestamp: new Date().toLocaleTimeString(),
  status: 'EXECUTED',
  pnl: (Math.random() - 0.4) * 1000,
});

const initialPositions: Position[] = [
  { ticker: '$NVDA', shares: 150, avgPrice: 875.32, currentPrice: 912.45, pnl: 5569.50, pnlPercent: 4.24 },
  { ticker: '$TSLA', shares: 80, avgPrice: 245.00, currentPrice: 238.90, pnl: -488.00, pnlPercent: -2.49 },
  { ticker: '$AMD', shares: 200, avgPrice: 156.78, currentPrice: 168.92, pnl: 2428.00, pnlPercent: 7.75 },
  { ticker: '$META', shares: 45, avgPrice: 485.20, currentPrice: 512.30, pnl: 1219.50, pnlPercent: 5.59 },
];

// Components
const LiamCore: React.FC<{ isProcessing: boolean }> = ({ isProcessing }) => (
  <div className="relative w-48 h-48 mx-auto">
    {/* Outer rotating ring */}
    <div className="absolute inset-0 ring-rotate">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="none" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="10 5" />
      </svg>
    </div>
    
    {/* Inner rotating ring */}
    <div className="absolute inset-4 ring-rotate-reverse">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="20 10" opacity="0.5" />
      </svg>
    </div>
    
    {/* Core */}
    <div className={`absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-sm border border-cyan-400/30 core-pulse flex items-center justify-center ${isProcessing ? 'scale-110' : ''} transition-transform duration-300`}>
      <div className="text-center">
        <div className="text-4xl mb-1">🤖</div>
        <div className="font-orbitron text-cyan-400 text-xs tracking-widest">LIAM</div>
      </div>
    </div>
    
    {/* Orbiting dots */}
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transform: `rotate(${i * 90}deg) translateX(90px)`,
          animation: `ringRotate ${8 + i * 2}s linear infinite`,
          boxShadow: '0 0 10px #00ffff',
        }}
      />
    ))}
  </div>
);

const StatCard: React.FC<{ label: string; value: string; subtext?: string; trend?: 'up' | 'down' }> = ({ label, value, subtext, trend }) => (
  <div className="gradient-border rounded-lg p-4">
    <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</div>
    <div className={`font-orbitron text-2xl ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-cyan-400'} text-glow-cyan`}>
      {value}
    </div>
    {subtext && <div className="text-gray-600 text-xs mt-1">{subtext}</div>}
  </div>
);

const ConfidenceBar: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-gray-500">{label}</span>
      <span className={`font-orbitron ${value > 70 ? 'text-emerald-400' : value > 40 ? 'text-yellow-400' : 'text-red-400'}`}>{value}%</span>
    </div>
    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${value > 70 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : value > 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' : 'bg-gradient-to-r from-red-500 to-pink-400'}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const HandleCard: React.FC<{ handle: XHandle; onToggle: () => void; onRemove: () => void }> = ({ handle, onToggle, onRemove }) => (
  <div className={`gradient-border rounded-lg p-3 flex items-center gap-3 transition-all duration-300 ${handle.isActive ? 'glow-cyan' : 'opacity-50'}`}>
    <div className="text-2xl">{handle.avatar}</div>
    <div className="flex-1 min-w-0">
      <div className="text-cyan-400 font-medium truncate">{handle.handle}</div>
      <div className="text-gray-600 text-xs">{handle.followers} followers</div>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className={`w-10 h-5 rounded-full transition-all duration-300 ${handle.isActive ? 'bg-cyan-500' : 'bg-gray-700'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${handle.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
      <button onClick={onRemove} className="text-gray-600 hover:text-red-400 transition-colors">
        ✕
      </button>
    </div>
  </div>
);

const TickerCard: React.FC<{ ticker: DetectedTicker; onTrade: () => void }> = ({ ticker, onTrade }) => (
  <div className="gradient-border rounded-lg p-4 fade-in-up">
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="font-orbitron text-xl text-cyan-400 text-glow-cyan">{ticker.ticker}</span>
        <span className="text-gray-600 text-sm ml-2">via {ticker.source}</span>
      </div>
      <span className="text-gray-600 text-xs">{ticker.timestamp}</span>
    </div>
    
    <p className="text-gray-400 text-sm mb-4 italic">"{ticker.post}"</p>
    
    <ConfidenceBar value={ticker.confidence} label="Overall Confidence" />
    <ConfidenceBar value={ticker.virality} label="Virality Score" />
    <ConfidenceBar value={ticker.trend} label="Trend Strength" />
    
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
      <div className="text-gray-500 text-xs">
        <span className="text-cyan-400 font-orbitron">{ticker.mentions.toLocaleString()}</span> mentions
      </div>
      <button
        onClick={onTrade}
        className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded text-white text-sm font-orbitron hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
      >
        EXECUTE TRADE
      </button>
    </div>
  </div>
);

const TradeRow: React.FC<{ trade: Trade }> = ({ trade }) => (
  <div className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-cyan-500/30 transition-colors">
    <div className={`px-2 py-1 rounded text-xs font-orbitron ${trade.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
      {trade.type}
    </div>
    <div className="flex-1">
      <span className="text-cyan-400 font-orbitron">{trade.ticker}</span>
      <span className="text-gray-600 text-sm ml-2">{trade.amount} shares @ ${trade.price.toFixed(2)}</span>
    </div>
    <div className="text-gray-500 text-xs">{trade.timestamp}</div>
    <div className={`font-orbitron text-sm ${trade.pnl && trade.pnl > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
      {trade.pnl && trade.pnl > 0 ? '+' : ''}{trade.pnl?.toFixed(2) || '—'}
    </div>
  </div>
);

const PositionRow: React.FC<{ position: Position }> = ({ position }) => (
  <div className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
    <div className="font-orbitron text-cyan-400 w-16">{position.ticker}</div>
    <div className="flex-1 text-gray-400 text-sm">
      {position.shares} @ ${position.avgPrice.toFixed(2)}
    </div>
    <div className="text-gray-300 text-sm">${position.currentPrice.toFixed(2)}</div>
    <div className={`font-orbitron text-sm w-24 text-right ${position.pnl > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
      {position.pnl > 0 ? '+' : ''}${position.pnl.toFixed(2)}
      <div className="text-xs opacity-70">({position.pnlPercent > 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)</div>
    </div>
  </div>
);

// Main App
export default function App() {
  const [handles, setHandles] = useState<XHandle[]>(generateHandles());
  const [detectedTickers, setDetectedTickers] = useState<DetectedTicker[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [positions] = useState<Position[]>(initialPositions);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newHandle, setNewHandle] = useState('');
  const [systemStatus, setSystemStatus] = useState('SCANNING');
  const [totalPnL, setTotalPnL] = useState(8729.0);
  const [todayTrades, setTodayTrades] = useState(23);
  
  // Simulate real-time ticker detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setIsProcessing(true);
        setSystemStatus('ANALYZING');
        
        setTimeout(() => {
          const newTicker = generateTicker();
          setDetectedTickers(prev => [newTicker, ...prev].slice(0, 10));
          setIsProcessing(false);
          setSystemStatus('SCANNING');
          
          // Auto-trade if confidence > 85
          if (newTicker.confidence > 85) {
            setSystemStatus('EXECUTING');
            setTimeout(() => {
              const trade = generateTrade(newTicker.ticker);
              setTrades(prev => [trade, ...prev].slice(0, 20));
              setTodayTrades(prev => prev + 1);
              if (trade.pnl) setTotalPnL(prev => prev + trade.pnl!);
              setSystemStatus('SCANNING');
            }, 1000);
          }
        }, 2000);
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleAddHandle = () => {
    if (newHandle.trim()) {
      const handle: XHandle = {
        id: Math.random().toString(36).substr(2, 9),
        handle: newHandle.startsWith('@') ? newHandle : `@${newHandle}`,
        avatar: ['🎯', '💰', '📊', '🔥', '⚡'][Math.floor(Math.random() * 5)],
        followers: `${Math.floor(Math.random() * 900) + 100}K`,
        isActive: true,
      };
      setHandles(prev => [...prev, handle]);
      setNewHandle('');
    }
  };
  
  const handleToggle = (id: string) => {
    setHandles(prev => prev.map(h => h.id === id ? { ...h, isActive: !h.isActive } : h));
  };
  
  const handleRemove = (id: string) => {
    setHandles(prev => prev.filter(h => h.id !== id));
  };
  
  const executeTrade = (ticker: DetectedTicker) => {
    const trade = generateTrade(ticker.ticker);
    setTrades(prev => [trade, ...prev].slice(0, 20));
    setTodayTrades(prev => prev + 1);
    if (trade.pnl) setTotalPnL(prev => prev + trade.pnl!);
  };
  
  return (
    <div className="min-h-screen bg-[#030408] text-gray-100 scanlines noise grid-bg">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🤖</div>
            <div>
              <h1 className="font-orbitron text-xl text-cyan-400 text-glow-cyan">LIAM</h1>
              <p className="text-gray-600 text-xs tracking-widest">AUTONOMOUS TRADING INTELLIGENCE</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`status-dot ${systemStatus === 'SCANNING' ? 'bg-cyan-400' : systemStatus === 'ANALYZING' ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
              <span className="font-orbitron text-xs text-gray-400">{systemStatus}</span>
            </div>
            <div className="text-right">
              <div className="text-gray-600 text-xs">Portfolio Value</div>
              <div className="font-orbitron text-cyan-400">$1,247,892.34</div>
            </div>
          </div>
        </div>
        
        {/* Live ticker tape */}
        <div className="overflow-hidden bg-gray-900/30 py-1 border-t border-gray-800/30">
          <div className="ticker-scroll whitespace-nowrap">
            {[...tickers, ...tickers].map((t, i) => (
              <span key={i} className="inline-flex items-center mx-4">
                <span className="text-cyan-400 font-orbitron text-sm">{t}</span>
                <span className={`ml-2 text-xs ${Math.random() > 0.5 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.random() > 0.5 ? '▲' : '▼'} {(Math.random() * 5).toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-8">
            <LiamCore isProcessing={isProcessing} />
            <h2 className="font-orbitron text-3xl md:text-4xl text-white mt-8 mb-4">
              Meet <span className="text-cyan-400 text-glow-cyan">LIAM</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Your autonomous AI trading companion. I monitor X handles in real-time, detect market-moving tickers, 
              analyze virality & sentiment, and execute trades with calculated precision.
            </p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <StatCard label="Total P&L" value={`$${totalPnL.toFixed(2)}`} trend={totalPnL > 0 ? 'up' : 'down'} />
            <StatCard label="Today's Trades" value={todayTrades.toString()} subtext="Auto-executed" />
            <StatCard label="Win Rate" value="76.4%" trend="up" />
            <StatCard label="Active Handles" value={handles.filter(h => h.isActive).length.toString()} subtext={`of ${handles.length} total`} />
          </div>
        </div>
      </section>
      
      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Handle Monitoring */}
          <div className="space-y-6">
            <div className="gradient-border rounded-xl p-5">
              <h3 className="font-orbitron text-lg text-cyan-400 mb-4 flex items-center gap-2">
                <span>📡</span> X Handle Monitor
              </h3>
              
              {/* Add Handle */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddHandle()}
                  placeholder="@username"
                  className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                />
                <button
                  onClick={handleAddHandle}
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/30 transition-colors"
                >
                  + Add
                </button>
              </div>
              
              {/* Handle List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {handles.map(handle => (
                  <HandleCard
                    key={handle.id}
                    handle={handle}
                    onToggle={() => handleToggle(handle.id)}
                    onRemove={() => handleRemove(handle.id)}
                  />
                ))}
              </div>
            </div>
            
            {/* Active Positions */}
            <div className="gradient-border rounded-xl p-5">
              <h3 className="font-orbitron text-lg text-purple-400 mb-4 flex items-center gap-2">
                <span>💼</span> Active Positions
              </h3>
              <div className="space-y-2">
                {positions.map(pos => (
                  <PositionRow key={pos.ticker} position={pos} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Center Column - Detected Tickers */}
          <div className="gradient-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron text-lg text-cyan-400 flex items-center gap-2">
                <span>🎯</span> Detected Tickers
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-gray-500 text-xs">LIVE</span>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {detectedTickers.length === 0 ? (
                <div className="text-center py-16 text-gray-600">
                  <div className="text-4xl mb-4 float">🔍</div>
                  <p>Scanning for tickers...</p>
                  <p className="text-sm mt-2">LIAM is monitoring your selected handles</p>
                </div>
              ) : (
                detectedTickers.map(ticker => (
                  <TickerCard key={ticker.id} ticker={ticker} onTrade={() => executeTrade(ticker)} />
                ))
              )}
            </div>
          </div>
          
          {/* Right Column - Trade History */}
          <div className="gradient-border rounded-xl p-5">
            <h3 className="font-orbitron text-lg text-emerald-400 mb-4 flex items-center gap-2">
              <span>📊</span> Trade History
            </h3>
            
            {/* Auto-trade settings */}
            <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Auto-Trade</span>
                <div className="w-10 h-5 rounded-full bg-emerald-500 cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-white translate-x-5 transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Min Confidence</span>
                <span className="font-orbitron text-cyan-400">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Max Position</span>
                <span className="font-orbitron text-cyan-400">$10,000</span>
              </div>
            </div>
            
            {/* Trades */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {trades.length === 0 ? (
                <div className="text-center py-16 text-gray-600">
                  <div className="text-4xl mb-4">📈</div>
                  <p>No trades yet</p>
                  <p className="text-sm mt-2">Trades will appear here when executed</p>
                </div>
              ) : (
                trades.map(trade => (
                  <TradeRow key={trade.id} trade={trade} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-800/30 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-xs tracking-wide">
            Requested by <span className="text-gray-500">@AlexandraLiam3</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  );
}