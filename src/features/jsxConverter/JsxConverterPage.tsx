
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ConversionErrorDetails } from "@/lib/types";
import CodePreview from "@/components/CodePreview";
import ErrorDetails from "@/components/ErrorDetails";
import ComparisonViewer from "@/components/ComparisonViewer";
import ConversionForm from "./components/ConversionForm";
import BatchConversionForm from "./components/BatchConversionForm";
import GitHubForm from "./components/GitHubForm";
import { useFileConversion } from "./hooks/useFileConversion";

const JSXConverterPage = () => {
  const {
    originalCode,
    convertedCode,
    isConverting,
    errors,
    uploadedFiles,
    importedFiles,
    handleFileUpload,
    handleBatchUpload,
    handleGitHubImport,
    handleConvert,
    handleBatchConvert,
    handleDownload,
    setConfig,
  } = useFileConversion();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">JSX → TSX Converter</h1>
            <p className="text-muted-foreground">
              JSX kód TypeScript TSX formátumra konvertálása, interfészek és típusok automatikus generálásával
            </p>
          </div>

          <Tabs defaultValue="file">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="file">Fájl feltöltése</TabsTrigger>
              <TabsTrigger value="batch">Kötegelt feltöltés</TabsTrigger>
              <TabsTrigger value="github">GitHub Import</TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="space-y-4">
              <ConversionForm
                onFileUpload={handleFileUpload}
                onConfigChange={setConfig}
                onConvert={handleConvert}
                onDownload={handleDownload}
                isConverting={isConverting}
                canDownload={!!convertedCode}
                canConvert={!!originalCode}
                originalCode={originalCode}
              />
            </TabsContent>
            
            <TabsContent value="batch" className="space-y-4">
              <BatchConversionForm
                onFilesUpload={handleBatchUpload}
                onConfigChange={setConfig}
                onConvert={handleBatchConvert}
                onDownload={handleDownload}
                isConverting={isConverting}
                canDownload={!!convertedCode}
                canConvert={uploadedFiles.length > 0}
              />
            </TabsContent>
            
            <TabsContent value="github" className="space-y-4">
              <GitHubForm
                onFilesLoad={handleGitHubImport}
                onConfigChange={setConfig}
                onConvert={handleBatchConvert}
                onDownload={handleDownload}
                isConverting={isConverting}
                canDownload={!!convertedCode}
                canConvert={importedFiles.length > 0}
              />
            </TabsContent>
          </Tabs>

          {errors.length > 0 && <ErrorDetails errors={errors} />}

          {(originalCode || convertedCode) && (
            <div className="mt-4">
              <ComparisonViewer originalCode={originalCode} convertedCode={convertedCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JSXConverterPage;
