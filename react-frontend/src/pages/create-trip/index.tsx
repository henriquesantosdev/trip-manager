import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationsAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';

export function CreateTripPage() {

  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventDateAndEndDates, setEventDateAndEndDates] = useState<DateRange | undefined>()

  const [emailsToEnvite, setEmailsToEnvite] = useState([]);

  const openGuestsInput = () => {
    setIsGuestsInputOpen(true)
  }

  const closeGuestsInput = () => {
    setIsGuestsInputOpen(false)
  }

  const openGuestsModal = () => {
    setIsGuestsModalOpen(true)
  }

  const closeGuestsModal = () => {
    setIsGuestsModalOpen(false)
  }

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true)
  }

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false)
  }

  const addNewEmailToEnvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    // @ts-ignore
    if (emailsToEnvite.includes(email)) {
      return
    }

    setEmailsToEnvite([
      // @ts-ignore
      ...emailsToEnvite,
      // @ts-ignore
      email
    ])

    event.currentTarget.reset()

  }

  const removeEmailToInvites = (emailToRemove: string) => {
    const newEmailList = emailsToEnvite.filter(envited => envited !== emailToRemove)
    setEmailsToEnvite(newEmailList)
  }

  async function createTrip (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    console.log(destination, ownerEmail, ownerName, eventDateAndEndDates, emailsToEnvite)

    if (!destination) {
      return
    }

    if (!eventDateAndEndDates?.from || !eventDateAndEndDates?.to) {
      return 
    }

    if (emailsToEnvite.length === 0) {
      return 
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventDateAndEndDates.from,
      ends_at: eventDateAndEndDates.to,
      emails_to_invite: emailsToEnvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data
    
    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/img/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className="space-y-4">
          <DestinationsAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            setEventDateAndEndDates={setEventDateAndEndDates}
            eventDateAndEndDates={eventDateAndEndDates}
          />

          { isGuestsInputOpen && (
            <InviteGuestsStep
            openGuestsModal={openGuestsModal}
            emailsToEnvite={emailsToEnvite}
            openConfirmTripModal={openConfirmTripModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda<br/>
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="">politicas de privacidade.</a>
        </p>
      </div>


      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToEnvite={addNewEmailToEnvite}
          closeGuestsModal={closeGuestsModal}
          emailsToEnvite={emailsToEnvite}
          removeEmailToInvites={removeEmailToInvites}
        />
      )}

      { isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />        
      )}

    </div>
  )
}
