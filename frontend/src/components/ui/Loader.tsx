type LoaderProps = {
  label?: string;
};

export default function Loader({ label = 'Loading' }: LoaderProps) {
  return (
    <div
      aria-label={label}
      className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-primary"
      role="status"
    />
  );
}