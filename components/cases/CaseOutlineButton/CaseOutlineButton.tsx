import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './CaseOutlineButton.module.css';

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type CaseOutlineButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type CaseOutlineButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
  };

type CaseOutlineButtonProps = CaseOutlineButtonAsButton | CaseOutlineButtonAsLink;

export default function CaseOutlineButton({
  children,
  className,
  ...props
}: CaseOutlineButtonProps) {
  const classNames = `${styles.button} interactive${className ? ` ${className}` : ''}`;

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classNames} {...buttonProps}>
      {children}
    </button>
  );
}
