import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
    mutationFn: () => loginUser(username, password),
    onSuccess: () => navigate({ to: "/pokemon" }),
    onError: () => alert("Ingrese usuario y contraseña correctas"),
    });

    return (
    <div className="bg-background text-foreground border border-border rounded-2xl ">
        <div className="w-full max-w-sm bg-white dark:bg-[#1e1e2f] border border-border shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground dark:text-white">
            Inicio de sesión
        </h1>

        <div className="space-y-4">
            <Input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full" onClick={() => mutation.mutate()}>
            Ingresar
            </Button>
        </div>
        </div>
    </div>
    );
}
