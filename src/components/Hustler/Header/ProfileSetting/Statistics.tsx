import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { Award, BarChart3, Clock, DollarSign, Star, Target, TrendingUp, Users } from 'lucide-react';

function Statistics() {
  const stats = [
    { title: 'Total Earnings', value: '₹45,230', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Completed Projects', value: '23', icon: Award, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Active Projects', value: '5', icon: Target, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { title: 'Client Rating', value: '4.8/5', icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'Total Clients', value: '18', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { title: 'Hours Worked', value: '340h', icon: Clock, color: 'text-red-600', bgColor: 'bg-red-100' },
  ];

  const recentActivity = [
    { project: 'E-commerce Website', client: 'Tech Solutions Inc.', status: 'Completed', amount: '₹15,000' },
    { project: 'Mobile App Design', client: 'StartupXYZ', status: 'In Progress', amount: '₹8,500' },
    { project: 'Logo Design', client: 'Creative Agency', status: 'Completed', amount: '₹3,200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Performance Statistics
          </h1>
          <p className="text-gray-600 text-lg">
            Track your freelancing performance and growth metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-green-200">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                <h2 className="text-xl font-bold">Monthly Performance</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-8 text-center">
                <TrendingUp className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Trending Up!</h3>
                <p className="text-gray-600">Your earnings have increased by 25% this month</p>
              </div>
            </CardBody>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{activity.project}</h4>
                      <p className="text-sm text-gray-600">{activity.client}</p>
                    </div>
                    <div className="text-right">
                      <Chip 
                        color={activity.status === 'Completed' ? 'success' : 'warning'} 
                        variant="flat" 
                        size="sm"
                        className="mb-1"
                      >
                        {activity.status}
                      </Chip>
                      <p className="text-sm font-semibold text-green-600">{activity.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Achievement Section */}
        <Card className="mt-8 shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              <h2 className="text-xl font-bold">Achievements & Milestones</h2>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <Award className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-yellow-800">Top Performer</h3>
                <p className="text-sm text-yellow-600">Achieved this month</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Star className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-800">5-Star Rating</h3>
                <p className="text-sm text-blue-600">Consistent quality</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Goal Crusher</h3>
                <p className="text-sm text-green-600">Monthly target exceeded</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Statistics;