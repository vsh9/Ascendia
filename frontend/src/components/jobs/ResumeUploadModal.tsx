
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileEdit, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
  isUpdate?: boolean;
}

export function ResumeUploadModal({ isOpen, onClose, onUploadComplete, isUpdate = false }: ResumeUploadModalProps) {
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
        title: isUpdate ? "Resume updated successfully" : "Resume uploaded successfully",
        description: isUpdate ? "Your resume has been updated" : "Your resume has been uploaded and saved",
      });
      
      setIsUploading(false);
      onUploadComplete();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Update Your Resume" : "Upload Your Resume"}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
                {isUpdate ? <FileEdit className="h-10 w-10 text-muted-foreground" /> : <Upload className="h-10 w-10 text-muted-foreground" />}
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
              {isUploading ? "Uploading..." : (isUpdate ? "Update Resume" : "Upload Resume")}
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
