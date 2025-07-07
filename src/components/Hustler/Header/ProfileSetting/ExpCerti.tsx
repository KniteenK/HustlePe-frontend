import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { Award, Briefcase, Building, Calendar, Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

function ExpiNCerti() {
  const [experiences] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Mumbai, India',
      startDate: '2022-01-15',
      endDate: '2023-12-20',
      current: false,
      description: 'Led a team of 5 developers in building modern web applications using React and TypeScript.',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Bangalore, India',
      startDate: '2020-06-10',
      endDate: '2021-12-31',
      current: false,
      description: 'Developed and maintained multiple web applications using MERN stack.',
    },
  ]);

  const [certifications] = useState([
    {
      id: 1,
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      issueDate: '2023-03-15',
      expiryDate: '2026-03-15',
      credentialId: 'AWS-DEV-2023-001',
    },
    {
      id: 2,
      name: 'React Developer Certification',
      issuer: 'Meta',
      issueDate: '2022-11-20',
      expiryDate: null,
      credentialId: 'META-REACT-2022-456',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Experience & Certifications
          </h1>
          <p className="text-gray-600 text-lg">
            Showcase your professional experience and achievements
          </p>
        </div>

        <div className="space-y-8">
          {/* Work Experience Section */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Work Experience</h2>
                </div>
                <Button 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/50"
                  endContent={<Plus className="h-4 w-4" />}
                >
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-colors border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                          <Building className="h-4 w-4" />
                          {exp.company}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{exp.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="bordered"
                          className="border-blue-200 hover:bg-blue-50 text-blue-700"
                          isIconOnly
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="bordered"
                          className="border-red-200 hover:bg-red-50 text-red-700"
                          isIconOnly
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(exp.startDate).toLocaleDateString()} - {' '}
                        {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
                
                {experiences.length === 0 && (
                  <div className="text-center py-8">
                    <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No Experience Added</h3>
                    <p className="text-gray-500 mb-4">Add your work experience to showcase your expertise</p>
                    <Button 
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      endContent={<Plus className="h-4 w-4" />}
                    >
                      Add Your First Experience
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Certifications Section */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Certifications</h2>
                </div>
                <Button 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/50"
                  endContent={<Plus className="h-4 w-4" />}
                >
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={cert.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                        <p className="text-blue-600 font-medium">{cert.issuer}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="bordered"
                          className="border-blue-200 hover:bg-blue-50 text-blue-700"
                          isIconOnly
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="bordered"
                          className="border-red-200 hover:bg-red-50 text-red-700"
                          isIconOnly
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                      </div>
                      {cert.expiryDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        ID: {cert.credentialId}
                      </div>
                    </div>
                  </div>
                ))}
                
                {certifications.length === 0 && (
                  <div className="md:col-span-2 text-center py-8">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No Certifications Added</h3>
                    <p className="text-gray-500 mb-4">Add your certifications to build credibility</p>
                    <Button 
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      endContent={<Plus className="h-4 w-4" />}
                    >
                      Add Your First Certification
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Add New Forms (Hidden by default, shown when buttons are clicked) */}
          {/* These would typically be in modals or separate components */}
        </div>
      </div>
    </div>
  );
}

export default ExpiNCerti;