import { Avatar, Button, Card, CardBody, CardHeader, Chip, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import { Building2, Filter, Globe, Mail, MapPin, Phone, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../findWork/SearchIcon";
import CreateOrganization from "./CreateOrganization";

const getOrganizations = async () => {
  try {
    // Get access token from cookie for authentication
    let accessToken = "";
    const accessTokenCookie = Cookies.get('accessToken');
    if (accessTokenCookie) {
      accessToken = accessTokenCookie.replace(/^"|"$/g, "");
    }

    console.log('Fetching organizations...');
    const response = await fetch("http://localhost:2000/api/v1/organization/all", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch organizations");
    }
    const data = await response.json();
    console.log('Organizations fetched:', data);
    // The organizations are in data.data (array)
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw new Error('Error fetching organizations');
  }
};

function Organizations() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [userOrganization, setUserOrganization] = useState<any>(null);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const fetchedOrganizations = await getOrganizations();
      setOrganizations(fetchedOrganizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserOrganization = async () => {
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      const response = await fetch("http://localhost:2000/api/v1/organization/my-organization", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserOrganization(data.data);
      }
    } catch (error) {
      // User doesn't have an organization, which is fine
      console.log('User is not part of any organization');
    }
  };

  useEffect(() => {
    fetchOrganizations();
    checkUserOrganization();
  }, []);

  const orgArray = Array.isArray(organizations) ? organizations : [];
  const filteredOrganizations = orgArray.filter(org =>
    org.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
    org.description?.toLowerCase().includes(searchInput.toLowerCase()) ||
    org.location?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Filter is handled in real-time
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                Organizations
              </h1>
              <p className="text-gray-600 text-lg">
                Discover and connect with organizations in your network
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <Chip color="success" variant="flat" size="lg">
                {filteredOrganizations.length} Organizations
              </Chip>
              {userOrganization && (
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
                  onClick={() => navigate("/hustler/my-organization")}
                >
                  My Organization
                </Button>
              )}
              <Button
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                onClick={() => navigate("/hustler/my-applications")}
              >
                My Applications
              </Button>
              {!userOrganization && (
                <CreateOrganization onSuccess={() => {
                  fetchOrganizations();
                  checkUserOrganization();
                }} />
              )}
            </div>
          </div>

          {/* Search Section */}
          <Card className="shadow-lg border border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-2">
                <SearchIcon size={24} />
                <h2 className="text-xl font-bold">Find Organizations</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <Input
                classNames={{
                  base: "w-full",
                  inputWrapper: "h-12 border-2 border-green-200 hover:border-green-300 focus-within:border-green-500 bg-white",
                  input: "text-base",
                }}
                placeholder="Search by name, description, or location..."
                size="lg"
                startContent={<SearchIcon size={20} className="text-green-600" />}
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {searchInput && (
                <div className="mt-3 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    Showing results for: <span className="font-medium text-green-700">"{searchInput}"</span>
                  </span>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Organizations Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading organizations...</p>
            </div>
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto shadow-lg border border-green-200">
              <CardBody className="p-8">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {searchInput ? 'No Results Found' : 'No Organizations Available'}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {searchInput 
                    ? `No organizations match your search for "${searchInput}". Try different keywords.`
                    : 'There are no organizations available at the moment. Check back later!'
                  }
                </p>
                {searchInput && (
                  <Button 
                    className="mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    onClick={() => setSearchInput("")}
                  >
                    Clear Search
                  </Button>
                )}
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org) => (
              <Card key={org._id} className="hover:shadow-xl transition-all duration-300 border border-green-200 bg-white group">
                <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                  <div className="flex items-start gap-4 w-full">
                    <Avatar
                      src={org.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name || 'Org')}&background=16a34a&color=ffffff`}
                      alt={org.name}
                      className="w-16 h-16 border-2 border-green-200"
                      fallback={<Building2 className="h-8 w-8 text-green-600" />}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 truncate mb-1">
                        {org.name}
                      </h3>
                      {org.industry && (
                        <Chip size="sm" variant="flat" color="success" className="mb-2">
                          {org.industry}
                        </Chip>
                      )}
                      {org.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{org.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-4">
                  <div className="space-y-4">
                    {org.description && (
                      <p className="text-gray-700 leading-relaxed line-clamp-3">
                        {org.description}
                      </p>
                    )}

                    <div className="space-y-2">
                      {org.employeeCount && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span>{org.employeeCount} employees</span>
                        </div>
                      )}
                      
                      {org.website && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="h-4 w-4 text-purple-600" />
                          <a 
                            href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 hover:underline truncate"
                          >
                            {org.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                      
                      {org.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4 text-red-600" />
                          <a 
                            href={`mailto:${org.email}`}
                            className="text-green-600 hover:text-green-700 hover:underline truncate"
                          >
                            {org.email}
                          </a>
                        </div>
                      )}
                      
                      {org.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4 text-orange-600" />
                          <a 
                            href={`tel:${org.phone}`}
                            className="text-green-600 hover:text-green-700 hover:underline"
                          >
                            {org.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {org.tags && org.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {org.tags.slice(0, 3).map((tag: string, index: number) => (
                          <Chip key={index} size="sm" variant="bordered" className="text-xs border-green-200">
                            {tag}
                          </Chip>
                        ))}
                        {org.tags.length > 3 && (
                          <Chip size="sm" variant="bordered" className="text-xs border-green-200">
                            +{org.tags.length - 3} more
                          </Chip>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                        size="sm"
                        onClick={() => navigate(`/hustler/organizations/${org._id}`)}
                      >
                        View Profile
                      </Button>
                      <Button 
                        variant="bordered"
                        className="flex-1 border-green-200 hover:bg-green-50 text-green-700 font-medium"
                        size="sm"
                      >
                        Contact
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

export default Organizations;