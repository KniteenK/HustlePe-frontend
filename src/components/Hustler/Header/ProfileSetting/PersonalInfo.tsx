"use client"

import { Button as FormButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input } from '@nextui-org/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Camera, Edit, GraduationCap, Lock, Mail, MapPin, Phone, Plus, Trash2, User } from 'lucide-react';
import React, { useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";

// Define the schema for the form
const formSchema = z.object({
  education: z.array(
    z.object({
      institute: z.string().min(1, { message: "Institute is required." }),
      degree: z.string().min(1, { message: "Degree is required." }),
      year_of_graduation: z.number().min(1900, { message: "Year of Graduation is required." }),
    })
  ).min(1, { message: "At least one educational detail is required." }),
});

function PersonalInfo() {
  // Get user data from cookies
  const userData = JSON.parse(Cookies.get('userData') || '{}');

  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Extract user data with optional chaining and default values
  const avatar = userData.avatar || 'https://nextui.org/images/hero-card-complete.jpeg';
  const firstName = userData.first_name || 'First Name';
  const lastName = userData.last_name || 'Last Name';
  const bio = userData.bio || 'No bio available';
  const city = userData.address?.city || 'City';
  const country = userData.address?.country || 'Country';
  const username = userData.username || 'Username';
  const email = userData.email || 'Email';
  const contactNumber = userData.contactNumber || 'Contact Number';
  const education = userData.education || [];

  // State for form inputs
  const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [newAvatar, setNewAvatar] = useState<File | null>(null);

const handleAvatarChange = async () => {
  if (!newAvatar) {
    toast.error('Please select an avatar to upload');
    return;
  }

  const formData = new FormData();
  formData.append('avatar', newAvatar);

  try {
    const response = await axios.post('http://localhost:2000/api/v1/hustler/updateAvatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      toast.success('Avatar updated successfully');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error('Error updating avatar: ' + (error.response?.data?.message || error.message));
    } else {
      toast.error('Error updating avatar: ' + String(error));
    }
  }
};

const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
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
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error('Invalid current password');
    } else if (error.response && error.response.status === 404) {
      toast.error('User not found');
    } else {
      toast.error('Error changing password: ' + (error.response?.data?.message || error.message));
    }
  }
};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: education.length > 0 ? education : [{ institute: "", degree: "", year_of_graduation: 1900 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('http://localhost:2000/api/v1/hustler/updateEducation', data);
      if (response.status === 200) {
        toast.success('Education details updated successfully');
      }
    } catch (error: any) {
      toast.error('Error updating education details: ' + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Personal Information
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile and account settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border border-green-200 sticky top-6">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar 
                      isBordered 
                      radius="full" 
                      size="lg" 
                      src={avatar}
                      className="w-24 h-24 border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-2 border-white">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-white">
                    {firstName} {lastName}
                  </CardTitle>
                  <CardDescription className="text-green-100 font-medium">
                    @{username}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium text-gray-900">{contactNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{city}, {country}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2">Bio</p>
                  <p className="text-gray-800 leading-relaxed">{bio}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Avatar Update Section */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <Camera className="h-6 w-6" />
                  <CardTitle>Update Profile Picture</CardTitle>
                </div>
                <CardDescription className="text-green-100">
                  Upload a new profile picture to personalize your account
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="text-center">
                    <Avatar 
                      src={avatar} 
                      className="w-20 h-20 border-2 border-green-200 mb-2"
                    />
                    <p className="text-sm text-gray-600">Current Avatar</p>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="newAvatar" className="text-gray-700 font-medium mb-2 block">
                      Choose New Avatar
                    </Label>
                    <Input
                      id="newAvatar"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files) {
                          setNewAvatar(e.target.files[0]);
                        }
                      }}
                      classNames={{
                        inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                      }}
                    />
                  </div>
                  <Button 
                    onClick={handleAvatarChange}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  >
                    Update Avatar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Password Change Section */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <Lock className="h-6 w-6" />
                  <CardTitle>Change Password</CardTitle>
                </div>
                <CardDescription className="text-green-100">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="currentPassword" className="text-gray-700 font-medium mb-2 block">
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        classNames={{
                          inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword" className="text-gray-700 font-medium mb-2 block">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        classNames={{
                          inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* User Information Section */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6" />
                  <CardTitle>Personal Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-800 mb-1">First Name</p>
                      <p className="text-gray-900">{firstName}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-800 mb-1">Username</p>
                      <p className="text-gray-900">@{username}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm font-medium text-purple-800 mb-1">Email Address</p>
                      <p className="text-gray-900">{email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-800 mb-1">Last Name</p>
                      <p className="text-gray-900">{lastName}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm font-medium text-orange-800 mb-1">Contact Number</p>
                      <p className="text-gray-900">{contactNumber}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm font-medium text-red-800 mb-1">Location</p>
                      <p className="text-gray-900">{city}, {country}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education Information Section */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    <CardTitle>Education Background</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {education.length > 0 ? (
                  <div className="space-y-4">
                    {education.map((edu: { institute: string; degree: string; year_of_graduation: number; }, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree || 'Degree'}</h3>
                            <p className="text-blue-600 font-medium">{edu.institute || 'Institution'}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="bordered" className="border-blue-200 hover:bg-blue-50 text-blue-700" isIconOnly>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="bordered" className="border-red-200 hover:bg-red-50 text-red-700" isIconOnly>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Year of Graduation:</span> {edu.year_of_graduation || 'Year of Graduation'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No Education Information</h3>
                    <p className="text-gray-500 mb-4">Add your educational background to enhance your profile</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Education Update Form */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <Plus className="h-6 w-6" />
                  <CardTitle>Update Education Information</CardTitle>
                </div>
                <CardDescription className="text-green-100">
                  Add or modify your educational qualifications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {fields.map((field: { id: string; institute: string; degree: string; year_of_graduation: number }, index: number) => (
                      <Card key={field.id} className="border border-gray-200 bg-gray-50">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Education #{index + 1}</h3>
                            <Button 
                              type="button" 
                              onClick={() => remove(index)}
                              size="sm"
                              variant="bordered"
                              className="border-red-200 hover:bg-red-50 text-red-700"
                              startContent={<Trash2 className="h-3 w-3" />}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.institute`}
                              render={({ field }: { field: any }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 font-medium">Institute</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter institute name" 
                                      {...field}
                                      classNames={{
                                        inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.degree`}
                              render={({ field }: { field: any }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 font-medium">Degree</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter degree name" 
                                      {...field}
                                      classNames={{
                                        inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.year_of_graduation`}
                              render={({ field }: { field: any }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel className="text-gray-700 font-medium">Year of Graduation</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter graduation year" 
                                      {...field}
                                      classNames={{
                                        inputWrapper: "border-2 border-green-200 hover:border-green-300 focus-within:border-green-500",
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <Button 
                        type="button" 
                        onClick={() => append({ institute: "", degree: "", year_of_graduation: "" })}
                        variant="bordered"
                        className="border-green-200 hover:bg-green-50 text-green-700"
                        startContent={<Plus className="h-4 w-4" />}
                      >
                        Add Education
                      </Button>
                      <FormButton 
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8"
                      >
                        Save Education Details
                      </FormButton>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;