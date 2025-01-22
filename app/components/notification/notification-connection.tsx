import { Button } from '@/components/ui/button'
import { updateConnectionStatus } from '@/lib/supabase/server-extended/connections'
import { Check, Loader, X } from 'lucide-react'
import React, { useState } from 'react'

function ConnectionNotificationCTA({
    receiverID, requesterId, markAsReadCB, id, status
}: { requesterId: string, receiverID: string, markAsReadCB: () => void, id: string, status: string }) {

    const [currStatus, setStatus] = useState<"accepted" | "rejected" | string>(status)

    const [acceptLoading, setAcceptLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)

    const onAccept = async () => {
        setAcceptLoading(true)
        try {
            const { data, error } = await updateConnectionStatus(requesterId, receiverID, "accepted", id)
            if (error)
                throw error

            setStatus('accepted')
            console.log("Accept", { data })
        } catch (error) {
            console.error(error)
        } finally {
            setAcceptLoading(false)
            markAsReadCB()
        }
    }

    const onReject = async () => {
        setRejectLoading(true)
        try {
            const { data, error } = await updateConnectionStatus(requesterId, receiverID, "rejected", id)
            if (error)
                throw error
            setStatus('rejected')
            console.log("Reject", { data })
        } catch (error) {
            console.error(error)
        } finally {
            setRejectLoading(false)
            markAsReadCB()
        }

    }

    if (currStatus === "accepted" || currStatus === "rejected") return <>{currStatus}</>

    return (
        <div className="flex justify-start items-center gap-2">
            <Button
                onClick={onAccept}
                disabled={acceptLoading || rejectLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
            >
                {
                    acceptLoading ? <Loader className="h-4 w-4 mr-1 animate-spin" /> :
                        <Check className="h-4 w-4 mr-1" />
                }
                Accept
            </Button>
            <Button
                onClick={onReject}
                disabled={acceptLoading || rejectLoading}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
                {
                    rejectLoading ? <Loader className="h-4 w-4 mr-1 animate-spin" /> :
                        <X className="h-4 w-4 mr-1" />
                }
                Reject
            </Button>
        </div>
    )
}

export default ConnectionNotificationCTA