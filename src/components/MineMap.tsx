import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockComplianceData, type MineComplianceRecord } from '@/mockData';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Activity,
  AlertTriangle,
  Radio,
  Sun,
  Moon,
} from 'lucide-react';

// ---- View Mode Config ----
type ViewMode = 'macro' | 'micro';

const VIEWS: Record<ViewMode, { center: [number, number]; zoom: number; label: string; sub: string }> = {
  macro: {
    center: [22.5, 82.5],
    zoom: 5,
    label: 'Macro View',
    sub: 'India National Overview'
  },
  micro: {
    center: [23.7537, 86.4203],
    zoom: 11,
    label: 'Micro View',
    sub: 'Jharia Pit 07 Site Plan'
  }
};

// Standard OpenStreetMap tile layer — completely free, no API key required
const OSM_TILE = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// ---- Risk Badge Helper ----
function getRiskConfig(score: number) {
  if (score < 50) return { color: '#059669', hex: '#10B981', label: 'Low', fill: '#10B981', fillOpacity: 0.22 };
  if (score <= 80) return { color: '#D97706', hex: '#F59E0B', label: 'Medium', fill: '#F59E0B', fillOpacity: 0.22 };
  return { color: '#DC2626', hex: '#EF4444', label: 'High', fill: '#EF4444', fillOpacity: 0.28 };
}

// ---- Inner controller — flies the map to the chosen view ----
function MapFlyController({ target }: { target: ViewMode }) {
  const map = useMap();
  React.useEffect(() => {
    const v = VIEWS[target];
    map.flyTo(v.center, v.zoom, { animate: true, duration: 1.4 });
  }, [target, map]);
  return null;
}

// ---- Main MineMap Component ----
export interface MineMapProps {
  className?: string;
  onViewTelemetry?: (record: MineComplianceRecord) => void;
}

export const MineMap: React.FC<MineMapProps> = ({ className, onViewTelemetry }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('macro');
  const [isDarkMap, setIsDarkMap] = useState(true);
  const [activeMineName, setActiveMineName] = useState<string | null>(null);


  const toggleView = useCallback(() => {
    setViewMode(prev => (prev === 'macro' ? 'micro' : 'macro'));
  }, []);

  const toggleMapTheme = useCallback(() => {
    setIsDarkMap(prev => !prev);
  }, []);

  const currentView = VIEWS[viewMode];

  // HUD overlay styles based on map theme
  const hudBg = isDarkMap ? 'bg-[#1E293B]/90 border-slate-700/80 text-white' : 'bg-white/90 border-slate-300 text-slate-800';
  const hudText = isDarkMap ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`rounded-lg border overflow-hidden flex flex-col shadow-xl ${isDarkMap ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-100 border-slate-300'} ${className ?? ''}`}>
      {/* ---- Header Toolbar ---- */}
      <div className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 shrink-0 ${isDarkMap ? 'bg-[#1E293B] border-slate-700/80' : 'bg-[#F8FAFC] border-slate-200'}`}>
        <div className="flex items-center gap-2.5">
          <Radio className="h-4 w-4 text-[#F59E0B] animate-pulse" />
          <div>
            <span className={`font-bold text-xs uppercase tracking-wider ${isDarkMap ? 'text-slate-200' : 'text-slate-800'}`}>
              Live GIS Spatial Telemetry
            </span>
            <span className={`ml-2 text-[10px] font-mono ${isDarkMap ? 'text-slate-500' : 'text-slate-400'}`}>
              {currentView.sub}
            </span>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border hidden sm:inline ${isDarkMap ? 'text-slate-400 bg-slate-900 border-slate-700' : 'text-slate-500 bg-white border-slate-300'}`}>
            23°45′18″N 86°25′09″E
          </span>
        </div>

        {/* Risk legend pills */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="flex items-center gap-1 px-2 py-0.5 bg-[#EF4444]/15 text-[#DC2626] border border-[#EF4444]/30 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-ping" /> High
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 bg-[#F59E0B]/15 text-[#D97706] border border-[#F59E0B]/30 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" /> Medium
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" /> Low
          </span>
        </div>
      </div>

      {/* ---- Leaflet Map ---- */}
      <div className="relative flex-1 min-h-[380px]">
        <MapContainer
          center={currentView.center}
          zoom={currentView.zoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          {/* Standard OpenStreetMap tiles — no API key required */}
          <TileLayer
            url={OSM_TILE.url}
            attribution={OSM_TILE.attribution}
          />

          {/* Fly-to controller */}
          <MapFlyController target={viewMode} />

          {/* Mine markers */}
          {mockComplianceData.map(mine => {
            const risk = getRiskConfig(mine.aiRiskScore);
            const isActive = activeMineName === mine.mineName;
            return (
              <CircleMarker
                key={mine.id}
                center={[mine.lat, mine.lng]}
                radius={isActive ? 14 : 10}
                pathOptions={{
                  color: risk.color,
                  fillColor: risk.fill,
                  fillOpacity: risk.fillOpacity,
                  weight: isActive ? 2.5 : 1.8,
                  dashArray: mine.aiRiskScore > 80 ? '4 2' : undefined,
                  opacity: 1,
                }}
                eventHandlers={{
                  click: () => setActiveMineName(mine.mineName),
                  popupclose: () => setActiveMineName(null),
                }}
              >
                <Popup
                  className="mine-map-popup"
                  closeButton={false}
                  minWidth={220}
                >
                  <div
                    style={{
                      background: '#1E293B',
                      border: `1px solid ${risk.hex}44`,
                      borderRadius: '6px',
                      padding: '10px 12px',
                      fontFamily: 'Inter, sans-serif',
                      minWidth: '200px',
                    }}
                  >
                    {/* Risk badge + ID */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{
                        fontSize: '10px', fontFamily: 'monospace', fontWeight: 700,
                        padding: '2px 7px', borderRadius: '999px',
                        backgroundColor: `${risk.hex}22`,
                        color: risk.hex,
                        border: `1px solid ${risk.hex}55`,
                        textTransform: 'uppercase',
                      }}>
                        {risk.label} Risk
                      </span>
                      <span style={{ fontSize: '10px', color: '#94A3B8', fontFamily: 'monospace' }}>{mine.id}</span>
                    </div>

                    {/* Mine name */}
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#F1F5F9', lineHeight: 1.3, marginBottom: '4px' }}>
                      {mine.mineName}
                    </div>

                    {/* Location */}
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '8px', fontFamily: 'monospace' }}>
                      📍 {mine.location}
                    </div>

                    {/* Stats */}
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
                      padding: '8px', background: '#0F172A', borderRadius: '4px', marginBottom: '10px',
                    }}>
                      <div>
                        <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 700 }}>AI Risk Score</div>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: risk.hex, lineHeight: 1.1 }}>{mine.aiRiskScore}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 700 }}>Violations</div>
                        <div style={{
                          fontSize: '18px', fontWeight: 900, lineHeight: 1.1,
                          color: mine.activeViolations > 0 ? '#EF4444' : '#10B981',
                        }}>
                          {mine.activeViolations}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => onViewTelemetry?.(mine)}
                      style={{
                        width: '100%', padding: '6px 0',
                        background: '#F59E0B', color: '#0F172A',
                        fontWeight: 800, fontSize: '11px',
                        border: 'none', borderRadius: '4px',
                        cursor: 'pointer', textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#D97706')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#F59E0B')}
                    >
                      ⚡ View Site Telemetry
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* ---- HUD: top-left telemetry tags ---- */}
        <div className="absolute top-3 left-3 z-[999] flex flex-col gap-1.5 pointer-events-none">
          {[
            { label: 'DEPTH', value: '-148m MSL' },
            { label: 'WIND', value: '14 km/h WNW' },
            { label: 'PRESS', value: '1012 hPa' },
          ].map(item => (
            <div
              key={item.label}
              className={`px-2.5 py-1 rounded text-[10px] font-mono backdrop-blur-sm shadow border ${hudBg}`}
            >
              <span className={hudText}>{item.label}: </span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>

        {/* ---- Live activity ticker: bottom-left ---- */}
        <div className="absolute bottom-3 left-3 z-[999] pointer-events-none">
          <div className={`px-3 py-1.5 rounded text-[10px] font-mono backdrop-blur-sm shadow border flex items-center gap-2 ${hudBg}`}>
            <Activity className="h-3 w-3 text-[#10B981] animate-pulse" />
            <span className={hudText}>Tracking</span>
            <span className="font-bold">{mockComplianceData.length} Sites</span>
            <span className={`mx-1 ${isDarkMap ? 'text-slate-600' : 'text-slate-300'}`}>|</span>
            <span className="text-[#EF4444] font-bold">
              {mockComplianceData.filter(m => m.aiRiskScore > 80).length} High Risk
            </span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* TOP-RIGHT CONTROLS: Map Theme Toggle + View Toggle               */}
        {/* ================================================================ */}
        <div className="absolute top-3 right-3 z-[999] flex flex-col gap-2">
          {/* --- Light / Dark Theme Toggle --- */}
          <button
            onClick={toggleMapTheme}
            title={isDarkMap ? 'Switch to Light Map' : 'Switch to Dark Map'}
            className={`flex items-center gap-2 px-3 py-2 rounded shadow-lg backdrop-blur-sm border transition-all font-bold text-xs ${
              isDarkMap
                ? 'bg-[#1E293B]/95 border-slate-600 hover:border-slate-400 text-slate-200 hover:bg-[#1E293B]'
                : 'bg-white/95 border-slate-300 hover:border-slate-500 text-slate-700 hover:bg-white'
            }`}
          >
            {isDarkMap ? (
              <>
                <Sun className="h-3.5 w-3.5 text-[#F59E0B]" />
                <span className="text-[11px]">Light Map</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-slate-600" />
                <span className="text-[11px]">Dark Map</span>
              </>
            )}
          </button>

          {/* --- Macro / Micro View Toggle --- */}
          <button
            onClick={toggleView}
            className={`flex items-center gap-2 px-3 py-2 rounded shadow-lg backdrop-blur-sm border transition-all group ${
              isDarkMap
                ? 'bg-[#1E293B]/95 border-[#F59E0B]/50 hover:border-[#F59E0B] text-slate-100 hover:bg-[#1E293B]'
                : 'bg-white/95 border-[#F59E0B]/60 hover:border-[#F59E0B] text-slate-700 hover:bg-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-[#F59E0B] group-hover:rotate-180 transition-transform duration-300" />
            <div className="text-left">
              <div className="text-[11px] font-bold text-[#D97706]">
                {viewMode === 'macro' ? 'Switch to Micro View' : 'Switch to Macro View'}
              </div>
              <div className={`text-[9px] font-mono leading-none ${isDarkMap ? 'text-slate-400' : 'text-slate-500'}`}>
                {viewMode === 'macro' ? 'Jharia Pit 07 Site Plan' : 'India National Overview'}
              </div>
            </div>
          </button>

          {/* Mode badge */}
          <div className={`px-2 py-1 rounded text-center font-mono text-[9px] backdrop-blur-sm border ${
            isDarkMap ? 'bg-[#0F172A]/90 border-slate-700' : 'bg-white/90 border-slate-300'
          }`}>
            <span className={isDarkMap ? 'text-slate-400' : 'text-slate-500'}>Mode: </span>
            <span className="text-[#D97706] font-extrabold uppercase">{viewMode}</span>
          </div>
        </div>

        {/* ---- Zoom Controls: bottom-right ---- */}
        <div className="absolute bottom-3 right-3 z-[999] flex flex-col gap-1">
          {[ZoomIn, ZoomOut].map((Icon, i) => (
            <button
              key={i}
              className={`h-8 w-8 border rounded flex items-center justify-center transition-colors ${
                isDarkMap
                  ? 'bg-[#1E293B]/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-white/90 border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* ---- Footer status bar ---- */}
      <div className={`px-4 py-2 border-t flex items-center justify-between text-[10px] font-mono shrink-0 ${
        isDarkMap
          ? 'bg-[#1E293B] border-slate-700/80 text-slate-400'
          : 'bg-[#F8FAFC] border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-ping" />
            Hazard Zone
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            Haul Route
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            Safe Corridors
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-3 w-3 text-[#F59E0B]" />
          <span className={isDarkMap ? 'text-slate-400' : 'text-slate-500'}>CRS: </span>
          <span className={`font-bold ${isDarkMap ? 'text-slate-200' : 'text-slate-800'}`}>WGS84 / EPSG:4326</span>
        </div>
      </div>
    </div>
  );
};

export default MineMap;
