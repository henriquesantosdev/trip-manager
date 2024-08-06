import { Calendar, MapPin, MoveRight, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns';
import "react-day-picker/style.css";

interface destinationsAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    setEventDateAndEndDates: (dates: DateRange | undefined) => void
    eventDateAndEndDates: DateRange | undefined
}

export function DestinationsAndDateStep ({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    setEventDateAndEndDates,
    eventDateAndEndDates
}: destinationsAndDateStepProps) {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    const openDatePicker = () => {
        return setIsDatePickerOpen(true)
    }

    const closeDatePicker = () => {
        return setIsDatePickerOpen(false)
    }

    const displayedDate = eventDateAndEndDates && eventDateAndEndDates.from && eventDateAndEndDates.to
    ? format(eventDateAndEndDates.from, "d ' de ' LLL").concat(' até ').concat(format(eventDateAndEndDates.to, "d ' de ' LLL"))
    : null

    return (
        <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
                <MapPin className='size-5 text-zinc-400'/>
                <input
                    disabled={isGuestsInputOpen}
                    type="text"
                    placeholder="Para onde você vai?"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={event => setDestination(event.target.value)}
                />
            </div>

            <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center text-left gap-2 w-[240px]">
                <Calendar className='size-5 text-zinc-400'/>
                <span className="text-lg text-zinc-400 w-40 flex-1">
                    { displayedDate || 'Quando?' }
                </span>
            </button>

            {isDatePickerOpen && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                    <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                    
                    <div className='space-y-2'>
                        <div className='flex justify-between'>
                        <h2 className='text-lg font-semibold'>Selecione a data</h2>
                        <button type="button" onClick={closeDatePicker}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                        </div>
                    </div>

                    <DayPicker
                        mode="range"
                        selected={eventDateAndEndDates}
                        onSelect={setEventDateAndEndDates}
                    />

                    </div>
                </div>
            )}

            <div className='w-px h-4 bg-zinc-800'></div>

            {isGuestsInputOpen ? (
                <Button onClick={closeGuestsInput} variant='secondary'>
                    Alterar local/data
                    <Settings2 className='size-5' />
                </Button>
            ) : (

                <Button onClick={openGuestsInput} variant='primary'>
                    Continuar
                    <MoveRight className='size-5' />
                </Button>

            )}
        </div>
    )
}