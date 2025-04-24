"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock
} from "lucide-react"
import type { University } from "@/components/universities/data"

interface AdmissionSectionProps {
  university: University
  lang: string
}

export function AdmissionSection({ university, lang }: AdmissionSectionProps) {
  // Requirements data based on Svelte version images
  const admissionRequirements = [
    { requirement: "High School Diploma or equivalent", required: true },
    { requirement: "Minimum GPA of 3.5", required: true },
    { requirement: "SAT/ACT Scores", required: true },
    { requirement: "Letters of Recommendation (3)", required: true },
    { requirement: "Personal Statement", required: true },
    { requirement: "Interview", required: false },
    { requirement: "Portfolio (for specific programs)", required: false }
  ];

  // Deadlines based on Svelte version images
  const admissionDeadlines = [
    { round: "Early Decision", deadline: "November 1, 2023", decision: "December 15, 2023" },
    { round: "Regular Decision", deadline: "January 1, 2024", decision: "April 1, 2024" },
    { round: "Transfer Students", deadline: "March 1, 2024", decision: "May 15, 2024" }
  ];

  // Application process steps
  const admissionProcess = [
    {
      title: "Submit Your Application",
      description: "Complete and submit your application through our online portal, including all required documents and application fee."
    },
    {
      title: "Application Review",
      description: "Our admissions committee will carefully review your application, transcripts, test scores, and supporting materials."
    },
    {
      title: "Interview (if required)",
      description: "Some applicants may be invited for an interview, either in-person or virtually, depending on your location."
    },
    {
      title: "Admission Decision",
      description: "You'll receive an admission decision by the notification date for your application round."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Admission Requirements Section */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-slate-800">Admission Requirements</CardTitle>
          <CardDescription className="text-slate-600">
            Essential criteria for admission to {university.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-slate-600 mb-6">
            Admission to {university.name} is competitive. The following requirements must be met for your application to be considered:
          </p>
          
          <div className="grid gap-3 sm:grid-cols-2">
            {admissionRequirements.map((item, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {item.required ? (
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{item.requirement}</p>
                  <p className="text-xs mt-1">
                    {item.required ? (
                      <span className="text-green-600 font-medium">Required</span>
                    ) : (
                      <span className="text-amber-500 font-medium">Optional</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg mt-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> International students may have additional requirements including English proficiency test scores (TOEFL/IELTS) and visa documentation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Application Deadlines Section */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-slate-800">Application Deadlines</CardTitle>
          <CardDescription className="text-slate-600">
            Important dates for your application
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {admissionDeadlines.map((deadline, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-blue-200">
                <div className="bg-blue-600 py-3 px-4 text-white">
                  <h4 className="font-semibold">{deadline.round}</h4>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-slate-500">Deadline:</p>
                      <p className="font-semibold text-slate-800">{deadline.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-slate-500">Decision:</p>
                      <p className="font-semibold text-slate-800">{deadline.decision}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-slate-700">
              All application materials must be submitted by 11:59 PM Eastern Time on the deadline date. Late applications may be considered on a space-available basis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Admission Process Section */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-slate-800">Admission Process</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="relative">
            {admissionProcess.map((step, i) => (
              <div key={i} className="flex gap-6 pb-8">
                {/* Left side timeline - fixed sizing for all circles */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {i + 1}
                  </div>
                  {/* Connecting line - consistent width and position */}
                  {i < admissionProcess.length - 1 && (
                    <div className="w-0.5 bg-blue-100 h-full" style={{ marginTop: '0.5rem' }} />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800">{step.title}</h3>
                  <p className="text-slate-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="rounded-lg overflow-hidden bg-blue-600 text-white text-center px-6 py-10">
        <h2 className="text-2xl font-bold mb-3">Ready to Apply?</h2>
        <p className="text-white/90 mb-6">
          Take the first step towards your future at {university.name}
        </p>
        <Button className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-2.5 rounded-md shadow-lg">
          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 