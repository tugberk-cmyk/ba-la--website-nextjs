"use client";

interface AuthorCardProps {
  name: string;
  title: string;
  avatar: string;
}

export default function AuthorCard({ name, title, avatar }: AuthorCardProps) {
  return (
    <div className="border border-border rounded-xl bg-muted/30 p-6 flex items-center gap-5">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
          <span className="text-xl font-bold text-muted-foreground">
            {name?.charAt(0) || "?"}
          </span>
        </div>
      )}
      <div>
        <p className="font-bold text-lg text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}
