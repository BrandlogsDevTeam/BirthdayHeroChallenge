import { getBrandProfile } from "@/lib/supabase/server-extended/brandProfile";
import { fetchSession } from "@/lib/supabase/server";
import { Layout } from "@/app/components/Layout";
import { BrandProfileView } from "@/app/components/brands/brand-profile";

interface PageProps {
  params: {
    username: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BrandProfilePage({
  params,
  searchParams,
}: PageProps) {
  const {
    data: { session },
  } = await fetchSession();
  const currentUserId = session?.user?.id;

  const brand = await getBrandProfile(params.username);

  if (!brand?.data) {
    return <div>Brand data not found</div>;
  }

  const isOwner = currentUserId === brand.data.id;

  return (
    <Layout>
      <BrandProfileView brand={brand.data} isOwner={isOwner} />
    </Layout>
  );
}
