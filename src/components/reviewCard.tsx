import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUser } from "@/lib/db/auth";
import { cn } from "@/lib/utils";
import { CardType } from "@/types"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteReview } from "@/lib/db/actions/review";

export async function Cards({ id, title, subtitle, content, className }: CardType) {
    const user = await getUser();
    return (
        <Card className={cn("backdrop-blur-sm", className)}>
            <CardHeader>
                <CardTitle className="text-5xl">{title}</CardTitle>
                <CardDescription className="text-lg">{subtitle}</CardDescription>
                <hr />
            </CardHeader>
            <CardContent className=" text-2xl flex justify-between">
                {content} {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <ChevronDown />
                            <span className="sr-only">Actions</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={`/reviews/${id}`}>
                                    <Button variant="outline" size="sm">Upravit</Button>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <form action={deleteReview}>
                                    <Input type="hidden" name="id" value={id} />
                                    <Button variant="outline" size="sm">Smazat</Button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null}
            </CardContent>
        </Card>
    );
}