import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, FileText, Award, Clock, BookOpen, Send, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { EventCalendar } from './EventCalendar';
import { useSharedData } from '../contexts/SharedDataContext';

const CURRENT_STUDENT_ID = 'stu-001';

const studentData = {
  stats: [
    { label: 'Applications Sent', value: 12, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Interviews Scheduled', value: 4, icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Offers Received', value: 1, icon: Award, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { label: 'Profile Views', value: 23, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ],
  recentApplications: [
    { company: 'TechCorp', position: 'Software Engineer Intern', status: 'interview', date: '2024-01-20' },
    { company: 'DataFlow Inc', position: 'Data Analyst Intern', status: 'pending', date: '2024-01-18' },
    { company: 'StartupXYZ', position: 'Product Manager Intern', status: 'accepted', date: '2024-01-15' },
  ],
  profileCompletion: 68,
};

const getStatusColor = (status) => {
  switch (status) {
    case 'accepted':
    case 'shortlisted':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'interview':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'rejected':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
};

export const StudentDashboard = () => {
  const { getStudentAttendance, getAttendanceRate, getStudentHours, addReport, getStudentReports } = useSharedData();

  const attendanceLogs = getStudentAttendance(CURRENT_STUDENT_ID);
  const attendanceRate = getAttendanceRate(CURRENT_STUDENT_ID);
  const totalHours = getStudentHours(CURRENT_STUDENT_ID);
  const reports = getStudentReports(CURRENT_STUDENT_ID);

  const presentDays = attendanceLogs.filter(log => log.status === 'present').length;
  const halfDays = attendanceLogs.filter(log => log.status === 'half-day').length;
  const absentDays = attendanceLogs.filter(log => log.status === 'absent').length;

  const [showReportForm, setShowReportForm] = useState(false);
  const [newReport, setNewReport] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    hours: '',
    tasks: '',
  });

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!newReport.title || !newReport.description || !newReport.hours) {
      alert('Please fill in all required fields');
      return;
    }
    addReport(CURRENT_STUDENT_ID, {
      date: newReport.date,
      title: newReport.title,
      description: newReport.description,
      hours: parseInt(newReport.hours),
      tasks: newReport.tasks,
    });
    setShowReportForm(false);
    setNewReport({
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
      hours: '',
      tasks: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Welcome back, Arjun! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Your internship journey is on track. Here's what's happening today.
        </p>
      </motion.div>

      {/* Event Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="border-0 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="dark:text-gray-100">My Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <EventCalendar userRole="student" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Attendance Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-8"
      >
        <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="dark:text-gray-100">Recent Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {attendanceLogs.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No attendance records yet</p>
            ) : (
              attendanceLogs.slice(0, 5).map(log => (
                <div key={log.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      log.status === 'present' ? 'bg-green-500' :
                      log.status === 'half-day' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{log.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      log.status === 'present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      log.status === 'half-day' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }>
                      {log.status}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{log.hoursWorked}h</span>
                  </div>
                </div>
              ))
            )}
            {attendanceLogs.length > 5 && (
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium w-full text-center mt-2">
                View All Attendance →
              </button>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Journal / Report Entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="dark:text-gray-100">Daily Reports</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReportForm(!showReportForm)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                {showReportForm ? 'Cancel' : 'New Report'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {showReportForm && (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Date</Label>
                  <Input
                    type="date"
                    value={newReport.date}
                    onChange={e => setNewReport({ ...newReport, date: e.target.value })}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Title *</Label>
                  <Input
                    placeholder="What did you work on?"
                    value={newReport.title}
                    onChange={e => setNewReport({ ...newReport, title: e.target.value })}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Description *</Label>
                  <Textarea
                    placeholder="Describe your work in detail..."
                    rows={3}
                    value={newReport.description}
                    onChange={e => setNewReport({ ...newReport, description: e.target.value })}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Hours Worked *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="e.g., 4"
                    value={newReport.hours}
                    onChange={e => setNewReport({ ...newReport, hours: e.target.value })}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Tasks Completed</Label>
                  <Input
                    placeholder="List key tasks"
                    value={newReport.tasks}
                    onChange={e => setNewReport({ ...newReport, tasks: e.target.value })}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </form>
            )}

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {reports.slice(0, 5).map(report => (
                <div key={report.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{report.title}</h4>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{report.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{report.description}</p>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{report.hours}h</span>
                    {report.tasks && <span>Tasks: {report.tasks}</span>}
                  </div>
                </div>
              ))}
              {reports.length === 0 && !showReportForm && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">No reports yet. Add your first report!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card className="border-0 shadow-md bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <BookOpen className="w-8 h-8 text-gray-300" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Pro Tip</h3>
                <p className="text-sm text-gray-200">
                  Update your portfolio with recent projects to stand out to recruiters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};