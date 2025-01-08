"use server";

import { Layout } from "@/app/components/Layout";
import { CakeBonusesCard } from "../bonuses";
import CakeShops from "../cake-shops";
import AdminProfile from "@/app/components/AdminProfile";
import { Spinner } from "@/app/components/ui/spinner";
import { getProfile } from "@/lib/supabase/server-extended/serviceRole";
import { Cake, Gift } from "lucide-react";




export default async function PublicUserPage({
    params,
  }: {
    params: Promise<{ username: string }>
  }) {

    const username = (await params).username;

    if (!username) {
        console.log('No username')
        return <Spinner />;
    }
    const { data, error } = await getProfile(`${username}`);
    if (!data.username || error) {
        console.log('No username')
        return <Spinner />;
    }

    const tabs = [
        {
            label: "Your Cake Bonuses",
            value: "bonuses",
            icon: Gift,
            content: <CakeBonusesCard />,
        },
        {
            label: "Cake Shops",
            value: "shops",
            icon: Cake,
            content: <CakeShops />,
        },
    ];

    return (
        <Layout>
            <div className="space-y-6">
                {data && (
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-bold mb-2">User Details:</h3>
                        <pre className="whitespace-pre-wrap text-sm">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                )}
                <AdminProfile
                    name={data.name}
                    username={data.username}
                    id={data.id}
                    imageUrl={
                        data.avatar_url || "/placeholder.svg?height=64&width=64"
                    }
                />
                {/* <NavTabs tabs={tabs} /> */}
            </div>
        </Layout>
    );
}
