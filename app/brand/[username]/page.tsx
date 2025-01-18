import { getBrandProfile } from "@/lib/supabase/server-extended/brandProfile";
import { fetchSession } from "@/lib/supabase/server";
import { Layout } from "@/app/components/Layout";
import { BrandProfileView } from "@/app/components/brands/brand-profile";

export default async function BrandProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const {
    data: { session },
  } = await fetchSession();
  const currentUserId = session?.user?.id;

  const brand = await getBrandProfile(params.username);

  const isOwner = currentUserId === brand?.data?.id;

  if (!brand.data) {
    return <Layout>Brand data not found</Layout>;
  }

  return <BrandProfileView brand={brand.data} isOwner={isOwner} />;
}
