import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Bell, Eye, Palette, Save, Moon, Sun, Laptop, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { useTheme } from '../contexts/ThemeContext';

// Mock user data – replace with real from context/auth
const mockUser = {
  name: 'Arjun Sharma',
  email: 'arjun.sharma@college.edu',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  notifications: {
    email: true,
    push: true,
    applications: true,
    messages: true,
    marketing: false,
  },
  privacy: {
    profileVisibility: 'recruiters',
    showEmail: true,
    showPhone: false,
  },
};

export const SettingsPage = () => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  const [account, setAccount] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
  });
  const [notifications, setNotifications] = useState(mockUser.notifications);
  const [privacy, setPrivacy] = useState(mockUser.privacy);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Settings saved successfully!');
      setIsSaving(false);
    }, 1000);
  };

  const handleImageUpload = () => {
    toast.info('Profile picture upload coming soon');
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and privacy</p>
        </motion.div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-1 h-auto flex-wrap gap-1">
            <TabsTrigger value="account" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
              <User className="w-4 h-4 mr-2" /> Account
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
              <Lock className="w-4 h-4 mr-2" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
              <Bell className="w-4 h-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
              <Eye className="w-4 h-4 mr-2" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
              <Palette className="w-4 h-4 mr-2" /> Appearance
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Profile Information
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {account.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <Button variant="outline" size="sm" onClick={handleImageUpload}>
                      <Camera className="w-4 h-4 mr-2" /> Change Photo
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
                    <Input
                      value={account.name}
                      onChange={e => setAccount({ ...account, name: e.target.value })}
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
                    <Input
                      type="email"
                      value={account.email}
                      onChange={e => setAccount({ ...account, email: e.target.value })}
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</Label>
                    <Input
                      value={account.phone}
                      onChange={e => setAccount({ ...account, phone: e.target.value })}
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
                    <Input
                      value={account.location}
                      onChange={e => setAccount({ ...account, location: e.target.value })}
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Security Settings
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</Label>
                  <Input type="password" placeholder="Enter current password" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</Label>
                    <Input type="password" placeholder="Enter new password" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Update Password'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Notification Preferences
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Choose what updates you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={checked => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Push Notifications</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get real-time alerts</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={checked => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <Separator className="dark:bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Application Updates</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status changes for your applications</p>
                    </div>
                    <Switch
                      checked={notifications.applications}
                      onCheckedChange={checked => setNotifications({ ...notifications, applications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Messages</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">New messages and replies</p>
                    </div>
                    <Switch
                      checked={notifications.messages}
                      onCheckedChange={checked => setNotifications({ ...notifications, messages: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Marketing & Promotions</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">News, offers, and career tips</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={checked => setNotifications({ ...notifications, marketing: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Privacy Controls
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Manage who can see your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Visibility</Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={value => setPrivacy({ ...privacy, profileVisibility: value })}
                  >
                    <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public – Anyone can view</SelectItem>
                      <SelectItem value="recruiters">Recruiters only – Only verified companies</SelectItem>
                      <SelectItem value="private">Private – Only your connections</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This controls who can see your profile and applications</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Email Address</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Visible to recruiters and verified users</p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={checked => setPrivacy({ ...privacy, showEmail: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Phone Number</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Visible only to recruiters when you apply</p>
                    </div>
                    <Switch
                      checked={privacy.showPhone}
                      onCheckedChange={checked => setPrivacy({ ...privacy, showPhone: checked })}
                    />
                  </div>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Sharing</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Allow platform to use your data for analytics and recommendations</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Share anonymized data</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Privacy Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Appearance
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Customize how CCSconnect looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                        theme === 'light'
                          ? 'border-gray-800 dark:border-gray-300 bg-gray-50 dark:bg-gray-700'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <Sun className="w-5 h-5" />
                      <span className="text-xs">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                        theme === 'dark'
                          ? 'border-gray-800 dark:border-gray-300 bg-gray-50 dark:bg-gray-700'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <Moon className="w-5 h-5" />
                      <span className="text-xs">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                        theme === 'system'
                          ? 'border-gray-800 dark:border-gray-300 bg-gray-50 dark:bg-gray-700'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <Laptop className="w-5 h-5" />
                      <span className="text-xs">System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Appearance'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};