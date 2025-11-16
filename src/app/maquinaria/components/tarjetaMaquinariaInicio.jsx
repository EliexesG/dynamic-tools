import Link from "next/link";
import Imagen from "@/app/components/Imagen";
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
import { LucideEye, ToolCaseIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function TarjetaMaquinariaInicio({ maquina, className }) {
  return (
    <Card className={"w-full " + className}>
      <CardHeader>
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="flex items-center gap-2">
              <ToolCaseIcon></ToolCaseIcon>
              <p className="w-full overflow-hidden text-ellipsis mb-0 whitespace-nowrap">
                {maquina.titulo}
              </p>
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent>{maquina.titulo}</TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <Imagen
          className="rounded-2xl w-full h-auto mb-2 object-cover shadow-2xl"
          src={maquina.imagenes[0].url}
          height={650}
          width={400}
          alt={maquina.titulo}
        />

        <p className="w-full max-h-[4.5em] text-ellipsis line-clamp-3">
          {maquina.descripcion}
        </p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Link href={"./maquinaria"}>
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
