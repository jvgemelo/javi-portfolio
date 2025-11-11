export function FeatureCard({ 
  title, 
  description 
}: { 
  title: string; 
  description: string; 
}) {
  return (
    <div className="rounded-lg p-4 sm:p-6 text-card-foreground shadow-sm w-[80vw] sm:w-[25vw] transition-all hover:shadow-lg backdrop-blur-sm bg-gray-200/40">
      <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      <p className="mt-2 text-black text-sm sm:text-base">{description}</p>
    </div>
  );
}

