export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 ambient-grid opacity-35" />
      <div className="absolute left-[-10%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute bottom-[-14%] right-[-6%] h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[140px]" />
      <div className="absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  )
}
