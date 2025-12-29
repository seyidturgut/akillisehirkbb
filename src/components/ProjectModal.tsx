import React, { useEffect, useState } from 'react';
import { X, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import { CityZone, ZoneProject } from '../lib/supabase';

interface ProjectModalProps {
  zone: CityZone | null;
  onClose: () => void;
}

import { mockProjects } from '../data/mockData';

export const ProjectModal: React.FC<ProjectModalProps> = ({ zone, onClose }) => {
  const [projects, setProjects] = useState<ZoneProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (zone) {
      loadProjects();
    }
  }, [zone]);

  const loadProjects = async () => {
    if (!zone) return;

    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const zoneProjects = mockProjects.filter(p => p.zone_id === zone.id);
      // Sort by year descending
      zoneProjects.sort((a, b) => b.year - a.year);

      setProjects(zoneProjects);
      setLoading(false);
    }, 500);
  };

  if (!zone) return null;

  const IconComponent = Icons[zone.icon as keyof typeof Icons] as React.FC<{ className?: string }>;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'planned':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'in_progress':
        return 'Devam Ediyor';
      case 'planned':
        return 'Planlandı';
      default:
        return status;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-300 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500"
        style={{
          transformOrigin: 'center center',
          animation: 'modalFlip 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-8 relative"
          style={{
            background: `linear-gradient(135deg, ${zone.color}20 0%, ${zone.color}05 100%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: zone.color }}
            >
              {IconComponent && <IconComponent className="w-9 h-9 text-white" />}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{zone.name}</h2>
              <p className="text-gray-600 mt-1">{zone.description}</p>
            </div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div
                className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                style={{ borderColor: `${zone.color}40`, borderTopColor: 'transparent' }}
              />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Bu bölge için henüz proje bulunmuyor.
            </div>
          ) : (
            <div className="grid gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-in slide-in-from-bottom-4 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                        style={{
                          backgroundColor: `${zone.color}15`,
                          color: zone.color,
                        }}
                      >
                        {getStatusIcon(project.status)}
                        {getStatusText(project.status)}
                      </div>
                      <div className="text-sm font-bold text-gray-400">{project.year}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
