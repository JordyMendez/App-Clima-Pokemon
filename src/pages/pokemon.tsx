import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../services/pokemon";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Pokemon() {
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", search],
    queryFn: () => getPokemon(search),
    enabled: !!search,
    });

    return (
    <div className="bg-background text-foreground border border-border rounded-2xl " >
        <div className="w-full max-w-lg bg-white dark:bg-[#1e1e2f] border border-border rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground dark:text-white">
            Buscador de Pokémon
        </h1>

        <div className="space-y-4">
            <Input
            placeholder="Nombre o ID del Pokémon"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black placeholder-black/60"
            />
            <div className="flex gap-2">
            <Button onClick={() => setSearch(name)} variant="secondary">
                Buscar
            </Button>
            <Button onClick={() => navigate({ to: "/weather" })} variant="secondary">
                Ir a clima
            </Button>
            </div>
        </div>

        <div className="mt-6 text-center">
            {isLoading && <p className="text-black">Cargando...</p>}
            {isError && <p className="text-destructive">Pokémon no encontrado</p>}
            {data && (
            <div className="mt-6 p-6 rounded-xl border border-[#444] bg-[#2c2c3c] shadow-lg">
                <h2 className="text-2xl font-semibold text-white capitalize">{data.name}</h2>
                <img src={data.sprites.front_default} alt={data.name} className="mx-auto" />
                <p className="text-white">Altura: {data.height}</p>
                <p className="text-white">Peso: {data.weight}</p>
                <p className="text-white">
                Tipo: {data.types.map((t: any) => t.type.name).join(", ")}
                </p>
            </div>
            )}
        </div>
        </div>
    </div>
    );
}
