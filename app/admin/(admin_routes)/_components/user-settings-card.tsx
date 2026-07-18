import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, UserCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Item, ItemDescription } from "@/components/ui/item";

const UserSettingsCard = ({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  } | null;
}) => {
  const router = useRouter();
  const { update } = useSession();

  const [passwordFormData, setPasswordFormData] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );

  // setinitial user values
  const initialUserValues = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
    }),
    [user?.name, user?.email],
  );

  // set user form data
  const [userFormData, setUserFormData] = useState(initialUserValues);
  const [isUserUpdating, setIsUserUpdating] = useState(false);

  // check if user form has changes
  const [userIsChanged, setUserIsChanged] = useState(false);

  // check if user form has changes
  useEffect(() => {
    const isUserDataChanged =
      userFormData.name !== initialUserValues.name ||
      userFormData.email !== initialUserValues.email;
    setUserIsChanged(isUserDataChanged);
  }, [userFormData, initialUserValues]);

  const handleUserUpdate = async () => {
    if (!user?.id) return;
    try {
      setIsUserUpdating(true);
      const res = await fetch(`/api/settings/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      });
      setIsUserUpdating(false);
      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      const data = await res.json();
      setUserIsChanged(false);
      toast.success(data.message);
      await update({ name: userFormData.name, email: userFormData.email });
      router.refresh();
    } catch (error) {
      console.error("Failed to update user", error);
      toast.error("Failed to update user");
    }
  };
  const handlePasswordUpdate = async () => {
    if (!user?.id) return;
    if (passwordFormData.confirmNewPassword !== passwordFormData.newPassword) {
      toast.error(
        "Passwords do not match, Please enter the same password in new password and confirm new password fields",
        { duration: 5000 },
      );
      return;
    }
    try {
      setIsPasswordUpdating(true);
      const res = await fetch(`/api/settings/password-change/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordFormData),
      });
      setIsPasswordUpdating(false);
      if (res.status !== 200) {
        const errorMessage = await res.json();
        setPasswordError(errorMessage.error);
        toast.error(errorMessage.error);
        return;
      }
      const data = await res.json();
      toast.success(data.message);
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to update password", error);
      toast.error("Failed to update password");
    }
  };
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <UserCircle className="h-12 w-12" />
            <div className="text-center">
              <h1 className="text-xl font-semibold">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="secondary">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        value={userFormData.name}
                        onChange={(e) => {
                          setUserFormData({
                            ...userFormData,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userFormData.email}
                        onChange={(e) => {
                          setUserFormData({
                            ...userFormData,
                            email: e.target.value,
                          });
                        }}
                      />
                    </Field>
                  </FieldGroup>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      type="button"
                      onClick={handleUserUpdate}
                      disabled={!userIsChanged || isUserUpdating}
                    >
                      {isUserUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : userIsChanged ? (
                        "Save"
                      ) : (
                        "Saved"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <Dialog
              onOpenChange={(open) => {
                if (!open) {
                  setPasswordFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  });
                  setPasswordError("");
                }
              }}
            >
              <form>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="secondary">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        required
                        value={passwordFormData.currentPassword}
                        onChange={(e) => {
                          setPasswordFormData({
                            ...passwordFormData,
                            currentPassword: e.target.value,
                          });
                        }}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        required
                        value={passwordFormData.newPassword}
                        onChange={(e) => {
                          setPasswordFormData({
                            ...passwordFormData,
                            newPassword: e.target.value,
                          });
                        }}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        required
                        value={passwordFormData.confirmNewPassword}
                        onChange={(e) => {
                          setPasswordFormData({
                            ...passwordFormData,
                            confirmNewPassword: e.target.value,
                          });
                        }}
                      />
                    </Field>
                  </FieldGroup>
                  {passwordError && (
                    <Item className="bg-red-500/10 " variant="muted">
                      <ItemDescription className="text-red-500">
                        {passwordError}
                      </ItemDescription>
                    </Item>
                  )}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          setPasswordFormData({
                            currentPassword: "",
                            newPassword: "",
                            confirmNewPassword: "",
                          });
                          setPasswordError("");
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      disabled={isPasswordUpdating}
                      onClick={handlePasswordUpdate}
                    >
                      {isPasswordUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSettingsCard;
