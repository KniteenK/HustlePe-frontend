"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import Cookies from 'js-cookie';
import { CalendarDays, ChevronLeft, DollarSign, FileText, Plus, Settings, X } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function PostGig() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const userData = JSON.parse(Cookies.get('userData') || '{}');
  const id = userData._id;

  const addSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleBack = () => {
    window.history.back();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate ?? new Date());
  };

  const handleSubmit = async () => {
    if (!title || !description || !payment || !paymentMethod) {
      toast.error('Please fill all required fields');
      return;
    }

    const gigDetails = {
      title,
      description,
      deadline: date,
      budget: payment,
      skills_req: skills,
      payment_option: paymentMethod,
    };

    let accessToken = "";
    const accessTokenCookie = Cookies.get('accessToken');
    if (accessTokenCookie) {
      accessToken = accessTokenCookie.replace(/^"|"$/g, "");
    }

    try {
      const response = await axios.post(
        'http://localhost:2000/api/v1/client/postGig',
        gigDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      
      if (response.data.statusCode == 201) {
        toast.success('Gig posted successfully!');
        setTimeout(() => navigate('/client/JobPosting'), 1500);
      } else {
        toast.error('Failed to create gig');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error posting gig. Please try again.');
    }
  };

  const handleDiscard = () => {
    setTitle("");
    setDescription("");
    setPayment("");
    setSkills([]);
    setSkillInput("");
    setDate(new Date());
    setPaymentMethod("");
    setShowCalendar(true);
    toast.info('All changes discarded');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 border-green-200 hover:bg-green-50" 
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Post a New Gig
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Create a detailed job posting to find the perfect freelancer
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleDiscard}
              className="border-red-200 hover:bg-red-50 text-red-700"
            >
              Discard Changes
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              Publish Gig
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gig Details Card */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  <CardTitle className="text-xl">Project Information</CardTitle>
                </div>
                <CardDescription className="text-green-100">
                  Provide comprehensive details about your project
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="title" className="text-gray-700 font-medium mb-2 block">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Build a Modern E-commerce Website"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-2 border-green-200 focus:border-green-500 rounded-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-gray-700 font-medium mb-2 block">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements, goals, and expectations in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-32 border-2 border-green-200 focus:border-green-500 rounded-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="payment" className="text-gray-700 font-medium mb-2 block">
                    Budget (₹) *
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                    <Input
                      id="payment"
                      type="number"
                      placeholder="Enter your budget amount"
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                      className="pl-10 border-2 border-green-200 focus:border-green-500 rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Required Card */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center gap-2">
                  <Settings className="h-6 w-6" />
                  <CardTitle className="text-xl">Required Skills</CardTitle>
                </div>
                <CardDescription className="text-blue-100">
                  Add skills that freelancers should have for this project
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter a skill (e.g., React, Node.js, UI/UX Design)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 border-2 border-blue-200 focus:border-blue-500 rounded-lg"
                    />
                    <Button 
                      onClick={addSkill} 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!skillInput.trim()}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  {skills.length > 0 && (
                    <div>
                      <Label className="text-gray-700 font-medium mb-3 block">
                        Selected Skills ({skills.length})
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1 flex items-center gap-2"
                          >
                            {skill}
                            <X 
                              className="h-3 w-3 cursor-pointer hover:text-red-600" 
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Deadline Card */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-6 w-6" />
                  <CardTitle className="text-xl">Project Deadline</CardTitle>
                </div>
                <CardDescription className="text-orange-100">
                  Set when you need this project completed
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button 
                    onClick={toggleCalendar} 
                    variant="outline"
                    className="w-full border-orange-200 hover:bg-orange-50"
                  >
                    {showCalendar ? "Hide Calendar" : "Show Calendar"}
                  </Button>
                  
                  {showCalendar && (
                    <div className="border-2 border-orange-200 rounded-lg p-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="rounded-md"
                        modifiers={{ selected: date }}
                        modifiersClassNames={{
                          selected: "bg-orange-500 text-white",
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-800">Selected Date:</p>
                    <p className="text-orange-700">{date.toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options Card */}
            <Card className="shadow-lg border border-green-200">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  <CardTitle className="text-xl">Payment Method</CardTitle>
                </div>
                <CardDescription className="text-purple-100">
                  Choose how you want to handle payments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label htmlFor="payment-method" className="text-gray-700 font-medium">
                    Payment Type *
                  </Label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger className="border-2 border-purple-200 focus:border-purple-500">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milestone">Milestone Based</SelectItem>
                      <SelectItem value="escrow">Escrow Protection</SelectItem>
                      <SelectItem value="hourly">Hourly Rate</SelectItem>
                      <SelectItem value="fixed">Fixed Price</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {paymentMethod && (
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <p className="text-sm font-medium text-purple-800">Selected:</p>
                      <p className="text-purple-700 capitalize">{paymentMethod.replace('_', ' ')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons for Mobile */}
            <div className="lg:hidden flex gap-4">
              <Button 
                variant="outline" 
                onClick={handleDiscard}
                className="flex-1 border-red-200 hover:bg-red-50 text-red-700"
              >
                Discard
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                Publish Gig
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PostGig;