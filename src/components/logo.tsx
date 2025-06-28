import { Mountain } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-headline">
      <Mountain className="h-6 w-6 text-primary" />
      <span className="text-lg font-semibold text-foreground">
        Bhutan eResidency
      </span>
    </div>
  );
}
