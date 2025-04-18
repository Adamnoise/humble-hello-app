
import { useState } from "react";
import { toast } from "sonner";
import { ConversionConfig as ConversionConfigType, ConversionErrorDetails } from "@/lib/types";
import { JSXConverter } from "@/lib/jsxConverter";

interface UseFileConversionResult {
  originalCode: string;
  convertedCode: string;
  isConverting: boolean;
  errors: ConversionErrorDetails[];
  uploadedFiles: File[];
  importedFiles: { name: string; content: string }[];
  selectedFileIndex: number;
  config: ConversionConfigType;
  handleFileUpload: (file: File) => void;
  handleBatchUpload: (files: File[]) => void;
  handleGitHubImport: (files: { name: string; content: string }[]) => void;
  handleConvert: () => Promise<void>;
  handleBatchConvert: () => Promise<void>;
  handleDownload: () => void;
  setConfig: (config: ConversionConfigType) => void;
}

export const useFileConversion = (): UseFileConversionResult => {
  const [originalCode, setOriginalCode] = useState<string>("");
  const [convertedCode, setConvertedCode] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [importedFiles, setImportedFiles] = useState<{ name: string; content: string }[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [errors, setErrors] = useState<ConversionErrorDetails[]>([]);
  const [config, setConfig] = useState<ConversionConfigType>({
    conversionLevel: "standard",
  });
  
  // Handle file upload
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      setOriginalCode(content || "");
      setConvertedCode("");
      setErrors([]);
    };
    reader.readAsText(file);
  };
  
  // Handle batch upload
  const handleBatchUpload = (files: File[]) => {
    setUploadedFiles(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setOriginalCode(e.target?.result as string || "");
        setConvertedCode("");
      };
      reader.readAsText(files[0]);
      setSelectedFileIndex(0);
    }
  };
  
  // Handle GitHub import
  const handleGitHubImport = (files: { name: string; content: string }[]) => {
    setImportedFiles(files);
    if (files.length > 0) {
      setOriginalCode(files[0].content);
      setConvertedCode("");
      setSelectedFileIndex(0);
    }
  };
  
  // Convert JSX to TSX
  const handleConvert = async () => {
    if (!originalCode) {
      toast.error("Nincs konvertálandó kód.");
      return;
    }
    
    setIsConverting(true);
    setErrors([]);
    
    try {
      const { code, errors } = await JSXConverter.convertJSXtoTSX(originalCode, config);
      setConvertedCode(code);
      
      if (errors.length > 0) {
        setErrors(errors);
        toast.warning("Konvertálás befejezve figyelmeztetésekkel");
      } else {
        toast.success("JSX sikeresen konvertálva TSX-re");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Hiba történt a konvertálás során");
    } finally {
      setIsConverting(false);
    }
  };
  
  // Batch convert
  const handleBatchConvert = async () => {
    if (importedFiles.length === 0 && uploadedFiles.length === 0) {
      toast.error("Nincsenek fájlok konvertáláshoz");
      return;
    }
    
    setIsConverting(true);
    
    try {
      let filesToConvert: { name: string; content: string }[] = [];
      
      // Use either imported files or uploaded files
      if (importedFiles.length > 0) {
        filesToConvert = importedFiles;
      } else if (uploadedFiles.length > 0) {
        // Convert uploaded files to the format needed
        const promises = uploadedFiles.map((file) => {
          return new Promise<{ name: string; content: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                name: file.name,
                content: e.target?.result as string || ""
              });
            };
            reader.onerror = reject;
            reader.readAsText(file);
          });
        });
        
        filesToConvert = await Promise.all(promises);
      }
      
      const result = await JSXConverter.batchConvert(filesToConvert, config);
      
      if (result.convertedFiles.length > 0) {
        toast.success(`${result.convertedFiles.length} fájl sikeresen konvertálva`);
        
        // Automatically export as zip if more than one file
        if (result.convertedFiles.length > 1) {
          await JSXConverter.exportAsZip(result.convertedFiles);
        } else {
          // Show the single converted file
          setConvertedCode(result.convertedFiles[0].content);
        }
      } else {
        toast.error("Nem sikerült egyetlen fájlt sem konvertálni");
      }
      
      if (result.errors.length > 0) {
        toast.warning(`${result.errors.length} fájl konvertálása során hibák merültek fel`);
        // Display errors for the first file with issues
        if (result.errors[0].errors) {
          setErrors(result.errors[0].errors);
        }
      }
    } catch (error) {
      console.error("Batch conversion error:", error);
      toast.error("Hiba történt a kötegelt konvertálás során");
    } finally {
      setIsConverting(false);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (!convertedCode) {
      toast.error("Nincs letölthető TSX kód");
      return;
    }
    
    const blob = new Blob([convertedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    // Determine filename
    let filename = "converted.tsx";
    if (uploadedFiles.length > 0 && selectedFileIndex < uploadedFiles.length) {
      filename = uploadedFiles[selectedFileIndex].name.replace(/\.jsx$/, ".tsx");
    } else if (importedFiles.length > 0 && selectedFileIndex < importedFiles.length) {
      filename = importedFiles[selectedFileIndex].name.replace(/\.jsx$/, ".tsx");
    }
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`${filename} letöltve`);
  };

  return {
    originalCode,
    convertedCode,
    isConverting,
    errors,
    uploadedFiles,
    importedFiles,
    selectedFileIndex,
    config,
    handleFileUpload,
    handleBatchUpload,
    handleGitHubImport,
    handleConvert,
    handleBatchConvert,
    handleDownload,
    setConfig,
  };
};
