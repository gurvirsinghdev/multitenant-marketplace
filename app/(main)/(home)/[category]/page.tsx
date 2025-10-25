interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  return <p className="capitalize">{category} Page</p>;
}
