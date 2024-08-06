import { MoveRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface inviteGuestsStepProps {
    openGuestsModal: () => void
    emailsToEnvite: string[]
    openConfirmTripModal: () => void
}

export function InviteGuestsStep ({
    openGuestsModal,
    emailsToEnvite,
    openConfirmTripModal
}: inviteGuestsStepProps)
{
    return (
        <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type="button" onClick={openGuestsModal} className='flex items-center gap-2 flex-1 text-left'>
            <UserRoundPlus className='size-5 text-zinc-400'/>
            {emailsToEnvite.length > 0 ? (
                <span className='text-zinc-100 text-lg flex-1'>
                {emailsToEnvite.length} pessoa(s) convidadas
                </span>
            ) : (
                <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
            )}
            </button>

            <div className='w-px h-4 bg-zinc-800'></div>

            <Button onClick={openConfirmTripModal} variant='primary'>
                Confirmar viagem
                <MoveRight className='size-5' />
            </Button>
        </div>
    )
}