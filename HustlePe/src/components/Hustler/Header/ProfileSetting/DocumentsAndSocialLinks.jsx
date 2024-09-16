import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define the schema for the form
const formSchema = z.object({
  govtIdProof: z.string().min(1, { message: 'Government ID Proof is required.' }),
  githubLink: z.string().url({ message: 'Invalid URL.' }).optional(),
  linkedinLink: z.string().url({ message: 'Invalid URL.' }).optional(),
  portfolioLink: z.string().url({ message: 'Invalid URL.' }).optional(),
});

function DocumentsAndSocialLinks() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      govtIdProof: '',
      githubLink: '',
      linkedinLink: '',
      portfolioLink: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Documents and Social Links</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="govtIdProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Government ID Proof</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your government ID proof" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your GitHub profile link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your LinkedIn profile link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your portfolio link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default DocumentsAndSocialLinks;