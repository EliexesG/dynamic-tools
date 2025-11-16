import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { HandshakeIcon, LucideEye } from "lucide-react";
import Link from "next/link";

export default function TarjetaServicioInicio({
  titulo,
  descripcion,
  className,
}) {
  return (
    <Card className={"w-full " + className}>
      <CardHeader className="grid-cols-1!">
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="flex items-center gap-2">
              <HandshakeIcon></HandshakeIcon>
              <p className="w-full overflow-hidden text-ellipsis mb-0 whitespace-nowrap">
                {titulo}
              </p>
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent>{titulo}</TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <p className="w-full max-h-[4.5em] text-ellipsis line-clamp-3">
          {descripcion}
        </p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Link href={"./servicios"}>
            <Button variant="secondary" className="text-white">
              <LucideEye></LucideEye>
              Ver Más
            </Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
