import {
  Sprout,
  Package,
  Landmark,
  BookOpen,
  LucideListChecks
} from "lucide-react"; // Replaced trending icons with meaningful ones
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionCards({ stats, loading }) {
  const metrics = {
    crops: stats?.crops ?? 0,
    products: stats?.products ?? 0,
    governmentSchemes: stats?.governmentSchemes ?? 0,
    tutorials: stats?.tutorials ?? 0,
    cropSaleRequests: stats?.cropSaleRequests ?? 0,
  };

  const items = [
    {
      label: "Total Crops",
      value: metrics.crops,
      icon: Sprout,
      badge: "Agriculture",
      footer: "All active crops in range",
    },
    {
      label: "Total Products",
      value: metrics.products,
      icon: Package,
      badge: "Inventory",
      footer: "All active products in range",
    },
    {
      label: "Govt. Schemes",
      value: metrics.governmentSchemes,
      icon: Landmark,
      badge: "Schemes",
      footer: "Schemes available in range",
    },
    {
      label: "Tutorials",
      value: metrics.tutorials,
      icon: BookOpen,
      badge: "Learning",
      footer: "Tutorials created in range",
    },
    {
      label: "Crop Sale Requests",
      value: metrics.cropSaleRequests,
      icon: LucideListChecks,
      badge: "Requests",
      footer: "Requests submitted in range",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.label}
            className="bg-gradient-to-t from-primary/5 to-card shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardDescription>{item.label}</CardDescription>
                  <CardTitle className="text-2xl font-bold tabular-nums">
                    {loading ? (
                      <Skeleton className="h-8 w-24" />
                    ) : (
                      item.value.toLocaleString()
                    )}
                  </CardTitle>
                </div>
              </div>
              <CardAction>
                <Badge variant="outline">{item.badge}</Badge>
              </CardAction>
            </CardHeader>
            {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 font-medium">{item.footer}</div>
              <div className="text-muted-foreground">
                Based on selected date range
              </div>
            </CardFooter> */}
          </Card>
        );
      })}
    </div>
  );
}
