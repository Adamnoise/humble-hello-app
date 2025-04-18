
import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import ConversionConfig from "@/components/ConversionConfig";
import ConversionControls from "@/components/ConversionControls";
import { ConversionConfig as ConversionConfigType } from "@/lib/types";

interface ConversionFormProps {
  onFileUpload: (file: File) => void;
  onConfigChange: (config: ConversionConfigType) => void;
  onConvert: () => void;
  onDownload: () => void;
  isConverting: boolean;
  canDownload: boolean;
  canConvert: boolean;
  originalCode: string;
}

const ConversionForm = ({
  onFileUpload,
  onConfigChange,
  onConvert,
  onDownload,
  isConverting,
  canDownload,
  canConvert,
  originalCode,
}: ConversionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FileUploader onFileUpload={onFileUpload} />
        </div>
        <div>
          <ConversionConfig onChange={onConfigChange} />
        </div>
      </div>
      <div className="flex justify-end">
        <ConversionControls
          onConvert={onConvert}
          onDownload={onDownload}
          isConverting={isConverting}
          canDownload={canDownload}
          canConvert={!!originalCode || canConvert}
        />
      </div>
    </div>
  );
};

export default ConversionForm;
