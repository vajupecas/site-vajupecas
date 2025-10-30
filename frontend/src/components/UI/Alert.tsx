import clsx from "clsx";
import { useEffect, useState } from "react";

interface AlertProps {
  color: string;
  text: string;
  icon: React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

export default function Alert({ text, color, icon, duration = 3000, onClose }: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={clsx("flex absolute left-4/5 flex-row h-12 mt-10 mr-3 items-center text-sm gap-2 p-4 rounded-lg", {
        "bg-green-100 text-green-800": color === "green",
        "bg-red-100 text-red-800": color === "red",
        "bg-blue-100 text-blue-800": color === "blue",
      })}
    >
      <span className={`text-${color}-800`}>{text}</span>
      {icon}
    </div>
  );
}
