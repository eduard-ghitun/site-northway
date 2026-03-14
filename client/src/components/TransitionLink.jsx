import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { useRouteTransition } from '../providers/RouteTransitionProvider'

function shouldHandleNavigation(event, target) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    (target && target !== '_self') ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  )
}

const TransitionLink = forwardRef(function TransitionLink(
  { to, onClick, target, replace, state, ...props },
  ref,
) {
  const { startTransition } = useRouteTransition()

  const handleClick = (event) => {
    onClick?.(event)

    if (!shouldHandleNavigation(event, target)) {
      return
    }

    event.preventDefault()
    startTransition(to, { replace, state })
  }

  return <Link ref={ref} to={to} onClick={handleClick} target={target} replace={replace} state={state} {...props} />
})

export default TransitionLink
