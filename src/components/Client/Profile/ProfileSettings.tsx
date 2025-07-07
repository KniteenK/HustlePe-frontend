import { Avatar, Button, Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import { Building, Camera, Mail, MapPin, Phone, Save, User } from "lucide-react";

function ProfileSettings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border border-green-200 sticky top-6">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
                <div className="flex flex-col items-center w-full">
                  <div className="relative mb-4">
                    <Avatar 
                      src="https://i.pravatar.cc/150?u=client"
                      className="w-24 h-24 border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-green-600 transition-colors">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-white">Client Name</h2>
                  <p className="text-green-100 font-medium">Organization Name</p>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">client@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">+1 234 567 8900</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">New York, USA</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Personal Information</h3>
                </div>
              </CardHeader>
              <CardBody className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    value="John"
                    classNames={{
                      inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                    }}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    value="Doe"
                    classNames={{
                      inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                    }}
                  />
                </div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email"
                  value="client@example.com"
                  classNames={{
                    inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                  }}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                  value="+1 234 567 8900"
                  classNames={{
                    inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                  }}
                />
              </CardBody>
            </Card>

            {/* Company Information */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <Building className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Company Information</h3>
                </div>
              </CardHeader>
              <CardBody className="p-6 space-y-4">
                <Input
                  label="Organization Name"
                  placeholder="Enter organization name"
                  value="Tech Solutions Inc."
                  classNames={{
                    inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                  }}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Industry"
                    placeholder="Enter industry"
                    value="Technology"
                    classNames={{
                      inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                    }}
                  />
                  <Input
                    label="Company Size"
                    placeholder="Enter company size"
                    value="50-100 employees"
                    classNames={{
                      inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                    }}
                  />
                </div>
                <Textarea
                  label="Company Description"
                  placeholder="Describe your company"
                  value="A leading technology company focused on innovation and excellence."
                  minRows={3}
                  classNames={{
                    inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                  }}
                />
              </CardBody>
            </Card>

            {/* Location Information */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Location Information</h3>
                </div>
              </CardHeader>
              <CardBody className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Country"
                    placeholder="Enter country"
                    value="United States"
                    classNames={{
                      inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                    }}
                  />
                  <Input
                    label="City"
                    placeholder="Enter city"
                    value="New York"
                    classNames={{
                      inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                    }}
                  />
                </div>
                <Input
                  label="Address"
                  placeholder="Enter full address"
                  value="123 Business St, New York, NY 10001"
                  classNames={{
                    inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                  }}
                />
              </CardBody>
            </Card>

            {/* Save Button */}
            <div className="flex justify-center pt-6">
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                size="lg"
                startContent={<Save className="h-5 w-5" />}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;