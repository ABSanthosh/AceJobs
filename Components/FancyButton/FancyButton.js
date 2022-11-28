import Link from "next/link";
import "./FancyButton.scss";

function FancyButton({
  children,
  className = "",
  isLink = false,
  href = "",
  innerRef = null,
  ...props
}) {
  if (isLink) {
    return (
      <Link href={href}>
        <a className={`FancyButton ${className}`} ref={innerRef} {...props}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button className={`FancyButton ${className}`} ref={innerRef} {...props}>
      {children}
    </button>
  );
}

export default FancyButton;
