export function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-indigo-100 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-50 opacity-30 blur-3xl"></div>
    </div>
  );
} 