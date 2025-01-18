import { getBrandProfile } from "@/lib/supabase/server-extended/brandProfile";
import { fetchSession } from "@/lib/supabase/server";
import { Layout } from "@/app/components/Layout";
import { BrandProfileView } from "@/app/components/brands/brand-profile";

interface PageProps {
  params: { username: string };
}

export default async function BrandProfilePage({ params }: PageProps) {
  const {
    data: { session },
  } = await fetchSession();
  const currentUserId = session?.user?.id;

  const brand = await getBrandProfile(params.username);

  if (!brand?.data) {
    return <Layout>Brand data not found</Layout>;
  }

  const isOwner = currentUserId === brand.data.id;

  return <BrandProfileView brand={brand.data} isOwner={isOwner} />;
}
