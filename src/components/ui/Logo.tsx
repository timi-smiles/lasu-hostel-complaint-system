interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <img
      className={`w-20 h-14 ${className}`} // Default size is small
      src="https://myschoolportal.net/blog/wp-content/uploads/2024/10/lagos-state-university-logo-transparent.png"
      alt="Lagos State University Logo"
    />
  );
};