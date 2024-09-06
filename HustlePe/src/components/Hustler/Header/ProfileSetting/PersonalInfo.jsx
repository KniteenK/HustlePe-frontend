import { Avatar, Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PersonalInfo() {
  // Get user data from cookies
  const userData = JSON.parse(Cookies.get('userData') || '{}');

  if (!userData || Object.keys(userData).length === 0) {
    return <div>Loading...</div>;
  }

  // Extract user data with optional chaining and default values
  const avatar = userData.data?.user?.avatar || 'https://nextui.org/images/hero-card-complete.jpeg';
  const firstName = userData.data?.user?.first_name || 'First Name';
  const lastName = userData.data?.user?.last_name || 'Last Name';
  const bio = userData.data?.user?.bio || 'No bio available';
  const city = userData.data?.user?.address?.city || 'City';
  const country = userData.data?.user?.address?.country || 'Country';
  const username = userData.data?.user?.username || 'Username';
  const email = userData.data?.user?.email || 'Email';
  const contactNumber = userData.data?.user?.contactNumber || 'Contact Number';
  const education = userData.data?.user?.education || [];

  // State for form inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error('Please fill both current password and new password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:2000/api/v1/hustler/changePassword', {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (error) {
      toast.error('Error changing password: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      {/* Avatar and Greeting Card */}
      <Card className="max-w-[340px] border-none shadow-none">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={avatar} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {firstName} {lastName}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">@{username}</h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>{bio}</p>
        </CardBody>
      </Card>

      {/* Change Password Form */}
      <div className="p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Change Password</h2>
        <div className="flex flex-col gap-4">
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button className="mt-4" onClick={handleChangePassword}>
            Change Password
          </Button>
        </div>
      </div>

      {/* User Information Box */}
      <div className="p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">User Information</h2>
        <p><strong>Address:</strong> {city}, {country}</p>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Contact Number:</strong> {contactNumber}</p>
      </div>

      {/* Education Information Box */}
      <div className="p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Education Information</h2>
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index}>
              <p><strong>Institution:</strong> {edu.institution || 'Institution'}</p>
              <p><strong>Degree:</strong> {edu.degree || 'Degree'}</p>
              <p><strong>Field of Study:</strong> {edu.fieldOfStudy || 'Field of Study'}</p>
              <p><strong>Start Year:</strong> {edu.startYear || 'Start Year'}</p>
              <p><strong>End Year:</strong> {edu.endYear || 'End Year'}</p>
            </div>
          ))
        ) : (
          <p>No education information available.</p>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;