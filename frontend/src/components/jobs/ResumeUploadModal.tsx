
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onUploadComplete: () => void;
}

export function ResumeUploadModal({ isOpen, onUploadComplete }: ResumeUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a resume file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulating upload process
    setTimeout(() => {
      // Store in localStorage that user has uploaded resume
      localStorage.setItem("hasUploadedResume", "true");
      
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been uploaded and saved",
      });
      
      setIsUploading(false);
      onUploadComplete();
    }, 1500);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div className="font-medium">
                  {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                </div>
                <p className="text-xs text-muted-foreground">
                  PDF, DOCX, or TXT (Max 5MB)
                </p>
                <input
                  id="resume-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <Button 
              onClick={handleUpload} 
              className="w-full" 
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Resume"}
            </Button>

            <p className="text-xs text-muted-foreground text-center max-w-sm">
              By uploading your resume, you agree to share your professional information with employers on our platform.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
