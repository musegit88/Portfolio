import { Setting } from "@/generated/prisma/client";

import UserSettingsCard from "./user-settings-card";
import FeaturesSettingsCard from "./features-settings-card";
import SiteSettingsTab from "./site-settings-tab";

const SettingsTab = ({
  settings,
}: {
  settings:
    | (Setting & {
        user: { id: string; name: string; email: string; password: string };
      })
    | null;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex flex-col gap-4 max-w-md w-full">
        <UserSettingsCard user={settings?.user!} />
        <FeaturesSettingsCard
          showGoogleAnalytics={settings?.showGoogleAnalytics!}
          settingsId={settings?.id!}
          userId={settings?.user.id!}
        />
      </div>
      <SiteSettingsTab settings={settings} />
    </div>
  );
};

export default SettingsTab;
