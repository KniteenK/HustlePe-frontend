import { Button, Card, CardBody, CardHeader, Chip, Input, Select, SelectItem } from '@nextui-org/react';
import { Briefcase, Calendar, DollarSign, Edit, Eye, Filter, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

function Gigs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockGigs = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      description: 'Build a modern e-commerce platform with React and Node.js',
      status: 'active',
      budget: '₹25,000',
      deadline: '2024-02-15',
      client: 'Tech Solutions Inc.',
      applications: 8,
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Design user interface for a fitness tracking mobile application',
      status: 'completed',
      budget: '₹18,000',
      deadline: '2024-01-20',
      client: 'FitLife Apps',
      applications: 12,
    },
    {
      id: 3,
      title: 'Logo Design & Branding',
      description: 'Create brand identity including logo, colors, and style guide',
      status: 'draft',
      budget: '₹8,500',
      deadline: '2024-02-28',
      client: 'Creative Agency',
      applications: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'primary';
      case 'draft': return 'warning';
      default: return 'default';
    }
  };

  const filteredGigs = mockGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || gig.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                My Gigs
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your projects and track their progress
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold mt-4 lg:mt-0"
              endContent={<Plus className="h-4 w-4" />}
            >
              Create New Gig
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-lg border border-green-200 mb-6">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search gigs by title or description..."
                  startContent={<Search className="h-4 w-4 text-gray-400" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  classNames={{
                    inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                  }}
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  placeholder="Filter by status"
                  selectedKeys={[filterStatus]}
                  onSelectionChange={(keys) => setFilterStatus(Array.from(keys)[0] as string)}
                  startContent={<Filter className="h-4 w-4 text-gray-400" />}
                  classNames={{
                    trigger: "border-2 border-green-200 hover:border-green-300",
                  }}
                >
                  <SelectItem key="all" value="all">All Status</SelectItem>
                  <SelectItem key="active" value="active">Active</SelectItem>
                  <SelectItem key="completed" value="completed">Completed</SelectItem>
                  <SelectItem key="draft" value="draft">Draft</SelectItem>
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Gigs Grid */}
        {filteredGigs.length === 0 ? (
          <Card className="shadow-lg border border-green-200">
            <CardBody className="p-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Gigs Found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first gig to get started'
                }
              </p>
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                endContent={<Plus className="h-4 w-4" />}
              >
                Create Your First Gig
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <Card key={gig.id} className="hover:shadow-xl transition-all duration-300 border border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-2">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                        {gig.title}
                      </h3>
                      <Chip 
                        color={getStatusColor(gig.status)} 
                        variant="flat" 
                        size="sm"
                        className="capitalize"
                      >
                        {gig.status}
                      </Chip>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-4">
                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {gig.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Client:</span>
                        <span className="font-medium text-gray-900">{gig.client}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Budget:
                        </span>
                        <span className="font-bold text-green-600">{gig.budget}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Deadline:
                        </span>
                        <span className="font-medium text-gray-900">{gig.deadline}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Applications:</span>
                        <span className="font-medium text-blue-600">{gig.applications}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        size="sm" 
                        variant="bordered"
                        className="flex-1 border-green-200 hover:bg-green-50 text-green-700"
                        startContent={<Eye className="h-3 w-3" />}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="bordered"
                        className="flex-1 border-blue-200 hover:bg-blue-50 text-blue-700"
                        startContent={<Edit className="h-3 w-3" />}
                      >
                        Edit
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
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Gigs;