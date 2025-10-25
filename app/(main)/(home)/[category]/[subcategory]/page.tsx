interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category, subcategory } = await params;
  return (
    <p className="capitalize">
      {category}/{subcategory} Page
    </p>
  );
}
