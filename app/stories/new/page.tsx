"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CakeIcon, Calendar, CalendarDays, Clock, Heart, Lightbulb, Moon, PlusCircle, TreePine, Upload } from "lucide-react";
import { useAuth } from "@/app/actions/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { getNextOccurrence, removeDate, toTimeString } from "@/lib/utils";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/app/components/ui/spinner";
import { uploadAvatar } from "@/lib/supabase/server-extended/userProfile";
import { createLogStory } from "@/lib/supabase/server-extended/log-stories";
import { v4 as uuid } from 'uuid';
import { useRouter } from "next/navigation";

interface IStoryCreationObj {
  title: string;
  event_type: 'single_day' | 'multi_day' | '';
  event_duration: 'all_day' | 'specific_time' | '';
  start_date: Date | null
  end_date: Date | null
  start_time: Date | null
  end_time: Date | null,
  description: string,
  image_urls: string[],

  error?: string
}

export default function Home() {
  const { profile } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<IStoryCreationObj>({
    title: '',
    event_type: '',
    event_duration: '',
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    image_urls: [],
    description: ''
  })



  const LOG_STORY_TEMPLATES: {
    [key: string]: {
      template: IStoryCreationObj,
      detail: {
        icon: any,
        content: string
      }
    }
  } = {
    'birthday': {
      template: {
        title: 'My Birthday Celebration',
        event_type: 'single_day',
        event_duration: 'all_day',
        image_urls: [],
        description: '',
        start_date: getNextOccurrence(new Date(profile?.birth_date)),
        end_date: getNextOccurrence(new Date(profile?.birth_date)),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <CakeIcon className="w-6 h-6 text-custom-green" />,
        content: 'My Birthday Celebration'
      }
    },
    'christmas': {
      template: {
        title: 'My Christmas Celebration',
        event_type: 'single_day',
        event_duration: 'all_day',
        image_urls: [],
        description: '',
        start_date: getNextOccurrence(new Date('12-25-2000')),
        end_date: getNextOccurrence(new Date('12-25-2000')),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <TreePine className="w-6 h-6 text-custom-green" />,
        content: 'My Christmas Celebration'
      }
    },
    'eid': {
      template: {
        title: 'My Eid Celebration',
        event_type: 'single_day',
        event_duration: 'all_day',
        image_urls: [],
        description: '',
        start_date: new Date(),
        end_date: new Date(),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <Moon className="w-6 h-6 text-custom-green" />,
        content: 'My Eid Celebration'
      }
    },
    'diwali': {
      template: {
        title: 'My Diwali Celebration',
        event_type: 'single_day',
        event_duration: 'all_day',
        image_urls: [],
        description: '',
        start_date: new Date(),
        end_date: new Date(),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <Lightbulb className="w-6 h-6 text-custom-green" />,
        content: 'My Diwali Celebration'
      }
    },
    'valentine': {
      template: {
        title: 'My Valentine Celebration',
        event_type: 'single_day',
        event_duration: 'all_day',
        image_urls: [],
        description: '',
        start_date: getNextOccurrence(new Date('02-14-2000')),
        end_date: getNextOccurrence(new Date('02-14-2000')),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <Heart className="w-6 h-6 text-custom-green" />,
        content: 'My Valentine Celebration'
      }
    }
  }


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      if (newImageFiles.length > 5) {
        alert("Maximum 5 images allowed");
        return;
      }

      setImageFiles(newImageFiles.slice(0, 5));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(fl => fl.filter((_, i) => i !== index))
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    const image_urls: string[] = []
    setIsLoading(true)
    try {
      await Promise.all(imageFiles.map(async file => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuid()}.${fileExt}`;
        const filePath = `${fileName}`;

        console.log('Uploading ', filePath)

        const { data, error } = await uploadAvatar(filePath, file)

        if (error) {
          console.error(error)
          return Promise.reject(error)
        }

        if (!data)
          return Promise.reject('No Data')
        image_urls.push(data)
        return Promise.resolve()
      }))

      const { data, error } = await createLogStory({
        is_brand_origin: false,
        title: formData.title,
        image_urls,
        isMultiDay: formData.event_type === 'multi_day',
        story_type: formData.event_type,
        start_date: formData.start_date!.toISOString(),
        end_date: formData.end_date!.toISOString(),
        start_time: toTimeString(formData.start_time!),
        end_time: toTimeString(formData.end_time!),
        description: formData.description
      })

      if (error)
        setFormData(fd => ({ ...fd, error: error }))

      if (data)
        router.push(`/stories/${data.id}`)
    } catch (error) {
      setFormData(fd => ({ ...fd, error: `${error}` }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-green-600">
          Create a log story
        </h3>

        {profile ? <div className="flex justify-start">
          {(step === 0) ?
            <Button className="bg-green-600 text-white hover:bg-green-700">
              <PlusCircle className="w-8 h-8" />
              Create Other
            </Button> :
            <Button className="bg-gray-100 text-gray-600 hover:bg-gray-300" onClick={() => setStep(s => s - 1)}>
              <ArrowLeft className="w-8 h-8" />
              Back
            </Button>
          }
        </div> : <></>}
      </div>
      {profile ?
        <div className="px-6">

          {/* Step 0: Template selection */}
          {(step === 0) ? <div className="flex flex-col gap-3">
            {Object.keys(LOG_STORY_TEMPLATES).map(key => {
              const data = LOG_STORY_TEMPLATES[key]
              return <Card key={key}
                className="w-full max-w-md cursor-pointer hover:border-custom-green transition-all duration-200"
                onClick={() => {
                  setFormData(data.template)
                  console.log(data.template)
                  setStep(8)
                }}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-6 border border-green-600 rounded-full">
                    {data.detail.icon}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-custom-green transition-colors duration-200">
                    {data.detail.content}
                  </h3>
                </CardContent>
              </Card>
            })}

          </div> : <></>}

          {/* Step 1: Title */}
          {(step === 1) ? <div className="flex flex-col">
            <div className="space-y-4">
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                placeholder="Enter log story name..."
                onChange={handleInputChange}
              />
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => { setFormData({} as IStoryCreationObj); setStep(0) }}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div> : <></>}

          {/* Step 2: Title Preview */}
          {(step === 2) ? <div className="flex flex-col">
            <div className="space-y-4">
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                placeholder="Enter log story name..."
                onChange={handleInputChange}
                readOnly
              />
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => { setStep(1) }}>
                  Edit
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div> : <></>}

          {/* Step 3: Event Type */}
          {(step === 3) ? <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Choose Event Duration</h1>
            <div className="grid grid-cols-1 gap-6">
              <Card
                className="cursor-pointer hover:border-green-600 transition-colors shadow-none hover:shadow-md"
                onClick={() => { setFormData(fd => ({ ...fd, event_type: 'single_day', })); setStep(4) }}
              >
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Single Day Event
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Perfect for birthdays, anniversaries, or one-time celebrations
                    </p>
                    <div className="inline-flex items-center text-green-600 font-medium">
                      Select
                      <svg
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:border-green-600 transition-colors"
                onClick={() => { setFormData(fd => ({ ...fd, event_type: 'multi_day' })); setStep(4) }}
              >
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CalendarDays className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Multiple Day Event
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Ideal for festivals, multi-day celebrations, or extended events
                    </p>
                    <div className="inline-flex items-center text-green-600 font-medium">
                      Select
                      <svg
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div> : <></>}

          {/* Step 4,5: Start Date / End Date & Preview */}
          {(step === 4 || step === 5) ? <div className="flex flex-col">
            {
              formData.event_type === 'single_day' ?
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="DD"
                      value={formData.start_date ? formData.start_date.getDate() : 0}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        start_date: new Date(fd.start_date?.setDate(parseInt(e.target.value)) || new Date()),
                        end_date: new Date(fd.start_date?.setDate(parseInt(e.target.value)) || new Date()),
                      }))}
                    />
                    <Select value={formData.start_date ? formData.start_date.getMonth()?.toString() : "undefined"} onValueChange={(e) => {
                      if (e === 'undefined') return;
                      setFormData(fd => ({
                        ...fd,
                        start_date: new Date(fd.start_date?.setMonth(parseInt(e)) || new Date()),
                        end_date: new Date(fd.start_date?.setMonth(parseInt(e)) || new Date()),
                      }))
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={'undefined'} disabled>
                          Select
                        </SelectItem>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((m, i) => (
                          <SelectItem key={m} value={`${i}`}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="2024"
                      placeholder="YYYY"
                      value={formData.start_date ? formData.start_date.getFullYear() : 0}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        start_date: new Date(fd.start_date?.setFullYear(parseInt(e.target.value)) || new Date()),
                        end_date: new Date(fd.start_date?.setFullYear(parseInt(e.target.value)) || new Date()),
                      }))}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setStep(5)}
                    >
                      Preview Date
                    </Button>
                  </div>
                </div> : <></>
            }

            {
              formData.event_type === 'multi_day' ?
                <div className="space-y-6">
                  <p className="text-lg font-semibold">Start Date</p>
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="DD"
                      value={formData.start_date ? formData.start_date.getDate() : 0}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        start_date: new Date(fd.start_date?.setDate(parseInt(e.target.value)) || new Date()),
                      }))}
                    />
                    <Select value={formData.start_date ? formData.start_date.getMonth()?.toString() : "undefined"} onValueChange={(e) => {
                      if (e === 'undefined') return;
                      setFormData(fd => ({
                        ...fd,
                        start_date: new Date(fd.start_date?.setMonth(parseInt(e)) || new Date()),
                      }))
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={'undefined'} disabled>
                          Select
                        </SelectItem>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((m, i) => (
                          <SelectItem key={m} value={`${i}`}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="2024"
                      placeholder="YYYY"
                      value={formData.start_date?.getFullYear()}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        start_date: new Date(fd.start_date?.setFullYear(parseInt(e.target.value)) || new Date()),
                      }))}
                    />
                  </div>

                  <p className="text-lg font-semibold">End Date</p>
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="DD"
                      value={formData.end_date ? formData.end_date.getDate() : 0}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        end_date: new Date(fd.start_date?.setDate(parseInt(e.target.value)) || new Date()),
                      }))}
                    />
                    <Select value={formData.end_date ? formData.end_date.getMonth().toString() : "undefined"} onValueChange={(e) => {
                      if (e === 'undefined') return;
                      setFormData(fd => ({
                        ...fd,
                        end_date: new Date(fd.start_date?.setMonth(parseInt(e)) || new Date()),
                      }))
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={'undefined'} disabled>
                          Select
                        </SelectItem>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((m, i) => (
                          <SelectItem key={m} value={`${i}`}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="2024"
                      placeholder="YYYY"
                      value={formData.end_date ? formData.end_date.getFullYear() : 0}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        end_date: new Date(fd.start_date?.setFullYear(parseInt(e.target.value)) || new Date()),
                      }))}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setStep(5)}
                    >
                      Preview Date
                    </Button>
                  </div>
                </div> : <></>
            }

            {/* Step 5: Date Preview */}
            <Dialog open={step === 5} onOpenChange={() => setStep(4)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Event Date(s)</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-600 mb-2">Your event is scheduled for:</p>
                  <p className="text-lg font-semibold">{formData.start_date?.toDateString()}</p>
                  {
                    (formData.event_type === 'multi_day') ? (
                      <>
                        <p className="text-gray-600 mt-2 mb-1">to</p>
                        <p className="text-lg font-semibold">{formData.end_date?.toDateString()}</p>
                      </>
                    ) : <></>
                  }
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setStep(4)}>
                    Edit
                  </Button>
                  <Button
                    className="bg-green-600 text-white hover:text-green-600 hover:bg-white transition-colors"
                    onClick={() => setStep(6)}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div> : <></>}

          {/* Step 6: Start Time / End Time */}
          {(step === 6 || step === 7) ? <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer shadow-none hover:shadow-md transition-all duration-200 ${formData.event_duration === "all_day" ? "border-green-600" : ""
                  }`}
                onClick={() => setFormData(fd => ({ ...fd, event_duration: 'all_day', start_time: removeDate(new Date('0 00:00')), end_time: removeDate(new Date('0 23:59')) }))}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">All Day Event</h3>
                    <p className="text-sm text-gray-600">
                      Runs from 12:00 AM to 11:59 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer shadow-none hover:shadow-md transition-all duration-200 ${formData.event_duration === "specific_time" ? "border-green-600" : ""
                  }`}
                onClick={() => setFormData(fd => ({ ...fd, event_duration: 'specific_time' }))}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Specific Time</h3>
                    <p className="text-sm text-gray-600">
                      Set custom start and end times
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            {formData.event_duration === "specific_time" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <Input
                      type="time"
                      value={formData.start_time ? formData.start_time.toTimeString().split(':').splice(0, 2).join(':') : '00:00'}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        start_time: removeDate(new Date(`0 ${e.target.value}`))
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <Input
                      type="time"
                      value={formData.end_time ? formData.end_time.toTimeString().split(':').splice(0, 2).join(':') : '23:59'}
                      onChange={(e) => setFormData(fd => ({
                        ...fd,
                        end_time: removeDate(new Date(`0 ${e.target.value}`))
                      }))} />
                  </div>
                </div>
              </div>
            ) : <></>}
            <div className="flex justify-end">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setStep(7)}
              >
                Preview Time
              </Button>
            </div>

            {/* Time Preview */}
            <Dialog open={step === 7} onOpenChange={() => setStep(6)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Event Time</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-600 mb-2">Your event is scheduled for:</p>
                  {formData.event_duration === "all_day" ? (
                    <p className="text-lg font-semibold text-gray-600">
                      All Day (12:00 AM to 11:59 PM)
                    </p>
                  ) : (
                    <p className="text-lg font-semibold text-gray-600">{`${formData.start_time?.toLocaleTimeString()} to ${formData.end_time?.toLocaleTimeString()}`}</p>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setStep(6)}>
                    Edit
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setStep(8)}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div> : <></>}

          {/* Step 1: Title */}
          {(step === 8) ? <div className="flex flex-col">
            {formData.error ?
              <div className="text-red-500 bg-red-50 p-3 rounded-md">{formData.error}</div>
              : <></>
            }
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={imageFiles.length >= 5}
                />
                <label
                  htmlFor="imageUpload"
                  className={`cursor-pointer ${imageFiles.length >= 5 ? "opacity-50" : ""
                    }`}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    Click to upload images ({imageFiles.length}/5)
                  </p>
                </label>
              </div>
              {imageFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Uploaded ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-full h-24"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Create your log story
                </label>
                <Textarea
                  placeholder="Write your log story here..."
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={280}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.description.length}/280 characters
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <span className="loading-button-content flex items-center gap-2">
                    {isLoading ? "Posting..." : "Post"}
                    {isLoading && <Spinner size="sm" />}
                  </span>
                </Button>
              </div>
            </div>

          </div> : <></>}
        </div> : <div className="w-full h-full flex items-center justify-center">
          <Spinner className="h-6 w-6" />
        </div>}
    </>
  );
}
