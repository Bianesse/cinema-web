// LoadingDialog.tsx
'use client'

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

export function LoadingDialog({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogContent className="flex items-center justify-center gap-4 py-8 bg-white border-none shadow-lg" >
        <DialogTitle className="sr-only">Loading</DialogTitle>
        <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
        <span className="text-sm text-amber-800 font-medium">Processing...</span>
      </DialogContent>
    </Dialog>
  )
}
