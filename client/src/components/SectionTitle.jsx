import clsx from 'clsx'

export default function SectionTitle({ eyebrow, title, description, centered = false }) {
  return (
    <div className={clsx(centered && 'mx-auto max-w-3xl text-center')}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="title-lg max-w-4xl leading-[1.05] sm:leading-[1.02]">{title}</h2>
      {description ? <p className="mt-4 max-w-3xl text-muted sm:mt-5">{description}</p> : null}
    </div>
  )
}
