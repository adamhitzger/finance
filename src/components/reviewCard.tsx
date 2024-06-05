import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUser } from "@/lib/db/auth";
import { cn } from "@/lib/utils";
import { CardType, ReviewCardType } from "@/types"
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
import Image from "next/image";
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

export async function ReviewCards({ id, title, subtitle, content, className, imgUrl }: ReviewCardType) {
    const user = await getUser();
    return (
        <Card className={cn("backdrop-blur-sm", className)}>
            <CardHeader>
                <CardTitle className="text-5xl">
                    <div className="w-full flex justify-between items-center">
                        {imgUrl &&
                            <Image src={imgUrl} alt={imgUrl} width={144} height={144} className="rounded-full object-center" />


                        }

                        {title}
                    </div>
                </CardTitle>
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