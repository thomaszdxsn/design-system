import { notFound } from "next/navigation";
import { getLocalRegistryComponent, getLocalRegistryIndex } from "@/lib/registry-client";
import { ComponentDisplay } from "@/components/blocks/component-display";

interface ComponentPageProps {
  params: Promise<{
    component: string;
  }>;
}

export async function generateStaticParams(): Promise<Array<{ component: string }>> {
  const index = await getLocalRegistryIndex();
  return index.components.map((c) => ({
    component: c.id,
  }));
}

export default async function Page({ params }: ComponentPageProps): Promise<React.ReactElement> {
  const { component: componentId } = await params;

  let component;
  try {
    component = await getLocalRegistryComponent(componentId);
  } catch {
    notFound();
  }

  return <ComponentDisplay component={component} />;
}
