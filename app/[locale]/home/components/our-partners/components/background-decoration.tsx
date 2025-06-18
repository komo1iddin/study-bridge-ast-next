'use client'

const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" style={{
      clipPath: 'inset(0 0 0 0)',
      zIndex: -1,
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl" style={{
        zIndex: -1,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}></div>
      <div className="absolute top-1/3 -left-24 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl" style={{
        zIndex: -1,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}></div>
      <div className="absolute -bottom-12 right-1/4 w-64 h-64 bg-pink-100 rounded-full opacity-20 blur-3xl" style={{
        zIndex: -1,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl" style={{
        zIndex: -1,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}></div>
    </div>
  )
}

export default BackgroundDecoration