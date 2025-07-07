import { Button, Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Building2, Plus } from "lucide-react";
import { useState } from "react";

interface CreateOrganizationProps {
  onSuccess?: () => void;
}

function CreateOrganization({ onSuccess }: CreateOrganizationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Organization name is required');
      return;
    }

    setCreating(true);
    try {
      let accessToken = "";
      const accessTokenCookie = Cookies.get('accessToken');
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.replace(/^"|"$/g, "");
      }

      await axios.post(
        'http://localhost:2000/api/v1/organization/create',
        {
          name: formData.name,
          description: formData.description
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      alert('Organization created successfully!');
      setFormData({ name: '', description: '' });
      handleClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error creating organization:', error);
      alert(error.response?.data?.message || 'Failed to create organization');
    } finally {
      setCreating(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '' });
    onClose();
  };

  return (
    <>
      <Button
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
        onClick={onOpen}
        startContent={<Plus className="h-4 w-4" />}
      >
        Create Organization
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={handleClose} 
        size="2xl"
        placement="top-center"
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/80 backdrop-blur-sm z-50",
          wrapper: "z-50",
          base: "z-50"
        }}
      >
        <ModalContent className="bg-white shadow-2xl">
          <ModalHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-green-700">Create New Organization</h2>
            </div>
          </ModalHeader>
          <ModalBody className="p-6 bg-white">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name *
                </label>
                <Input
                  placeholder="Enter organization name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-gray-900",
                    inputWrapper: "border-green-200 focus-within:border-green-500 hover:border-green-300"
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Describe your organization's mission, goals, and what you do..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  variant="bordered"
                  rows={4}
                  classNames={{
                    input: "text-gray-900",
                    inputWrapper: "border-green-200 focus-within:border-green-500 hover:border-green-300"
                  }}
                />
              </div>

              <Card className="border border-green-200 bg-green-50 shadow-sm">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900 mb-1">Organization Leadership</h4>
                      <p className="text-sm text-green-700">
                        As the founder, you'll be able to manage members, review applications, 
                        and oversee your organization's projects. You'll automatically be added 
                        as the first member with the "Founder" role.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter className="bg-gray-50 border-t border-gray-200">
            <Button 
              variant="light" 
              onPress={handleClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
              onPress={handleSubmit}
              isLoading={creating}
            >
              Create Organization
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateOrganization;
