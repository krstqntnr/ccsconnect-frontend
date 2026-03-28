import React from 'react';
import { motion } from 'motion/react';
import { Users, AlertCircle, GraduationCap, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useSharedData } from '../contexts/SharedDataContext';
import { useNavigate } from 'react-router-dom';

export const Interns = ({ userRole, userId }) => {
  const { assignments, getAttendanceRate } = useSharedData();
  const navigate = useNavigate();

  // Extended mock students with academic data
  const students = [
    { id: 'stu-001', name: 'Arjun Sharma', rollNumber: '20CS001', department: 'Computer Science', year: 'Final Year', cgpa: 8.7, hasActive: true, assignedJob: 'Software Engineer Intern' },
    { id: 'stu-002', name: 'Priya Nair', rollNumber: '20CS024', department: 'Computer Science', year: 'Final Year', cgpa: 9.2, hasActive: true, assignedJob: 'Data Scientist Intern' },
    { id: 'stu-003', name: 'Rohan Mehta', rollNumber: '20EC012', department: 'Electronics', year: 'Third Year', cgpa: 8.1, hasActive: true, assignedJob: 'Product Manager Intern' },
    { id: 'stu-004', name: 'Sneha Patel', rollNumber: '20ME005', department: 'Mechanical', year: 'Final Year', cgpa: 7.9, hasActive: true, assignedJob: 'Operations Intern' },
    { id: 'stu-005', name: 'Neha Sharma', rollNumber: '20CS078', department: 'Computer Science', year: 'Final Year', cgpa: 8.9, hasActive: false, assignedJob: null },
    { id: 'stu-006', name: 'Amit Singh', rollNumber: '20CS101', department: 'Computer Science', year: 'Final Year', cgpa: 7.5, hasActive: false, assignedJob: null },
    { id: 'stu-007', name: 'Kavita Desai', rollNumber: '20EC045', department: 'Electronics', year: 'Third Year', cgpa: 8.4, hasActive: false, assignedJob: null },
  ];

  // For students with an active internship, get attendance rate
  const internsWithoutOJT = students.filter(s => !s.hasActive).map(student => {
    const assignment = assignments.find(a => a.studentId === student.id && a.status === 'active');
    const attendanceRate = assignment ? getAttendanceRate(student.id) : null;
    return { ...student, attendanceRate };
  });

  const handleViewProfile = (studentId) => {
    // For now, just alert. Later you can navigate to a student profile route.
    alert(`View profile for student ${studentId} – feature coming soon.`);
    // navigate(`/student/${studentId}`); // uncomment when you create the route
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Students Without Active Internship</h2>
        <Badge variant="outline" className="text-sm">
          {internsWithoutOJT.length} students
        </Badge>
      </div>

      {internsWithoutOJT.length === 0 ? (
        <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="py-16 text-center text-gray-500 dark:text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No students currently without an active internship.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internsWithoutOJT.map(student => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{student.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.rollNumber}</p>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      No OJT
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>{student.department} · {student.year}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">CGPA</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{student.cgpa} / 10</span>
                    </div>
                    {student.attendanceRate !== null ? (
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Attendance Rate</span>
                          <span className={`font-medium ${student.attendanceRate < 75 ? 'text-red-500' : 'text-green-500'}`}>
                            {student.attendanceRate}%
                          </span>
                        </div>
                        <Progress value={student.attendanceRate} className="h-1.5 mt-1" />
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        No internship assigned yet
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(student.id)}
                      className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};