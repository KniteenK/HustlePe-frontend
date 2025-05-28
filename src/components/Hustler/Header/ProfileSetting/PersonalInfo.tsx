"use client"

import { Button as FormButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
    return <div>Loading...</div>;
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
    <div className="p-6 h-full">
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
        <CardContent className="px-3 py-0 text-small text-default-400">
          <p>{bio}</p>
        </CardContent>
      </Card>
      {/* Avatar Update */}
      <div className="p-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Avatar</CardTitle>
            <CardDescription>
              Select a new avatar to upload. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newAvatar" className="text-right">
                  New Avatar
                </Label>
                <Input
                  id="newAvatar"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setNewAvatar(e.target.files[0]);
                    }
                  }}
                  className="col-span-3"
                />
              </div>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleAvatarChange}>Save Avatar</Button>
              </CardFooter>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Password Change */}
      

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
          education.map((edu: { institute: string; degree: string; year_of_graduation: number; }, index: number) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <p><strong>Institution:</strong> {edu.institute || 'Institution'}</p>
              <p><strong>Degree:</strong> {edu.degree || 'Degree'}</p>
              <p><strong>Year of Graduation:</strong> {edu.year_of_graduation || 'Year of Graduation'}</p>
            </div>
          ))
        ) : (
          <p>No education information available.</p>
        )}
      </div>
      <div className="p-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Enter your current and new password. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="currentPassword" className="text-right">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit">Save</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Education Update Form */}
      <div className="p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Update Education Information</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field: { id: string; institute: string; degree: string; year_of_graduation: number }, index: number) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg shadow-sm">
                <FormField
                  control={form.control}
                  name={`education.${index}.institute`}
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Institute</FormLabel>
                      <FormControl>
                        <Input placeholder="Institute" {...field} />
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
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="Degree" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.year_of_graduation`}
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Year of Graduation</FormLabel>
                      <FormControl>
                        <Input placeholder="Year of Graduation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => remove(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ institute: "", degree: "", year_of_graduation: "" })}>
              Add Education
            </Button>
            <FormButton type="submit">Submit</FormButton>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default PersonalInfo;