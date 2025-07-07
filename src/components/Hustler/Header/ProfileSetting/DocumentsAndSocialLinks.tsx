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
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { FileText, Github, Globe, Linkedin, Upload } from 'lucide-react';
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            Documents & Social Links
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your verification documents and social media profiles
          </p>
        </div>

        <Card className="shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <h2 className="text-xl font-bold">Professional Information</h2>
            </div>
          </CardHeader>
          <CardBody className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Government ID Section */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Upload className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800">Identity Verification</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="govtIdProof"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Government ID Proof *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your government ID proof number" 
                            {...field} 
                            className="border-2 border-green-200 focus:border-green-500 rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Social Links Section */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-2 mb-6">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">Professional Social Links</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="githubLink"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            GitHub Profile
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://github.com/your-username" 
                              {...field} 
                              className="border-2 border-blue-200 focus:border-blue-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedinLink"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn Profile
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://linkedin.com/in/your-profile" 
                              {...field} 
                              className="border-2 border-blue-200 focus:border-blue-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="portfolioLink"
                      render={({ field }: { field: any }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Portfolio Website
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://your-portfolio.com" 
                              {...field} 
                              className="border-2 border-blue-200 focus:border-blue-500 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    size="lg"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default DocumentsAndSocialLinks;