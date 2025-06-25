import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function DarkMode() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
}
