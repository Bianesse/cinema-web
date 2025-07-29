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
            {children}
            <Footer />
        </main>
    )
}