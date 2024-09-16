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
import { ChevronLeft } from "lucide-react";
import React, { useState } from 'react';

function PostGig() {
  const [date, setDate] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-full">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Post a Gig
        </h1>
        
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Gig</Button>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Gig Details</CardTitle>
                  <CardDescription>
                    Provide details about the gig you want to post.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        className="w-full"
                        placeholder="Enter gig title"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter gig description"
                        className="min-h-32"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="payment">Payment</Label>
                      <Input
                        id="payment"
                        type="number"
                        className="w-full"
                        placeholder="Enter payment amount"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skills Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="skills">Skills</Label>
                      <Input
                        id="skills"
                        type="text"
                        className="w-full"
                        placeholder="Enter required skills"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                      />
                      <Button onClick={addSkill} className="mt-2">
                        Add Skill
                      </Button>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index}>{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Deadline</CardTitle>
                  <CardDescription>
                    Select the deadline for the gig.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={toggleCalendar} className="mb-4">
                    {showCalendar ? "Hide Calendar" : "Show Calendar"}
                  </Button>
                  {showCalendar && (
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      modifiers={{ selected: date }} // Highlight the selected date
                      modifiersClassNames={{
                        selected: "bg-blue-500 text-white", // Custom Tailwind class for selected day
                      }}
                      className="rounded-md border"
                    />
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Options</CardTitle>
                  <CardDescription>
                    Select the payment options for the gig.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select>
                        <SelectTrigger
                          id="payment-method"
                          aria-label="Select payment method"
                        >
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Gig</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PostGig;