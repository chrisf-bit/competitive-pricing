import { TrendingUp, TrendingDown, Minus, Heart, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { TrendDirection, RelationshipStatus, DiscountStatus } from '../types';

export function TrendIcon({ direction, size = 14 }: { direction: TrendDirection; size?: number }) {
  const containerSize = size + 10;
  const bgColor =
    direction === 'up'
      ? 'var(--success-bg)'
      : direction === 'down'
        ? 'var(--danger-bg)'
        : 'var(--grey-100)';
  const iconColor =
    direction === 'up'
      ? 'var(--success)'
      : direction === 'down'
        ? 'var(--danger)'
        : 'var(--grey-400)';
  const Icon = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus;

  return (
    <div
      style={{
        width: containerSize,
        height: containerSize,
        borderRadius: containerSize / 2,
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={size} style={{ color: iconColor }} />
    </div>
  );
}

export function RelationshipBadge({ status }: { status: RelationshipStatus }) {
  const config: Record<RelationshipStatus, { bg: string; color: string; border: string }> = {
    warm: { bg: 'var(--success-bg)', color: 'var(--success)', border: 'var(--success)' },
    neutral: { bg: 'var(--grey-100)', color: 'var(--grey-500)', border: 'var(--grey-300)' },
    cool: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'var(--warning)' },
    strained: { bg: 'var(--danger-bg)', color: 'var(--danger)', border: 'var(--danger)' },
  };
  const c = config[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px 4px 4px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 12,
        fontWeight: 700,
        background: c.bg,
        color: c.color,
        border: `1.5px solid ${c.border}`,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '2px 8px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(255,255,255,0.55)',
          fontSize: 10,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        <Heart size={11} />
        Relationship Status
      </span>
      <span style={{ textTransform: 'capitalize' }}>{status}</span>
    </span>
  );
}

export function DiscountBadge({ status }: { status: DiscountStatus }) {
  const config: Record<DiscountStatus, { bg: string; color: string; border: string; Icon: typeof CheckCircle2 }> = {
    active: { bg: 'var(--success-bg)', color: 'var(--success)', border: 'var(--success)', Icon: CheckCircle2 },
    inactive: { bg: 'var(--grey-100)', color: 'var(--grey-400)', border: 'var(--grey-300)', Icon: XCircle },
    misconfigured: { bg: 'var(--grey-100)', color: 'var(--grey-500)', border: 'var(--grey-300)', Icon: AlertCircle },
  };
  const c = config[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 11,
        fontWeight: 700,
        background: c.bg,
        color: c.color,
        border: `1.5px solid ${c.border}`,
        textTransform: 'capitalize',
      }}
    >
      <c.Icon size={11} />
      {status}
    </span>
  );
}
