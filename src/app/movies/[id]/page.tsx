import { use } from "react";
export default function Movie({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params) ;
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            <h1>Specific Movie {id}</h1>
        </div>
    );
}