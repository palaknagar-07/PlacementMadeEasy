import { Card } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "primary" | "secondary" | "accent" | "default";
}

const variantStyles = {
  primary: {
    card: "bg-gradient-to-br from-card to-primary/10 border-primary/15",
    icon: "bg-gradient-to-br from-primary/25 to-primary/15",
    iconColor: "text-primary",
  },
  secondary: {
    card: "bg-gradient-to-br from-card to-secondary/40 border-secondary/20",
    icon: "bg-gradient-to-br from-secondary to-secondary/60",
    iconColor: "text-secondary-foreground",
  },
  accent: {
    card: "bg-gradient-to-br from-card to-accent/40 border-accent/20",
    icon: "bg-gradient-to-br from-accent to-accent/60",
    iconColor: "text-accent-foreground",
  },
  default: {
    card: "",
    icon: "bg-primary/10",
    iconColor: "text-primary",
  },
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) {
  const styles = variantStyles[variant];
  
  return (
    <Card className={`p-6 ${styles.card}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-4xl font-bold tracking-tight" data-testid={`stat-value-${title.toLowerCase().replace(/\s/g, "-")}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p
              className={`text-sm font-medium ${
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${styles.icon}`}>
          <Icon className={`w-6 h-6 ${styles.iconColor}`} />
        </div>
      </div>
    </Card>
  );
}
