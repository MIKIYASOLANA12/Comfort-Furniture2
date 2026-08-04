import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  variant = 'solid',
  size = '',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  full = false,
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size && `btn-${size}`,
    full && 'btn-full',
    className,
  ].filter(Boolean).join(' ');

  const content = <span className="btn-text">{children}</span>;

  if (to) {
    return <Link to={to} className={classes} {...props}>{content}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
