type SectionHeaderProps = {
  title: string;
  description?: string;
};

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}