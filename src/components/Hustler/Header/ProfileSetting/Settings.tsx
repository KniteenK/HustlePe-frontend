import { Button, Card, CardBody, CardHeader, Select, SelectItem, Switch } from '@nextui-org/react';
import { Bell, Globe, Palette, Settings as SettingsIcon, Shield } from 'lucide-react';
import { useState } from 'react';

function Settings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    projectUpdates: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showOnlineStatus: false,
    allowDirectMessages: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'english',
    timezone: 'IST',
    theme: 'light',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <Bell className="h-6 w-6" />
                <h2 className="text-xl font-bold">Notification Preferences</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch 
                    isSelected={notifications.emailNotifications}
                    onValueChange={(value) => setNotifications({...notifications, emailNotifications: value})}
                    color="success"
                  />
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                  <Switch 
                    isSelected={notifications.pushNotifications}
                    onValueChange={(value) => setNotifications({...notifications, pushNotifications: value})}
                    color="success"
                  />
                </div>
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Project Updates</h3>
                    <p className="text-sm text-gray-600">Get notified about project status changes</p>
                  </div>
                  <Switch 
                    isSelected={notifications.projectUpdates}
                    onValueChange={(value) => setNotifications({...notifications, projectUpdates: value})}
                    color="success"
                  />
                </div>
                
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Marketing Emails</h3>
                    <p className="text-sm text-gray-600">Receive promotional and marketing emails</p>
                  </div>
                  <Switch 
                    isSelected={notifications.marketingEmails}
                    onValueChange={(value) => setNotifications({...notifications, marketingEmails: value})}
                    color="success"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Privacy Settings */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <h2 className="text-xl font-bold">Privacy & Security</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Profile Visibility</h3>
                    <p className="text-sm text-gray-600">Make your profile visible to clients</p>
                  </div>
                  <Switch 
                    isSelected={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
                    color="success"
                  />
                </div>
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Show Online Status</h3>
                    <p className="text-sm text-gray-600">Let others see when you're online</p>
                  </div>
                  <Switch 
                    isSelected={privacy.showOnlineStatus}
                    onValueChange={(value) => setPrivacy({...privacy, showOnlineStatus: value})}
                    color="success"
                  />
                </div>
                
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Allow Direct Messages</h3>
                    <p className="text-sm text-gray-600">Allow clients to message you directly</p>
                  </div>
                  <Switch 
                    isSelected={privacy.allowDirectMessages}
                    onValueChange={(value) => setPrivacy({...privacy, allowDirectMessages: value})}
                    color="success"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* General Preferences */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-6 w-6" />
                <h2 className="text-xl font-bold">General Preferences</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language
                  </label>
                  <Select 
                    placeholder="Select language"
                    selectedKeys={[preferences.language]}
                    onSelectionChange={(keys) => setPreferences({...preferences, language: Array.from(keys)[0] as string})}
                    classNames={{
                      trigger: "border-2 border-green-200 hover:border-green-300",
                    }}
                  >
                    <SelectItem key="english" value="english">English</SelectItem>
                    <SelectItem key="hindi" value="hindi">Hindi</SelectItem>
                    <SelectItem key="spanish" value="spanish">Spanish</SelectItem>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Timezone</label>
                  <Select 
                    placeholder="Select timezone"
                    selectedKeys={[preferences.timezone]}
                    onSelectionChange={(keys) => setPreferences({...preferences, timezone: Array.from(keys)[0] as string})}
                    classNames={{
                      trigger: "border-2 border-green-200 hover:border-green-300",
                    }}
                  >
                    <SelectItem key="IST" value="IST">IST (UTC +5:30)</SelectItem>
                    <SelectItem key="EST" value="EST">EST (UTC -5:00)</SelectItem>
                    <SelectItem key="PST" value="PST">PST (UTC -8:00)</SelectItem>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Theme Preference
                  </label>
                  <Select 
                    placeholder="Select theme"
                    selectedKeys={[preferences.theme]}
                    onSelectionChange={(keys) => setPreferences({...preferences, theme: Array.from(keys)[0] as string})}
                    classNames={{
                      trigger: "border-2 border-green-200 hover:border-green-300",
                    }}
                  >
                    <SelectItem key="light" value="light">Light</SelectItem>
                    <SelectItem key="dark" value="dark">Dark</SelectItem>
                    <SelectItem key="auto" value="auto">Auto</SelectItem>
                  </Select>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <Button 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              size="lg"
            >
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;