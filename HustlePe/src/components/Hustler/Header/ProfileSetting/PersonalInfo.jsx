"use client"

import { Button as FormButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Avatar, Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: education.length > 0 ? education : [{ institute: "", degree: "", year_of_graduation: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:2000/api/v1/hustler/updateEducation', data);
      if (response.status === 200) {
        toast.success('Education details updated successfully');
      }
    } catch (error) {
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
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>{bio}</p>
        </CardBody>
      </Card>
      {/* password */}
      <div className="p-4 mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Change Password</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-black text-black">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription className="text-black">
                Enter your current and new password. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
            </div>
            <DialogFooter>
              <Button onClick={handleChangePassword}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

      {/* Education Update Form */}
      <div className="p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Update Education Information</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg shadow-sm">
                <FormField
                  control={form.control}
                  name={`education.${index}.institute`}
                  render={({ field }) => (
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
                  render={({ field }) => (
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
                  render={({ field }) => (
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