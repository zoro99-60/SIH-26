import React, { useState } from 'react';
import {
  HardHat,
  Plus,
  RefreshCw,
  Wifi,
  WifiOff,
  Camera,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  X,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Check,
  Image as ImageIcon
} from 'lucide-react';

interface InspectionItem {
  id: string;
  title: string;
  location: string;
  type: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'Pending' | 'In Progress' | 'Completed';
  geoTagged?: boolean;
}

export const FieldInspectorView: React.FC = () => {
  // Mobile app states
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Initial inspections list
  const [inspections, setInspections] = useState<InspectionItem[]>([
    {
      id: 'INSP-401',
      title: 'Safety Check - Jharia Pit 07',
      location: 'Dhanbad, Jharkhand (BCCL)',
      type: 'CMR Statutory Audit',
      dueDate: 'Today, 11:30 AM',
      priority: 'high',
      status: 'Pending',
    },
    {
      id: 'INSP-402',
      title: 'Dumper Inspection - Korba',
      location: 'Korba Bench 4 (SECL)',
      type: 'HEMM Machinery & Brakes',
      dueDate: 'Today, 02:15 PM',
      priority: 'medium',
      status: 'In Progress',
    },
    {
      id: 'INSP-403',
      title: 'Slope Stability Audit - Talcher',
      location: 'Angul South Pit (MCL)',
      type: 'Geotechnical Slope Radar',
      dueDate: 'Yesterday, 04:00 PM',
      priority: 'high',
      status: 'Completed',
    },
    {
      id: 'INSP-404',
      title: 'Methane Gas Check - Raniganj',
      location: 'Asansol Seam 7 (ECL)',
      type: 'CH4 Telemetry Calibration',
      dueDate: 'Tomorrow, 09:00 AM',
      priority: 'low',
      status: 'Pending',
    },
  ]);

  // Form states for new inspection log
  const [formData, setFormData] = useState({
    mineName: 'Jharia Open Cast Pit 07',
    inspectionType: 'Safety Audit',
    observations: '',
  });

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Inspections synced successfully!');
    }, 1200);
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInsp: InspectionItem = {
      id: `INSP-${Math.floor(100 + Math.random() * 900)}`,
      title: `${formData.inspectionType} - ${formData.mineName.split(' ')[0]}`,
      location: formData.mineName,
      type: formData.inspectionType,
      dueDate: 'Just now',
      priority: 'high',
      status: 'Pending',
      geoTagged: photoUploaded,
    };

    setInspections([newInsp, ...inspections]);
    setIsModalOpen(false);
    setFormData({
      mineName: 'Jharia Open Cast Pit 07',
      inspectionType: 'Safety Audit',
      observations: '',
    });
    setPhotoUploaded(false);
    showToast(isOffline ? 'Saved to Offline Queue!' : 'Inspection Logged Successfully!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] p-2">
      {/* Top Helper Context Banner */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-slate-200 rounded-full text-xs font-mono border border-slate-700">
          <Smartphone className="h-3.5 w-3.5 text-[#F59E0B]" />
          <span>Field Inspector Mobile View (Simulated Persona)</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE DEVICE FRAME MOCKUP (Max-width 400px, rounded corners, bezel)       */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[400px] bg-[#0F172A] rounded-[44px] p-3.5 border-[10px] border-[#1E293B] shadow-2xl relative select-none">
        
        {/* Mobile Device Speaker / Notch */}
        <div className="w-32 h-4 bg-[#090D16] rounded-full mx-auto mb-3 flex items-center justify-center gap-2 border border-slate-800/80 z-20">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-10 h-1 bg-slate-800 rounded-full" />
        </div>

        {/* Mobile Screen Wrapper */}
        <div className="bg-[#F8FAFC] rounded-[32px] overflow-hidden min-h-[620px] flex flex-col relative border border-slate-200 shadow-inner">
          
          {/* ----------------------------------------------------------------- */}
          {/* MOBILE APP TOP BAR */}
          {/* ----------------------------------------------------------------- */}
          <div className="bg-[#1E293B] text-white px-4 py-3 border-b border-slate-700 flex flex-col gap-2 shrink-0">
            {/* Top row: Status indicators & Offline toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-slate-300 font-bold">DGMS MOBILE v2.4</span>
              </div>

              {/* Offline Mode Toggle Switch */}
              <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded-full border border-slate-700">
                <span className="text-[10px] font-mono text-slate-300 font-semibold">
                  {isOffline ? 'Offline' : 'Online'}
                </span>
                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className={`w-8 h-4 rounded-full transition-colors relative flex items-center p-0.5 ${
                    isOffline ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  title="Toggle Offline Sync Mode"
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 shadow-sm ${
                      isOffline ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Header title & Sync Status */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h2 className="font-extrabold text-base text-white tracking-tight leading-none flex items-center gap-1.5">
                  <HardHat className="h-4 w-4 text-[#F59E0B]" />
                  My Assigned Inspections
                </h2>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400 font-mono">
                  {isOffline ? (
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <WifiOff className="h-3 w-3" /> Offline Queue (3 Pending Sync)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Wifi className="h-3 w-3 text-emerald-400" /> Last Synced: 10 mins ago
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleSync}
                disabled={isSyncing || isOffline}
                className={`p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all ${
                  isSyncing ? 'animate-spin text-[#F59E0B]' : ''
                } ${isOffline ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Sync Inspection Data"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {successToast && (
            <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 text-center animate-in slide-in-from-top duration-200 shadow flex items-center justify-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>{successToast}</span>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* INSPECTIONS LIST CONTAINER */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-20">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider px-1 flex justify-between items-center">
              <span>Assigned Work orders ({inspections.length})</span>
              <span>Sorted by priority</span>
            </div>

            {inspections.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 relative overflow-hidden"
              >
                {/* Priority edge strip */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1 ${
                    item.priority === 'high'
                      ? 'bg-red-500'
                      : item.priority === 'medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="pl-1 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {item.id} • {item.type}
                    </span>
                    <h3 className="font-extrabold text-xs text-slate-900 leading-snug mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      item.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : item.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="pl-1 flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 font-semibold shrink-0">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {item.dueDate}
                  </span>
                </div>

                {item.geoTagged && (
                  <div className="pl-1 pt-1 flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold">
                    <Camera className="h-3 w-3" /> Geo-tagged Photo Attached
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* FLOATING ACTION BUTTON (FAB) */}
          {/* ----------------------------------------------------------------- */}
          <div className="absolute bottom-4 right-4 z-20">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-extrabold text-xs rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-[#0F172A] active:scale-95"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>+ Log Inspection</span>
            </button>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* MODAL FORM OVERLAY (LOG INSPECTION) */}
          {/* ----------------------------------------------------------------- */}
          {isModalOpen && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs z-30 flex flex-col justify-end animate-in fade-in duration-200">
              <div className="bg-white rounded-t-[24px] p-4 border-t-2 border-[#F59E0B] shadow-2xl max-h-[90%] overflow-y-auto space-y-4">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                      <HardHat className="h-4 w-4 text-[#F59E0B]" />
                      Log Field Inspection
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Statutory Compliance & Telemetry Entry
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  {/* Mine Name */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                      Mine Name
                    </label>
                    <select
                      value={formData.mineName}
                      onChange={(e) => setFormData({ ...formData, mineName: e.target.value })}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="Jharia Open Cast Pit 07">Jharia Open Cast Pit 07 (BCCL)</option>
                      <option value="Talcher Deep Pit Colliery">Talcher Deep Pit Colliery (MCL)</option>
                      <option value="Gevra Mega Open Cast">Gevra Mega Open Cast (SECL)</option>
                      <option value="North Karnpura Sector 2">North Karnpura Sector 2 (CCL)</option>
                      <option value="Raniganj Underground Colliery">Raniganj Underground (ECL)</option>
                    </select>
                  </div>

                  {/* Inspection Type */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                      Inspection Type
                    </label>
                    <select
                      value={formData.inspectionType}
                      onChange={(e) => setFormData({ ...formData, inspectionType: e.target.value })}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="Safety Audit">Safety & DGMS Compliance Audit</option>
                      <option value="Machinery Brakes Check">HEMM & Dumper Brakes Check</option>
                      <option value="Slope Stability Check">High-Wall & Slope Stability Check</option>
                      <option value="Gas & Vent Inspection">CH4 Methane & Ventilation Check</option>
                      <option value="Dust & Environment Check">Dust Suppression & Water pH</option>
                    </select>
                  </div>

                  {/* Observations */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                      Observations & Findings
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter field inspector findings, statutory notes, or hazard alerts..."
                      value={formData.observations}
                      onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    />
                  </div>

                  {/* Dummy Geo-tagged Photo Upload */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                      Evidence Photo
                    </label>
                    <button
                      type="button"
                      onClick={() => setPhotoUploaded(!photoUploaded)}
                      className={`w-full py-2.5 px-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        photoUploaded
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {photoUploaded ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-600" />
                          <span>Geo-tagged Photo Attached (23.7537°N 86.4203°E)</span>
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4 text-[#F59E0B]" />
                          <span>Upload Geo-tagged Photo</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Offline Mode Switch in Form */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded-lg border border-slate-200">
                    <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1.5">
                      {isOffline ? <WifiOff className="h-3.5 w-3.5 text-amber-600" /> : <Wifi className="h-3.5 w-3.5 text-emerald-600" />}
                      Save in Offline Mode
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsOffline(!isOffline)}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                        isOffline ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm ${
                          isOffline ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-1/3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-2.5 bg-[#1E293B] hover:bg-[#0F172A] text-white font-extrabold text-xs rounded-lg transition-colors shadow"
                    >
                      {isOffline ? 'Save to Offline Queue' : 'Submit Inspection Log'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldInspectorView;
