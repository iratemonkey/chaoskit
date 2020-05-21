import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import useUpdateEffect from 'react-use/lib/useUpdateEffect'
import useClickAway from 'react-use/lib/useClickAway'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useTheme } from 'emotion-theming'

import { misc } from '../assets/styles/utility'

import Close from './Close'

const StylesOffCanvasVariables = (theme) => ({
  size: theme.space.large,
  panelOffset: theme.space.large,
})

const OffCanvas = ({
  children,
  className,
  align,
  open,
  onOffCanvasToggle,
  onComplete,
  onReverseComplete,
  onReverseStart,
  onStart,
  panelWidth,
  ...rest
}) => {
  const theme = useTheme()

  const offCanvasRef = useRef()
  const offCanvasPanelRef = useRef()

  const [renderOffCanvas, setRenderOffCanvas] = useState(open)

  const openOffCanvas = () => {
    const $offCanvas = offCanvasRef.current

    if ($offCanvas && $offCanvas.timeline) $offCanvas.timeline.play()
  }

  const closeOffCanvas = () => {
    const $offCanvas = offCanvasRef.current

    if ($offCanvas && $offCanvas.timeline) {
      $offCanvas.timeline.reverse()

      onReverseStart()
    }
  }

  const handleOnReverseComplete = () => {
    setRenderOffCanvas(false)
  }

  const attachTimeline = () => {
    const $offCanvas = offCanvasRef.current
    const $panel = offCanvasPanelRef.current

    // Attach timeline to each instance
    $offCanvas.timeline = gsap.timeline({
      paused: !open,
      onStart: () => {
        onStart()
      },
      onComplete: () => {
        // Focus on active offCanvas for screen readers
        $panel.focus()

        onComplete()
      },
      onReverseComplete: () => {
        handleOnReverseComplete()
      },
    })

    $offCanvas.timeline
      .to(
        $offCanvas,
        {
          display: 'block',
          duration: theme.gsap.timing.long,
          opacity: 1,
          backdropFilter: 'blur(2px)',
        },
        'offCanvas'
      )
      .to(
        $panel,
        {
          duration: theme.gsap.timing.long,
          x: 0,
          ease: theme.gsap.transition.base,
        },
        'offCanvas'
      )
  }

  // On unmount, clear any/all locks on `<body />`
  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  useEffect(() => {
    if (open) {
      setRenderOffCanvas(true)
    }
  }, [open])

  useUpdateEffect(() => {
    if (renderOffCanvas) {
      attachTimeline()

      disableBodyScroll(offCanvasPanelRef.current)

      openOffCanvas()
    } else {
      onReverseComplete()
    }
  }, [renderOffCanvas])

  useUpdateEffect(() => {
    if (!open) {
      enableBodyScroll(offCanvasPanelRef.current)

      closeOffCanvas()
    }
  }, [open])

  useClickAway(offCanvasPanelRef, () => onOffCanvasToggle())

  if (!renderOffCanvas) return null

  return createPortal(
    <div
      css={{
        // 1. GSAP
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: theme.color.dark.overlay,
        zIndex: 10,

        // 1
        opacity: 0,
        display: 'none',
      }}
      className={cx('CK__OffCanvas', className)}
      ref={offCanvasRef}
      {...rest}
    >
      <div
        css={[
          misc.overflow,
          {
            // 1. GSAP
            position: 'absolute',
            top: 0,
            [align]: 0,
            zIndex: 5,
            height: '100%',
            width: `calc(100% - ${
              StylesOffCanvasVariables(theme).panelOffset
            }px)`,
            background: theme.color.light.base,
            padding: StylesOffCanvasVariables(theme).size,
            boxShadow:
              align === 'left'
                ? `7.5px 0 17.5px ${theme.boxShadowColor.xlight}`
                : `-7.5px 0 17.5px ${theme.boxShadowColor.xlight}`,
            // 1
            transform:
              align === 'left' ? 'translateX(-100%)' : 'translateX(100%)',

            [theme.mq.small]: {
              width: panelWidth,
            },
          },
        ]}
        className={`CK__OffCanvas__Panel ${theme.settings.classes.trim}`}
        ref={offCanvasPanelRef}
      >
        <Close
          onClick={onOffCanvasToggle}
          css={{
            position: 'absolute',
            top: StylesOffCanvasVariables(theme).size,
            right: StylesOffCanvasVariables(theme).size,
            zIndex: 10,
          }}
          className="CK__OffCanvas__Close"
        />
        {children}
      </div>
    </div>,
    document.body
  )
}

OffCanvas.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  open: PropTypes.bool,
  onOffCanvasToggle: PropTypes.func.isRequired,
  /** GSAP callback */
  onComplete: PropTypes.func,
  /** GSAP callback */
  onReverseComplete: PropTypes.func,
  /** GSAP callback */
  onReverseStart: PropTypes.func,
  /** GSAP callback */
  onStart: PropTypes.func,
  panelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

OffCanvas.defaultProps = {
  onComplete: () => {},
  onReverseComplete: () => {},
  onReverseStart: () => {},
  onStart: () => {},
  panelWidth: 300,
  align: 'left',
}

export default OffCanvas
