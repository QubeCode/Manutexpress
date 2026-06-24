import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
  dark?: boolean;
}

export function PageHeader({
  badge,
  title,
  description,
  dark = false,
}: PageHeaderProps) {
  return (
    <div className="mb-12 text-center">
      {badge && (
        <Badge
          variant={dark ? "outline" : "secondary"}
          className={`mb-4 ${dark ? "border-white/30 text-white" : ""}`}
        >
          {badge}
        </Badge>
      )}
      <h1
        className={`mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-brand-blue"
        }`}
      >
        {title}
      </h1>
      <p
        className={`mx-auto max-w-2xl text-lg leading-relaxed ${
          dark ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
