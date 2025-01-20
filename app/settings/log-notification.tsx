import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { LOG_STORY_DURATIONS } from '@/lib/constants'
import React, { useState } from 'react'

const LogNotification = ({
    current, onUpdate
}: { current: number, onUpdate: (e: number) => Promise<any> }) => {

    const [value, setValue] = useState(current)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: number) => {
        setValue(e)
    }

    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true)
        try {
            await onUpdate(value);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className={`w-full max-w-2xl`}>
            <CardHeader>
                <h1 className="text-xl font-semibold">Log Notification</h1>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="timezone-select"
                        className="text-base font-medium text-gray-700 dark:text-gray-300"
                    >
                        Notification Duration
                    </label>

                    {
                        LOG_STORY_DURATIONS.map(lsd => {
                            return <div key={lsd.id}>
                                <input type="radio" onChange={() => handleChange(lsd.value)}  id={lsd.id} name="duration" value={lsd.value} checked={value === lsd.value} />
                                &nbsp;<label htmlFor={lsd.id} >{lsd.content}</label>
                            </div>
                        })
                    }

                    <div>
                        <input type="radio" id="custom" name="duration" value={"5hrs"} checked={false} disabled />
                        &nbsp;<label htmlFor="custom" className='text-gray-600' >Custom Duration <span className="font-mono px-2 outline outline-1 outline-gray-600 rounded">5 hrs</span></label>
                    </div>

                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your notification preferences will be updated.
                </p>

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                >
                    {loading ? "Updating..." : "Confirm"}
                </Button>
            </CardContent>
        </Card >
    )
}

export default LogNotification