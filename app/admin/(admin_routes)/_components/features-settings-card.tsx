import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const FeaturesSettingsCard = ({
  showGoogleAnalytics,
  settingsId,
  userId,
}: {
  showGoogleAnalytics: boolean;
  settingsId: string;
  userId: string;
}) => {
  const router = useRouter();

  // set user form data
  const [isGoogleAnalyticsUpdating, setIsGoogleAnalyticsUpdating] =
    useState(false);

  const handleGoogleAnalyticsUpdate = async (checked: boolean) => {
    if (!settingsId) return;
    try {
      setIsGoogleAnalyticsUpdating(true);
      const res = await fetch(`/api/settings/google-analytics/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: settingsId,
          showGoogleAnalytics: checked,
        }),
      });
      setIsGoogleAnalyticsUpdating(false);
      if (!res.ok) {
        throw new Error("Failed to update settings");
      }
      const data = await res.json();
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      console.error("Failed to update settings", error);
      toast.error("Failed to update settings");
    }
  };
  return (
    <Card>
      <CardContent>
        <FieldSet>
          <FieldLegend>Features</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal" className="max-w-sm">
              <FieldLabel htmlFor="switch-google-analytics">
                <FieldContent>
                  Google Analytics
                  <FieldDescription>
                    Show website traffic and user statistics on dashboard
                    (requires Google Analytics account).
                  </FieldDescription>
                </FieldContent>
              </FieldLabel>
              <Switch
                id="switch-google-analytics"
                disabled={isGoogleAnalyticsUpdating}
                checked={showGoogleAnalytics}
                onCheckedChange={(checked) => {
                  handleGoogleAnalyticsUpdate(checked);
                }}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
};

export default FeaturesSettingsCard;
