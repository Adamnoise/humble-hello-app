
import { useState } from "react";
import BatchUploader from "@/components/BatchUploader";
import ConversionConfig from "@/components/ConversionConfig";
import ConversionControls from "@/components/ConversionControls";
import { ConversionConfig as ConversionConfigType } from "@/lib/types";

interface BatchConversionFormProps {
  onFilesUpload: (files: File[]) => void;
  onConfigChange: (config: ConversionConfigType) => void;
  onConvert: () => void;
  onDownload: () => void;
  isConverting: boolean;
  canDownload: boolean;
  canConvert: boolean;
}

const BatchConversionForm = ({
  onFilesUpload,
  onConfigChange,
  onConvert,
  onDownload,
  isConverting,
  canDownload,
  canConvert,
}: BatchConversionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <BatchUploader onFilesUpload={onFilesUpload} />
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
          canConvert={canConvert}
        />
      </div>
    </div>
  );
};

export default BatchConversionForm;
