import React from 'react';
import { BorderRotate } from './ui/animated-gradient-border';
import { Star, Zap, Shield, Heart, Download, Settings, User, Mail, Phone } from 'lucide-react';

export default function BorderRotateDemo() {
  return (
    <div className="space-y-12">
      {/* Default */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Default Style</h2>
        <div className="flex justify-center">
          <BorderRotate className="w-96 h-48 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-lg font-semibold">Default Gradient</p>
              <p className="text-sm text-slate-400">Auto-rotating border</p>
            </div>
          </BorderRotate>
        </div>
      </div>

      {/* Custom Color Blue */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Custom Color - Blue Theme</h2>
        <div className="flex justify-center">
          <BorderRotate
            gradientColors={{
              primary: '#0f172a',
              secondary: '#1e40af',
              accent: '#60a5fa'
            }}
            backgroundColor="#1e1b4b"
            className="w-96 p-6"
          >
            <div className="text-white text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-300 mb-4">Blue gradient theme with high contrast</p>
              <div className="flex gap-2 justify-center items-center">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all transform hover:scale-105">
                  Launch Now
                </button>
              </div>
            </div>
          </BorderRotate>
        </div>
      </div>

      {/* Fast Animation - Red */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Fast Animation (0.5s) - Red Theme</h2>
        <div className="flex justify-center">
          <BorderRotate
            animationSpeed={0.5}
            gradientColors={{
              primary: '#7f1d1d',
              secondary: '#dc2626',
              accent: '#f87171'
            }}
            backgroundColor="#7f1d1d"
            className="w-96 p-6"
          >
            <div className="text-white text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security First</h3>
              <p className="text-gray-300 mb-4">0.5s rotation speed with vivid red theme</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-sm">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Secure
                </button>
                <button className="px-3 py-2 border border-red-400 hover:border-red-300 rounded-lg transition-colors text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  Download
                </button>
              </div>
            </div>
          </BorderRotate>
        </div>
      </div>

      {/* Hover to Rotate - Green */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Rotate on Hover - Green Theme</h2>
        <div className="flex justify-center">
          <BorderRotate
            animationMode="rotate-on-hover"
            gradientColors={{
              primary: '#064e3b',
              secondary: '#059669',
              accent: '#34d399'
            }}
            backgroundColor="#064e3b"
            className="w-96 p-6"
          >
            <div className="text-white text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Heart className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco Friendly</h3>
              <p className="text-gray-300 mb-4">Animation starts on hover - green theme</p>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-all w-full">
                <Heart className="w-4 h-4 inline mr-2" />
                Join Movement
              </button>
            </div>
          </BorderRotate>
        </div>
      </div>

      {/* Stop on Hover - Purple */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Stop on Hover - Purple Theme</h2>
        <div className="flex justify-center">
          <BorderRotate
            animationMode="stop-rotate-on-hover"
            gradientColors={{
              primary: '#581c87',
              secondary: '#7c3aed',
              accent: '#a855f7'
            }}
            backgroundColor="#581c87"
            className="w-96 p-6"
          >
            <div className="text-white text-center space-y-4">
              <div className="flex justify-center mb-4">
                <User className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Profile</h3>
              <p className="text-gray-300 mb-4">Animation pauses on hover - purple theme</p>
              <div className="space-y-3">
                <div className="flex gap-2 justify-center">
                  <button className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Message
                  </button>
                  <button className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Call
                  </button>
                </div>
              </div>
            </div>
          </BorderRotate>
        </div>
      </div>

      {/* Custom Border - Orange */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Custom Border (4px, 8px radius, 10s speed)</h2>
        <div className="flex justify-center">
          <BorderRotate
            borderRadius={8}
            borderWidth={4}
            animationSpeed={10}
            gradientColors={{
              primary: '#9a3412',
              secondary: '#ea580c',
              accent: '#fb923c'
            }}
            backgroundColor="#9a3412"
            className="w-96 p-6"
          >
            <div className="text-white text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Settings className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-300 mb-4">4px width, 8px radius, slow animation</p>
              <button className="px-6 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors w-full">
                Configure Settings
              </button>
            </div>
          </BorderRotate>
        </div>
      </div>

      {/* Feature Showcase */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Feature Showcase</h2>
        <BorderRotate
          className="p-8 w-full"
          animationMode="rotate-on-hover"
          animationSpeed={1}
          gradientColors={{
            primary: '#1f2937',
            secondary: '#4f46e5',
            accent: '#8b5cf6'
          }}
        >
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Enhanced Feature Showcase</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold">Lightning Speed</h3>
                <p className="text-gray-300 text-sm mb-3">Ultra-fast performance with optimized rendering</p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-xs w-full">
                  Try Now
                </button>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold">Secure & Safe</h3>
                <p className="text-gray-300 text-sm mb-3">Enterprise-grade security for your data</p>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors text-xs w-full">
                  Learn More
                </button>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-gray-300 text-sm mb-3">Professional-grade animated components</p>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors text-xs w-full">
                  Upgrade
                </button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all transform hover:scale-105">
                Get Started Today
              </button>
            </div>
          </div>
        </BorderRotate>
      </div>

      {/* Code Example */}
      <div className="mt-16 bg-black/60 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Usage Example</h2>
        <pre className="text-slate-200 overflow-x-auto"><code>{`import { BorderRotate } from '@/components/ui/animated-gradient-border';

export default function MyComponent() {
  return (
    <BorderRotate
      className="p-6"
      animationMode="auto-rotate"
      animationSpeed={5}
      gradientColors={{
        primary: '#0f172a',
        secondary: '#1e40af',
        accent: '#60a5fa'
      }}
      backgroundColor="#1e1b4b"
      borderWidth={2}
      borderRadius={20}
    >
      <div>Your content here</div>
    </BorderRotate>
  );
}`}</code></pre>
      </div>
    </div>
  );
}
