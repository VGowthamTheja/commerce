"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UserProfile } from "@prisma/client";
import { Settings, Shield, User2 } from "lucide-react";

import { getRandomHexColor } from "@/lib/utils";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface Props {}

const UserProfileDropdown = ({}: Props) => {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const profile = await res.json();
          setProfile(profile.profile);
          console.log({ profile });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserProfile();
  }, []);
  async function handleLogout() {
    const res = await fetch("/api/auth/logout", {
      method: "DELETE",
    });
    if (res.ok) {
      redirect("/login");
    }
  }

  const { backgroundColor, textColor } = getRandomHexColor();
  return (
    <div>
      <Popover>
        <PopoverTrigger title="Profile Avatar">
          <Avatar
            style={{ backgroundColor: backgroundColor, color: textColor }}
            className={`flex items-center justify-center font-bold cursor-pointer`}
          >
            {profile?.avatar ? (
              <Image src={profile.avatar} alt="Avatar" />
            ) : (
              <span>
                {profile?.firstName.charAt(0)}
                {profile?.lastName.charAt(0)}
              </span>
            )}
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="mb-3">
            <Link
              href={"/profile"}
              className="flex items-center p-2 hover:bg-neutral-300 rounded-md"
            >
              <User2 />
              <span className="ml-2">Profile</span>
            </Link>
            <Link
              href={"/settings"}
              className="flex items-center p-2 hover:bg-neutral-300 rounded-md"
            >
              <Settings />
              <span className="ml-2">Settings</span>
            </Link>
            {profile?.adminKey && (
              <Link
                href={"/admin"}
                className="flex items-center p-2 hover:bg-neutral-300 rounded-md"
              >
                <Shield />
                <span className="ml-2">Admin</span>
              </Link>
            )}
          </div>
          <Separator />
          <form action={handleLogout}>
            <Button
              className="w-full hover:bg-red-200 hover:text-red-600"
              type="submit"
              variant={"ghost"}
              size={"sm"}
            >
              Logout
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserProfileDropdown;
