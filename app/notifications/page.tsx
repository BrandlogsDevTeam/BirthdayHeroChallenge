"use client";

import { Bell, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "../components/Layout";
import { WelcomeButton } from "../components/welcom-button";
import { useAuth } from "../actions/AuthContext";

export default function NotificationsPage() {
  const { profile } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {profile ? (
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                No notifications yet
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                When you have new notifications, they'll appear here. Stay
                tuned!
              </p>
              <Button variant="outline" className="flex items-center">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardContent>
          </Card>
        ) : (
          <WelcomeButton currentPage="notifications" />
        )}
      </div>
    </Layout>
  );
}
