import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/StatsCard";
import DriveCard from "@/components/DriveCard";
import StudentTable from "@/components/StudentTable";
import DriveForm from "@/components/DriveForm";
import { AuthPage } from "@/components/AuthForms";
import ResumeManager from "@/components/ResumeManager";
import AIAnalysis from "@/components/AIAnalysis";
import ApplicationsTable from "@/components/ApplicationsTable";
import DriveManagement from "@/components/DriveManagement";
import Community from "@/components/Community";
import {
  Building2,
  Users,
  TrendingUp,
  CheckCircle,
  Plus,
  GraduationCap,
  Target,
  Clock,
  Copy,
} from "lucide-react";

// todo: remove mock functionality - mock data for prototype
const mockDrives = [
  {
    id: 1,
    companyName: "Google",
    jobRole: "Software Engineer",
    ctcMin: 25,
    ctcMax: 35,
    minCgpa: 8.0,
    maxBacklogs: 0,
    allowedBranches: ["CSE", "IT", "ECE"],
    registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    jobDescription: "Join Google's engineering team to build products that help billions of users. Work on cutting-edge technologies including AI/ML, cloud computing, and distributed systems.",
    status: "Active" as const,
    registrationsCount: 45,
  },
  {
    id: 2,
    companyName: "Microsoft",
    jobRole: "SDE II",
    ctcMin: 18,
    ctcMax: 28,
    minCgpa: 7.5,
    maxBacklogs: 1,
    allowedBranches: ["CSE", "IT", "ECE", "EEE"],
    registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    jobDescription: "Work on Azure cloud services and enterprise solutions. Collaborate with teams worldwide to deliver innovative products.",
    status: "Active" as const,
    registrationsCount: 62,
  },
  {
    id: 3,
    companyName: "Amazon",
    jobRole: "SDE I",
    ctcMin: 16,
    ctcMax: 24,
    minCgpa: 7.0,
    maxBacklogs: 1,
    allowedBranches: ["CSE", "IT"],
    registrationDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    jobDescription: "Build systems that power Amazon's e-commerce platform serving millions of customers daily.",
    status: "Active" as const,
    registrationsCount: 78,
  },
  {
    id: 4,
    companyName: "Infosys",
    jobRole: "Systems Engineer",
    ctcMin: 4,
    ctcMax: 6,
    minCgpa: 6.0,
    maxBacklogs: 2,
    allowedBranches: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"],
    registrationDeadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    jobDescription: "Join one of India's leading IT companies. Training provided for freshers.",
    status: "Completed" as const,
    registrationsCount: 120,
  },
];

// todo: remove mock functionality
const mockStudents = [
  { id: 1, name: "Rahul Sharma", email: "rahul@university.edu", rollNumber: "2021CSE001", branch: "CSE", graduationYear: 2025, cgpa: 8.75, activeBacklogs: 0, placementStatus: "Placed" as const, placedCompany: "Google", placedPackage: 32, registrationsCount: 5 },
  { id: 2, name: "Priya Patel", email: "priya@university.edu", rollNumber: "2021IT002", branch: "IT", graduationYear: 2025, cgpa: 9.2, activeBacklogs: 0, placementStatus: "Not Placed" as const, registrationsCount: 8 },
  { id: 3, name: "Amit Kumar", email: "amit@university.edu", rollNumber: "2021ECE003", branch: "ECE", graduationYear: 2025, cgpa: 7.8, activeBacklogs: 1, placementStatus: "Not Placed" as const, registrationsCount: 3 },
  { id: 4, name: "Sneha Gupta", email: "sneha@university.edu", rollNumber: "2021CSE004", branch: "CSE", graduationYear: 2025, cgpa: 8.4, activeBacklogs: 0, placementStatus: "Placed" as const, placedCompany: "Microsoft", placedPackage: 24, registrationsCount: 6 },
  { id: 5, name: "Vikram Singh", email: "vikram@university.edu", rollNumber: "2021ME005", branch: "Mechanical", graduationYear: 2025, cgpa: 7.2, activeBacklogs: 2, placementStatus: "Opted Out" as const, registrationsCount: 0 },
];

// todo: remove mock functionality
const mockResumes = [
  { id: 1, name: "Default Resume", fileName: "rahul_resume_v3.pdf", uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), isDefault: true },
  { id: 2, name: "Tech Focused", fileName: "rahul_tech_resume.pdf", uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), isDefault: false },
];

// todo: remove mock functionality
const mockApplications = [
  { id: 1, driveId: 1, companyName: "Google", jobRole: "Software Engineer", appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), status: "Shortlisted" as const, matchScore: 85, resumeName: "Default Resume" },
  { id: 2, driveId: 2, companyName: "Microsoft", jobRole: "SDE II", appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), status: "Interview" as const, matchScore: 78, resumeName: "Tech Focused" },
  { id: 3, driveId: 3, companyName: "Amazon", jobRole: "SDE I", appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), status: "Registered" as const, resumeName: "Default Resume" },
];

// todo: remove mock functionality
const mockDiscussions = [
  { id: 1, title: "Tips for Google Technical Interview", content: "I just cleared Google's technical round! Here are some tips that helped me - focus on problem-solving approach, communicate your thought process clearly, and practice medium-level DSA problems.", author: { name: "Priya Patel", branch: "IT" }, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), repliesCount: 12, likesCount: 34, tags: ["Interview", "Google"] },
  { id: 2, title: "Resume tips for freshers", content: "Should I include my internship project if it was only 2 months? Also, how many projects are ideal for a fresher resume?", author: { name: "Amit Kumar", branch: "ECE" }, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), repliesCount: 8, likesCount: 15, tags: ["Resume"] },
  { id: 3, title: "Microsoft vs Amazon - Which to choose?", content: "Got offers from both! Microsoft is offering slightly less but heard work-life balance is better. Any seniors who can share their experience?", author: { name: "Sneha Gupta", branch: "CSE" }, createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), repliesCount: 23, likesCount: 45, tags: ["Career"] },
];

// todo: remove mock functionality
const mockStudentContacts = [
  { id: 1, name: "Priya Patel", branch: "IT", graduationYear: 2025, placementStatus: "Not Placed", isOnline: true },
  { id: 2, name: "Amit Kumar", branch: "ECE", graduationYear: 2025, placementStatus: "Not Placed", isOnline: false },
  { id: 3, name: "Sneha Gupta", branch: "CSE", graduationYear: 2025, placementStatus: "Placed", placedCompany: "Microsoft", isOnline: true },
  { id: 4, name: "Vikram Singh", branch: "Mechanical", graduationYear: 2025, placementStatus: "Opted Out", isOnline: false },
  { id: 5, name: "Ananya Reddy", branch: "CSE", graduationYear: 2025, placementStatus: "Placed", placedCompany: "Google", isOnline: true },
];

function CoordinatorDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showDriveForm, setShowDriveForm] = useState(false);
  const { toast } = useToast();

  const inviteCode = "ABC-UNI-2024"; // todo: remove mock functionality

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({
      title: "Copied!",
      description: "Invite code copied to clipboard",
    });
  };

  const activeDrives = mockDrives.filter(d => d.status === "Active").length;
  const placedStudents = mockStudents.filter(s => s.placementStatus === "Placed").length;
  const totalStudents = mockStudents.length;
  const placementRate = Math.round((placedStudents / totalStudents) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header
        userName="Dr. Priya Sharma"
        userRole="coordinator"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => console.log("Logout")} // todo: implement logout
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === "Dashboard" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">ABC University of Technology</p>
              </div>
              <Card className="p-4 flex items-center gap-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Student Invite Code</p>
                  <p className="font-mono font-semibold">{inviteCode}</p>
                </div>
                <Button size="icon" variant="outline" onClick={copyInviteCode} data-testid="button-copy-invite">
                  <Copy className="w-4 h-4" />
                </Button>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard title="Active Drives" value={activeDrives} subtitle="Currently recruiting" icon={Building2} />
              <StatsCard title="Students Placed" value={`${placedStudents}/${totalStudents}`} subtitle={`${placementRate}% placement rate`} icon={CheckCircle} trend={{ value: 12, isPositive: true }} />
              <StatsCard title="Total Students" value={totalStudents} subtitle="Registered students" icon={Users} />
              <StatsCard title="Avg Package" value="8.5 LPA" subtitle="This season" icon={TrendingUp} trend={{ value: 15, isPositive: true }} />
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Drives</h2>
              <Button onClick={() => setShowDriveForm(true)} data-testid="button-post-drive">
                <Plus className="w-4 h-4 mr-2" />
                Post New Drive
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockDrives.slice(0, 4).map((drive) => (
                <DriveCard
                  key={drive.id}
                  {...drive}
                  userRole="coordinator"
                  onViewDetails={(id) => console.log("View drive:", id)}
                />
              ))}
            </div>

            {showDriveForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Post New Drive</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowDriveForm(false)}>
                      Close
                    </Button>
                  </div>
                  <div className="p-4">
                    <DriveForm
                      onSubmit={(data) => {
                        console.log("Drive posted:", data);
                        setShowDriveForm(false);
                        toast({ title: "Success", description: "Drive posted successfully!" });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Drives" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold tracking-tight">Manage Drives</h1>
              <Button onClick={() => setShowDriveForm(true)} data-testid="button-new-drive">
                <Plus className="w-4 h-4 mr-2" />
                Post New Drive
              </Button>
            </div>
            <DriveManagement
              drives={mockDrives}
              onViewDrive={(id) => console.log("View:", id)}
              onEditDrive={(id) => console.log("Edit:", id)}
              onCompleteDrive={(id) => console.log("Complete:", id)}
            />
          </div>
        )}

        {activeTab === "Students" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Students</h1>
            <StudentTable
              students={mockStudents}
              onViewProfile={(id) => console.log("View profile:", id)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { toast } = useToast();

  // todo: remove mock functionality - mock student data
  const currentStudent = {
    name: "Rahul Sharma",
    rollNumber: "2021CSE001",
    branch: "CSE",
    cgpa: 8.75,
    activeBacklogs: 0,
    placementStatus: "Not Placed" as "Not Placed" | "Placed" | "Opted Out",
  };

  const eligibleDrives = mockDrives.filter((drive) => {
    return (
      drive.status === "Active" &&
      currentStudent.cgpa >= drive.minCgpa &&
      currentStudent.activeBacklogs <= drive.maxBacklogs &&
      drive.allowedBranches.includes(currentStudent.branch) &&
      new Date(drive.registrationDeadline) > new Date()
    );
  });

  const registeredDriveIds = mockApplications.map((a) => a.driveId);

  return (
    <div className="min-h-screen bg-background">
      <Header
        userName={currentStudent.name}
        userRole="student"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => console.log("Logout")} // todo: implement logout
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === "Dashboard" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Welcome, {currentStudent.name.split(" ")[0]}!
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{currentStudent.rollNumber}</Badge>
                  <Badge variant="outline">{currentStudent.branch}</Badge>
                </div>
              </div>
              <Card className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">CGPA</p>
                    <p className="font-semibold text-lg">{currentStudent.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Backlogs</p>
                    <p className="font-semibold text-lg">{currentStudent.activeBacklogs}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Eligible Drives"
                value={eligibleDrives.length}
                subtitle="Based on your profile"
                icon={Target}
              />
              <StatsCard
                title="My Applications"
                value={mockApplications.length}
                subtitle="Active applications"
                icon={Building2}
              />
              <StatsCard
                title="Upcoming Deadlines"
                value={eligibleDrives.filter((d) => {
                  const days = Math.ceil(
                    (new Date(d.registrationDeadline).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return days <= 7;
                }).length}
                subtitle="Within 7 days"
                icon={Clock}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Eligible Drives ({eligibleDrives.length})
              </h2>
              {eligibleDrives.length === 0 ? (
                <Card className="p-8 text-center">
                  <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium">No eligible drives available</p>
                  <p className="text-sm text-muted-foreground">
                    Check back later for new opportunities
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {eligibleDrives.map((drive) => (
                    <DriveCard
                      key={drive.id}
                      {...drive}
                      isRegistered={registeredDriveIds.includes(drive.id)}
                      registrationStatus={
                        mockApplications.find((a) => a.driveId === drive.id)?.status
                      }
                      resumes={mockResumes}
                      onRegister={(driveId, resumeId, notes) => {
                        console.log("Register:", { driveId, resumeId, notes });
                        toast({
                          title: "Registration Successful",
                          description: `You have registered for ${drive.companyName}`,
                        });
                      }}
                      userRole="student"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">My Recent Applications</h2>
              <ApplicationsTable
                applications={mockApplications.slice(0, 3)}
                onWithdraw={(id) => console.log("Withdraw:", id)}
                onViewDrive={(id) => console.log("View drive:", id)}
                onAnalyze={(id) => console.log("Analyze:", id)}
              />
            </div>
          </div>
        )}

        {activeTab === "Drives" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Browse Drives</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockDrives
                .filter((d) => d.status === "Active")
                .map((drive) => {
                  const isEligible =
                    currentStudent.cgpa >= drive.minCgpa &&
                    currentStudent.activeBacklogs <= drive.maxBacklogs &&
                    drive.allowedBranches.includes(currentStudent.branch);
                  return (
                    <div key={drive.id} className={!isEligible ? "opacity-60" : ""}>
                      <DriveCard
                        {...drive}
                        isRegistered={registeredDriveIds.includes(drive.id)}
                        registrationStatus={
                          mockApplications.find((a) => a.driveId === drive.id)?.status
                        }
                        resumes={mockResumes}
                        onRegister={(driveId, resumeId, notes) => {
                          console.log("Register:", { driveId, resumeId, notes });
                          toast({
                            title: "Registration Successful",
                            description: `You have registered for ${drive.companyName}`,
                          });
                        }}
                        userRole="student"
                      />
                      {!isEligible && (
                        <p className="text-xs text-destructive mt-2 text-center">
                          You do not meet the eligibility criteria for this drive
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {activeTab === "My Applications" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">My Applications</h1>
            <ApplicationsTable
              applications={mockApplications}
              onWithdraw={(id) => {
                console.log("Withdraw:", id);
                toast({
                  title: "Application Withdrawn",
                  description: "Your application has been withdrawn",
                });
              }}
              onViewDrive={(id) => console.log("View drive:", id)}
              onAnalyze={(id) => console.log("Analyze:", id)}
            />
          </div>
        )}

        {activeTab === "Resumes" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">My Resumes</h1>
            <ResumeManager
              resumes={mockResumes}
              onUpload={(file, name, isDefault) => {
                console.log("Upload:", { file: file.name, name, isDefault });
                toast({
                  title: "Resume Uploaded",
                  description: `"${name}" has been uploaded successfully`,
                });
              }}
              onDelete={(id) => {
                console.log("Delete:", id);
                toast({
                  title: "Resume Deleted",
                  description: "Resume has been deleted",
                });
              }}
              onSetDefault={(id) => {
                console.log("Set default:", id);
                toast({
                  title: "Default Resume Updated",
                  description: "Your default resume has been changed",
                });
              }}
              onView={(id) => console.log("View:", id)}
            />
          </div>
        )}

        {activeTab === "Community" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Community</h1>
            <Community
              discussions={mockDiscussions}
              students={mockStudentContacts}
              onCreateDiscussion={(title, content, tags) => {
                console.log("Create discussion:", { title, content, tags });
                toast({
                  title: "Discussion Posted",
                  description: "Your discussion has been shared with the community",
                });
              }}
              onSendMessage={(studentId, message) => {
                console.log("Send message:", { studentId, message });
              }}
              onLikeDiscussion={(discussionId) => {
                console.log("Like discussion:", discussionId);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function LandingPage({ onSelectRole }: { onSelectRole: (role: "coordinator" | "student" | "auth") => void }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-primary" />
            <span className="font-semibold text-lg tracking-tight">T&P Portal</span>
          </div>
          <Button onClick={() => onSelectRole("auth")} data-testid="button-login-header">
            Sign In
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            University Training & Placement Portal
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Streamline campus placements with AI-powered resume analysis, eligibility matching, and comprehensive drive management.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => onSelectRole("auth")} data-testid="button-get-started">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => onSelectRole("coordinator")} data-testid="button-demo-coordinator">
              Demo: Coordinator
            </Button>
            <Button size="lg" variant="outline" onClick={() => onSelectRole("student")} data-testid="button-demo-student">
              Demo: Student
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Drive Management</h3>
            <p className="text-sm text-muted-foreground">
              Post and manage placement drives with detailed eligibility criteria. Track registrations and update student status in real-time.
            </p>
          </Card>
          <Card className="p-6">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Matching</h3>
            <p className="text-sm text-muted-foreground">
              Students see only eligible drives based on CGPA, backlogs, and branch. No more confusion about eligibility.
            </p>
          </Card>
          <Card className="p-6">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Resume Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Get AI-powered insights on how well your resume matches job requirements. Improve your chances with actionable suggestions.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Built for universities to simplify and optimize their placement process
          </p>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<"landing" | "auth" | "coordinator" | "student">("landing");

  const handleLogin = (email: string, password: string) => {
    console.log("Login:", { email, password });
    // todo: implement actual login - for demo, check email domain
    if (email.includes("coordinator") || email.includes("admin")) {
      setCurrentView("coordinator");
    } else {
      setCurrentView("student");
    }
  };

  const handleCoordinatorRegister = (data: any) => {
    console.log("Coordinator register:", data);
    setCurrentView("coordinator");
  };

  const handleStudentRegister = (data: any) => {
    console.log("Student register:", data);
    setCurrentView("student");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {currentView === "landing" && (
          <LandingPage
            onSelectRole={(role) => {
              if (role === "auth") {
                setCurrentView("auth");
              } else {
                setCurrentView(role);
              }
            }}
          />
        )}
        {currentView === "auth" && (
          <div className="relative">
            <Button
              variant="ghost"
              className="absolute top-4 left-4"
              onClick={() => setCurrentView("landing")}
            >
              Back to Home
            </Button>
            <AuthPage
              onLogin={handleLogin}
              onCoordinatorRegister={handleCoordinatorRegister}
              onStudentRegister={handleStudentRegister}
            />
          </div>
        )}
        {currentView === "coordinator" && <CoordinatorDashboard />}
        {currentView === "student" && <StudentDashboard />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
