import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

export default function AmbientBackground() {
  const { useLiteMotion, isMobileViewport } = useAdaptiveMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className={`absolute inset-0 ambient-grid ${useLiteMotion ? 'opacity-16' : 'opacity-35'}`} />
      <div
        className={`absolute left-[-10%] top-[-8%] rounded-full bg-gold/10 ${
          isMobileViewport ? 'h-56 w-56 blur-[90px]' : 'h-[28rem] w-[28rem] blur-[120px]'
        }`}
      />
      <div
        className={`absolute bottom-[-14%] right-[-6%] rounded-full bg-gold/10 ${
          isMobileViewport ? 'h-60 w-60 blur-[100px]' : 'h-[30rem] w-[30rem] blur-[140px]'
        }`}
      />
      <div className="absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  )
}
