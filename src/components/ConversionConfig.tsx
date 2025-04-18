
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ConversionConfig as ConversionConfigType } from "@/lib/types";

interface ConversionConfigProps {
  onChange: (config: ConversionConfigType) => void;
  defaultConfig?: ConversionConfigType;
}

const ConversionConfig = ({
  onChange,
  defaultConfig = { conversionLevel: "standard" }
}: ConversionConfigProps) => {
  const [config, setConfig] = useState<ConversionConfigType>(defaultConfig);
  const [activeTab, setActiveTab] = useState<string>("basic");

  const updateConfig = (updates: Partial<ConversionConfigType>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onChange(newConfig);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Conversion Settings</CardTitle>
        <CardDescription>
          Customize JSX-TSX conversion for your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="naming">Naming</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="conversionLevel">Conversion Level</Label>
                <Select
                  value={config.conversionLevel}
                  onValueChange={(value) => 
                    updateConfig({ conversionLevel: value as ConversionConfigType["conversionLevel"] })
                  }
                >
                  <SelectTrigger id="conversionLevel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      Basic - Simple type conversion
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard - Full component typing
                    </SelectItem>
                    <SelectItem value="advanced">
                      Advanced - Hook optimization & detailed types
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="preserveFormatting"
                  checked={config.preserveFormatting || false}
                  onCheckedChange={(checked) =>
                    updateConfig({ preserveFormatting: checked })
                  }
                />
                <Label htmlFor="preserveFormatting">
                  Preserve formatting
                </Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="includeJSDoc"
                checked={config.includeJSDoc || false}
                onCheckedChange={(checked) =>
                  updateConfig({ includeJSDoc: checked })
                }
              />
              <Label htmlFor="includeJSDoc">Preserve JSDoc comments</Label>
            </div>
          </TabsContent>

          <TabsContent value="naming" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="customNaming"
                checked={config.customInterfaceNaming || false}
                onCheckedChange={(checked) =>
                  updateConfig({ customInterfaceNaming: checked })
                }
              />
              <Label htmlFor="customNaming">
                Custom interface naming conventions
              </Label>
            </div>

            {config.customInterfaceNaming && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <Label htmlFor="prefix">Interface prefix</Label>
                  <Input
                    id="prefix"
                    value={config.interfacePrefix || ""}
                    onChange={(e) =>
                      updateConfig({ interfacePrefix: e.target.value })
                    }
                    placeholder="I"
                  />
                </div>
                <div>
                  <Label htmlFor="suffix">Interface suffix</Label>
                  <Input
                    id="suffix"
                    value={config.interfaceSuffix || "Props"}
                    onChange={(e) =>
                      updateConfig({ interfaceSuffix: e.target.value })
                    }
                    placeholder="Props"
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConversionConfig;
