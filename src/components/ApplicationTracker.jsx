import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Clock, User, FileText, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

const mockApplications = [
  { id: '1', company: 'TechCorp Solutions', position: 'Software Engineer Intern', stage: 3, totalStages: 5, status: 'active', appliedDate: '2024-01-15', nextAction: 'Technical Interview', nextActionDate: '2024-01-25' },
  { id: '2', company: 'Digital Innovations', position: 'UI/UX Design Intern', stage: 5, totalStages: 5, status: 'completed', appliedDate: '2024-01-10' },
  { id: '3', company: 'StartupXYZ', position: 'Marketing Intern', stage: 2, totalStages: 5, status: 'active', appliedDate: '2024-01-20', nextAction: 'HR Round', nextActionDate: '2024-01-28' },
];

const stageNames = ['Application Submitted', 'Under Review', 'Technical Assessment', 'Interview Round', 'Final Decision'];
const stageIcons = [FileText, Clock, User, Calendar, Award];

export const ApplicationTracker = () => {
  const getStageProgress = (stage, totalStages) => (stage / totalStages) * 100;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Tracker</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Monitor your application progress and stay updated on next steps</p>
        </motion.div>

        <div className="grid gap-6">
          {mockApplications.map((application, index) => {
            const progress = getStageProgress(application.stage, application.totalStages);
            return (
              <motion.div key={application.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} className="group">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-50 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-800 mb-1">{application.position}</CardTitle>
                        <p className="text-gray-600 font-medium">{application.company}</p>
                        <p className="text-sm text-gray-500 mt-1">Applied on {new Date(application.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <Badge className={`${getStatusColor(application.status)} border`}>
                        {application.status === 'completed' ? 'Offer Received' : application.status === 'rejected' ? 'Not Selected' : 'In Progress'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Stage {application.stage} of {application.totalStages}</span>
                        <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                      </div>
                      <Progress value={progress} className="h-3 bg-gray-100" />
                    </div>

                    <div className="flex items-center justify-between mb-6 relative">
                      <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
                      {stageNames.map((stageName, stageIndex) => {
                        const StageIcon = stageIcons[stageIndex];
                        const isCompleted = stageIndex < application.stage;
                        const isCurrent = stageIndex === application.stage - 1;
                        return (
                          <div key={stageIndex} className="flex flex-col items-center relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? 'bg-green-100 border-green-500 text-green-600' : isCurrent ? 'bg-gray-200 border-gray-600 text-gray-700 animate-pulse' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                              {isCompleted ? <CheckCircle className="w-6 h-6" /> : <StageIcon className="w-5 h-5" />}
                            </div>
                            <span className={`text-xs mt-2 text-center max-w-16 leading-tight ${isCompleted || isCurrent ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{stageName}</span>
                          </div>
                        );
                      })}
                    </div>

                    {application.nextAction && application.status === 'active' && (
                      <motion.div className="bg-gray-100 border border-gray-300 rounded-lg p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
                          <div>
                            <p className="font-medium text-gray-800">Next Step: {application.nextAction}</p>
                            {application.nextActionDate && <p className="text-sm text-gray-600">Scheduled for {new Date(application.nextActionDate).toLocaleDateString()}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};