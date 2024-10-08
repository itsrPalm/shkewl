"use client";

import { Bell } from "@/icons";
import type { FC, ReactNode } from "react";
import GlassSheet from "../glass-sheet";

interface NotificationProps {
  children: ReactNode; // Define children prop
}

const Notification: FC<NotificationProps> = ({ children }) => {
  return (
    <GlassSheet
      trigger={
        <span className="cursor-pointer">
          <Bell />
        </span>
      }
    >
      {children}
    </GlassSheet>
  );
};
