import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { CardType } from "@/types"

export function Cards({ title, subtitle, content, className }: CardType) {

    return (
        <Card className={cn("backdrop-blur-sm", className)}>
            <CardHeader>
                <CardTitle className="text-5xl">{title}</CardTitle>
                <CardDescription className="text-lg">{subtitle}</CardDescription>
                <hr />
            </CardHeader>
            <CardContent className=" text-2xl flex justify-between">
                {content}
            </CardContent>
        </Card>
    );
}