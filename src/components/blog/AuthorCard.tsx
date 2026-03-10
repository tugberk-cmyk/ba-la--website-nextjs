"use client";

interface AuthorCardProps {
  name: string;
  title: string;
  avatar: string;
}

export default function AuthorCard({ name, title, avatar }: AuthorCardProps) {
  return (
    <div className="flex items-start gap-5">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-border"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shrink-0 ring-2 ring-border">
          <span className="text-lg font-bold text-muted-foreground">
            {name?.charAt(0) || "?"}
          </span>
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
          Yazar
        </p>
        <p className="font-bold text-lg text-foreground leading-tight">
          {name}
        </p>
        {title && (
          <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
        )}
      </div>
    </div>
  );
}
