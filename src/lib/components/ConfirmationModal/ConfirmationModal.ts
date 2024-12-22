import type { ModalSettings } from '@skeletonlabs/skeleton';

export interface ConfirmationModalConfig {
    title: string;
    body: string;
    confirmText?: string;
    cancelText?: string;
} 

export function createConfirmationModal(config: ConfirmationModalConfig): ModalSettings {
    return {
        type: 'confirm',
        title: config.title,
        body: config.body,
        buttonTextConfirm: config.confirmText,
        buttonTextCancel: config.cancelText,
        backdropClasses: '!bg-black/50',
        modalClasses: '!bg-white w-96 !rounded-lg p-6',
        response: (r: boolean) => {
            if (r) {
                console.log('Confirmed');
            } else {
                console.log('Cancelled');
            }
        }
    };
}
