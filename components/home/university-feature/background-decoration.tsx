export function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Top left decoration */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Bottom right decoration */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Center decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
    </div>
  )
} 