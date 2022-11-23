import Link from "next/link";
import "./FancyButton.scss";

function FancyButton({
  children,
  className,
  isLink = false,
  href = "",
  ...props
}) {
  if (isLink) {
    return (
      <Link href={href}>
        <a className={`FancyButton ${className}`} {...props}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button className={`FancyButton ${className}`} {...props}>
      {children}
    </button>
  );
}

export default FancyButton;
