import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Signal, Wifi, BatteryFull } from 'lucide-react';

/**
 * Decorative device frames for clearance activities. Visual only - the
 * children render as normal inside, and the frame just provides the
 * outer chrome (phone body, laptop bezel + hinge, etc).
 *
 * Each frame fills the viewport with a backdrop and centres a fake
 * device with the children rendered inside the "screen" area. Children
 * should set their own outer container to height: 100% so they fill
 * the inner screen properly.
 */

const FRAME_BACKDROP = 'radial-gradient(ellipse at center, rgba(0, 53, 128, 0.18) 0%, var(--brand-navy-dark) 70%)';

/**
 * Renders an image backdrop that fades in once the bitmap has actually
 * loaded. Without the onLoad gate, the opacity animation runs before
 * the image is paintable and the user sees the bitmap pop in at full
 * opacity rather than a smooth fade.
 */
function ImageBackdrop({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.img
      src={src}
      alt=""
      onLoad={() => setLoaded(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        zIndex: 0,
      }}
    />
  );
}

// ───────────────────────── PhoneFrame ─────────────────────────

export function PhoneFrame({
  children,
  backdrop,
  backdropImage,
}: {
  children: ReactNode;
  /** Optional CSS-background override for the area around the phone body
   *  (gradient, layered values). Defaults to the standard navy radial. */
  backdrop?: string;
  /** Optional image URL rendered as a fading <img> beneath the phone.
   *  Takes precedence over `backdrop` when set. */
  backdropImage?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: backdropImage ? 'var(--brand-navy-dark)' : (backdrop ?? FRAME_BACKDROP),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {backdropImage && <ImageBackdrop src={backdropImage} />}
      <div
        style={{
          // Phone body (the dark bezel)
          position: 'relative',
          zIndex: 1,
          width: 'min(420px, 100%)',
          aspectRatio: '9 / 19',
          maxHeight: '100%',
          background: '#0a0e1a',
          borderRadius: 44,
          padding: 8,
          boxShadow:
            '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 0 0 2px rgba(255,255,255,0.04)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Inner screen */}
        <div
          style={{
            flex: 1,
            background: 'var(--brand-navy-dark)',
            borderRadius: 36,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Status bar */}
          <div
            style={{
              height: 36,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 22px',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 13,
              fontWeight: 600,
              position: 'relative',
              zIndex: 10,
            }}
          >
            <span style={{ marginTop: 2 }}>9:41</span>
            {/* Dynamic island */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 4,
                transform: 'translateX(-50%)',
                width: 100,
                height: 26,
                borderRadius: 100,
                background: '#000',
              }}
            />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
              <Signal size={13} strokeWidth={2.4} />
              <Wifi size={13} strokeWidth={2.4} />
              <BatteryFull size={15} strokeWidth={2} />
            </div>
          </div>

          {/* App content */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>

          {/* Home indicator */}
          <div
            style={{
              height: 22,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                height: 5,
                width: 134,
                background: 'rgba(255,255,255,0.45)',
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── LaptopFrame ─────────────────────────

export function LaptopFrame({
  children,
  backdrop,
  backdropImage,
}: {
  children: ReactNode;
  /** Optional CSS-background override for the area around the laptop
   *  (gradient, layered values). Defaults to the standard navy radial. */
  backdrop?: string;
  /** Optional image URL rendered as a fading <img> beneath the laptop.
   *  Takes precedence over `backdrop` when set. */
  backdropImage?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: backdropImage ? 'var(--brand-navy-dark)' : (backdrop ?? FRAME_BACKDROP),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 32px',
      }}
    >
      {backdropImage && <ImageBackdrop src={backdropImage} />}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1100,
        }}
      >
        {/* Screen - sized to fit inside the ClearanceShell content area
            (which sits below the progress strip and intro block) rather
            than 100vh, so it doesn't overlap the intro on shorter viewports. */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 10',
            maxHeight: 'calc(100vh - 260px)',
            background: 'linear-gradient(to bottom, #d4d8df 0%, #b8bdc6 100%)',
            borderRadius: '14px 14px 4px 4px',
            padding: 14,
            paddingBottom: 18,
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.7)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Camera notch */}
          <div
            style={{
              position: 'absolute',
              top: 5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#1a1a1a',
              boxShadow: 'inset 0 0 2px rgba(255,255,255,0.25)',
            }}
          />
          {/* Inner screen */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              background: 'var(--brand-navy-dark)',
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.4)',
            }}
          >
            {children}
          </div>
        </div>

        {/* Hinge / base */}
        <div
          style={{
            width: '108%',
            height: 12,
            background: 'linear-gradient(to bottom, #c5c9d1 0%, #9aa0aa 100%)',
            borderRadius: '0 0 14px 14px',
            boxShadow:
              '0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
            position: 'relative',
          }}
        >
          {/* Trackpad-edge dimple */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 5,
              background: '#7a7e87',
              borderRadius: '0 0 6px 6px',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
