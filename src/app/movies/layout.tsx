'use client'
import Footer from "@/components/layouts/footer"
import Nav from "@/components/layouts/nav"

export default function MoviesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <Nav />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
                <div className="py-20 bg-amber-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}